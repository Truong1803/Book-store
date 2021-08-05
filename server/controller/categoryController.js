const Category = require("../models/categoryModel");
const categoryController = {
  async getcategories(req, res) {
    try {
      const category = await Category.find();
      res.json(category);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  async createCategory(req, res) {
    try {
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (category)
        return res.status(400).json({ msg: "This category already exists." });
      const newCategory = new Category({ name });
      newCategory.save();
      res.json({ msg: "Created a category" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  async deleteCategory(req, res) {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deleted a Category" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  async updateCategory(req, res) {
    try {
      const { name } = req.body;
      await Category.findByIdAndUpdate({ _id: req.params.id }, { name });
      res.json({ msg: "Updated a Category" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};
module.exports = categoryController;
