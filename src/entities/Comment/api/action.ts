import axios from "axios";
import { AppDispatch } from "../../../app/store";
import { commentsSlice } from "../model/slice";
import { IComment } from "../model/types";
import { getErrorMessage } from "../../../shared/lib/utils";
import { IDetailedNews } from "../../DetailedNews/model/types";

export const fetchComments = (ids: number[]) => async (dispatch: AppDispatch) => {
  try {
    dispatch(commentsSlice.actions.commentsFetching());
    const comments = [];
    for (let i = 0; i < ids.length; i++) {
      const response = await axios.get<IComment>('https://hacker-news.firebaseio.com/v0/item/' + ids[i] + '.json');
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

export const updateComments = (parentId: number) => async (dispatch: AppDispatch) => {
  const response = await axios.get<IDetailedNews>('https://hacker-news.firebaseio.com/v0/item/' + parentId + '.json');
  dispatch(fetchComments(response.data.kids));
}