import { Route, Routes, useNavigate } from 'react-router-dom'
import { NextUIProvider } from "@nextui-org/react";

import Root from './Root'
import ErrorPage from './ErrorPage'
import TonalitiesCorpuses from "../corpus/TonalitiesCorpuses";
import PublicCorpuses from "../corpus/PublicCorpuses";
import MyCorpuses from "../corpus/MyCorpuses";
import MyProjects from "../projects/MyProjects";
import MyCollaborators from "../people/MyCollaborators";
import DocumentsThatIHaveAnnotated from "../documents/DocumentsThatIHaveAnnotated";
import MyPersonnalCorpus from "../corpus/MyPersonnalCorpus";
import Help from "../misc/Help";

function App() {
    const navigate = useNavigate();

    return (
        <NextUIProvider navigate={navigate}>
            <Routes>
                <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
                    <Route path="help" element={<Help />}></Route>
                    <Route path="tonalities_corpuses" element={<TonalitiesCorpuses />}></Route>
                    <Route path="public_corpuses" element={<PublicCorpuses />}></Route>
                    <Route path="my_corpuses" element={<MyCorpuses />}></Route>
                    <Route path="my_projects" element={<MyProjects />}></Route>
                    <Route path="my_collaborators" element={<MyCollaborators />}></Route>
                    <Route path="documents_that_i_have_annotated" element={<DocumentsThatIHaveAnnotated />}></Route>
                    <Route path="my_personnal_corpus" element={<MyPersonnalCorpus />}></Route>
                </Route>
            </Routes>
        </NextUIProvider>
    );
}

export default App