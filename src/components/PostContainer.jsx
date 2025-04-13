import React, { useState } from "react";
import PostCard from "./PostCard";

const PostContainer = ({ onEditPost }) => {
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

  const isSinglePost = posts.length === 1;

  return (
    <div className="p-6">
      <div
        className={`grid gap-6 ${
          isSinglePost ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }`}
      >
        {posts.map((post, index) => (
          <PostCard 
            key={index}
            title={post.title}
            description={post.description}
            date={post.date}
            isFullWidth={isSinglePost}
            onEdit={() => onEditPost(post, (updatedPost) => handleUpdatePost(index, updatedPost))}
          />
        ))}
      </div>
    </div>
  );
};

export default PostContainer;