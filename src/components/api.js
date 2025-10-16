const API_BASE_URL = 'https://www.googleapis.com/books/v1';

export const searchBooks = async (query, startIndex = 0, maxResults = 20) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/volumes?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${maxResults}`
    );
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('Search books error:', error);
    throw error;
  }
};

export const getBookById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/volumes/${id}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get book by ID error:', error);
    throw error;
  }
};