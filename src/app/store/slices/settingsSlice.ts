import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface SettingsState {
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
