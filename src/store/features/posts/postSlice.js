import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../../../database/supabase";
import toast from "react-hot-toast";

// Initial fetch
export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    async (_, { rejectWithValue }) => {
        try {
            const { data, error } = await supabase
                .from("posts")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) throw error;
            return data;
        } catch (error) {
            toast.error("Failed to load posts");
            return rejectWithValue(error.message);
        }
    }
);

// ADD POST
export const addPost = createAsyncThunk(
    "posts/addPost",
    async ({ title, content }, { rejectWithValue }) => {
        try {
            const { data, error } = await supabase
                .from("posts")
                .insert([{ title, content }])
                .select()
                .single();

            if (error) {
                toast.error("Error adding post.");
                return rejectWithValue(error.message);
            }

            toast.success("Post added successfully!");
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// UPDATE POST
export const updatePost = createAsyncThunk(
    "posts/updatePost",
    async ({ id, title, content }, { rejectWithValue }) => {
        try {
            const { data, error } = await supabase
                .from("posts")
                .update({ title, content })
                .eq("id", id)
                .select()
                .single();

            if (error) {
                toast.error("Error updating post.");
                return rejectWithValue(error.message);
            }

            toast.success("Post updated successfully!");
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// DELETE POST
export const deletePost = createAsyncThunk(
    "posts/deletePost",
    async ({ postId }, { rejectWithValue }) => {
        try {
            const { error } = await supabase
                .from("posts")
                .delete()
                .eq("id", postId);

            if (error) {
                toast.error("Error deleting post.");
                return rejectWithValue(error.message);
            }

            toast.success("Post deleted Successfully!");
            return postId;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const postsSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Posts
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            
            .addCase(deletePost.pending, (state) => {
                state.loading = true;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = state.posts.filter((post) => post.id !== action.payload);
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            
            .addCase(addPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(addPost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts.unshift(action.payload);
            })
            .addCase(addPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

           
            .addCase(updatePost.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.loading = false;
                const updatedPost = action.payload;
                state.posts = state.posts.map((post) =>
                    post.id === updatedPost.id ? updatedPost : post
                );
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default postsSlice.reducer;