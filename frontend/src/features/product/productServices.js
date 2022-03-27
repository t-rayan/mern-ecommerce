import Axios from "axios";
import { setToken } from "../../utils/SetToken";
const API_URL = "http://localhost:5000/api/product/";

// service to get all products
const getProductsService = async () => {
  const res = await Axios.get(API_URL, setToken());
  return res.data;
};

// service to add new product
const addProductService = async (formData) => {
  const res = await Axios.post(API_URL, formData);
  return res.data;
};

// service to add new product
const removeProductService = async (id) => {
  const res = await Axios.delete(API_URL + id);
  return res.data;
};

// service to update  product
const updateProductService = async (id, update) => {
  const res = await Axios.put(API_URL + id, update);
  return res.data;
};

// service to update  product
const getProductService = async (id) => {
  const res = await Axios.get(API_URL + id);
  return res.data;
};

const productServices = {
  getProductsService,
  addProductService,
  removeProductService,
  updateProductService,
  getProductService,
};

export default productServices;
