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
      const result = await cloudinary.uploader.upload(imgFile.tempFilePath, {
        folder: "ecommerce",
      });
      const newProduct = await Product.create({
        name,
        inventory,
        price,
        size,
        color,
        category,
        desc,
        img: { img_url: result?.url, pub_id: result?.public_id },
      });
      if (newProduct) {
        return res.status(200).json({ msg: "Product added", newProduct });
      }
      return res.status(400).json({ msg: "Invalid product data" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Product.findByIdAndDelete({ _id: id });
    await cloudinary.uploader.destroy(deleted?.img?.pub_id);
    if (deleted?.images?.length > 0) {
      for (let i = 0; i < deleted?.images.length; i++) {
        await cloudinary.uploader.destroy(deleted?.images[i]?.pub_id);
      }
    }
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
  const addImgs = req.files?.imgs;

  try {
    const product = await Product.findById({ _id: id });
    if (product) {
      product.name = name ? name : product.name;
      product.inventory = inventory ? inventory : product.inventory;
      product.price = price ? price : product.price;
      product.size = size ? size : product.size;
      product.color = color ? color : product.color;
      product.desc = desc ? desc : product.desc;
      if (imgFile) {
        const result = await cloudinary.uploader.upload(imgFile.tempFilePath, {
          folder: "ecommerce",
        });
        product.img = result ? result.url : product.img;
      }
      // adding multiple images
      if (addImgs.length > 0) {
        let imgUrls = [];
        for (let i = 0; i < addImgs.length; i++) {
          const result = await cloudinary.uploader.upload(
            addImgs[i].tempFilePath,
            { folder: "ecommerce" }
          );
          imgUrls.push({ img_url: result?.url, pub_id: result?.public_id });
        }
        product.images.push.apply(product.images, imgUrls);
      }
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
