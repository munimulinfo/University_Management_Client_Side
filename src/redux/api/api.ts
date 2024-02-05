import {
  createApi,
  fetchBaseQuery,
  FetchArgs,
  BaseQueryApi,
  DefinitionType,
} from "@reduxjs/toolkit/query/react";

import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import { RootState } from "../store";
import { logOut, setUser } from "../featuers/auth/authSlice";
import { toast } from "sonner";

//customized base Query and every backend data request send accessToken
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

//const baseQuery with Refresh Token

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 404) {
    toast.error("User Not Found");
  }

  //chek unAuthorized user and send cookie refresh token and get new accses Token;
  if (result?.error?.status === 401) {
    // console.log("Acces token fetch user are UnAuthorized");
    const res = await fetch("http://localhost:5000/api/v1/auth/refresh-token", {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    //if Acces token  include result rether set new token state  or not token simply logout
    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;
      api.dispatch(
        setUser({
          user,
          token: data?.data?.accessToken,
        })
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }
  return result;
};

// this is baseApi root
const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});

export default baseApi;
