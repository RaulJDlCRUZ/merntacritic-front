import React, { useEffect, useState } from "react";
import axios from "../axiosConfig.js"; // Usamos tu configuración existente

const GameList = () => {
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
    <div>
      <h1>Listado de Videojuegos</h1>
      <ul>
        {games.map((game) => (
          <li key={game._id}>
            <strong>{game.title}</strong> - Metascore: {game.metascore}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;
