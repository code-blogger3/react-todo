import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todo/todoSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ todo: todoReducer });

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: rootReducer,
  // reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// export const persistor = persistStore(store);
