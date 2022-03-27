import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Register from "./pages/Register";

import { Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Protected from "./utils/Protected";
import Home from "./pages/Home";
import Restricted from "./utils/Restricted";
import AdminRoute from "./utils/AdminRoute";
import MainLayout from "./layouts/MainLayout";
import Categories from "./pages/Categories";
import AdminLayout from "./layouts/AdminLayout";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Settings from "./pages/Settings";
import Customers from "./pages/Customers";
import AddCategory from "./pages/AddCategory";
import FormLayout from "./layouts/FormLayout";
import InnerLayout from "./layouts/InnerLayout";
import AddProduct from "./pages/AddProduct";
import Toaster from "./components/Toaster";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={
            <Restricted>
              <Register />
            </Restricted>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Dashboard />} />

          <Route path="categories" element={<InnerLayout />}>
            <Route index element={<Categories />} />
            <Route path="add" element={<AddCategory />} />
            <Route path=":id" element={<AddCategory />} />
          </Route>
          <Route path="products" element={<InnerLayout />}>
            <Route index element={<Products />} />
            <Route path="add" element={<AddProduct />} />
            <Route path=":id" element={<AddProduct />} />
          </Route>
          {/* <Route path="products" element={<Products />} /> */}
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
      <Outlet />
    </MainLayout>
  );
}

export default App;
