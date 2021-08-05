const router = require("express").Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const productController = require("../controller/productController");
router
  .route("/products")
  .get(productController.getProducts)
  .post(productController.createProduct);

router
  .route("/product/:id")
  .delete(auth, authAdmin, productController.deleteProduct)
  .put(auth, authAdmin, productController.updatedProduct);

module.exports = router;
