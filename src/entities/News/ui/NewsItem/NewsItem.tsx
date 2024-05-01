import { FC } from 'react';
import { INews } from '../../model/types';
import { Card, ContentCard } from '@vkontakte/vkui';
import { formatDate } from '../../../../shared/lib/utils';

interface NewsItemProps {
  news: INews;
}

export const NewsItem: FC<NewsItemProps> = ({ news }) => {
  const time = formatDate(news.time);

  return (
    <Card mode="shadow">
      <ContentCard 
        subtitle={"By " + news.by}
        header={news.title}
        text={news.score > 1 ? "Points " + news.score : "Point " + news.score}
        caption={time}
      />
    </Card>
  );
};
