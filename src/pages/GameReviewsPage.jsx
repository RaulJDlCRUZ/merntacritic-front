import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { GameReviews } from '../components/GameReviews.jsx';

export default function GameReviewsPage() {
  const { slug } = useParams();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link
            to={`/games/${slug}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Game
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <GameReviews />
        </div>
      </div>
    </div>
  );
}