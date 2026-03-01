import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  createNewProduct,
  editProduct,
  removeProduct,
  clearProductState,
} from "../redux/slices/productSlice";

const AdminProducts = () => {
  const dispatch = useDispatch();
  const { products, loading, error, success } = useSelector((state) => state.products);

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    price: 0,
    description: "",
    image: "",
    category: ""
  });

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(clearProductState());
      setEditing(null);
      setForm({ name: "", price: 0, description: "", image: "", category: "" });
      dispatch(fetchProducts());
    }
  }, [success, dispatch]);

  const startEdit = (p) => {
    setEditing(p._id);
    setForm({
      name: p.name,
      price: p.price,
      description: p.description || "",
      image: p.image || "",
      category: p.category || ""
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editing) {
      dispatch(editProduct({ id: editing, productData: form }));
    } else {
      dispatch(createNewProduct(form));
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setForm({ name: "", price: 0, description: "", image: "", category: "" });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    dispatch(removeProduct(id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Product Management
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Create, edit, and manage your product catalog
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {editing ? "Edit Product" : "Create New Product"}
            </h2>
            {editing && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Editing Mode
              </span>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="Enter product name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  id="price"
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  placeholder="Enter price"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                />
              </div>


              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <input
                  id="category"
                  type="text"
                  placeholder="e.g., Electronics, Clothing"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  id="image"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  placeholder="Enter product description"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors outline-none resize-none"
                />
              </div>
            </div>


            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
              <button
                type="submit"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {editing ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  )}
                </svg>
                {editing ? "Update Product" : "Create Product"}
              </button>

              {editing && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-700 font-medium border border-gray-300 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Products List</h2>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {products?.length || 0} Products
            </span>
          </div>


          {loading && (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-sm text-gray-600">Loading products...</p>
              </div>
            </div>
          )}


          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </div>
          )}


          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products && products.length > 0 ? (
                products.map((p) => (
                  <div
                    key={p._id}
                    className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-200 bg-white"
                  >

                    {p.image && (
                      <div className="mb-4 aspect-video bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23f3f4f6" width="100" height="100"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E';
                          }}
                        />
                      </div>
                    )}


                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-1">
                        {p.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm mb-2">
                        <span className="font-bold text-blue-600">₹{p.price.toFixed(2)}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500">{p.category || "General"}</span>
                      </div>
                      {p.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {p.description}
                        </p>
                      )}
                    </div>


                    <div className="flex gap-2 pt-4 border-t border-gray-100">
                      <button
                        onClick={() => startEdit(p)}
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm rounded-lg transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium text-sm rounded-lg transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by creating a new product.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;