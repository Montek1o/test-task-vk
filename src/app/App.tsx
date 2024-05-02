import { Providers } from "./providers";
import { AppRouters } from "./routers";
import "./styles/global.css";

function App() {
  return (
    <Providers>
      <AppRouters /> 
    </Providers>
  );
}

export default App;
