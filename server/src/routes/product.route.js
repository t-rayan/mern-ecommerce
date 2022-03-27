import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/product.controller.js";
// import parser from "../configs/cloudinary.config.js";
import cloudinary from "../configs/cloudinary.config.js";
import multer from "multer";

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.post("/", addProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.get("/:id", getProduct);
productRouter.put("/:id", updateProduct);
productRouter.post("/upload", (req, res) => {
  const file = req.files?.pic;
  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    console.log(result);
  });
});

export default productRouter;
