import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllOrders, updateOrderStatus } from "../redux/slices/adminSlice";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleMarkDelivered = (orderId) => {
    dispatch(updateOrderStatus({ orderId, statusData: { isDelivered: true } }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent mb-4"></div>
          <p className="text-gray-600 text-lg">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <div className="flex items-center mb-2">
            <svg
              className="w-6 h-6 text-red-600 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-red-800 font-semibold text-lg">Error</h3>
          </div>
          <p className="text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
            <p className="mt-1 text-sm text-gray-600">
              View and manage all customer orders
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-16 w-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                No orders found
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Orders will appear here once customers place them.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Customer / Address
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Total Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Payment Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Delivery Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((o) => (
                    <tr
                      key={o._id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {o.user?.name?.charAt(0).toUpperCase() || "U"}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {o.user?.name || "Unknown User"}
                            </div>
                         
                            <div className="text-xs text-gray-600 mt-1">
                              {o.shippingAddress?.address && (
                                <>
                                  <div>{o.shippingAddress.address}</div>
                                  <div>
                                    {o.shippingAddress.city},{" "}
                                    {o.shippingAddress.postalCode},{" "}
                                    {o.shippingAddress.country}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          ₹{o.totalPrice.toFixed(2)}
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {o.isPaid ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Paid
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Unpaid
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {o.isDelivered ? (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Delivered
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {!o.isDelivered ? (
                          <button
                            onClick={() => handleMarkDelivered(o._id)}
                            className="px-4 py-2 text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                          >
                            Mark Delivered
                          </button>
                        ) : (
                          <span className="text-gray-400 text-sm italic">
                            No actions
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {orders.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-medium">{orders.length}</span>{" "}
                order{orders.length !== 1 ? "s" : ""}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
