const { baseApi } = require("./baseApi");

const pakageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPackages: builder.query({
      query: () => ({
        url: `/packages`,
        method: "GET",
      }),
      providesTags: ["package"],
    }),

    // update package api can be added here
    updatePakage: builder.mutation({
      query: ({ id, data }) => ({
        url: `/packages/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["package"],
    }),
  }),
});
export const { useGetAllPackagesQuery, useUpdatePakageMutation } = pakageApi;
