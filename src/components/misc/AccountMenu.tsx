import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Link } from "@nextui-org/react";
import { MdAccountCircle } from "react-icons/md";
import { BASE_API_URL, useGetUserIdQuery, useLogOutMutation } from "../../service";
import { useNavigate } from "react-router-dom";
import { useGetSparqlQueryResultQuery } from "sherlock-rdf/lib/rtkquery-service-sparql";
import { getIri } from "../../utils";
import { SparqlQueryResultObject_Binding } from "sherlock-rdf/lib/sparql-result";

type User = {
    key: string,
    emoji: string,
    color: string,
    orcid: string,
    name: string
}

const createUser = (result: SparqlQueryResultObject_Binding): User => result ? ({
    key: result.contributor.value,
    emoji: result.emoji.value,
    color: result.color.value,
    orcid: result.orcid.value,
    name: result.name.value
}) : { key: '', emoji: '', color: '', orcid: '', name: '' }


export default function AccountMenu() {
    const { data: userId } = useGetUserIdQuery(0)
    const [logOut] = useLogOutMutation()
    const navigate = useNavigate()

    const onLogout = () => {
        logOut(0)
        navigate(0)
    }

    const { data } = useGetSparqlQueryResultQuery(`
    PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
    SELECT ?contributor ?emoji ?color ?orcid ?name
    FROM <http://data-iremus.huma-num.fr/graph/users>
    WHERE {
        VALUES ?contributor { <${getIri(userId)}> }

        ?contributor crm:P1_is_identified_by ?id1.
        ?id1 crm:P2_has_type <http://data-iremus.huma-num.fr/id/04242f64-fbb3-4b5b-bb2e-3ddd59eeea18>.
        ?id1 crm:P190_has_symbolic_content ?emoji.

        ?contributor crm:P1_is_identified_by ?id2.
        ?id2 crm:P2_has_type <http://data-iremus.huma-num.fr/id/5f1bb74f-6ea0-4073-8b68-086f98454f1c>.
        ?id2 crm:P190_has_symbolic_content ?color.

        ?contributor crm:P1_is_identified_by ?id3.
        ?id3 crm:P2_has_type <http://data-iremus.huma-num.fr/id/d7ef2583-ff31-4913-9ed3-bc3a1c664b21>.
        ?id3 crm:P190_has_symbolic_content ?orcid.
        
        ?contributor crm:P1_is_identified_by ?id4.
        ?id4 crm:P2_has_type <http://data-iremus.huma-num.fr/id/73ea8d74-3526-4f6a-8830-dd369795650d>.
        ?id4 crm:P190_has_symbolic_content ?name.
    }`, { skip: !userId })

    const user = createUser(data?.results.bindings[0])

    if (userId) return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    name={user.emoji}
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat" disabledKeys={['settings', 'team_settings', 'analytics', 'system', 'configurations']}>
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
    else return (
        <Link isExternal href={BASE_API_URL + `sherlock/login?redirect-uri=${window.location.href}`} >
            <Button variant="faded" startContent={<MdAccountCircle />}>
                Login
            </Button>
        </Link>
    )
}
