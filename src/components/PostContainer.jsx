import React, { useEffect } from "react";
import { supabase } from "../database/supabase";
import PostCard from "./PostCard";
import { deletePost, fetchPosts } from "../store/features/posts/postSlice";
import { useDispatch, useSelector } from "react-redux";

const PostContainer = ({ searchQuery, onEditPost }) => {
    const dispatch = useDispatch();
    const { posts = [], loading, error } = useSelector((state) => state.posts);

    
    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    
    useEffect(() => {
        const subscription = supabase
            .channel("posts_changes")
            .on(
                "postgres_changes",
                { event: "*", schema: "public", table: "posts" },
                (payload) => {
                    if (payload.eventType === "INSERT") {
                        dispatch({ type: "posts/addPost/fulfilled", payload: payload.new });
                    } else if (payload.eventType === "UPDATE") {
                        dispatch({ type: "posts/updatePost/fulfilled", payload: payload.new });
                    } else if (payload.eventType === "DELETE") {
                        dispatch({ type: "posts/deletePost/fulfilled", payload: payload.old.id });
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, [dispatch]);

    const handleDelete = async (postId) => {
        dispatch(deletePost({ postId }));
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery?.toLowerCase() || "")
    );

    if (loading) {
        return (
            <div className="p-6 flex justify-center">
                <div className="animate-pulse text-gray-500">Loading posts...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-center text-red-500">
                Error loading posts: {error}
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className={`grid gap-6 ${filteredPosts.length === 1 ? "grid-cols-1" :
                    "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                }`}>
                {filteredPosts.map((post) => (
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
            {!loading && filteredPosts.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    {searchQuery ? "No posts match your search." : "No posts found."}
                </div>
            )}
        </div>
    );
};

export default PostContainer;