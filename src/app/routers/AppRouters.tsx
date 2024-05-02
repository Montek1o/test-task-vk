import { Panel, Root, View } from "@vkontakte/vkui";
import { FC } from "react";
import { MainPage } from "../../pages/main";
import { NewsPage } from "../../pages/news";
import { createHashRouter, useActiveVkuiLocation, useGetPanelForView } from "@vkontakte/vk-mini-apps-router";

export const router = createHashRouter([
  {
    path: '/news',
    panel: 'main',
    view: 'default_view',
  },
  {
    path: '/news/:id',
    panel: 'news',
    view: 'default_view',
  },
  {
    path: '/*',
    panel: 'main',
    view: 'default_view',
  },
]);

export const AppRouters: FC = () => {
  const { view: activeView } = useActiveVkuiLocation();
  const activePanel = useGetPanelForView('default_view'); 

  return (
    <Root activeView={activeView as string}>
      <View nav="default_view" activePanel={activePanel as string}>
        <Panel nav="main">
          <MainPage />
        </Panel>
        <Panel nav="news">
          <NewsPage />
        </Panel>
      </View>
    </Root>
  );
};