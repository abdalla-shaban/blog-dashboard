import React, { useState } from "react";
import { FiMoreHorizontal, FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import PostModal from "./PostModal";

const PostCard = ({
    title,
    description,
    date,
    isDeleting,
    onEdit,
    onDelete
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleEditClick = () => {
        toggleMenu();
        onEdit({ title, content: description });
    };

    const handleViewClick = () => {
        setIsModalOpen(true);
        toggleMenu();
    };

    const handleDeleteClick = () => {
        toggleMenu();
        onDelete();
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={`bg-white border border-gray-300 rounded-lg p-4 w-full min-h-[215px] hover:border-[1px] hover:border-[#0C5CE1] hover:shadow-lg transition relative ${isDeleting ? "opacity-50" : ""}`}>
            {/* Main Content */}
            <div className="h-auto">
                <h2 className="font-semibold text-lg mb-2">{title}</h2>
                <p className="text-gray-500 text-2xl mb-4 line-clamp-4">
                    {description}
                </p>
            </div>

            <p className="absolute bottom-2 left-4 text-gray-500 text-sm">{date}</p>

            {/* Action Menu */}
            <div className="absolute bottom-2 right-4">
                <button
                    onClick={toggleMenu}
                    className="text-gray-900 cursor-pointer"
                    disabled={isDeleting}
                >
                    <FiMoreHorizontal size={20} />
                </button>

                {isMenuOpen && (
                    <div className="absolute bottom-10 right-0 bg-white border rounded-md shadow-md w-36 text-sm z-10 overflow-hidden">
                        <button
                            onClick={handleViewClick}
                            className="w-full px-4 py-2 flex items-center gap-2 text-blue-600 hover:bg-blue-50 font-medium capitalize"
                        >
                            <FiEye /> View
                        </button>
                        <div className="border-t" />
                        <button
                            onClick={handleEditClick}
                            className="w-full px-4 py-2 flex items-center gap-2 text-yellow-500 hover:bg-yellow-50 font-medium capitalize"
                            disabled={isDeleting}
                        >
                            <FiEdit /> Edit
                        </button>
                        <div className="border-t" />
                        <button
                            onClick={handleDeleteClick}
                            className="w-full px-4 py-2 flex items-center gap-2 text-red-600 hover:bg-red-50 font-medium capitalize"
                            disabled={isDeleting}
                        >
                            {isDeleting ? "Deleting..." : (
                                <>
                                    <FiTrash2 /> Delete
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>

            {/* View Modal */}
            {isModalOpen && (
                <PostModal
                    mode="view"
                    initialData={{ title, content: description }}
                    onClose={handleCloseModal}
                    onSubmit={() => { }}
                />
            )}
        </div>
    );
};

export default PostCard;