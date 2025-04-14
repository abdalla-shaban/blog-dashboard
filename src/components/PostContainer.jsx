import React, { useState } from "react";
import PostCard from "./PostCard";

const PostContainer = ({searchQuery, onEditPost }) => {
  const [posts, setPosts] = useState([
    {
      title: "React",
      description: "React lets you build user interfaces out of individual pieces called components. Create your own React lorem15 ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      date: "April 5 , 2025"
    },
    {
      title: "Next",
      description: "React lets you build user interfaces out of individual pieces called components. Create your own React ",
      date: "April 5 , 2025"
    },
    {
      title: "Angular",
      description: "React lets you build user interfaces out of individual pieces called components. Create your own React ",
      date: "April 5 , 2025"
    },
    {
      title: "Vue",
      description: "React lets you build user interfaces out of individual pieces called components. Create your own React ",
      date: "April 5 , 2025"
    },
    {
      title: "Vue",
      description: "React lets you build user interfaces out of individual pieces called components. Create your own React ",
      date: "April 5 , 2025"
    },
  ]);

  const handleUpdatePost = (index, updatedPost) => {
    const updatedPosts = [...posts];
    updatedPosts[index] = {
      ...updatedPosts[index],
      title: updatedPost.title,
      description: updatedPost.content,
    };
    setPosts(updatedPosts);
  };
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

  return (
    <div className="p-6">
      <div
        className={`grid gap-6 ${
          filteredPosts.length === 1
            ? "grid-cols-1"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }`}
      >
        {filteredPosts.map((post, index) => (
          <PostCard 
            key={index}
            title={post.title}
            description={post.description}
            date={post.date}
            isFullWidth={filteredPosts.length === 1}
            onEdit={() => onEditPost(post, (updatedPost) => handleUpdatePost(index, updatedPost))}
          />
        ))}
      </div>
    </div>
  );
};

export default PostContainer;