import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IComment } from "./types";

interface commentsState {
  comments: IComment[];
  isCommentsLoading: boolean;
  commentsError: string;
  countComments: number;
}

const initialState: commentsState = {
  comments: [],
  isCommentsLoading: false,
  commentsError: '',
  countComments: 0,
}

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    commentsFetching(state) {
      state.isCommentsLoading = true;
    },
    commentsFetchingSuccess(state, action: PayloadAction<IComment[]>) {
      state.isCommentsLoading = false;
      state.commentsError = '';
      state.comments = action.payload;
    },
    commentsFetchingError(state, action: PayloadAction<string>) {
      state.isCommentsLoading = false;
      state.commentsError = action.payload;
    },
    clearComments(state) {
      state.comments = [];
    },
    defineCountComments(state, action: PayloadAction<number>) {
      state.countComments = action.payload;
    },
  }
})

export default commentsSlice.reducer;