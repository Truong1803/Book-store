const router = require("express").Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const categoryController = require("../controller/categoryController");
router
  .route("/category")
  .get(categoryController.getcategories)
  .post(auth, authAdmin, categoryController.createCategory);
router
  .route("/category/:id")
  .delete(auth, authAdmin, categoryController.deleteCategory)
  .put(auth, authAdmin, categoryController.updateCategory);
module.exports = router;
