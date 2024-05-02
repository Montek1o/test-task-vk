import axios from "axios";
import { AppDispatch } from "../../../app/store";
import { INews } from "../model/types";
import { newsSlice } from "../model/slice";
import { getErrorMessage } from "../../../shared/lib/utils";

export const fetchNewsItems = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(newsSlice.actions.newsFetching());
    const countNews = 100;
    const newsStoriesIds = await axios.get<number[]>('https://hacker-news.firebaseio.com/v0/newstories.json');
    for (let i = 0; i < countNews; i++) {
      const response = await axios.get<INews>('https://hacker-news.firebaseio.com/v0/item/' + newsStoriesIds.data[i] + '.json');
      dispatch(newsSlice.actions.newsAddItem(response.data));
    }
    dispatch(newsSlice.actions.newsFetchingSuccess());
  } catch(e) {
    dispatch(newsSlice.actions.newsFetchingError(getErrorMessage(e)));
  }
}

export const updateNews = () => async (dispatch: AppDispatch) => {
  dispatch(newsSlice.actions.newsClear());
  dispatch(fetchNewsItems());
}