import Axios from "axios";
import { setToken } from "../../utils/SetToken";
const API_URL = "http://localhost:5000/api/product/";

// service to get all categories
const getProductsService = async () => {
  const res = await Axios.get(API_URL, setToken());
  return res.data;
};

// service to add new category
const addProductService = async (productInfo) => {
  const res = await Axios.post(API_URL, productInfo);
  return res.data;
};

// service to add new category
const removeProductService = async (id) => {
  const res = await Axios.delete(API_URL + id);
  return res.data;
};

// service to update  category
const updateProductService = async (id, update) => {
  const res = await Axios.put(API_URL + id, update);
  return res.data;
};

// service to update  category
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
