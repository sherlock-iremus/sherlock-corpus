import * as React from 'react'
import { useGetSparqlQueryResultQuery } from 'sherlock-rdf/lib/rtkquery-service-sparql'
import { useSearchParams } from 'react-router-dom'

export default function TonalitiesCorpuses() {
    console.log(useGetSparqlQueryResultQuery('caca'))
    // const { data, error, isLoading } = useSparqlQuery(`
    // SELECT *
    // WHERE {
    //     GRAPH ?g {
    //         ?s ?p ?o
    //     }
    // }
    // `)

    // const _ = data || error || isLoading
    const _ = 1

    const [searchParams] = useSearchParams();

    return <pre>
        {JSON.stringify(_)}
    </pre>
}