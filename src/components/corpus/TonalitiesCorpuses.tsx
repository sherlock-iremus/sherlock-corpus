import * as React from 'react'
import { useGetSparqlQueryResultQuery } from 'sherlock-rdf/lib/rtkquery-service-sparql'
import { useSearchParams } from 'react-router-dom'
import { SparqlQueryResultObject } from 'sherlock-rdf/lib/sparql-result'

export default function TonalitiesCorpuses() {
  const { data, error, isLoading } = useGetSparqlQueryResultQuery(`
    SELECT * WHERE {
        GRAPH <http://data-iremus.huma-num.fr/graph/tonalities-projects-and-corpuses> {
          ?s ?p ?o .
        }
      }
    `)

  const _ = data || error || isLoading

  return <pre className=' whitespace-break-spaces'>
    {JSON.stringify(_)}
  </pre>
}