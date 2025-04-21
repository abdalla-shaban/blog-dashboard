import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { supabase } from "../../../database/supabase";

const initialState = {
  isLoading: false,
  error: null,
  data: null,
  isSessionChecked: false,
};

export const getSession = createAsyncThunk("auth/getSession", async () => {
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    toast.error(error.message);
  }
});

export const signIn = createAsyncThunk(
  "auth/signin",
  async ({ email, password, navigate }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        toast.error(error?.message);
      } else {
        toast.success("Signed in Successfully!", { id: "signin-toast" });
        setTimeout(() => {
          toast.loading("redirecting..!", { id: "signin-toast" });
        }, 1500);
        setTimeout(() => {
          toast.dismiss("signin-toast");
          navigate("/");
        }, 3000);
      }

      return data;
    } catch (error) {
      toast.error(error?.message);
    }
  }
);

export const signUp = createAsyncThunk(
  "auth/signup",
  async ({ email, password, navigate }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        toast.error(error?.message);
      } else {
        toast.success("User Created Successfully!");
        navigate("/signin");
      }

      return data;
    } catch (error) {
      toast.error(error?.message);
    }
  }
);

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload;
    },
    logOut: (state) => {
      state.data = null;
    },
  },

  extraReducers: (builder) => {
    // Get Session Cases
    builder.addCase(getSession.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.isSessionChecked = false;
    });
    builder.addCase(getSession.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.data = action.payload;
      state.isSessionChecked = true;
    });
    builder.addCase(getSession.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.data = null;
      state.isSessionChecked = true;
    });
    // Sign-in Cases
    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.data = null;
    });

    // Sign-up Cases
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      state.data = null;
    });
  },
});

export const { setUserData, logOut } = authSlice.actions;
export default authSlice.reducer;
