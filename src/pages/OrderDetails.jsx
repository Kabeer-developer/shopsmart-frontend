import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById, clearOrderDetails } from "../redux/slices/orderSlice";
import { useParams, Link } from "react-router-dom";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { orderDetails, loading } = useSelector((state) => state.orders);
  const { id } = useParams();
  

  useEffect(() => {
    dispatch(fetchOrderById(id));
    return () => dispatch(clearOrderDetails());
  }, [dispatch, id]);

  if (loading || !orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-r-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link to="/orders" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Orders
        </Link>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Order #{orderDetails._id?.slice(-8).toUpperCase()}
              </h1>
              <p className="text-gray-600">
                Placed on {new Date(orderDetails.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <div className="mt-4 sm:mt-0 text-left sm:text-right space-y-2">
  <div>
    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
    <p className="text-3xl font-bold text-gray-900">
      ₹{orderDetails.totalPrice?.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
      })}
    </p>
  </div>

  {/* ✅ Delivery Status */}
  <div>
    <p className="text-sm text-gray-600 mb-1">Delivery Status</p>

    {orderDetails.isDelivered ? (
      <div className="inline-flex flex-col items-end">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Delivered
        </span>
        {orderDetails.deliveredAt && (
          <span className="text-xs text-gray-500 mt-1">
            Delivered on{" "}
            {new Date(orderDetails.deliveredAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        )}
      </div>
    ) : (
      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
        Pending
      </span>
    )}
  </div>
</div>

          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Items</h2>
          <div className="space-y-4">
            {orderDetails.orderItems?.map((item) => (
              <div key={item._id} className="flex items-center gap-4 pb-4 border-b last:border-b-0">
                <img
                  src={item.image || "https://tse2.mm.bing.net/th/id/OIP.qRHSQvaS6nw2fCTEHZt57gHaFq?pid=Api&P=0&h=180"}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="font-semibold text-gray-900">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping & Payment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Shipping Address */}
          {orderDetails.shippingAddress && (
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <div className="flex items-center mb-4">
                <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="font-semibold text-gray-900">Shipping Address</h3>
              </div>
              <div className="text-gray-700 space-y-1">
                {orderDetails.shippingAddress.fullName && <p className="font-medium">{orderDetails.shippingAddress.fullName}</p>}
                <p>{orderDetails.shippingAddress.address}</p>
                <p>{orderDetails.shippingAddress.city}{orderDetails.shippingAddress.state && `, ${orderDetails.shippingAddress.state}`}</p>
                <p>{orderDetails.shippingAddress.postalCode}</p>
                <p>{orderDetails.shippingAddress.country}</p>
              </div>
            </div>
          )}

          {/* Payment Info */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center mb-4">
              <svg className="w-5 h-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <h3 className="font-semibold text-gray-900">Payment Method</h3>
            </div>
            <p className="text-gray-700 font-medium">{orderDetails.paymentMethod || "Cash on Delivery"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;