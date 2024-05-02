import { FC } from 'react';
import { Card, ContentCard } from '@vkontakte/vkui';
import { formatDate } from '../../../../shared/lib/utils';
import { INews } from '../../model/types';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import classes from './NewsItem.module.css';
import { useAppSelector } from '../../../../shared/lib/hooks';

interface NewsItemProps {
  item: INews;
}

export const NewsItem: FC<NewsItemProps> = ({ item }) => {  
  const time = formatDate(item.time);
  const routeNavigator = useRouteNavigator();
  const { isLoading } = useAppSelector(state => state.newsReducer)

  function openNews() {
    if (isLoading) return;
    routeNavigator.push(`/news/${item.id}`)
  }

  return (
    <Card 
      mode="shadow" 
      onClick={openNews}
      className={isLoading ? `${classes.newsItem_disabled} ${classes.newsItem}` : classes.newsItem}
    >
      <ContentCard 
        subtitle={"By " + item.by}
        header={item.title}
        text={item.score > 1 ? "Points " + item.score : "Point " + item.score}
        caption={time}
      />
    </Card>
  );
};
