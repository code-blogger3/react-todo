import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
// import { persistor, store } from "./redux/store.js";
// import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "./components/theme-provider.jsx";
import { store } from "./redux/store.js";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <App />
        </ThemeProvider>
      </QueryClientProvider>
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>
);
