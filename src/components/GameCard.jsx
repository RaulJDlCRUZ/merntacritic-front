import React from 'react';
import { Link } from 'react-router-dom';
import Punctuation from './Mini-block-rnbw.jsx';

export default function GameCard({ slug, title, coverUrl, release_date, metascore }) {
  const date = new Date(release_date);
  // Sólo muestro el año si salió el 1 de enero (asumimos que la fecha exacta es desconocida y Jan 01 es una convención)
  const formattedDate = date.getMonth() === 0 && date.getDate() === 1 ? date.getFullYear() : date.toLocaleDateString();

  return (
    <Link to={`/games/${slug}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
        <div className={`h-48 ${!coverUrl ? 'bg-gray-500' : ''}`}>
          {coverUrl && (
            <img
              src={coverUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="p-4 flex flex-col justify-between h-32">
          <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2">{title}</h3>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">{formattedDate}</span>
            <Punctuation metascore={metascore} />
          </div>
        </div>
      </div>
    </Link>
  );
}