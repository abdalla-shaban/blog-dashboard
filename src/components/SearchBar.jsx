import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';

const SearchBar = ({ searchQuery, setSearchQuery }) => {
    const [localQuery, setLocalQuery] = useState(searchQuery);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchQuery(localQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [localQuery, setSearchQuery]);

    return (
        <div className="p-4 w-full">
            <div className="w-full max-w-md h-14 flex items-center gap-2 border border-gray-400 rounded-md px-4 shadow-sm">
                <FiSearch className="text-gray-500 text-xl" />
                <input
                    type="text"
                    placeholder="Search..."
                    value={localQuery}
                    onChange={(e) => setLocalQuery(e.target.value)}
                    className="flex-grow h-full outline-none text-base sm:text-lg text-gray-700 placeholder-gray-400 bg-transparent"
                />
                {localQuery && (
                    <button
                        onClick={() => setLocalQuery('')}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;