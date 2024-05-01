import { FC } from 'react';
import { Card, ContentCard } from '@vkontakte/vkui';
import { formatDate } from '../../../../shared/lib/utils';
import { INews } from '../../model/types';

interface NewsItemProps {
  item: INews;
}

export const NewsItem: FC<NewsItemProps> = ({ item }) => {  
  const time = formatDate(item.time);

  return (
    <Card mode="shadow">
      <ContentCard 
        subtitle={"By " + item.by}
        header={item.title}
        text={item.score > 1 ? "Points " + item.score : "Point " + item.score}
        caption={time}
      />
    </Card>
  );
};
