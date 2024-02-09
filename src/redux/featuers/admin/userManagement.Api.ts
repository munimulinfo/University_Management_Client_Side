import { TQueryParam, TResponseRedux, TStudent } from "../../../types";
import baseApi from "../../api/api";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    //Get all Student with Filtaring
    getAllStudents: builder.query({
      query: (args) => {
        console.log(args);
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }

        return {
          url: "/students",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    // get All Faculties
    getAllFaculties: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParam) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/faculties",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: TResponseRedux<TStudent[]>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    //Get Single Student with Specific id
    getSingleStudent: builder.query({
      query: (id) => {
        return {
          url: `/students/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TStudent>) => {
        return {
          data: response.data,
        };
      },
    }),

    //add student
    addStudent: builder.mutation({
      query: (data) => {
        return {
          url: "/users/create-student",
          method: "POST",
          body: data,
        };
      },
    }),

    //**********End poin end Brackets************ */
  }),
});

export const {
  useAddStudentMutation,
  useGetAllStudentsQuery,
  useGetSingleStudentQuery,
  useGetAllFacultiesQuery,
} = userManagementApi;
