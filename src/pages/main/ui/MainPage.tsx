import { FC, useEffect } from 'react';
import { NewsList } from '../../../entities/News';
import { Footer, Link, PanelHeader, PanelHeaderButton, Tooltip } from '@vkontakte/vkui';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks';
import { fetchNewsItems, updateNews} from '../../../entities/News/api/action';
import { Icon28RefreshOutline } from '@vkontakte/icons';
import { newsSlice } from '../../../entities/News/model/slice';

export const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const { news, isLoading, error } = useAppSelector(state => state.newsReducer);
  
  useEffect(() => {
    dispatch(fetchNewsItems());

    return () => {
      dispatch(newsSlice.actions.newsClear());
    }
  }, [])

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
              onClick={() => dispatch(updateNews())}
              disabled={isLoading ? true : false}
            >
              <Icon28RefreshOutline />
            </PanelHeaderButton>
          </Tooltip>
        }
      >Hacker news</PanelHeader>
      <NewsList news={news} isLoading={isLoading} error={error}/>
      <Footer>Developed by <Link href="https://github.com/Montek1o" target="_blank">Montek1o</Link></Footer>
    </>
  );
};
