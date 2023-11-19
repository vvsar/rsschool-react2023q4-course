import { createSlice } from "@reduxjs/toolkit";
// import { useSearchParams } from "react-router-dom";
import type { SearchState } from "../types/types";

// export interface DispatchSearch {
//   payload: string;
//   type: "search/saveSearchValue";
// }

// const [searchParams] = useSearchParams();
const initialSearchValue = localStorage.getItem("keyWord") || "";
const initialPerPageValue = localStorage.getItem("perPage") || "4";

const initialState: SearchState = {
  keyWord: initialSearchValue,
  perPage: initialPerPageValue,
};

const searchDataSlice = createSlice({
  name: "searchData",
  initialState,
  reducers: {
    saveSearchValue: (state, action): void => {
      state.keyWord = action.payload;
    },
    savePerPageValue: (state, action): void => {
      state.perPage = action.payload;
    },
  },
});

export const { saveSearchValue, savePerPageValue } = searchDataSlice.actions;
export default searchDataSlice.reducer;
