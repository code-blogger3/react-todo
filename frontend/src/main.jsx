import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
// import { persistor, store } from "./redux/store.js";
// import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "./components/theme-provider.jsx";
import { store } from "./redux/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <App />
      </ThemeProvider>
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>
);
