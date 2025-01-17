import React from 'react';

export default function HomePage () {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">Welcome to MERNtacritic!</h1>
        <p className="text-xl text-gray-600">Discover and track the best games across all platforms</p>
      </header>
      <section>
        <p>Home content goes here... <br/> //TODO: METER JUEGOS MÁS RECIENTES Y COMENTARIOS MÁS RECIENTES</p>
      </section>
    </div>
  );
}