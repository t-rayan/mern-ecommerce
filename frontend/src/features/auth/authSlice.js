import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "./authServices";

// Get user from localStorage
const user = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userInfo: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// user registration
export const registerUser = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authServices.registerService(user);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// userlogin
export const loginUser = createAsyncThunk(
  "auth/login",
  async (creds, thunkAPI) => {
    try {
      return await authServices.loginService(creds);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get current user
export const getUser = createAsyncThunk("auth/user", async (thunkAPI) => {
  try {
    return await authServices.currentUserService();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.errMsg) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// user logout
export const logoutUser = createAsyncThunk("auth/logout", async () => {
  await authServices.logoutService();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: {
    // register reducers
    [registerUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload.msg;
    },
    [registerUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },

    // login reducers
    [loginUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.userInfo = action.payload;
    },
    [loginUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },

    // logout reducers
    [logoutUser.pending]: (state, action) => {
      state.isLoading = true;
    },
    [logoutUser.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.userInfo = null;
    },
    [logoutUser.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },
  },
});
export const { reset } = authSlice.actions;
export default authSlice.reducer;
