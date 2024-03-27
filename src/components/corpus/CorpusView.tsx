import {
  Button,
  Listbox,
  ListboxItem,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { Corpus } from './TonalitiesCorpuses'
import { useGetSparqlQueryResultQuery } from 'sherlock-rdf/lib/rtkquery-service-sparql'
import { getCorpusManifestations } from 'sherlock-sparql-queries/lib/corpus'
import { SparqlQueryResultObject_Binding } from 'sherlock-rdf/lib/sparql-result'
import IconWrapper from '../misc/IconWrapper'
import { MdAudioFile } from 'react-icons/md'

type CorpusViewProps = {
  selectedCorpus: Corpus | null
  setSelectedCorpus: (corpus: Corpus | null) => void
}

type Item = {
  url: string
  title: string
  composer: string
}

const populateCorpusFromQuery = (binding: SparqlQueryResultObject_Binding): Item => {
  if (!binding) return { url: '', title: '', composer: '' }
  const [title, composer] = binding.url.value.match(/\/([^/]+)\/[^/]+\/([^/]+)_([^/]+)\.mei$/).slice(2, 3)
  return {
    url: binding.url.value,
    title,
    composer,
  }
}

export const CorpusView = ({ selectedCorpus, setSelectedCorpus }: CorpusViewProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [items, setItems] = useState<Item[]>([])

  const { data } = useGetSparqlQueryResultQuery(getCorpusManifestations(selectedCorpus?.id || ''), {
    skip: !selectedCorpus,
  })

  useEffect(() => {
    if (selectedCorpus) onOpen()
  }, [selectedCorpus])

  useEffect(() => {
    if (!isOpen) setSelectedCorpus(null)
  }, [isOpen])

  useEffect(() => {
    if (data) setItems(data.results.bindings.map(populateCorpusFromQuery))
  }, [data])

  return (
    <Modal {...{ isOpen, onOpenChange }}>
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">{selectedCorpus?.label}</ModalHeader>
            <ModalBody>
              {!data ? (
                <Spinner />
              ) : (
                <Listbox selectionMode="single">
                  {items.map(({ url, composer, title }) => (
                    <ListboxItem
                      key={String(url)}
                      startContent={
                        <IconWrapper className="bg-primary/10 text-primary">
                          <MdAudioFile />
                        </IconWrapper>
                      }
                    >
                      <b>{title}</b>
                      <p className="text-default-500">{composer} composer</p>
                    </ListboxItem>
                  ))}
                </Listbox>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
