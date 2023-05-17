import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 py-4">
      <nav className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-white text-2xl font-bold ml-4">Game Platform</h1>
        </div>
        <ul className="flex flex-col sm:flex-row mr-4 space-y-2 sm:space-y-0 sm:space-x-4 mt-4 sm:mt-0">
          <li>
          <Link to="/store" className="px-4 py-2 text-white rounded">Mağaza</Link>
          </li>

          <li>
          <Link to="/library" className="px-4 py-2 text-white rounded">Kütüphanem</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;