import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">BL</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">BookLibrary</h1>
          </Link>
          
          <nav className="flex space-x-4">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Search
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
