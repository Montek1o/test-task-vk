import axios from "axios";
import { AppDispatch } from "../../../app/store";
import { INews } from "../model/types";
import { newsSlice } from "../model/slice";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}

export const fetchNews = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(newsSlice.actions.newsFetching());
    const countNews = 100;
    const news: INews[] = [];
    const newsStoriesIds = await axios.get<number[]>('https://hacker-news.firebaseio.com/v0/newstories.json');

    for (let i = 0; i < countNews; i++) {
      const itemId = newsStoriesIds.data[i];
      const item = await axios.get<INews>('https://hacker-news.firebaseio.com/v0/item/' + itemId + '.json');
      news.push(item.data);
    }

    dispatch(newsSlice.actions.newsFetchingSuccess(news));
  } catch (e) {
    dispatch(newsSlice.actions.newsFetchingError(getErrorMessage(e)));
  }
}