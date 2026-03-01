import React from "react";
import { Routes, Route } from "react-router-dom";

// Authentication Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

// Product Pages
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import AdminProducts from "./pages/AdminProducts";

// Cart & Orders Pages
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";

// Admin Pages
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminOrders from "./pages/AdminOrders";
import AdminStats from "./pages/AdminStats";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public / Customer Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/:id" element={<OrderDetails />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/products" element={<AdminProducts />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
      <Route path="/admin/stats" element={<AdminStats />} />
    </Routes>
  );
};

export default AppRoutes;
