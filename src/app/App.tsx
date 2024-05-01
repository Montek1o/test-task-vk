import { AppRoot, Footer, Link, Panel, PanelHeader, PanelHeaderButton, View } from "@vkontakte/vkui";
import { MainPage } from "../pages/main";
import { Icon28RefreshOutline } from "@vkontakte/icons";
import { useAppDispatch, useAppSelector } from "../shared/lib/hooks";
import { fetchNews } from "../entities/News/api/action";
import "./styles/global.css";


function App() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(state => state.newsReducer);

  return (
    <AppRoot>
      <View activePanel="main">
        <Panel id="main">
          <PanelHeader 
            after={
              <PanelHeaderButton 
                className='refreshButton'
                aria-label="refresh news"
                onClick={() => dispatch(fetchNews())}
                disabled={isLoading ? true : false}
              >
                <Icon28RefreshOutline />
              </PanelHeaderButton>
            }
          >Hacker news</PanelHeader>
          <MainPage />
          <Footer>Developed by <Link href="https://github.com/Montek1o" target="_blank">Montek1o</Link></Footer>
        </Panel>
      </View>
    </AppRoot>
  );
}

export default App;
