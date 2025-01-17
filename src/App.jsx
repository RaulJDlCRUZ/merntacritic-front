import React from 'react';

function App({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4">
        <div className="container mx-auto flex justify-between">
          <div className="flex space-x-4">
            <a href="/" className="text-lg font-bold">MERNtacritic</a>
            <a href="/games" className="text-lg text-gray-800 hover:text-gray-600">Games</a>
          </div>
          <ul className="flex space-x-4">
            <li>
              <a href="/about" className="text-lg text-gray-800 hover:text-gray-600">About</a>
            </li>
          </ul>
        </div>
      </nav>
      {children} {/* Contenido específico de cada página */}
      <footer className="bg-gray-900 text-white p-4 mt-8 text-center">
        © 2025 MERNtacritic. All rights reserved.
      </footer>
    </div>
  );
}

export default App;