import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import type { ResultsState, UserData } from "../types/types";

const initialState: ResultsState = {
  data: [],
};

const detailsSlice = createSlice({
  name: "usersData",
  initialState,
  reducers: {
    saveUsersData: (state, action: PayloadAction<UserData[]>) => {
      state.data = action.payload;
    },
  },
});

export const { saveUsersData } = detailsSlice.actions;
export default detailsSlice.reducer;
