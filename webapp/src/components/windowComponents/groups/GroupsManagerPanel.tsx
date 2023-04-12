import { Box, CircularProgress, Divider } from '@mui/material'
import { useRef, useState } from 'react'
import { styled } from '@mui/material/styles';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Group } from '../../../shared/shareddtypes';
import AddIcon from '@mui/icons-material/Add';
import AddPlaceForm from './AddPlaceForm';
import AddGroupForm from './AddGroupForm';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorPage } from 'components/mainComponents/ErrorPage';
import { Session } from '@inrupt/solid-client-authn-browser/dist/Session';
import { Groups } from './GroupsComponent';
import { MapManager } from 'podManager/MapManager';
import ShowPlace from './ShowPlace';
import { Refresh } from '@mui/icons-material';

const BoxCircularProgress = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    height: '30vh'
})

const ScrollBox = styled(Box)({
    maxHeight: '60vh',
    overflow: 'auto',
    scrollbarColor: 'black white'
})

const AddItem = styled(ListItemButton)({
    color: '#81c784',
})

const VerticalDivider = styled(Divider)({
    padding: '0em 0.4em 0em'
})

const HorizontalDivider = styled(Divider)({
    width: '100%'
})

export const GroupsManagerPanel = (props: { session: any }) => {

    const [loading, setLoading] = useState(true)

    const ref = useRef<HTMLDivElement>(null);

    const userGroups = async () => {
        let myGroups: Group[] = [];
        await new MapManager().verMapaDe(null, props.session).then(function (groups) {
            for (let i = 0; i < groups.length; i++) {
                myGroups.push(groups[i]);
            }
        })

        return myGroups;
    }

    const [groups, setGroups] = useState<Promise<Group[]>>(userGroups)

    const { op } = useParams()

    const navigate = useNavigate()


    return (
        <>
            {op == "main" ?
                <>
                    <AddItem onClick={() => navigate("/home/groups/addgroup")}>
                        <ListItemIcon>
                            <AddIcon htmlColor='#81c784' />
                        </ListItemIcon>
                        <ListItemText primary="Añadir grupo" />
                    </AddItem>
                    <HorizontalDivider light color="#81c784" />
                    <ScrollBox>
                        <List
                            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                            aria-labelledby="nested-list-subheader"
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    Tus grupos de mapas
                                </ListSubheader>
                            }
                        >
                            {loading &&
                                <BoxCircularProgress>
                                    <CircularProgress size={100} color="primary" />
                                </BoxCircularProgress>
                            }
                            <Box ref={ref}>
                                <Groups groups={groups} daddy={ref} session={props.session} stopLoading={() => setLoading(false)} refresh={() => setGroups(userGroups())} />
                            </Box>
                        </List >
                    </ScrollBox>
                </>
                :
                (op == "addgroup" ?
                    <AddGroupForm session={props.session} refresh={() => setGroups(userGroups())} />
                    :
                    (op == "addplace" ?
                        <AddPlaceForm session={props.session} refresh={() => setGroups(userGroups())} />
                        :
                        (op == "showplace" ?
                            <ShowPlace session={props.session} />
                            :
                            <ErrorPage></ErrorPage>
                        )
                    )
                )
            }
        </ >
    )
}
