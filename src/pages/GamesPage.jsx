import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "../services/axiosConfig.js"; // Usamos instancia base
import GamesList from "../components/GamesList.jsx";

export default function GamesPage() {
  const [newReleases, setNewReleases] = useState(() => JSON.parse(localStorage.getItem('newReleases')) || []);
  const [bestRated, setBestRated] = useState(() => JSON.parse(localStorage.getItem('bestRated')) || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* Función asíncrona que tomando un endpoint devuelve los datos de juegos */
  const fetchGames = async (endpoint, setter, key, params) => {
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
        fetchGames("/games/latest", setNewReleases, 'newReleases', [['limit', '12'], ['page', '1']]),
        fetchGames("/games/best", setBestRated, 'bestRated', [['limit', '12'], ['page', '1']])
      ]);
      setLoading(false);
    };

    if (!localStorage.getItem('newReleases') || !localStorage.getItem('bestRated')) {
      fetchAllGames();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  /* TAILWINDCSS RETURN */
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">Welcome to MERNtacritic!</h1>
          <p className="text-xl text-gray-600">Check our game listing!</p>
        </header>
        <GamesList title="New Releases" games={newReleases} />
        <GamesList title="Best Rated Games" games={bestRated} />
      </main>
    </div>
  );
};