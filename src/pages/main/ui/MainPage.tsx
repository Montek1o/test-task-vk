import { FC, useEffect, useState } from 'react';
import { NewsList } from '../../../entities/News';
import { Footer, Link, PanelHeader, PanelHeaderButton, Tooltip } from '@vkontakte/vkui';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks';
import { fetchNewsItems, updateNews } from '../../../entities/News/api/action';
import { Icon28RefreshOutline } from '@vkontakte/icons';
import { Timer } from '../../../shared/ui/Timer';


export const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const [timer, setTimer] = useState(60);
  const { news, isLoading, error, ids } = useAppSelector(state => state.newsReducer);

  useEffect(() => {
    if (!news.length) dispatch(fetchNewsItems());

    const interval = setInterval(() => {
      setTimer(timer - 1);
    }, 1_000);

    if (timer === 0) {
      dispatch(updateNews(ids))
      setTimer(60);
    }

    return () => {
      clearInterval(interval);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer])

  return (
    <>
      <PanelHeader 
        after={
          <Tooltip 
            placement="left" 
            text={isLoading ? "Идёт загрузка новостей" : "Обновить новости"}
          >
            <PanelHeaderButton 
              style={{margin: 0}}
              id="refresh-button"
              className='refreshButton button'
              aria-label="refresh news"
              onClick={() => {
                dispatch(updateNews(ids))
                setTimer(60);
              }}
              disabled={isLoading ? true : false}
            >
              <Icon28RefreshOutline />
            </PanelHeaderButton>
          </Tooltip>
        }
      >Hacker news</PanelHeader>
      <Timer timer={timer}/>
      <NewsList news={news} isLoading={isLoading} error={error}/>
      <Footer>Developed by <Link href="https://github.com/Montek1o" target="_blank">Montek1o</Link></Footer>
    </>
  );
};
