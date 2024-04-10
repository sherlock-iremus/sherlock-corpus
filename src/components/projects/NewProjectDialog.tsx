import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { useState } from 'react'
import { sparqlApi } from 'sherlock-rdf/lib/rtkquery-service-sparql'
import { getIri } from '../../utils'
import { getProjectsByCreator } from 'sherlock-sparql-queries/lib/projects'
import { useGetUserIdQuery, usePostProjectMutation } from '../../service'

type NewProjectDialogProps = {
  isOpen: boolean
  onOpenChange: () => void
}

export const NewProjectDialog = ({ isOpen, onOpenChange }: NewProjectDialogProps) => {
  const { data: userId } = useGetUserIdQuery(0)
  const [label, setLabel] = useState('')
  const { refetch } = sparqlApi.endpoints.getFlattenedSparqlQueryResult.useQuery(getProjectsByCreator(getIri(userId)), {
    skip: !userId,
  })
  const [postProject] = usePostProjectMutation()

  const createProject = async () => {
    if (label.length > 0)
      try {
        await postProject({ label })
      } catch (error) {
        console.error(error)
      } finally {
        refetch()
        onOpenChange()
      }
  }

  return (
    <Modal {...{ isOpen, onOpenChange }} placement="top-center">
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">Create new project</ModalHeader>
            <ModalBody>
              <Input
                value={label}
                onValueChange={setLabel}
                autoFocus
                label="Label"
                placeholder="Enter your project label"
                variant="bordered"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" variant="light" onPress={createProject} disabled={!label.length}>
                Create project
              </Button>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
