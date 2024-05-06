import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "contexts";
import { ReactToastifyProvider } from "contexts/ReactToastifyProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <ReactToastifyProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ReactToastifyProvider>
  </ThemeProvider>
);
