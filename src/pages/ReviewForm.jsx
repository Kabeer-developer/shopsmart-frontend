import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductReview } from "../redux/slices/productSlice";

const ReviewForm = ({ productId }) => {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!rating || !comment.trim()) {
      alert("Please provide both rating and comment.");
      return;
    }

    dispatch(addProductReview({ productId, reviewData: { rating, comment } }));
    setRating(0);
    setComment("");
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm mt-6">
      <h3 className="text-lg font-semibold mb-3">Write a Review</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Rating */}
        <div>
          <label className="block mb-1 font-medium">Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border rounded p-2 w-full"
          >
            <option value="">Select Rating</option>
            <option value="1">⭐ 1 - Poor</option>
            <option value="2">⭐⭐ 2 - Fair</option>
            <option value="3">⭐⭐⭐ 3 - Good</option>
            <option value="4">⭐⭐⭐⭐ 4 - Very Good</option>
            <option value="5">⭐⭐⭐⭐⭐ 5 - Excellent</option>
          </select>
        </div>

        {/* Comment */}
        <div>
          <label className="block mb-1 font-medium">Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
            placeholder="Write your review here..."
            className="border rounded p-2 w-full resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
