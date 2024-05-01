import { Group, Spinner } from '@vkontakte/vkui';
import { FC, useEffect  } from 'react';
import classes from './NewsList.module.css';
import { useAppDispatch, useAppSelector } from '../../../../shared/lib/hooks';
import { fetchNews } from '../../api/action';
import { NewsItem } from '../NewsItem/NewsItem';

export const NewsList: FC = () => {
  const dispatch = useAppDispatch();
  const {news, isLoading, error} = useAppSelector(state => state.newsReducer);

  useEffect(() => {
    dispatch(fetchNews());
  }, [])

  if (isLoading) return <Spinner />
  if (error) return <div>Ошибка! {error}</div>

  return (
    <Group className={classes.newsList}>
      {news.map((item) => 
        <NewsItem news={item} key={item.id} />
      )}
    </Group>
  );
};
