﻿import React, { useEffect, useState } from "react";
import { supabase } from "../database/supabase";
import PostCard from "./PostCard";
import { deletePost } from "../store/features/posts/postSlice";
import { useDispatch } from "react-redux";

const PostContainer = ({ posts, setPosts, searchQuery, onEditPost }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        let query = supabase.from("posts").select("*");

        if (searchQuery) {
          query = query.ilike("title", `%${searchQuery}%`);
        }

        const { data, error } = await query.order("created_at", {
          ascending: false,
        });

        if (error) throw error;
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [searchQuery, setPosts]);

  useEffect(() => {
    const subscription = supabase
      .channel("posts_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setPosts((prev) => [payload.new, ...prev]);
          } else if (payload.eventType === "UPDATE") {
            setPosts((prev) =>
              prev.map((post) =>
                post.id === payload.new.id ? payload.new : post
              )
            );
          } else if (payload.eventType === "DELETE") {
            setPosts((prev) =>
              prev.filter((post) => post.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [setPosts]);

  const handleDelete = async (postId) => {
    dispatch(deletePost({ postId }))
      .unwrap()
      .then(() => {
        const newPosts = posts.filter((post) => post.id !== postId);
        setPosts(newPosts);
      });
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center">
        <div className="animate-pulse text-gray-500">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div
        className={`grid gap-6 ${
          posts.length === 1
            ? "grid-cols-1"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        }`}
      >
        {posts.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            description={post.content}
            date={new Date(post.created_at).toLocaleDateString()}
            onEdit={() => onEditPost(post)}
            onDelete={() => handleDelete(post.id)}
          />
        ))}
      </div>
      {posts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          {searchQuery ? "No posts match your search." : "No posts found."}
        </div>
      )}
    </div>
  );
};

export default PostContainer;
