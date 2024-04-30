import { AppRoot, CardGrid, Group, Header, Panel, PanelHeader, View } from "@vkontakte/vkui";
import './styles/global.css';

function App() {
  return (
    <AppRoot>
      <View activePanel="main">
        <Panel id="main">
          <PanelHeader>Hacker news</PanelHeader>
          <Group
            mode="card" 
            header={<Header>В мире</Header>}
          >
            <CardGrid size="s"> 
              123
            </CardGrid>
          </Group>
        </Panel>
      </View>
    </AppRoot>
  );
}

export default App;
