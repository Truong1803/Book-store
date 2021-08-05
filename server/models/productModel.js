const mongoose = require("mongoose");
// product_id: {
//   type: String,
//   unique: true,
//   trim: true,
//   required: true,
// },
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    oldPrice: {
      type: Number,
      trim: true,
      default: 0,
    },
    images: {
      type: Object,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", productSchema);
