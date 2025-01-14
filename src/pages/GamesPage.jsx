import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from "../services/axiosConfig.js"; // Usamos tu configuración existente
import GamesList from "../components/GamesList.jsx";

const GamesPage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Iniciando la obtención de videojuegos..."); // Debug
    const fetchGames = async () => {
      try {
        const response = await axios.get("/games");
        console.log("Videojuegos obtenidos:", response.data); // Debug
        setGames(response.data);
      } catch (err) {
        console.error("Error al cargar los videojuegos:", err); // Debug
        setError("Error al cargar los videojuegos.");
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) return <p>Cargando videojuegos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to GameCritic</h1>
          <p className="text-xl text-gray-600">Listado de todos los juegos</p>
        </header>

        <GamesList title="New Releases" games={games} />
        {/* <GamesList title="Best Rated Games" games={bestRated} /> */}
      </main>
    </div>
  );
};

export default GamesPage;