import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { supabase } from "../database/supabase";
import { logOut } from "../store/features/auth/authSlice";

import Navbar from "../components/Navbar";
import SearchBar from "../components/Searchbar";
import PostContainer from "../components/PostContainer";
import PostModal from "../components/PostModal";

const Home = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.authSlice);

  const [showModal, setShowModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [modalMode, setModalMode] = useState("add"); // add or edit

  const handleOpenAddModal = () => {
    setModalMode("add");
    setShowModal(true);
  };

  const handleOpenEditModal = (post) => {
    setModalMode("edit");
    setCurrentPost(post);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentPost(null);
  };

  const handleSubmit = (postData) => {
    if (modalMode === "add") {
      console.log("Adding new post:", postData);
      // Add post logic ---------------
    } else {
      console.log("Updating post:", postData);
      // Update post logic --------------
    }
    handleCloseModal();
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    dispatch(logOut());
  };
  
  return (
    <>
      <Navbar
        onAddPostClick={handleOpenAddModal}
        email={data?.user?.email}
        onSignOut={signOut}
      />
      <SearchBar />

      <PostContainer onEditPost={handleOpenEditModal} />

      {showModal && (
        <PostModal
          mode={modalMode}
          initialData={currentPost}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default Home;