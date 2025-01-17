import React from 'react';
import GameCard from './GameCard.jsx';

export default function GamesList({ title, games }) {
  return (
    <section className="mb-12">
      <h2 className="text-4xl font-bold mb-6 text-gray-800">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game) => (
          <GameCard key={game.slug} {...game} />
        ))}
      </div>
    </section>
  );
}