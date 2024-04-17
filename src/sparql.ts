// https://redux-toolkit.js.org/rtk-query/usage/queries

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { SparqlQueryResultObject, SparqlQueryResultObject_Binding } from 'sherlock-rdf/lib/sparql-result'

export const BASE_SPARQL_URL = import.meta.env.DEV
  ? 'http://localhost:3030/iremus'
  : 'https://data-iremus.huma-num.fr/sparql/'

export const sparqlApi = createApi({
  reducerPath: 'sparqlApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_SPARQL_URL,
  }),
  endpoints: builder => ({
    getFlattenedSparqlQueryResult: builder.query<any[], string>({
      query: (query: string) => ({
        url: '',
        method: 'POST',
        body: new URLSearchParams({ query }),
      }),
      transformResponse: (response: SparqlQueryResultObject) =>
        response.results.bindings.map((binding: SparqlQueryResultObject_Binding) =>
          Object.fromEntries(Object.entries(binding).map(([key, { value }]) => [key, value]))
        ),
    }),
  }),
})

export const { useGetFlattenedSparqlQueryResultQuery } = sparqlApi
