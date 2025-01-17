import React from 'react';
import { SearchBar } from './components/SearchBar';

function App({ children }) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <nav className="bg-white shadow p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-4">
            <a href="/" className="text-lg font-bold">MERNtacritic</a>
            <a href="/games" className="text-lg text-gray-800 hover:text-gray-600">Games</a>
            <a href="/about" className="text-lg text-gray-800 hover:text-gray-600">About</a>
          </div>
          <ul className="flex space-x-4">
            <li className="mr-4">
              <SearchBar />
            </li>
          </ul>
        </div>
      </nav>
      <div className="flex-grow">
        {children} {/* Contenido específico de cada página */}
      </div>
      <footer className="bg-gray-900 text-white p-4 mt-8 text-center">
        © 2025 MERNtacritic. All rights reserved.
      </footer>
    </div>
  );
}

export default App;