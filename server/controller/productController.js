const Products = require("../models/productModel");

class APIfeature {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query

    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
    this.query.find(JSON.parse(queryStr));

    return this;
  }
  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }

    return this;
  }

  paginating() {
    const page = this.queryString.page * 1;
    const limit = this.queryString.limit * 1 || 20;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
const productController = {
  async getProducts(req, res) {
    try {
      let countDoc;
      if (req.query.category) {
        countDoc = await Products.countDocuments(
          { category: req.query.category },
          (err, count) => {
            return count;
          }
        );
      } else {
        countDoc = await Products.countDocuments((err, count) => {
          return count;
        });
      }
      const features = new APIfeature(Products.find(), req.query)
        .filtering()
        .sorting()
        .paginating();
      const products = await features.query;
      res.json({
        countDoc: countDoc,
        status: "success",
        result: products.length,
        products: products,
      });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  async createProduct(req, res) {
    try {
      const { title, author, price, oldPrice, images, category } = req.body;
      if (!images) return res.status(400).json({ msg: "No image upload." });
      const product = await Products.findOne({ title });
      if (product)
        return res.status(400).json({ msg: "This product already exists." });
      const newProduct = new Products({
        title,
        author,
        price,
        oldPrice,
        images,
        category,
      });
      newProduct.save();
      res.json({ msg: "Created a Product" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  async deleteProduct(req, res) {
    try {
      await Products.findOneAndDelete({ _id: req.params.id });
      res.json({ msg: "Deleted a Product" });
    } catch (error) {
      return res.status.json({ msg: error.message });
    }
  },
  async updatedProduct(req, res) {
    try {
      const { title, author, price, oldPrice, images, category } = req.body;
      if (!images) return res.status(400).json({ msg: "No image upload" });
      await Products.findByIdAndUpdate(
        { _id: req.params.id },
        { title, author, price, oldPrice, images, category }
      );
      res.json("Updated a Product");
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = productController;
