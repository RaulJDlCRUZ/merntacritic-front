import React, { useState, useEffect } from 'react';
import axios from "../services/axiosConfig.js";
import { useParams } from 'react-router-dom';
import { ReviewCard } from './ReviewCard';
import { Pagination } from './Pagination';

const REVIEWS_PER_PAGE = 10; // CONSTANTE GLOBAL PARA EL NÚMERO DE REVIEWS POR PÁGINA

async function getReviews(slug) {
  try {
    const response = await axios.get(`/reviews/${slug}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn("No reviews found for this game.");
      return [];
    } else {
      console.error("Error fetching reviews:", error);
      return [];
    }
  }
}

export function GameReviews({ preview }) {
  const { slug } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchReviews() {
      try {
        if (slug) {
          console.log(slug);
          const fetchedReviews = await getReviews(slug);
          setReviews(fetchedReviews);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchReviews();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (error) return (
    <div className="flex items-center justify-center h-screen">
        <div className="text-center">
            <h1 className="text-6xl text-red-500">Error 404</h1>
            <p className="text-xl text-gray-600">Reviews not found</p>
        </div>
    </div>
);

  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const displayedReviews = preview 
    ? reviews.slice(0, REVIEWS_PER_PAGE-1) 
    : reviews.slice(startIndex, startIndex + REVIEWS_PER_PAGE);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Community Reviews</h3>
        <p className="text-gray-600">Based on {reviews.length} reviews</p>
      </div>
      
      {displayedReviews.map((review, index) => (
        <ReviewCard key={index} review={review} />
      ))}

      {!preview && totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}