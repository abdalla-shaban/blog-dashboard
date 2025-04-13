// components/EditPostModal.js
import React from "react";

const EditPostModal = ({ onClose, postData, onUpdate }) => {
  const [title, setTitle] = React.useState(postData.title);
  const [content, setContent] = React.useState(postData.content);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ title, content });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "#00000080" }}
    >
      <div className="bg-white w-full max-w-4xl rounded-[16px] p-6 md:p-12 shadow-xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
          Update your Post
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter post content"
              className="w-full border border-gray-300 p-2 rounded h-32"
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full md:w-auto px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full md:w-auto px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
            >
              Update Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;