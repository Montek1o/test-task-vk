import { AdaptivityProvider, AppRoot, ConfigProvider } from "@vkontakte/vkui";
import { FC } from "react";
import { Provider } from "react-redux";
import { setupStore } from "../store";
import { RouterProvider } from "@vkontakte/vk-mini-apps-router";
import { router } from "../routers";

const store = setupStore();

interface IProviders {
  children: JSX.Element
}

export const Providers: FC<IProviders> = ({ children }) => {
  return (
    <ConfigProvider appearance="dark">
      <AdaptivityProvider>
        <AppRoot>
          <Provider store={store}>
            <RouterProvider router={router}>
              {children}
            </RouterProvider>
          </Provider>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};