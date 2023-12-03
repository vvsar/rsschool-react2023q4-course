import { configureStore } from "@reduxjs/toolkit/";
import usersDataSlice from "./usersDataSlice";

export const store = configureStore({
  reducer: usersDataSlice,
});

export type AppState = ReturnType<typeof store.getState>;
