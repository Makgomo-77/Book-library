import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import BookList from '../components/BookList';
import { searchBooks } from '../services/api';

const SearchPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setSearchTerm(query);
    
    try {
      const results = await searchBooks(query);
      setBooks(results);
    } catch (err) {
      setError('Failed to search books. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load popular books on initial render
  useEffect(() => {
    handleSearch('javascript programming');
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Search Section */}
        <section className="mb-8">
          <SearchBar onSearch={handleSearch} loading={loading} />
        </section>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Results Section */}
        <section>
          {searchTerm && (
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {loading ? 'Searching...' : `Results for "${searchTerm}"`}
            </h2>
          )}
          <BookList books={books} loading={loading} />
        </section>
      </div>
    </div>
  );
};

export default SearchPage;
