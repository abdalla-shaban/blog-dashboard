import React, { useState, useEffect } from "react";

const PostModal = ({ mode = "add", initialData = {}, onClose, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (mode === "edit" || mode === "view") {
      setTitle(initialData.title || "");
      setContent(initialData.content || "");
    } else {
      setTitle("");
      setContent("");
    }
  }, [mode, initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "#00000080" }}
    >
      <div className="bg-white w-full max-w-4xl rounded-[16px] p-6 md:p-12 shadow-xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
          {mode === "edit" ? "Update your Post" : mode === "view" ? "View Post" : "Add your Post"}
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
              disabled={mode === "view"} // Disable input in view mode
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter post content"
              className="w-full border border-gray-300 p-2 rounded h-32"
              disabled={mode === "view"} // Disable input in view mode
            />
          </div>

          <div className="flex flex-col md:flex-row justify-between gap-4">
            <button
              type="button"
              onClick={onClose}
              className="w-full md:w-auto px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              Close
            </button>
            {mode !== "view" && (
              <button
                type="submit"
                className={`w-full md:w-auto px-4 py-2 text-white rounded ${
                  mode === "edit"
                    ? "bg-yellow-400 hover:bg-yellow-500"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {mode === "edit" ? "Update Post" : "Add Post"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostModal;
