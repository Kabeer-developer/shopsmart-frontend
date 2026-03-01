import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStats } from "../redux/slices/adminSlice";

const AdminStats = () => {
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
          <p className="mt-4 text-lg font-medium text-gray-700">Loading statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="w-full max-w-md p-6 bg-red-50 border border-red-200 rounded-lg shadow-sm">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Revenue & Analytics
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Track your business performance and key metrics
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="flex items-center px-2.5 py-1 bg-blue-50 rounded-lg">
                <svg className="w-4 h-4 text-blue-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="text-xs font-semibold text-blue-600">Active</span>
              </div>
            </div>
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
              Total Users
            </h2>
            <p className="text-4xl font-bold text-gray-900 mb-1">
              {stats.totalUsers?.toLocaleString() || 0}
            </p>
            <p className="text-xs text-gray-500">Registered accounts</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div className="flex items-center px-2.5 py-1 bg-green-50 rounded-lg">
                <svg className="w-4 h-4 text-green-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-semibold text-green-600">Completed</span>
              </div>
            </div>
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
              Total Orders
            </h2>
            <p className="text-4xl font-bold text-gray-900 mb-1">
              {stats.totalOrders?.toLocaleString() || 0}
            </p>
            <p className="text-xs text-gray-500">All-time orders</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 transform hover:-translate-y-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex items-center px-2.5 py-1 bg-purple-50 rounded-lg">
                <svg className="w-4 h-4 text-purple-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <span className="text-xs font-semibold text-purple-600">Revenue</span>
              </div>
            </div>
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
              Total Sales
            </h2>
            <p className="text-4xl font-bold text-gray-900 mb-1">
              ₹{stats.totalSales?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0.00'}
            </p>
            <p className="text-xs text-gray-500">Gross revenue</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-50 to-red-50 px-6 py-5 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Top Performing Products</h2>
                  <p className="text-sm text-gray-600">Best sellers ranked by performance</p>
                </div>
              </div>
              <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-orange-200 text-orange-700">
                {stats.topProducts?.length || 0} Products
              </span>
            </div>
          </div>

          <div className="p-6">
            {stats.topProducts && stats.topProducts.length > 0 ? (
              <div className="space-y-3">
                {stats.topProducts.map((product, index) => (
                  <div
                    key={product._id}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex items-center flex-1 min-w-0">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shadow-sm mr-4 ${
                        index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-white' :
                        index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400 text-gray-700' :
                        index === 2 ? 'bg-gradient-to-br from-orange-300 to-orange-400 text-white' :
                        'bg-gradient-to-br from-blue-100 to-blue-200 text-blue-700'
                      }`}>
                        #{index + 1}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-base mb-0.5 truncate group-hover:text-orange-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {product.category || 'General Category'}
                        </p>
                      </div>
                    </div>

                    <div className="flex-shrink-0 ml-4">
                      <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg shadow-sm">
                        <p className="text-xs text-green-100 font-medium mb-0.5">Price</p>
                        <p className="text-lg font-bold text-white">
                          ₹{product.price?.toFixed(2) || '0.00'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h3 className="mt-4 text-base font-medium text-gray-900">No products available</h3>
                <p className="mt-2 text-sm text-gray-500">Start adding products to see them ranked here</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Quick Insights
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
              <p className="text-xs font-medium text-blue-700 uppercase tracking-wide mb-1">Avg Order Value</p>
              <p className="text-2xl font-bold text-blue-900">
                ₹{stats.totalOrders > 0 ? ((stats.totalSales || 0) / stats.totalOrders).toFixed(2) : '0.00'}
              </p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
              <p className="text-xs font-medium text-green-700 uppercase tracking-wide mb-1">Orders per User</p>
              <p className="text-2xl font-bold text-green-900">
                {stats.totalUsers > 0 ? ((stats.totalOrders || 0) / stats.totalUsers).toFixed(2) : '0.00'}
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
              <p className="text-xs font-medium text-purple-700 uppercase tracking-wide mb-1">Revenue per User</p>
              <p className="text-2xl font-bold text-purple-900">
                ₹{stats.totalUsers > 0 ? ((stats.totalSales || 0) / stats.totalUsers).toFixed(2) : '0.00'}
              </p>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
              <p className="text-xs font-medium text-orange-700 uppercase tracking-wide mb-1">Product Catalog</p>
              <p className="text-2xl font-bold text-orange-900">
                {stats.topProducts?.length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;