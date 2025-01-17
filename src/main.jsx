import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

import NotFound from './pages/NotFound.jsx';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import GamesPage from './pages/GamesPage.jsx';
import GamePage from './pages/GamePage.jsx';
import BrowseGamesPage from './pages/BrowseGamesPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/home" element={<HomePage />} /> {/* Página de inicio */}
          <Route path="/" element={<HomePage />} /> {/* Redireccionar a la página de inicio */}
          <Route path="/about" element={<AboutPage />} /> {/* Página "Sobre nosotros" */}
          <Route path="/games" element={<GamesPage />} /> {/* Página de juegos INICIAL */}
          <Route path="/games/search" element={<BrowseGamesPage />} /> {/* Página de juegos BÚSQUEDA */}
          <Route path="/games/:slug" element={<GamePage />} /> {/* Página de juegos DETALLE (:slug) */}
          <Route path="/games/id/:id" element={<GamePage />} /> {/* Página de juegos DETALLE (:id) */}
          <Route path="*" element={NotFound} /> {/* Página no encontrada */}
        </Routes>
      </App>
    </BrowserRouter>
  </StrictMode>
);