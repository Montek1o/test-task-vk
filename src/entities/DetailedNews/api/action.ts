import axios from "axios";
import { AppDispatch } from "../../../app/store";
import { detailedNewsSlice } from "../model/slice";
import { IDetailedNews } from "../model/types";
import { getErrorMessage } from "../../../shared/lib/utils";

export const fetchDetailedNews = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(detailedNewsSlice.actions.detailedNewsFetching());
    const response = await axios.get<IDetailedNews>('https://hacker-news.firebaseio.com/v0/item/' + id + '.json');
    dispatch(detailedNewsSlice.actions.detailedNewsFetchingSuccess(response.data));
  } catch (e) {
    dispatch(detailedNewsSlice.actions.detailedNewsFetchingError(getErrorMessage(e)));
  }
}