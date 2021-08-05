const router = require("express").Router();
const paymentController = require("../controller/paymentController");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
  .route("/payment")
  .get(auth, authAdmin, paymentController.getPayments)
  .post(auth, paymentController.createPayment);

module.exports = router;
