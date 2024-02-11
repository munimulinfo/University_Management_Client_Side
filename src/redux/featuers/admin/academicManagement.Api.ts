import { TQueryParam, TResponseRedux } from "../../../types";
import {
  TAcademicDepartment,
  TAcademicFaculty,
  TAcademicSemester,
} from "../../../types/academicManagement.type";
import baseApi from "../../api/api";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //get All Academic Semester with Filtaring
    getAllAcademicSemester: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["academic-semster"],
      transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {
        return {
          data: response?.data,
          meta: response?.data,
        };
      },
    }),
    //get single Academic Semester with Specific id
    getSingleAcademicSemester: builder.query({
      query: (id) => {
        return {
          url: `/academic-semesters/${id}`,
          method: "GET",
        };
      },
      providesTags: ["academic-semster"],
      // transformResponse: (response: TResponseRedux<TAcademicSemester>) => {
      //   return {
      //     data: response?.data,
      //   };
      // },
    }),
    //update Academic SEmester
    updateAcademicSemester: builder.mutation({
      query: (args) => {
        return {
          url: `/academic-semesters/${args?.id}`,
          method: "PATCH",
          body: args?.data,
        };
      },
      invalidatesTags: ["academic-semster"],
    }),
    // Add Academic Semester
    addAcademicSemester: builder.mutation({
      query: (data) => {
        return {
          url: "/academic-semesters/create-academic-semester",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["academic-semster"],
    }),
    //Get All Academic Faculty
    getAcademicFaculties: builder.query({
      query: () => {
        return { url: "/academic-faculties", method: "GET" };
      },
      transformResponse: (response: TResponseRedux<TAcademicFaculty[]>) => {
        return {
          data: response?.data,
          meta: response?.data,
        };
      },
    }),
    //Add Academic Faculty
    addAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
    }),
    //Get All Academic Depertment
    getAcademicDepartments: builder.query({
      query: () => {
        return { url: "/academic-departments", method: "GET" };
      },
      transformResponse: (response: TResponseRedux<TAcademicDepartment[]>) => {
        return {
          data: response?.data,
          meta: response?.data,
        };
      },
    }),
    //Add Academic Depertment
    addAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic-departments/create-academic-department",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useAddAcademicSemesterMutation,
  useGetAllAcademicSemesterQuery,
  useAddAcademicDepartmentMutation,
  useGetAcademicDepartmentsQuery,
  useAddAcademicFacultyMutation,
  useGetAcademicFacultiesQuery,
  useGetSingleAcademicSemesterQuery,
  useUpdateAcademicSemesterMutation,
} = academicManagementApi;
