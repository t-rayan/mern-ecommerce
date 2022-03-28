import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productServices from "./productServices";

const initialState = {
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  isEdit: false,
};

// get all categories
export const getAllProducts = createAsyncThunk(
  "product/getAll",
  async (thunkAPI) => {
    try {
      return await productServices.getProductsService();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// add new category
export const addProduct = createAsyncThunk(
  "product/add",
  async (formData, thunkAPI) => {
    try {
      return await productServices.addProductService(formData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// remove category
export const removeProduct = createAsyncThunk(
  "product/remove",
  async (id, thunkAPI) => {
    try {
      return await productServices.removeProductService(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// update category
export const updateProduct = createAsyncThunk(
  "product/update",
  async (update, thunkAPI) => {
    try {
      return await productServices.updateProductService(
        update.id,
        update.formData
      );
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// get category
export const getProduct = createAsyncThunk(
  "category/get",
  async (id, thunkAPI) => {
    try {
      return await productServices.getProductService(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
      state.product = null;
      state.isEdit = false;
    },
  },
  extraReducers: {
    // get products reducers
    [getAllProducts.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products = action.payload?.products;
    },
    [getAllProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },

    // add product reducers
    [addProduct.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products = [action.payload?.newProduct, ...state.products];
      state.message = action.payload?.msg;
    },
    [addProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },

    // remove product reducers
    [removeProduct.pending]: (state, action) => {
      state.isLoading = true;
    },
    [removeProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.products = state.products.filter(
        (product) => product._id !== action.payload?.deleted?._id
      );
      state.message = action.payload?.msg;
    },
    [removeProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },
    // update product reducers
    [updateProduct.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload?.msg;
    },
    [updateProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },
    // get product reducers
    [getProduct.pending]: (state, action) => {
      state.isLoading = true;
      state.isEdit = true;
    },
    [getProduct.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isEdit = false;
      state.isSuccess = true;
      state.product = action.payload?.product;
    },
    [getProduct.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isEdit = false;
      state.isError = true;
      state.message = action.payload;
    },
  },
});
export const { reset, filterCategory } = productSlice.actions;
export default productSlice.reducer;
