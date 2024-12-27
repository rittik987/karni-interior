'use client';

import React, { useState, useEffect } from 'react';

interface Review {
  id: number;
  name: string;
  content: string;
  rating: number;
  createdAt: string;
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/reviews');
        if (!res.ok) {
          throw new Error('Failed to fetch reviews');
        }
        const data: Review[] = await res.json();
        setReviews(data);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading reviews...</div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-8">{error}</div>;
  }

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">What People Are Saying</h2>
        <div className="space-y-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white shadow-md rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{review.name}</h3>
                <span className="text-yellow-500 font-bold">{'⭐'.repeat(review.rating)}</span>
              </div>
              <p className="text-gray-600">{review.content}</p>
              <span className="text-sm text-gray-400">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
