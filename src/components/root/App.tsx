import { Route, Routes, useNavigate } from 'react-router-dom'
import { NextUIProvider } from '@nextui-org/react'
import { Listbox, ListboxItem } from '@nextui-org/react'
import { useState } from 'react'
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

function App() {
    const navigate = useNavigate()

    const [selectedKeys, setSelectedKeys] = useState(new Set(['text']))

    const handleAction = e => {
        setSelectedKeys([e])
    }

    const menuData = [
        ['help', 'Help', <GiDuck />],
        ['tonalities_corpuses', 'Tonalities corpuses', <PiVinylRecordFill />],
        ['public_corpuses', 'Public corpuses', <FaEmpire />],
        ['my_corpuses', 'My corpuses', <GiAudioCassette />],
        ['my_projects', 'My projects', <GiSherlockHolmes />],
        ['my_collaborators', 'My collaborators', <FaPeopleCarryBox />],
        ['documents_that_i_have_annotated', 'Documents that I have annotated', <GiTreeRoots />],
        ['my_personnal_corpus', 'My personnal corpus', <GiLockedChest />]
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
                                key={String(_[0])}
                                href={`/${_[0]}`}
                                startContent={_[2]}
                            >{_[1]}</ListboxItem>)}
                        </Listbox>
                    </nav>
                    <main>
                        <Routes>
                            <Route path='/' errorElement={<ErrorPage />}>
                                <Route path='help' element={<Help />}></Route>
                                <Route path='tonalities_corpuses' element={<TonalitiesCorpuses />}></Route>
                                <Route path='public_corpuses' element={<PublicCorpuses />}></Route>
                                <Route path='my_corpuses' element={<MyCorpuses />}></Route>
                                <Route path='my_projects' element={<MyProjects />}></Route>
                                <Route path='my_collaborators' element={<MyCollaborators />}></Route>
                                <Route path='documents_that_i_have_annotated' element={<DocumentsThatIHaveAnnotated />}></Route>
                                <Route path='my_personnal_corpus' element={<MyPersonnalCorpus />}></Route>
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