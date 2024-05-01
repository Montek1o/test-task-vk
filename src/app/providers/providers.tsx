import { AdaptivityProvider, ConfigProvider } from "@vkontakte/vkui";
import { FC } from "react";
import { Provider } from "react-redux";
import { setupStore } from "../store";

const store = setupStore();

interface IProviders {
  children: JSX.Element
}

export const Providers: FC<IProviders> = ({ children }) => {
  return (
    <ConfigProvider appearance="dark">
      <AdaptivityProvider>
        <Provider store={store}>
          {children}
        </Provider>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};