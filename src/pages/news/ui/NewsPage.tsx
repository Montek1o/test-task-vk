import { Icon24ArrowLeftOutline } from "@vkontakte/icons";
import { Footer, Link, PanelHeader, PanelHeaderButton } from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { DetailedNews } from "../../../entities/DetailedNews";

export const NewsPage = () => {
  const routeNavigator = useRouteNavigator();

  return (
    <>
      <PanelHeader 
        before={
          <PanelHeaderButton className="backButton button" aria-label="backButton">
            <Icon24ArrowLeftOutline style={{cursor: "pointer"}} onClick={() => routeNavigator.back()}/>
          </PanelHeaderButton>
        }
      >Hacker news</PanelHeader>
      <DetailedNews />
      <Footer>Developed by <Link href="https://github.com/Montek1o" target="_blank">Montek1o</Link></Footer>
    </>
  );
};