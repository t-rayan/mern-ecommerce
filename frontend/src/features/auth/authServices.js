import Axios from "axios";
import { setToken } from "../../utils/SetToken";

const API_URL = "api/user/";

// service to register a new user
const registerService = async (userData) => {
  const res = await Axios.post(`${API_URL}register`, userData);
  return res.data;
};

// service to login a registered user
const loginService = async (creds) => {
  const res = await Axios.post(`${API_URL}login`, creds);

  if (res.data) {
    localStorage.setItem("userInfo", JSON.stringify(res.data));
  }

  return res.data;
};

// get current user
const currentUserService = async () => {
  const res = await Axios.get(API_URL, setToken());
  return res.data;
};
// service to logout
const logoutService = () => {
  localStorage.removeItem("userInfo");
};
const authServices = {
  registerService,
  loginService,
  logoutService,
  currentUserService,
};

export default authServices;
