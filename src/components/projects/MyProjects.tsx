import { useEffect, useState } from 'react'
import { Card, CardBody, Spinner } from '@nextui-org/react'
import { useGetSparqlQueryResultQuery } from 'sherlock-rdf/lib/rtkquery-service-sparql'
import { SparqlQueryResultObject_Binding } from 'sherlock-rdf/lib/sparql-result'
import { useGetUserIdQuery } from '../../service'
import { getProjectsByCreator } from 'sherlock-sparql-queries/lib/projects'
import { getIri } from '../../utils'
import { ProjectView } from './ProjectView'

export type Project = {
  id: string
  label: string
  annotations: number
}

const createProjectFromQuery = (binding: SparqlQueryResultObject_Binding): Project =>
  binding
    ? {
        id: binding.project.value,
        label: binding.label.value,
        annotations: parseInt(binding.annotations.value),
      }
    : { id: '', label: '', annotations: 0 }

export default function MyProjects() {
  const { data: userId } = useGetUserIdQuery(0)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const { data } = useGetSparqlQueryResultQuery(getProjectsByCreator(getIri(userId)), { skip: !userId })

  useEffect(() => {
    if (data) setProjects(data.results.bindings.map(createProjectFromQuery))
  }, [data])

  if (!data) return <Spinner />

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4 p-4">
      <ProjectView {...{ selectedProject, setSelectedProject }} />
      {projects.map(project => (
        <Card shadow="sm" key={project.id} isPressable onPress={() => setSelectedProject(project)}>
          <CardBody className="text-small justify-between">
            <b>{project.label}</b>
            <p className="text-default-500">{project.annotations} annotations</p>
          </CardBody>
        </Card>
      ))}
    </div>
  )
}
