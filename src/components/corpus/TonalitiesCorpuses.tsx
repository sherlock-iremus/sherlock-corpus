import { useEffect, useState } from 'react'
import { Card, CardBody, Spinner } from '@nextui-org/react'
import { getCorpusByCreator } from 'sherlock-sparql-queries/lib/corpus'
import { CorpusView } from './CorpusView'
import { TONALITEAM, getIri } from '../../utils'
import { useGetFlattenedSparqlQueryResultQuery } from '../../sparql'

export type Corpus = {
  id: string
  label: string
  manifestations: number
}

export default function TonalitiesCorpuses() {
  const [selectedCorpus, setSelectedCorpus] = useState<Corpus | null>(null)
  const [corpus, setCorpuses] = useState<Corpus[]>([])
  const { data } = useGetFlattenedSparqlQueryResultQuery(getCorpusByCreator(getIri(TONALITEAM)))

  useEffect(() => {
    if (data) setCorpuses(data)
  }, [data])

  if (!data) return <Spinner />

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 p-4">
      <CorpusView {...{ selectedCorpus, setSelectedCorpus }} />
      {corpus.map(corpus => (
        <Card key={corpus.id} shadow="sm" isPressable onPress={() => setSelectedCorpus(corpus)}>
          <CardBody className="text-small justify-between">
            <b>{corpus.label}</b>
            <p className="text-default-500">{corpus.manifestations} items</p>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}
