import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/results?query=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="w-full max-w-xl mx-auto p-4">
      <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
        Search for properties
      </label>
      <div className="flex">
        <input
          id="search"
          type="text"
          placeholder="e.g. London, 2 bed, garden"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow border border-gray-300 rounded-l-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 rounded-r-xl hover:bg-blue-600"
        >
          Search
        </button>
      </div>
    </div>
  );
}
