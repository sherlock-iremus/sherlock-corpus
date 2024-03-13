import { Route, Routes, useNavigate } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'
import { Listbox, ListboxItem } from '@nextui-org/react'
import { ReactElement, useState } from 'react'
import { FaEmpire } from 'react-icons/fa6'
import { FaPeopleCarryBox } from 'react-icons/fa6'
import { GiAudioCassette } from 'react-icons/gi'
import { GiDuck } from 'react-icons/gi'
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
import Help from '../misc/Help'
import { IconType } from 'react-icons'

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
        { key: 'help', label: 'Help', icon: <GiDuck />, element: <Help /> },
        { key: 'tonalities_corpuses', label: 'Tonalities corpuses', icon: <PiVinylRecordFill />, element: <TonalitiesCorpuses /> },
        { key: 'public_corpuses', label: 'Public corpuses', icon: <FaEmpire />, element: <PublicCorpuses /> },
        { key: 'my_corpuses', label: 'My corpuses', icon: <GiAudioCassette />, element: <MyCorpuses /> },
        { key: 'my_projects', label: 'My projects', icon: <GiSherlockHolmes />, element: <MyProjects /> },
        { key: 'my_collaborators', label: 'My collaborators', icon: <FaPeopleCarryBox />, element: <MyCollaborators /> },
        { key: 'documents_that_i_have_annotated', label: 'Documents that I have annotated', icon: <GiTreeRoots />, element: <DocumentsThatIHaveAnnotated /> },
        { key: 'my_personnal_corpus', label: 'My personnal corpus', icon: <GiLockedChest />, element: <MyPersonnalCorpus /> },
    ]

    return (
        <NextUIProvider navigate={navigate}>
            <div>
                <header className='border-b-1 p-5'>
                    <h1 className='uppercase'>SHERLOCK corpus management system</h1>
                </header>
                <div className='flex'>
                    <nav className='w-81 border-r-1'>
                        <Listbox
                            aria-label='Sélection de la vue'
                            disallowEmptySelection
                            selectionMode='single'
                            selectedKeys={selectedKeys}
                            onAction={handleAction}
                        >
                            {menuData.map(_ => <ListboxItem
                                key={String(_.key)}
                                href={`/${_.key}`}
                                startContent={_.icon}
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
                <footer className='border-t-1 p-4'></footer>
            </div>
        </NextUIProvider>
    )
}

export default App