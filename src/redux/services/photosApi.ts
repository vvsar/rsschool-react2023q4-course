import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  SearchData,
  DataItem,
  DataItemExtended,
  ResponseData,
} from "../../types/types";

const CLIENT_ID = "cfdYGk4NiOtEue__iSqawbVIwnqHm03dnyVqT6cLXLg";
const basicUrl = "https://api.unsplash.com/";

export const photosApi = createApi({
  reducerPath: "photosApi",
  baseQuery: fetchBaseQuery({ baseUrl: basicUrl }),
  endpoints: (builder) => ({
    getRandomPage: builder.query<DataItem[], string>({
      query: (perPage) =>
        `photos/random?count=${perPage}&client_id=${CLIENT_ID}`,
      // transformResponse: (response) => response.json,
    }),
    getResultsPage: builder.query<ResponseData, SearchData>({
      query: (data) =>
        `search/photos?query=${data.keyWord}&page=${data.currentPage}&per_page=${data.perPage}&client_id=${CLIENT_ID}`,
    }),
    getPhoto: builder.query<DataItemExtended, string>({
      query: (id) => `photos/${id}/?client_id=${CLIENT_ID}`,
    }),
  }),
});

export const {
  useGetRandomPageQuery,
  useGetResultsPageQuery,
  useGetPhotoQuery,
} = photosApi;
