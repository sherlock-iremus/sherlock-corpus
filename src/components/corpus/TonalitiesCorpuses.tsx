import { useEffect, useState } from 'react'
import { Card, CardBody, Spinner } from '@nextui-org/react'
import { useGetSparqlQueryResultQuery } from 'sherlock-rdf/lib/rtkquery-service-sparql'
import { SparqlQueryResultObject_Binding } from 'sherlock-rdf/lib/sparql-result'
import { getCorpusByCreator } from 'sherlock-sparql-queries/lib/corpus'
import { CorpusView } from './CorpusView'

export type Corpus = {
  id: string
  label: string
  manifestations: number
}

const createCorpusFromQuery = (binding: SparqlQueryResultObject_Binding): Corpus =>
  binding
    ? {
        id: binding.corpus.value,
        label: binding.label.value,
        manifestations: parseInt(binding.manifestations.value),
      }
    : { id: '', label: '', manifestations: 0 }

export default function TonalitiesCorpuses() {
  const [selectedCorpus, setSelectedCorpus] = useState<Corpus | null>(null)
  const [Corpuses, setCorpuses] = useState<Corpus[]>([])
  const { data } = useGetSparqlQueryResultQuery(
    getCorpusByCreator('http://data-iremus.huma-num.fr/id/56ed1334-b47a-440a-b78d-04c8d3cfc311') // TONALITEAM
  )

  useEffect(() => {
    if (data) setCorpuses(data.results.bindings.map(createCorpusFromQuery))
  }, [data])

  if (!data) return <Spinner />

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 p-4">
      <CorpusView {...{ selectedCorpus, setSelectedCorpus }} />
      {Corpuses.map(corpus => (
        <Card shadow="sm" key={corpus.id} isPressable onPress={() => setSelectedCorpus(corpus)}>
          <CardBody className="text-small justify-between">
            <b>{corpus.label}</b>
            <p className="text-default-500">{corpus.manifestations} items</p>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}
