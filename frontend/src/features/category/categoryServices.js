import Axios from "axios";
import { setToken } from "../../utils/SetToken";
const API_URL = "http://localhost:5000/api/category/";

// service to get all categories
const getCategoriesService = async () => {
  const res = await Axios.get(API_URL, setToken());
  return res.data;
};

// service to add new category
const addCategoryService = async (categoryInfo) => {
  const res = await Axios.post(API_URL, categoryInfo);
  return res.data;
};

// service to add new category
const removeCategoryService = async (id) => {
  const res = await Axios.delete(API_URL + id);
  return res.data;
};

// service to update  category
const updateCategoryService = async (id, update) => {
  const res = await Axios.put(API_URL + id, update);
  return res.data;
};

// service to update  category
const getCategoryService = async (id) => {
  const res = await Axios.get(API_URL + id);
  return res.data;
};

const categoryServices = {
  getCategoriesService,
  addCategoryService,
  removeCategoryService,
  updateCategoryService,
  getCategoryService,
};

export default categoryServices;
