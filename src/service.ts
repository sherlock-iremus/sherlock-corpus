import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const BASE_API_URL = import.meta.env.DEV ? 'http://localhost:5555/' : 'https://data-iremus.huma-num.fr/'

export const service = createApi({
  reducerPath: 'service',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_API_URL + 'sherlock/', credentials: 'include' }),
  endpoints: builder => ({
    getUserId: builder.query({ query: () => ({ url: 'api/' }) }),
    logOut: builder.mutation({ query: () => ({ url: 'logout/', method: 'POST' }) }),
    putUser: builder.mutation({ query: body => ({ url: 'api/user/config', method: 'PUT', body }) }),
    postProject: builder.mutation({ query: body => ({ url: 'api/analytical-project', method: 'POST', body }) }),
    deleteProject: builder.mutation({ query: iri => ({ url: `api/analytical-project/${iri}`, method: 'DELETE' }) }),
  }),
})

export default service

export const {
  useGetUserIdQuery,
  useLogOutMutation,
  usePutUserMutation,
  usePostProjectMutation,
  useDeleteProjectMutation,
} = service
