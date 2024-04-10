import { useEffect, useState } from 'react'
import { Button, Card, CardBody, Spinner, Tooltip, useDisclosure } from '@nextui-org/react'
import { sparqlApi } from 'sherlock-rdf/lib/rtkquery-service-sparql'
import { useGetUserIdQuery } from '../../service'
import { getProjectsByCreator } from 'sherlock-sparql-queries/lib/projects'
import { getIri } from '../../utils'
import { ProjectView } from './ProjectView'
import { IoAdd } from 'react-icons/io5'
import { NewProjectDialog } from './NewProjectDialog'

export type Project = {
  id: string
  label: string
  annotations: number
}

export default function MyProjects() {
  const { data: userId } = useGetUserIdQuery(0)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const { data } = sparqlApi.endpoints.getFlattenedSparqlQueryResult.useQuery(getProjectsByCreator(getIri(userId)), {
    skip: !userId,
  })
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    if (data) setProjects(data)
  }, [data])

  if (!data) return <Spinner />

  return (
    <>
      <div className="flex items-center justify-between px-4">
        <h2>My Projects</h2>
        <Tooltip content="Create a new project">
          <Button isIconOnly color="primary" variant="flat" aria-label="Add" onPress={onOpen}>
            <IoAdd />
          </Button>
        </Tooltip>
      </div>
      <div className="flex-1 gap-2 grid grid-cols-2 sm:grid-cols-4 p-4">
        {projects.map(project => (
          <Card shadow="sm" key={project.id} isPressable onPress={() => setSelectedProject(project)}>
            <CardBody className="text-small justify-between">
              <b>{project.label}</b>
              <p className="text-default-500">{project.annotations} annotations</p>
            </CardBody>
          </Card>
        ))}
      </div>
      <ProjectView {...{ selectedProject, setSelectedProject }} />
      <NewProjectDialog {...{ isOpen, onOpenChange }} />
    </>
  )
}
