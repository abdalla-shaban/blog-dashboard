import React from "react";

const AddPostModal = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "#00000080" }} 
    >
      <div className="bg-white w-full max-w-4xl rounded-[16px] p-6 md:p-12 shadow-xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
          Add your Post
        </h2>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Title</label>
          <input
            type="text"
            placeholder="Enter post title"
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium">Content</label>
          <textarea
            placeholder="Enter post content"
            className="w-full border border-gray-300 p-2 rounded h-32"
          ></textarea>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4">
          <button
            onClick={onClose}
            className="w-full md:w-auto px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Add Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPostModal;
