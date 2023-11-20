import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import type { DetailsState } from "../types/types";

const initialState: DetailsState = {
  isOpen: false,
  id: "",
};

const detailsSlice = createSlice({
  name: "detailsData",
  initialState,
  reducers: {
    saveOpenStatus: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    saveId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
  },
});

export const { saveOpenStatus, saveId } = detailsSlice.actions;
export default detailsSlice.reducer;
