// components/PostCard.js
import React, { useState } from "react";
import { FiMoreHorizontal, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

const PostCard = ({ title, description, date, onEdit }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleEditClick = () => {
    toggleMenu();
    onEdit({ title, content: description });
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-4 w-full min-h-[215px] hover:border-[1px] hover:border-[#0C5CE1] hover:shadow-lg transition relative">
      {/* Main Content (Title + Description) */}
      <div className="h-auto">
        <h2 className="font-semibold text-lg mb-2">{title}</h2>
        <p className="text-gray-500 text-2xl mb-4 line-clamp-4">
          {description}
        </p>
      </div>

      <p className="absolute bottom-2 left-4 text-gray-500 text-sm">{date}</p>

      {/* Action Menu*/}
      <div className="absolute bottom-2 right-4">
        <button
          onClick={toggleMenu}
          className="text-gray-900 cursor-pointer"
        >
          <FiMoreHorizontal size={20} />
        </button>

        {isMenuOpen && (
          <div className="absolute bottom-10 right-0 bg-white border rounded-md shadow-md w-36 text-sm z-10 overflow-hidden">
            <button className="w-full px-4 py-2 flex items-center gap-2 text-blue-600 hover:bg-blue-50 font-medium capitalize">
              <FiEye /> View
            </button>
            <div className="border-t" />
            <button 
              onClick={handleEditClick}
              className="w-full px-4 py-2 flex items-center gap-2 text-yellow-500 hover:bg-yellow-50 font-medium capitalize"
            >
              <FiEdit/> Edit
            </button>
            <div className="border-t" />
            <button className="w-full px-4 py-2 flex items-center gap-2 text-red-600 hover:bg-red-50 font-medium capitalize">
              <FiTrash2/> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;