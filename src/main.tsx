import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryProvider, ThemeProvider } from "contexts";
import { ReactToastifyProvider } from "contexts/ReactToastifyProvider.tsx";
import { Provider } from "react-redux";
import { store } from "store";
import './assets/variables.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
  

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <ReactToastifyProvider>
    <BrowserRouter>
      <Provider store={store}>
        <ReactQueryProvider>
          <App />
        </ReactQueryProvider>
      </Provider>
    </BrowserRouter>
    </ReactToastifyProvider>
  </ThemeProvider>
);
