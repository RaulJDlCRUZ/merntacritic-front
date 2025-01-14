import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import GamesPage from './pages/GamesPage.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/home" element={<HomePage />} /> {/* Página de inicio */}
          <Route path="/about" element={<AboutPage />} /> {/* Página "Sobre nosotros" */}
          <Route path="/games" element={<GamesPage />} /> {/* Página de juegos */}
        </Routes>
      </App>
    </BrowserRouter>
  </StrictMode>
);