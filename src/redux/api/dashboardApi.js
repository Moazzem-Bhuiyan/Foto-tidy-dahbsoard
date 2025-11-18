import { baseApi } from "./baseApi";

const dashBoardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: ({ earningCurrentYear, userCurrentYear }) => ({
        url: `/meta?earning_year=${earningCurrentYear}&user_year=${userCurrentYear}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashBoardApi;
