import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoryServices from "./categoryServices";

const initialState = {
  categories: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  isEdit: false,
};

// get all categories
export const getAllCategories = createAsyncThunk(
  "category/getAll",
  async (thunkAPI) => {
    try {
      return await categoryServices.getCategoriesService();
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
export const addCategory = createAsyncThunk(
  "category/add",
  async (categoryInfo, thunkAPI) => {
    try {
      return await categoryServices.addCategoryService(categoryInfo);
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
export const removeCategory = createAsyncThunk(
  "category/remove",
  async (id, thunkAPI) => {
    try {
      return await categoryServices.removeCategoryService(id);
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
export const updateCategory = createAsyncThunk(
  "category/update",
  async (update, thunkAPI) => {
    try {
      return await categoryServices.updateCategoryService(
        update.id,
        update.data
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
export const getCategory = createAsyncThunk(
  "category/get",
  async (id, thunkAPI) => {
    try {
      return await categoryServices.getCategoryService(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.msg) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
      state.category = null;
      state.isEdit = false;
    },
    filterCategory: (state, action) => {
      console.log(action.payload.length);
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
      state.category = null;
      state.isEdit = false;
      state.categories = state.categories.filter(
        (cat) =>
          cat.name.toLowerCase().indexOf(action.payload.toLowerCase()) !== -1
      );
    },
  },
  extraReducers: {
    // get categories reducers
    [getAllCategories.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getAllCategories.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.categories = action.payload?.categories;
    },
    [getAllCategories.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },

    // add category reducers
    [addCategory.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.categories = [action.payload?.category, ...state.categories];
      state.message = action.payload?.msg;
    },
    [addCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },

    // remove category reducers
    [removeCategory.pending]: (state, action) => {
      state.isLoading = true;
    },
    [removeCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.categories = state.categories.filter(
        (category) => category._id !== action.payload?.deleted?._id
      );
      state.message = action.payload?.msg;
    },
    [removeCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },
    // update category reducers
    [updateCategory.pending]: (state, action) => {
      state.isLoading = true;
    },
    [updateCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.message = action.payload?.msg;
    },
    [updateCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = true;
      state.message = action.payload;
    },
    // get category reducers
    [getCategory.pending]: (state, action) => {
      state.isLoading = true;
      state.isEdit = true;
    },
    [getCategory.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isEdit = false;
      state.isSuccess = true;
      state.category = action.payload?.category;
    },
    [getCategory.rejected]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isEdit = false;
      state.isError = true;
      state.message = action.payload;
    },
  },
});
export const { reset, filterCategory } = categorySlice.actions;
export default categorySlice.reducer;
