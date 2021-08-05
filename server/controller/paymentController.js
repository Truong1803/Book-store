const Payments = require("../models/paymentModel");
const Users = require("../models/userModel");
const Products = require("../models/productModel");

const paymentController = {
  async getPayments(req, res) {
    try {
      const payments = await Payments.find();
      res.json(payments);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  async createPayment(req, res) {
    try {
      const user = await Users.findById(req.user.id).select("name email");
      if (!user) return res.status(400).json({ msg: "User does not exist." });
      const { cart, paymentID, address } = req.body;
      const { _id, name, email } = user;
      const newPayment = new Payments({
        user_id: _id,
        name,
        email,
        cart,
        paymentID,
        address,
      });
      cart.map((item) => {
        return sold(item._id, item.quanlity, item.sold);
      });
      await newPayment.save();
      res.json({ msg: "Payment Success!" });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

const sold = async (id, quanlity, oldSold) => {
  await Products.findOneAndUpdate(
    { _id: id },
    {
      sold: quanlity + oldSold,
    }
  );
};

module.exports = paymentController;
