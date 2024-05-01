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
    dispatch(newsSlice.actions.newsClear());
    let news: INews[] = [];
    const countNews = 100;
    const chunk = 5;
    const newsStoriesIds = await axios.get<number[]>('https://hacker-news.firebaseio.com/v0/newstories.json');

    for (let i = 1; i <= countNews; i++) {
      dispatch(newsSlice.actions.newsFetching());
      const itemId = newsStoriesIds.data[i - 1];
      const item = await axios.get<INews>('https://hacker-news.firebaseio.com/v0/item/' + itemId + '.json');
      news.push(item.data);
      if (i % chunk === 0) {
        dispatch(newsSlice.actions.newsFetchingSuccess(news));
        news = [];
      }
    }
  } catch (e) {
    dispatch(newsSlice.actions.newsFetchingError(getErrorMessage(e)));
  }
}