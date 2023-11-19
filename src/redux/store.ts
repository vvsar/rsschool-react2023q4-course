import { combineReducers, configureStore } from "@reduxjs/toolkit/";
import { photosApi } from "./services/photosApi";
import searchDataSlice from "./searchDataSlice";

const rootReducer = combineReducers({
  searchData: searchDataSlice,
  [photosApi.reducerPath]: photosApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(photosApi.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
