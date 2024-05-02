import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INews } from './types';

interface NewsState {
  news: INews[];
  isLoading: boolean;
  error: string;
}

const initialState: NewsState = {
  news: [],
  isLoading: false,
  error: '',
}

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    newsFetching(state) {
      state.isLoading = true;
    },
    newsFetchingSuccess(state) {
      state.isLoading = false;
      state.error = '';
    },
    newsFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    newsAddItem(state, action: PayloadAction<INews>) {
      state.news = [...state.news, action.payload];
    },
    newsClear(state) {
      state.news = [];
    },
  }
})

export default newsSlice.reducer;