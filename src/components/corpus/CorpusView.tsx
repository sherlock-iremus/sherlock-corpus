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
import { useGetFlattenedSparqlQueryResultQuery } from 'sherlock-rdf/lib/rtkquery-service-sparql'
import { getCorpusManifestations } from 'sherlock-sparql-queries/lib/corpus'
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

// WORKAROUND WHILE TITLE AND COMPOSER ARE NOT IN THE TRIPLESTORE
const harvestMetadatas = ({ url }: Item): Item => {
  const metadatas = url.split('/')
  const title = metadatas.pop()?.split('.')[0].replaceAll('_', ' ') || 'unknown title'
  const composer = metadatas.pop()?.replaceAll('_', ' ') || 'unknown composer'

  return { url, title: title.replace(composer, ''), composer }
}

export const CorpusView = ({ selectedCorpus, setSelectedCorpus }: CorpusViewProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [items, setItems] = useState<Item[]>([])

  const { data } = useGetFlattenedSparqlQueryResultQuery(getCorpusManifestations(selectedCorpus?.id || ''), {
    skip: !selectedCorpus,
  })

  useEffect(() => {
    if (selectedCorpus) onOpen()
  }, [selectedCorpus])

  useEffect(() => {
    if (!isOpen) setSelectedCorpus(null)
  }, [isOpen])

  useEffect(() => {
    if (data) setItems(data.map(harvestMetadatas))
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
                      key={url}
                      textValue={title}
                      startContent={
                        <IconWrapper className="bg-primary/10 text-primary">
                          <MdAudioFile aria-label="test" />
                        </IconWrapper>
                      }
                    >
                      <b>{title}</b>
                      <p className="text-default-500">{composer}</p>
                    </ListboxItem>
                  ))}
                </Listbox>
              )}
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose} aria-label="close">
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
