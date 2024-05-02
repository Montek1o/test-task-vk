import axios from "axios";
import { AppDispatch } from "../../../app/store";
import { commentsSlice } from "../model/slice";
import { IComment } from "../model/types";
import { getErrorMessage } from "../../../shared/lib/utils";

export const fetchComments = (ids: number[]) => async (dispatch: AppDispatch) => {
  try {
    dispatch(commentsSlice.actions.commentsFetching());
    const comments = [];
    for (let i = 0; i < ids.length; i++) {
      const response = await axios.get<IComment>('https://hacker-news.firebaseio.com/v0/item/' + ids[i] + '.json');
      // console.log(response.data);
      if (response.data.dead !== true && response.data.deleted !== true) {
        comments.push(response.data);
      }
    }
    dispatch(commentsSlice.actions.commentsFetchingSuccess(comments));
    dispatch(commentsSlice.actions.defineCountComments(comments.length));
  } catch (e) {
    dispatch(commentsSlice.actions.commentsFetchingError(getErrorMessage(e)));
  }
}