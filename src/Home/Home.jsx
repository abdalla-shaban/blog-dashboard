// pages/Home.js
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/Searchbar";
import PostContainer from "../components/PostContainer";
import AddPostModal from "../components/AddPostModal";
import EditPostModal from "../components/EditPostModal";

const Home = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  const handleOpenAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleOpenEditModal = (post) => {
    setCurrentPost(post);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => setShowEditModal(false);

  const handleUpdatePost = (updatedPost) => {
    // Here you would typically call an API to update the post
    console.log("Updated post:", updatedPost);
    // Then update your state or refetch posts
  };

  return (
    <>
      <Navbar onAddPostClick={handleOpenAddModal} />
      <SearchBar />
      <PostContainer onEditPost={handleOpenEditModal} />

      {showAddModal && <AddPostModal onClose={handleCloseAddModal} />}
      {showEditModal && (
        <EditPostModal
          onClose={handleCloseEditModal}
          postData={currentPost}
          onUpdate={handleUpdatePost}
        />
      )}
    </>
  );
};

export default Home;