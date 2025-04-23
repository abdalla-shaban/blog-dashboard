import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPost, updatePost } from "../store/features/posts/postSlice";

const PostModal = ({ mode = "add", initialData = {}, onClose, onSubmit }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (mode === "edit" || mode === "view") {
            setTitle(initialData.title || "");
            setContent(initialData.content || "");
        } else {
            setTitle("");
            setContent("");
        }
    }, [mode, initialData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const postData = { title, content };

            if (mode === "add") {
                await dispatch(addPost(postData)).unwrap();
            } else if (mode === "edit") {
                await dispatch(updatePost({ id: initialData.id, ...postData })).unwrap();
            }

            onClose();
        } catch (error) {
            console.error("Submission failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: "#00000080" }}
        >
            <div className="bg-white w-full max-w-4xl rounded-[16px] p-6 md:p-12 shadow-xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
                    {mode === "edit"
                        ? "Update your Post"
                        : mode === "view"
                            ? "View Post"
                            : "Add your Post"}
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
                            disabled={mode === "view" || isSubmitting}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium">Content</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter post content"
                            className="w-full border border-gray-300 p-2 rounded h-32"
                            disabled={mode === "view" || isSubmitting}
                            required
                        />
                    </div>

                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full md:w-auto px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                            disabled={isSubmitting}
                        >
                            Close
                        </button>
                        {mode !== "view" && (
                            <button
                                type="submit"
                                className={`w-full md:w-auto px-4 py-2 text-white rounded ${mode === "edit"
                                    ? "bg-yellow-400 hover:bg-yellow-500"
                                    : "bg-blue-600 hover:bg-blue-700"
                                    } ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg
                                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        {mode === "edit" ? "Updating..." : "Adding..."}
                                    </span>
                                ) : mode === "edit" ? (
                                    "Update Post"
                                ) : (
                                    "Add Post"
                                )}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PostModal;