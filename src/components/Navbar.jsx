// /components/Navbar.jsx
import React from "react";
import { FiPlus, FiLogOut } from "react-icons/fi";

const Navbar = ({ onAddPostClick }) => {
  return (
    <nav className="bg-white px-4 sm:px-6 py-4 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl sm:text-3xl font-bold text-black">Blog Dashboard</h1>

        <div className="flex space-x-3 sm:space-x-4">
          <button
            onClick={onAddPostClick}
            className="bg-[#0C5CE1] hover:bg-blue-700 text-white p-2 sm:px-6 sm:py-3 sm:text-base sm:font-medium rounded-lg transition duration-200 cursor-pointer"
          >
            <span className="sm:hidden">
              <FiPlus size={20} />
            </span>
            <span className="hidden sm:inline">Add New Post</span>
          </button>

          <button className="bg-white hover:bg-red-50 border-2 border-red-500 text-red-600 p-2 sm:px-6 sm:py-3 sm:text-base sm:font-medium rounded-lg transition duration-200 cursor-pointer">
            <span className="sm:hidden">
              <FiLogOut size={20} />
            </span>
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
