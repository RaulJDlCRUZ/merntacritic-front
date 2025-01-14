import React from 'react';

function App({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4">
        <div className="container mx-auto">
          <a href="/" className="text-lg font-bold">GameCritic</a>
        </div>
      </nav>
      {children} {/* Contenido específico de cada página */}
      <footer className="bg-gray-900 text-white p-4 mt-8 text-center">
        © 2025 GameCritic. All rights reserved.
      </footer>
    </div>
  );
}

export default App;