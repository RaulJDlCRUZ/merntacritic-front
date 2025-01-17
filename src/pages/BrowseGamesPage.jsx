import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import axios from "../services/axiosConfig.js"; // Usamos tu configuración existente
import GamesList from "../components/GamesList.jsx";

export default function BrowseGamesPage() {

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  const query = useQuery();
  const searchParams = {};

  query.forEach((value, key) => {
    searchParams[key] = value;
  });

  useEffect(() => {
    const fetchGames = async (searchParams) => {
      try {
        const response = await axios.get('/games/search', {
          params: searchParams
        });
        setGames(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames(searchParams);
  }, [query, searchParams]);

  /* TAILWINDCSS RETURN */
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Game Search</h2>
          <p className="text-xl text-gray-600">Find games by title or platform!</p>
        </header>

        <GamesList title="Results" games={games} />
      </main>
    </div>
  );
}