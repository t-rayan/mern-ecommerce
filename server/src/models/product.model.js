import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    inventory: {
      type: Number,
    },
    price: {
      type: Number,
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    desc: {
      type: String,
    },
    img: {
      type: String,
    },
    category: {
      ref: "Category",
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestaps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
