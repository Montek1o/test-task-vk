import { useParams } from "@vkontakte/vk-mini-apps-router";
import { Div, Link, Spinner, Title } from "@vkontakte/vkui";
import { useEffect } from "react";
import { fetchDetailedNews } from "../api/action";
import { useAppDispatch, useAppSelector } from "../../../shared/lib/hooks";
import { formatDate } from "../../../shared/lib/utils";
import { CommentList } from "../../Comment";
import classes from './DetailedNews.module.css'; 
import { detailedNewsSlice } from "../model/slice";
import { commentsSlice } from "../../Comment/model/slice";

export const DetailedNews = () => {
  const params = useParams();
  const idNews = params?.id;
  const dispatch = useAppDispatch();
  const { detailedNews, isLoading, error } = useAppSelector(state => state.detailedNewsReducer);


  useEffect(() => {
    if (idNews) dispatch(fetchDetailedNews(idNews));
  
    return () => {
      dispatch(detailedNewsSlice.actions.clearDetailedNews());
      dispatch(commentsSlice.actions.clearComments());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idNews])

  if (isLoading) return <Spinner />
  if (error) return <div>Ошибка! {error}</div>

  return (
      <Div>
        <div className={classes.detailedNews__header}>
          <p>Author: {detailedNews.by}</p>
          <p>{formatDate(detailedNews.time)}</p>
        </div>
        <Title>{detailedNews.title}</Title>
        <Link href={detailedNews.url} target="_blank">{detailedNews.url}</Link>
        {!isLoading && 
          <CommentList parent={detailedNews} />
        }
      </Div>
    
  );
};