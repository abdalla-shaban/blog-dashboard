import React from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="p-4 w-full">
      <div className="w-full max-w-md h-14 flex items-center gap-2 border border-gray-400 rounded-md px-4 shadow-sm">
        <FiSearch className="text-gray-500 text-xl" />
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow h-full outline-none text-base sm:text-lg text-gray-700 placeholder-gray-400 bg-transparent"
        />
      </div>
    </div>
  );
};

export default SearchBar;

