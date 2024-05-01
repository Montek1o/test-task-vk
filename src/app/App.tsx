import { AppRoot, Footer, Panel, PanelHeader, View } from "@vkontakte/vkui";
import { MainPage } from "../pages/main";
import './styles/global.css';


function App() {
  return (
    <AppRoot>
      <View activePanel="main">
        <Panel id="main">
          <PanelHeader>Hacker news</PanelHeader>
          <MainPage />
          <Footer>Developed by Montek1o</Footer>
        </Panel>
      </View>
    </AppRoot>
  );
}

export default App;
