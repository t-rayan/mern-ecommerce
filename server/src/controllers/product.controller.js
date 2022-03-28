import cloudinary from "../configs/cloudinary.config.js";
import Category from "../models/category.model.js";
import Product from "../models/product.model.js";
import { createProductValidation } from "../utils/validation.util.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate({
      path: "category",
      select: "name -_id",
    });
    if (products) {
      return res.status(200).json({ products });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const addProduct = async (req, res) => {
  const { name, inventory, price, size, color, category, desc } = req.body;
  const imgFile = req.files?.pic;

  // validation
  const { error } = createProductValidation.validate(req.body);
  const errMsg = error?.details[0]?.message;
  if (error) {
    return res.status(400).json({ msg: errMsg });
  }
  try {
    const productExists = await Product.find({ name });
    if (productExists.length > 0) {
      return res.status(400).json({ msg: "Product name already exists" });
    } else {
      cloudinary.uploader.upload(imgFile.tempFilePath, async (err, result) => {
        const newProduct = await Product.create({
          name,
          inventory,
          price,
          size,
          color,
          category,
          desc,
          img: result?.url,
        });
        if (newProduct) {
          return res.status(200).json({ msg: "Product added", newProduct });
        }
        return res.status(400).json({ msg: "Invalid product data" });
      });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Product.findByIdAndDelete({ _id: id });
    if (deleted) {
      return res.status(200).json({ deleted, msg: "Product Removed" });
    } else {
      return res.status(400).json({ msg: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({ _id: id }).populate({
      path: "category",
      select: "name -_id",
    });
    if (product) {
      return res.status(200).json({ product });
    } else {
      return res.status(400).json({ msg: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, inventory, price, size, color, desc, category } = req.body;
  const imgFile = req.files?.pic;

  try {
    const product = await Product.findById({ _id: id });
    if (product) {
      const result = await cloudinary.uploader.upload(imgFile.tempFilePath);
      product.name = name ? name : product.name;
      product.inventory = inventory ? inventory : product.inventory;
      product.price = price ? price : product.price;
      product.size = size ? size : product.size;
      product.color = color ? color : product.color;
      product.desc = desc ? desc : product.desc;
      product.img = result ? result.url : product.img;
      product.category = category ? category : product.category;
      const updated = await product.save();
      return res.status(200).json({ updated, msg: "Product Updated" });
    } else {
      return res.status(400).json({ msg: "Product not found" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
