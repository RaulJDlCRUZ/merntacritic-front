import React from 'react';

export function ReviewCard({ review }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="border-b border-gray-200 py-6 last:border-0">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-semibold text-lg">{review.username}</h4>
          <div className="text-sm text-gray-500">
            {formatDate(review.date)} • {review.hours_played} hours played
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-sm font-medium
            ${review.recommendation === 'Highly Recommended' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
            {review.recommendation}
          </span>
        </div>
      </div>
      <p className="text-gray-700 mb-4">{review.review_text}</p>
      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span>Score: {review.review_score}/10</span>
        <span>• {review.review_votes} found this helpful</span>
      </div>
    </div>
  );
}