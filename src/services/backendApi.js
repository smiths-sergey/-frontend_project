import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = window.location.origin;

export const backendApi = createApi({
  reducerPath: "backendApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/api` }),
  endpoints: (builder) => ({
    getSearchLoaclities: builder.query({
      query: (params) => ({
        url: "searchLoaclities",
        params,
      }),
    }),
    getPollutionDataByLocalityId: builder.query({
      query: (id) => ({
        url: `getPollutionData/${id}`,
      }),
    }),
  }),
});

export const {
  useGetSearchLoaclitiesQuery,
  useGetPollutionDataByLocalityIdQuery,
} = backendApi;

export const backendApiUnprotected = createApi({
  reducerPath: "backendApiUnprotected",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}/api_1` }),
  endpoints: (builder) => ({
    register: builder.query({
      query: (body) => ({
        url: "register",
        method: "post",
        data: body,
      }),
    }),
  }),
});

export const { useRegisterQuery } = backendApiUnprotected;
