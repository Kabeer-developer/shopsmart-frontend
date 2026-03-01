import React from "react";

const ReviewList = ({ reviews = [] }) => {
  if (reviews.length === 0)
    return (
      <p className="text-gray-500 mt-4 text-center">
        No reviews yet. Be the first to review this product!
      </p>
    );

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold mb-3">Customer Reviews</h3>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="border p-4 rounded-lg shadow-sm bg-white"
          >
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold">{review.name}</p>
              <p className="text-yellow-500">
                {"⭐".repeat(review.rating)}{" "}
                <span className="text-gray-600 text-sm">
                  ({review.rating}/5)
                </span>
              </p>
            </div>
            <p className="text-gray-700">{review.comment}</p>
            <p className="text-gray-400 text-sm mt-1">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
