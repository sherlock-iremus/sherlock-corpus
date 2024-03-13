import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { sparqlApi } from 'sherlock-rdf/lib/rtkquery-service-sparql'

export const store = configureStore({
  reducer: {
    [sparqlApi.reducerPath]: sparqlApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sparqlApi.middleware),
})

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch