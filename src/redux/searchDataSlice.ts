import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import type { SearchState } from "../types/types";

const initialSearchValue = localStorage.getItem("keyWord") || "";
const initialPerPageValue = localStorage.getItem("perPage") || "4";
const initialCurrentPageValue = localStorage.getItem("currentPage") || "1";

const initialState: SearchState = {
  keyWord: initialSearchValue,
  perPage: initialPerPageValue,
  currentPage: initialCurrentPageValue,
};

const searchDataSlice = createSlice({
  name: "searchData",
  initialState,
  reducers: {
    saveSearchValue: (state, action: PayloadAction<string>) => {
      state.keyWord = action.payload;
    },
    savePerPageValue: (state, action: PayloadAction<string>) => {
      state.perPage = action.payload;
    },
    saveCurrentPageValue: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { saveSearchValue, savePerPageValue, saveCurrentPageValue } =
  searchDataSlice.actions;
export default searchDataSlice.reducer;
