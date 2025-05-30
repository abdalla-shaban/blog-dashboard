import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { supabase } from "../database/supabase";
import { logOut } from "../store/features/auth/authSlice";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import PostContainer from "../components/PostContainer";
import PostModal from "../components/PostModal";

const Home = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.authSlice);

  const [showModal, setShowModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [modalMode, setModalMode] = useState("add");
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);

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

  const handleSubmitSuccess = (newPost) => {
    setPosts((prev) => {
      const exists = prev.find((p) => p.id === newPost.id);
      if (exists) {
        return prev.map((p) => (p.id === newPost.id ? newPost : p));
      } else {
        return [newPost, ...prev];
      }
    });
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
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <PostContainer
        posts={posts}
        setPosts={setPosts}
        searchQuery={searchQuery}
        onEditPost={handleOpenEditModal}
      />

      {showModal && (
        <PostModal
          mode={modalMode}
          initialData={currentPost}
          onClose={handleCloseModal}
          onSubmit={handleSubmitSuccess}
        />
      )}
    </>
  );
};

export default Home;
