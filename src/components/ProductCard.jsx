import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 group">
    
      <div className="relative overflow-hidden bg-gray-100 h-48">
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.category && (
          <span className="absolute top-2 right-2 bg-white bg-opacity-90 text-gray-700 text-xs font-medium px-2 py-1 rounded-full shadow">
            {product.category}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-lg mb-2 truncate group-hover:text-blue-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mb-4">
          <p className="text-2xl font-bold text-gray-900">₹{product.price}</p>
          {product.countInStock !== undefined && (
            <span className={`text-xs font-medium px-2 py-1 rounded ${product.countInStock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
            </span>
          )}
        </div>

        <Link
          to={`/products/${product._id}`}
          className=" w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-medium py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;