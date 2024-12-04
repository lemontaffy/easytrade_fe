import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

// Data fetching action
export const fetchItems = createAsyncThunk(
  'infiniteScroll/fetchItems',
  async (page: number) => {
    const response = await fetch(`/api/items?page=${page}`);
    const data = await response.json();
    return data;
  }
);

interface InfiniteScrollState {
  items: any[];
  page: number;
  hasMore: boolean;
  loading: boolean;
}

const initialState: InfiniteScrollState = {
  items: [],
  page: 1,
  hasMore: true,
  loading: false,
};

const infiniteScrollSlice = createSlice({
  name: 'infiniteScroll',
  initialState,
  reducers: {
    resetScroll(state) {
      state.items = [];
      state.page = 1;
      state.hasMore = true;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchItems.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.items = [...state.items, ...action.payload];
        state.page += 1;
        state.hasMore = action.payload.length > 0; // Assume no more items if payload is empty
      })
      .addCase(fetchItems.rejected, (state) => {
        state.loading = false;
        state.hasMore = false;
      });
  },
});

export const { resetScroll } = infiniteScrollSlice.actions;

export default infiniteScrollSlice.reducer;
