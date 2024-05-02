import { Group, Spinner } from '@vkontakte/vkui';
import { FC } from 'react';
import classes from './NewsList.module.css';
import { NewsItem } from '../NewsItem/NewsItem';
import { INews } from '../../model/types';

interface NewsListProps {
  news: INews[];
  isLoading: boolean;
  error: string;
}

export const NewsList: FC<NewsListProps> = ({ news, isLoading, error }) => {
  if (error) return <div>Ошибка! {error}</div>

  return (
    <Group className={classes.newsList}>
      {news.map((item) => 
        <NewsItem 
          item={item} 
          key={item.id}
        />
      )}
      {isLoading && <Spinner />}
    </Group>
  );
};
