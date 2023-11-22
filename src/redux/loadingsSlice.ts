import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import type { LoadingsState } from "../types/types";

const initialState: LoadingsState = {
  resultsLoading: "idle",
  detailsLoading: "idle",
};

const resultsSlice = createSlice({
  name: "loadingsData",
  initialState,
  reducers: {
    saveResultsLoadingStatus: (state, action: PayloadAction<string>) => {
      state.resultsLoading = action.payload;
    },
    saveDetailsLoadingStatus: (state, action: PayloadAction<string>) => {
      state.detailsLoading = action.payload;
    },
  },
});

export const { saveResultsLoadingStatus, saveDetailsLoadingStatus } =
  resultsSlice.actions;
export default resultsSlice.reducer;
