import { combineReducers, configureStore } from "@reduxjs/toolkit/";
import { photosApi } from "./services/photosApi";
import searchDataSlice from "./searchDataSlice";
import detailsSlice from "./detailsSlice";
import loadingsSlice from "./loadingsSlice";

const rootReducer = combineReducers({
  searchData: searchDataSlice,
  detailsData: detailsSlice,
  loadingsData: loadingsSlice,
  [photosApi.reducerPath]: photosApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(photosApi.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
