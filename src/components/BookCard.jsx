import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  const { volumeInfo } = book;
  
  const thumbnail = volumeInfo.imageLinks?.thumbnail || '/book-placeholder.png';
  const title = volumeInfo.title || 'Unknown Title';
  const authors = volumeInfo.authors?.join(', ') || 'Unknown Author';
  const rating = volumeInfo.averageRating || 0;

  return (
    <Link to={`/book/${book.id}`}>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
        <div className="h-48 bg-gray-100 flex items-center justify-center p-4">
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-contain"
            onError={(e) => {
              e.target.src = '/book-placeholder.png';
            }}
          />
        </div>
        
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-3 flex-1">{authors}</p>
          
          <div className="flex justify-between items-center mt-auto">
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`text-sm ${
                    star <= rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
              <span className="text-xs text-gray-500 ml-1">
                {rating > 0 ? rating.toFixed(1) : 'No rating'}
              </span>
            </div>
            
            <span className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
              Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookCard;
