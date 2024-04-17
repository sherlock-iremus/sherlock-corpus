import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  User,
} from '@nextui-org/react'
import { MdAccountCircle } from 'react-icons/md'
import { BASE_API_URL, useGetUserIdQuery, useLogOutMutation } from '../../service'
import { getIri } from '../../utils'
import { getProfile } from 'sherlock-sparql-queries/lib/profile'
import { useEffect, useState } from 'react'
import { useGetFlattenedSparqlQueryResultQuery } from '../../sparql'
import { useNavigate } from 'react-router-dom'

type User = {
  key: string
  emoji: string
  color: string
  orcid: string
  name: string
}

export default function AccountMenu() {
  const [user, setUser] = useState<User | null>(null)
  const { data: userId, isLoading: isLoadingId } = useGetUserIdQuery(0)
  const [logOut] = useLogOutMutation()
  const { data, isLoading: isLoadingData } = useGetFlattenedSparqlQueryResultQuery(getProfile(getIri(userId)), {
    skip: !userId,
  })
  const navigate = useNavigate()

  const onLogout = async () => {
    await logOut(0)
    navigate(0)
  }
  user && console.log(user)

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
            avatarProps={{
              name: user.emoji,
              classNames: {
                base: 'bg-gradient-to-br from-[#FFB457] to-[#FF705B]',
                icon: 'text-black/80',
              },
            }}
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
      <Modal backdrop="blur" isOpen>
        <ModalContent>
          {isLoadingData || isLoadingId ? (
            <Spinner className="p-4" />
          ) : (
            <>
              <ModalHeader className="flex flex-col gap-1">It's been a while...</ModalHeader>
              <ModalFooter>
                <Link href={BASE_API_URL + `sherlock/login?redirect-uri=${window.location.href}`}>
                  <Button variant="faded" startContent={<MdAccountCircle />}>
                    Login
                  </Button>
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    )
}
