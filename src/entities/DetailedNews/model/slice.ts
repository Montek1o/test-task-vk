import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IDetailedNews } from "./types"

interface DetailedNewsState {
  detailedNews: IDetailedNews;
  isLoading: boolean;
  error: string;
}

const initialState: DetailedNewsState = {
  detailedNews: {
    id: 0,
    url: '',
    title: '',
    by: '',
    time: '',
    descendants: 0,
    kids: [],
  },
  isLoading: false,
  error: '',
}

export const detailedNewsSlice = createSlice({
  name: 'detailed news',
  initialState,
  reducers: {
    detailedNewsFetching(state) {
      state.isLoading = true;
    },
    detailedNewsFetchingSuccess(state, action: PayloadAction<IDetailedNews>) {
      state.isLoading = false;
      state.error = '';
      state.detailedNews = action.payload;
    },
    detailedNewsFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    clearDetailedNews(state) {
      state.detailedNews = {
        id: 0,
        url: '',
        title: '',
        by: '',
        time: '',
        descendants: 0,
        kids: [],
      };
    }
  }
})

export default detailedNewsSlice.reducer;