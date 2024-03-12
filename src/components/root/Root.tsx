import { Listbox, ListboxItem } from '@nextui-org/react'
import { useState } from 'react'
import { FaEmpire } from "react-icons/fa6"
import { FaPeopleCarryBox } from "react-icons/fa6"
import { GiAudioCassette } from "react-icons/gi";
import { GiDuck } from "react-icons/gi";
import { GiLockedChest } from "react-icons/gi"
import { GiSherlockHolmes } from "react-icons/gi"
import { GiTreeRoots } from "react-icons/gi"
import { PiVinylRecordFill } from "react-icons/pi"
import { Outlet } from 'react-router-dom'

export default function Root() {
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
        <div className=''>
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
                    <Outlet />
                </main>
            </div>
            <footer className='border-t-1 p-4'>🌴</footer>
        </div>
    )
}