import requester from "@/app/utils/requester";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  profilePhoto: string | null;
}

interface SettingsState {
  auth: AuthState;
  profile: {
    name: string;
    email: string;
  };
  preferences: {
    theme: string;
    notifications: boolean;
  };
  loading: boolean;
  error: string | null;
}

const initialState: SettingsState = {
  auth: {
    isLoggedIn: false,
    profilePhoto: null,
  },
  profile: {
    name: "John Doe",
    email: "john.doe@example.com",
  },
  preferences: {
    theme: "light",
    notifications: true,
  },
  loading: false,
  error: null,
};

//Async thunk for login
export const loginAsync = createAsyncThunk(
  "settings/login",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      // Execute the login API call
      const loginResponse = await requester!.post("/api/auth/login", credentials);
      if (loginResponse.status === 200) {
        localStorage.setItem("accessToken", loginResponse.data.accessToken);
        localStorage.setItem("refreshToken", loginResponse.data.refreshToken);
      }

      // Fetch the authentication status
      const statusResponse = await requester!.get("/api/auth/status");
      const statusData = statusResponse.data;

      // Return the fetched authentication state
      return {
        isLoggedIn: statusData.loggedIn,
        profilePhoto: statusData.profilePhoto || null,
      };
    } catch (error: any) {
      console.error("LoginAsync error:", error);
      return thunkAPI.rejectWithValue("Failed to login and fetch authentication status");
    }
  }
);

// Async thunk for logout
export const logoutAsync = createAsyncThunk("settings/logout", async (_, thunkAPI) => {
  try {
    // Perform logout API call
    const response = await requester!.post("/api/auth/logout");
    if (response.status === 200) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      return {
        isLoggedIn: false,
        profilePhoto: null,
      };
    }
    throw new Error("Logout failed");
  } catch (error) {
    console.error("LogoutAsync error:", error);
    return thunkAPI.rejectWithValue("Failed to logout");
  }
});


// Async thunk for status
export const checkLoginAsync = createAsyncThunk("settings/status", async (_, thunkAPI) => {
  try {
    // Perform status API call
    const response = await requester!.get("/api/auth/status");
    if (response.data) {
      return {
        isLoggedIn: response.data.loggedIn,
        profilePhoto: response.data.profilePhoto || null,
      };
    }
  } catch (error: any) {
    if (error.response?.status === 401) {
      // Handle unauthorized user (token expired)
      console.error("Unauthorized: Logging out user");
      return thunkAPI.rejectWithValue("Unauthorized");
    } else if (error.response?.status === 404) {
      // Route not found, but this is not an auth issue
      console.warn("404 error: Unrelated to authentication");
      return thunkAPI.rejectWithValue("Route not found");
    }
    console.error("Unexpected error:", error);
    return thunkAPI.rejectWithValue("Unexpected error");
  }
});

// Async thunk for updating profile
export const updateProfileAsync = createAsyncThunk(
  "settings/updateProfile",
  async (profile: { name: string; email: string }) => {
    const response = await fetch("/api/settings/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profile),
    });
    if (!response.ok) {
      throw new Error("Failed to update profile");
    }
    return profile; // Return the updated profile if the API call succeeds
  }
);

// Async thunk for updating preferences
export const updatePreferencesAsync = createAsyncThunk(
  "settings/updatePreferences",
  async (preferences: { theme: string; notifications: boolean }) => {
    const response = await fetch("/api/settings/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferences),
    });
    if (!response.ok) {
      throw new Error("Failed to update preferences");
    }
    return preferences; // Return the updated preferences if the API call succeeds
  }
);

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // login
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action: PayloadAction<{ isLoggedIn: boolean; profilePhoto: string }>) => {
        state.loading = false;
        state.auth.isLoggedIn = action.payload.isLoggedIn;
        state.auth.profilePhoto = action.payload.profilePhoto;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to login";
      });
    // Logout handling
    builder
      .addCase(logoutAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutAsync.fulfilled, (state, action: PayloadAction<{ isLoggedIn: boolean; profilePhoto: string | null }>) => {
        state.loading = false;
        state.auth.isLoggedIn = action.payload.isLoggedIn;
        state.auth.profilePhoto = action.payload.profilePhoto;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to logout";
      });

    // check status
    builder
      .addCase(checkLoginAsync.fulfilled, (state, action: PayloadAction<{ isLoggedIn: boolean; profilePhoto: string | null }>) => {
        state.auth.isLoggedIn = action.payload.isLoggedIn;
        state.auth.profilePhoto = action.payload.profilePhoto;
      })
      .addCase(checkLoginAsync.rejected, (state, action) => {
        if (action.payload === "Unauthorized") {
          // Only log out for unauthorized errors
          state.auth.isLoggedIn = false;
          state.auth.profilePhoto = null;
        } else if (action.payload === "Route not found") {
          // Ignore 404 errors for auth
          console.warn("Route not found, no auth changes.");
        }
      });

    // Update Profile
    builder
      .addCase(updateProfileAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfileAsync.fulfilled, (state, action: PayloadAction<{ name: string; email: string }>) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateProfileAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update profile";
      });

    // Update Preferences
    builder
      .addCase(updatePreferencesAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePreferencesAsync.fulfilled, (state, action: PayloadAction<{ theme: string; notifications: boolean }>) => {
        state.loading = false;
        state.preferences = action.payload;
      })
      .addCase(updatePreferencesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update preferences";
      });
  },
});

export default settingsSlice.reducer;
