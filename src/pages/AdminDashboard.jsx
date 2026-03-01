import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStats } from "../redux/slices/adminSlice";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getStats());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading stats...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="w-full max-w-md p-6 bg-red-50 border border-red-200 rounded-lg shadow-sm">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Overview of your platform's key metrics
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">

          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <h2 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-1">
              Total Users
            </h2>
            <p className="text-3xl font-bold text-gray-900">
              {stats.totalUsers?.toLocaleString() || 0}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
            <h2 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-1">
              Total Orders
            </h2>
            <p className="text-3xl font-bold text-gray-900">
              {stats.totalOrders?.toLocaleString() || 0}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h2 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-1">
              Total Sales
            </h2>
            <p className="text-3xl font-bold text-gray-900">
              ₹{stats.totalSales?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 p-6 border border-gray-100 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <h2 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-3">
              Top Products
            </h2>
            <ul className="space-y-2">
              {stats.topProducts && stats.topProducts.length > 0 ? (
                stats.topProducts.map((product) => (
                  <li 
                    key={product._id} 
                    className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-700 truncate mr-2">
                      {product.name}
                    </span>
                    <span className="text-sm font-bold text-gray-900 whitespace-nowrap">
                      ₹{product.price?.toFixed(2) || '0.00'}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-500 italic py-2">
                  No products available
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;