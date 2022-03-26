import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import parser from "../configs/cloudinary.config.js";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.post("/", parser.single("image"), addProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.get("/:id", getProduct);
productRouter.put("/:id", updateProduct);

export default productRouter;
