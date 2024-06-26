import ReactDOM from 'react-dom/client';
import bridge from '@vkontakte/vk-bridge';
import App from './app/App';
import '@vkontakte/vkui/dist/vkui.css';

bridge.send('VKWebAppInit');

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(<App />);
