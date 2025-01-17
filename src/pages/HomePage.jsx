import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "../services/axiosConfig.js"; // Usamos instancia base
import GamesList from "../components/GamesList.jsx";
import { ReviewCard } from "../components/ReviewCard.jsx";

export default function HomePage () {
  const [newReleases, setNewReleases] = useState(() => JSON.parse(localStorage.getItem('newReleases')) || []);
  const [newReviews, setNewReviews] = useState(() => JSON.parse(localStorage.getItem('newReviews')) || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* Función asíncrona que tomando un endpoint devuelve los datos de juegos */
  const fetchInfo = async (endpoint, setter, key, params) => {
    try {
      const response = await axios.get(endpoint, { params: Object.fromEntries(params) });
      setter(response.data);
      // Guardamos en localStorage para almacenar el estado actual
      localStorage.setItem(key, JSON.stringify(response.data));
    } catch (err) {
      console.error(`Error al cargar los videojuegos desde ${endpoint}:`, err); // Debug
      setError("Error al cargar los videojuegos.");
    }
  };

  useEffect(() => {
    console.log("Iniciando la obtención de videojuegos..."); // Debug
    const fetchAllGames = async () => {
      await Promise.all([
        fetchInfo("/games/latest", setNewReleases, 'newReleases', [['limit', '12'], ['page', '1']]),
        fetchInfo("/reviews/latest", setNewReviews, 'newReviews', [['limit', '5'], ['page', '1']])
      ]);
      setLoading(false);
    };

    if (!localStorage.getItem('newReleases') || !localStorage.getItem('newReviews')) {
      fetchAllGames();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">Welcome to MERNtacritic!</h1>
        <p className="text-xl text-gray-600">Discover and track the best games across all platforms</p>
      </header>
      <GamesList title="New Releases" games={newReleases} />
      <div>
        <div className="mb-8">
          <h3 className="text-3xl font-semibold mb-2">Recent Reviews</h3>
        </div>
        {/* AQUÍ IRÁ EL COMPONENTE DE REVIEWS, CONCRETAMENTE LAS 5 MÁS RECIENTES */}
        <div className="space-y-6">
          {newReviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}