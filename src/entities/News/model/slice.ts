import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { INews } from './types';

interface NewsState {
  news: INews[];
  isLoading: boolean;
  error: string;
  ids: number[];
}

const initialState: NewsState = {
  news: [],
  isLoading: false,
  error: '',
  ids: [],
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
      state.news.push(action.payload);
    },
    newsIdsFetching(state, action: PayloadAction<number[]>) {
      state.ids = action.payload;
    },
    updateNews(state, action: PayloadAction<INews>) {
      state.news.pop();
      state.news.unshift(action.payload);
    }
  }
})

export default newsSlice.reducer;