import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/react'
import { useEffect } from 'react'
import { Project } from './MyProjects'
import { getUuid, getIri } from '../../utils'
import { getProjectsByCreator } from 'sherlock-sparql-queries/lib/projects'
import { useDeleteProjectMutation, useGetUserIdQuery } from '../../service'
import { useGetFlattenedSparqlQueryResultQuery } from '../../sparql'

type ProjectViewProps = {
  selectedProject: Project | null
  setSelectedProject: (project: Project | null) => void
}

export const ProjectView = ({ selectedProject, setSelectedProject }: ProjectViewProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { data: userId } = useGetUserIdQuery(0)
  const { refetch } = useGetFlattenedSparqlQueryResultQuery(getProjectsByCreator(getIri(userId)), {
    skip: !userId,
  })
  const [deleteProject] = useDeleteProjectMutation()

  const removeProject = async () => {
    if (selectedProject)
      try {
        await deleteProject(getUuid(selectedProject.id))
      } catch (error) {
        console.error(error)
      } finally {
        refetch()
        onOpenChange()
      }
  }

  useEffect(() => {
    if (selectedProject) onOpen()
  }, [selectedProject])

  useEffect(() => {
    if (!isOpen) setSelectedProject(null)
  }, [isOpen])

  return (
    <Modal {...{ isOpen, onOpenChange }}>
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">{selectedProject?.label}</ModalHeader>
            <ModalBody></ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={removeProject}>
                Delete
              </Button>
              <Button variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
