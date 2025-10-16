import React from 'react';
import { Link } from 'react-router-dom';

const BookDetails = ({ book, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 animate-pulse">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
            <div className="w-48 h-64 bg-gray-200 rounded-lg"></div>
          </div>
          <div className="md:w-2/3 md:pl-8 space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">❌</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">Book not found</h3>
        <p className="text-gray-500 mb-4">The book you're looking for doesn't exist or couldn't be loaded.</p>
        <Link to="/" className="text-blue-600 hover:text-blue-700 font-medium">
          ← Back to search
        </Link>
      </div>
    );
  }

  const { volumeInfo } = book;
  const thumbnail = volumeInfo.imageLinks?.thumbnail?.replace('http://', 'https://') || '/book-placeholder.png';
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
        ← Back to search
      </Link>
      
      <div className="flex flex-col md:flex-row">
        {/* Book Cover */}
        <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
          <div className="w-48 h-64 bg-gray-100 rounded-lg flex items-center justify-center p-4">
            <img
              src={thumbnail}
              alt={volumeInfo.title}
              className="h-full w-full object-contain"
              onError={(e) => {
                e.target.src = '/book-placeholder.png';
              }}
            />
          </div>
        </div>
        
        {/* Book Details */}
        <div className="md:w-2/3 md:pl-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{volumeInfo.title}</h1>
          {volumeInfo.subtitle && (
            <h2 className="text-xl text-gray-600 mb-4">{volumeInfo.subtitle}</h2>
          )}
          
          <p className="text-gray-700 text-lg mb-4">
            by {volumeInfo.authors?.join(', ') || 'Unknown Author'}
          </p>
          
          {/* Rating */}
          {volumeInfo.averageRating && (
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-lg ${
                      star <= volumeInfo.averageRating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="text-gray-600">
                {volumeInfo.averageRating.toFixed(1)} ({volumeInfo.ratingsCount || 0} reviews)
              </span>
            </div>
          )}
          
          {/* Book Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {volumeInfo.publishedDate && (
              <div>
                <p className="text-gray-500 text-sm">Published</p>
                <p className="font-semibold">{volumeInfo.publishedDate}</p>
              </div>
            )}
            {volumeInfo.publisher && (
              <div>
                <p className="text-gray-500 text-sm">Publisher</p>
                <p className="font-semibold">{volumeInfo.publisher}</p>
              </div>
            )}
            {volumeInfo.pageCount && (
              <div>
                <p className="text-gray-500 text-sm">Pages</p>
                <p className="font-semibold">{volumeInfo.pageCount}</p>
              </div>
            )}
            {volumeInfo.categories && (
              <div>
                <p className="text-gray-500 text-sm">Genre</p>
                <p className="font-semibold">{volumeInfo.categories.join(', ')}</p>
              </div>
            )}
          </div>
          
          {/* Description */}
          {volumeInfo.description && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {volumeInfo.description.length > 500 
                  ? `${volumeInfo.description.substring(0, 500)}...` 
                  : volumeInfo.description
                }
              </p>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex space-x-4">
            {book.accessInfo?.webReaderLink && (
              <a
                href={book.accessInfo.webReaderLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Read Preview
              </a>
            )}
            <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              Add to Favorites
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
