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
    dispatch(newsSlice.actions.newsIdsFetching(newsStoriesIds.data));
    for (let i = 0; i < countNews; i++) {
      const response = await axios.get<INews>('https://hacker-news.firebaseio.com/v0/item/' + newsStoriesIds.data[i] + '.json');
      dispatch(newsSlice.actions.newsAddItem(response.data));
    }
    dispatch(newsSlice.actions.newsFetchingSuccess());
  } catch(e) {
    dispatch(newsSlice.actions.newsFetchingError(getErrorMessage(e)));
  }
}

export const updateNews = (oldIds: number[]) => async (dispatch: AppDispatch) => {
  try {
    dispatch(newsSlice.actions.newsFetching());
    const newsStoriesIds = await axios.get<number[]>('https://hacker-news.firebaseio.com/v0/newstories.json');
    const newsIds = newsStoriesIds.data;
    const updateIds = newsIds.filter((val) => {
      return oldIds.indexOf(val) === -1;
    })

    if (updateIds.length) {
      for (let i = 0; i < updateIds.length; i++) {
        const response = await axios.get<INews>('https://hacker-news.firebaseio.com/v0/item/' + updateIds[updateIds.length - i - 1] + '.json');
        dispatch(newsSlice.actions.updateNews(response.data));
      }
      dispatch(newsSlice.actions.newsIdsFetching(newsIds));
    } 
    dispatch(newsSlice.actions.newsFetchingSuccess());
  } catch (e) {
    dispatch(newsSlice.actions.newsFetchingError(getErrorMessage(e)));
  }
}