import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import { sparqlApi } from 'sherlock-rdf/lib/rtkquery-service-sparql'
import service from './service'

export const store = configureStore({
  reducer: {
    [sparqlApi.reducerPath]: sparqlApi.reducer,
    service: service.reducer,

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sparqlApi.middleware).concat(service.middleware),
})

setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch