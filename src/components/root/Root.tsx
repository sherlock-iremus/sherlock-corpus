import { Route, Routes, useNavigate } from 'react-router-dom'
import { Navbar, NavbarContent, NavbarItem, NextUIProvider } from '@nextui-org/react'
import { Listbox, ListboxItem } from '@nextui-org/react'
import { ReactElement, useState } from 'react'
import { FaEmpire } from 'react-icons/fa6'
import { FaPeopleCarryBox } from 'react-icons/fa6'
import { GiAudioCassette } from 'react-icons/gi'
import { GiLockedChest } from 'react-icons/gi'
import { GiSherlockHolmes } from 'react-icons/gi'
import { GiTreeRoots } from 'react-icons/gi'
import { PiVinylRecordFill } from 'react-icons/pi'
import ErrorPage from './ErrorPage'
import TonalitiesCorpuses from '../corpus/TonalitiesCorpuses'
import PublicCorpuses from '../corpus/PublicCorpuses'
import MyCorpuses from '../corpus/MyCorpuses'
import MyProjects from '../projects/MyProjects'
import MyCollaborators from '../people/MyCollaborators'
import DocumentsThatIHaveAnnotated from '../documents/DocumentsThatIHaveAnnotated'
import MyPersonnalCorpus from '../corpus/MyPersonnalCorpus'
import IconWrapper from '../misc/IconWrapper'
import AccountMenu from '../misc/AccountMenu'
import { IoChevronForward } from 'react-icons/io5'

function App() {
    const navigate = useNavigate()

    const [selectedKeys, setSelectedKeys] = useState(new Set(['text']))

    const handleAction = e => {
        setSelectedKeys([e])
    }

    type MenuData = Array<MenuDatum>

    type MenuDatum = {
        key: string,
        label: string,
        icon: ReactElement,
        element: ReactElement
    }

    const menuData: MenuData = [
        { key: 'tonalities_corpuses', label: 'Tonalities corpuses', icon: <PiVinylRecordFill />, element: <TonalitiesCorpuses /> },
        { key: 'public_corpuses', label: 'Public corpuses', icon: <FaEmpire />, element: <PublicCorpuses /> },
        { key: 'my_corpuses', label: 'My corpuses', icon: <GiAudioCassette />, element: <MyCorpuses /> },
        { key: 'my_projects', label: 'My projects', icon: <GiSherlockHolmes />, element: <MyProjects /> },
        { key: 'my_collaborators', label: 'Collaborators', icon: <FaPeopleCarryBox />, element: <MyCollaborators /> },
        { key: 'documents_that_i_have_annotated', label: 'Annotated documents', icon: <GiTreeRoots />, element: <DocumentsThatIHaveAnnotated /> },
        { key: 'my_personnal_corpus', label: 'My personnal corpus', icon: <GiLockedChest />, element: <MyPersonnalCorpus /> },
    ]

    return (
        <NextUIProvider navigate={navigate}>
            <div>
                <Navbar maxWidth='full'>
                    <NavbarContent justify='start'>
                        <p className="font-bold text-primary text-inherit">Sherlock</p>
                        <p>Corpus Management System</p>
                    </NavbarContent>
                    <NavbarContent justify="end">
                        <NavbarItem>
                            <AccountMenu />
                        </NavbarItem>
                    </NavbarContent>
                </Navbar>
                <div className='flex'>
                    <nav className='p-4'>
                        <Listbox
                            aria-label='Sélection de la vue'
                            disallowEmptySelection
                            selectionMode='single'
                            selectedKeys={selectedKeys}
                            onAction={handleAction}
                            className="p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 max-w-[300px] overflow-visible shadow-small rounded-medium"
                            itemClasses={{
                                base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
                            }}
                        >
                            {menuData.map(_ => <ListboxItem
                                key={String(_.key)}
                                href={`/${_.key}`}
                                selectedIcon={<IoChevronForward className="text-slate-400" />}
                                startContent={<IconWrapper className="bg-primary/10 text-primary">
                                    {_.icon}
                                </IconWrapper>}
                            >{_.label}</ListboxItem>)}
                        </Listbox>
                    </nav>
                    <main>
                        <Routes>
                            <Route path='/' errorElement={<ErrorPage />}>
                                {menuData.map(_ => <Route key={_.key} path={_.key} element={_.element} />)}
                            </Route>
                        </Routes>
                    </main>
                </div>
            </div>
        </NextUIProvider>
    )
}

export default App