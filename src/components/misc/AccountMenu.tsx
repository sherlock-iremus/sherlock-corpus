import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link, User } from '@nextui-org/react'
import { MdAccountCircle } from 'react-icons/md'
import { BASE_API_URL, useGetUserIdQuery, useLogOutMutation } from '../../service'
import { useNavigate } from 'react-router-dom'
import { sparqlApi } from 'sherlock-rdf/lib/rtkquery-service-sparql'
import { getIri } from '../../utils'
import { getProfile } from 'sherlock-sparql-queries/lib/profile'
import { useEffect, useState } from 'react'

type User = {
  key: string
  emoji: string
  color: string
  orcid: string
  name: string
}

export default function AccountMenu() {
  const [user, setUser] = useState<User | null>(null)
  const { data: userId } = useGetUserIdQuery(0)
  const [logOut] = useLogOutMutation()
  const navigate = useNavigate()
  const { data } = sparqlApi.endpoints.getFlattenedSparqlQueryResult.useQuery(getProfile(getIri(userId)), { skip: !userId })

  const onLogout = () => {
    logOut(0)
    navigate(0)
  }

  useEffect(() => {
    if (data) setUser(data[0])
  }, [data])

  if (user && userId)
    return (
      <Dropdown>
        <DropdownTrigger>
          <User
            as="button"
            name={user.name}
            description={'ORCID:' + user.orcid}
            className="transition-transform p-2"
            avatarProps={{ name: user.emoji }}
          />
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
          disabledKeys={['settings', 'team_settings', 'analytics', 'system', 'configurations']}
        >
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{user.name}</p>
          </DropdownItem>
          <DropdownItem key="settings">My Settings</DropdownItem>
          <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics">Analytics</DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" color="danger" onPress={onLogout}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  else
    return (
      <Link isExternal href={BASE_API_URL + `sherlock/login?redirect-uri=${window.location.href}`}>
        <Button variant="faded" startContent={<MdAccountCircle />}>
          Login
        </Button>
      </Link>
    )
}
