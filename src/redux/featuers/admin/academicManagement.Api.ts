import { TResponseRedux } from "../../../types";
import { TAcademicSemester } from "../../../types/academicManagement.type";
import baseApi from "../../api/api";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSemester: builder.query({
      query: () => {
        return {
          url: "/academic-semesters",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        console.log(response, "inside redux");
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),
    addAcademicSemester: builder.mutation({
      query: (data) => {
        return {
          url: "/academic-semesters/create-academic-semester",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useAddAcademicSemesterMutation,
  useGetAllAcademicSemesterQuery,
} = academicManagementApi;
