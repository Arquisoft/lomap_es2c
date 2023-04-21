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
import AddPlaceForm from '../places/placeViews/AddPlaceForm';
import AddGroupForm from './groupViews/AddGroupForm';
import { useNavigate, useParams } from 'react-router-dom';
import { ErrorPage } from 'components/mainComponents/ErrorPage';
import { Groups } from './GroupsComponent';
import { MapManager } from 'podManager/MapManager';
import ShowPlace from '../places/placeViews/ShowPlace';
import { ShowGroup } from './groupViews/ShowGroup';
import { useSession } from '@inrupt/solid-ui-react';

const BoxCircularProgress = styled(Box)({
    paddingTop: '7em',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    height: '30vh'
})

const ScrollBox = styled(Box)({
    maxHeight: '60vh',
    overflow: 'auto',
    scrollbarColor: '#81c784 white'
})

const AddItem = styled(ListItemButton)({
    color: '#81c784',
})

const HorizontalDivider = styled(Divider)({
    width: '100%'
})

export const GroupsManagerPanel = () => {

    const { session } = useSession();

    const [loading, setLoading] = useState(true)

    const ref = useRef<HTMLDivElement>(null);

    const userGroups = async () => {
        let myGroups: Group[] = [];
        await new MapManager().verMapaDe(null, session).then(function (groups) {
            for (let i = 0; i < groups.length; i++) {
                myGroups.push(groups[i]);
            }
        })
        return myGroups;
    }

    const [groups, setGroups] = useState<Promise<Group[]>>(userGroups())

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
                                <Groups groups={groups} daddy={ref} stopLoading={() => setLoading(false)} refresh={() => setGroups(userGroups())} />
                            </Box>
                        </List >
                    </ScrollBox>
                </>
                :
                (op == "addgroup" ?
                    <AddGroupForm refresh={() => setGroups(userGroups())} />
                    :
                    (op == "addplace" ?
                        <AddPlaceForm refresh={() => setGroups(userGroups())} />
                        :
                        (op == "showplace" ?
                            <ShowPlace />
                            :
                            (op == "showgroup" ?
                                <ShowGroup refresh={() => setGroups(userGroups())} />
                                :
                                <ErrorPage></ErrorPage>
                            )
                        )
                    )
                )}
        </ >
    )

    /*return (
        <>
            <Routes>
                <Route path='/home/groups/main' element={
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
                                    <Groups groups={groups} daddy={ref} session={session} stopLoading={() => setLoading(false)} refresh={() => setGroups(userGroups())} />
                                </Box>
                            </List >
                        </ScrollBox>
                    </>
                } />
                <Route path='/home/groups/addgroup' element={
                    <AddGroupForm session={session} refresh={() => setGroups(userGroups())} />
                } />
                <Route path='/home/groups/addplace' element={
                    <AddPlaceForm session={session} refresh={() => setGroups(userGroups())} />
                } />
                <Route path='/home/groups/showplace' element={
                    <ShowPlace session={session} />
                } />
                <Route path='/home/groups/showgroup' element={
                    <ShowGroup session={session} refresh={() => setGroups(userGroups())} />
                } />
            </Routes>
        </>
    )*/
}
