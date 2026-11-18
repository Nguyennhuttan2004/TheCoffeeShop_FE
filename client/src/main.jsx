import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import store from "../store/store.js";
import { Provider } from "react-redux";
import { Toaster } from "./components/ui/toaster.jsx";
import { ThemeProvider } from "./context/theme-context.jsx";
import { LanguageProvider } from "./context/language-context.jsx";


createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </ThemeProvider>
      <Toaster />
    </BrowserRouter>
  </Provider>
);
