import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity, clearCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);

  const total = items.reduce(
    (acc, item) => acc + (item.price || 0) * (item.qty || 1),
    0
  );

  const handleQtyChange = (id, qty) => {
    const validQty = Math.max(1, Number(qty));
    dispatch(updateQuantity({ id, qty: validQty }));
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Add items to get started with your order</p>
            <button
              onClick={() => navigate("/")}
              className="w-full bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-1">{items.length} {items.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={item.image || "https://via.placeholder.com/120"}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate pr-4">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => dispatch(removeFromCart(item._id))}
                        className="text-gray-400 hover:text-red-600 transition-colors duration-200 flex-shrink-0"
                        title="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    <p className="text-2xl font-bold text-gray-900 mb-4">
                      ₹{item.price.toLocaleString()}
                    </p>

                    <div className="flex items-center gap-3">
                      <label className="text-sm font-medium text-gray-700">Quantity:</label>
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                        <button
                          onClick={() => handleQtyChange(item._id, item.qty - 1)}
                          className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors duration-200"
                          disabled={item.qty <= 1}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(e) => handleQtyChange(item._id, e.target.value)}
                          className="w-16 text-center py-2 border-x border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => handleQtyChange(item._id, item.qty + 1)}
                          className="px-3 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors duration-200"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => dispatch(clearCart())}
              className="lg:hidden w-full bg-white text-gray-700 font-medium px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
            >
              Clear Cart
            </button>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-semibold text-gray-900">Total</span>
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 mb-3"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => dispatch(clearCart())}
                className="hidden lg:block w-full bg-white text-gray-700 font-medium px-6 py-3 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
              >
                Clear Cart
              </button>

              <button
                onClick={() => navigate("/")}
                className="w-full mt-3 text-blue-600 font-medium px-6 py-2 hover:text-blue-700 transition-colors duration-200"
              >
                ← Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;