import { Box, Collapse, Divider, Tooltip } from '@mui/material'
import React, { useRef, useState } from 'react'
import { styled } from '@mui/material/styles';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MapIcon from '@mui/icons-material/Map';
import { getMyGroups, getUserInSesion } from '../../../api/api';
import { Group, User } from '../../../shared/shareddtypes';
import AddIcon from '@mui/icons-material/Add';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import PlaceIcon from '@mui/icons-material/Place';
import CloseIcon from '@mui/icons-material/Close';
import AddPlaceForm from './AddPlaceForm';
import AddGroupForm from './AddGroupForm';
import { useNavigate, useParams } from 'react-router-dom';
import { render } from 'react-dom';
import { ErrorPage } from 'components/mainComponents/ErrorPage';
import AddLocationIcon from '@mui/icons-material/AddLocation';

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
    minWidth: '25vw'
})

export const GroupsManagerPanel = () => {

    const ref = useRef<HTMLDivElement>(null);

    const userGroups = async () => {
        let myGroups: Group[] = [];
        let user = getUserInSesion();
        await getMyGroups(user).then(function (groups) {
            for (let i = 0; i < groups.length; i++) {
                myGroups.push(groups[i]);
            }
        })
        myGroups.push({
            "nombre": "Bares favoritos",
            "places": [{
                "latitude": "5",
                "longitud": "6",
                "nombre": "Lugar 1"
            }, {
                "latitude": "5",
                "longitud": "6",
                "nombre": "Lugar 1"
            }]
        })
        myGroups.push({
            "nombre": "Rutas de montaña",
            "places": [{
                "latitude": "5",
                "longitud": "6",
                "nombre": "Lugar 1"
            }, {
                "latitude": "5",
                "longitud": "6",
                "nombre": "Lugar 1"
            }]
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
                    <List
                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={
                            <ListSubheader component="div" id="nested-list-subheader">
                                Tus grupos de mapas
                            </ListSubheader>
                        }
                    >
                        <HorizontalDivider light color="#81c784" />
                        <ScrollBox>
                            <Box ref={ref}>
                                <Groups groups={groups} daddy={ref} />
                            </Box>
                        </ScrollBox>
                    </List >
                </>
                :
                (op == "addgroup" ?
                    <AddGroupForm />
                    :
                    (op == "addplace" ?
                        <AddPlaceForm />
                        :
                        <ErrorPage></ErrorPage>
                    )
                )
            }
        </ >
    )
}

const Groups = (props: { groups: Promise<Group[]>, daddy: any }) => {

    const navigate = useNavigate()

    const [open, setOpen] = React.useState("");

    const deleteGroup = (group: Group) => {
        alert("eliminar grupo " + group);
    }

    const addPlace = (group: Group) => {
        navigate("/home/groups/addplace/" + group.nombre)
    }

    const generateOpen = (elems: number) => {
        let str = ""
        for (let i = 0; i < elems; i++) {
            str += '0';
        }
        console.log("Generate open: " + str)
        return str;
    }

    const handleClick = (item: number) => {
        let c = open.charAt(item) == '0' ? '1' : '0';
        let newOpen = ""
        for (let i = 0; i < open.length; i++) {
            newOpen += (i == item ? c : open.charAt(i));
        }
        setOpen(newOpen)
    }

    const isOpen = (item: number) => {
        let c = open.charAt(item);
        if (c != '0' && c != '1') return false;
        return open.charAt(item) == '0' ? false : true;
    }

    const mostrarGrupo = (group: Group) => {
        navigate("/home/groups/main/" + group.nombre)
        alert("Se muestra el grupo " + group.nombre)
    }

    props.groups.then((grps: Group[]) => {
        if (open.length != grps.length) setOpen(generateOpen(grps.length))
        render(
            <>
                {grps.map((group, i) => {
                    return (
                        <React.Fragment key={i}>
                            < ListItemButton >
                                <ListItemIcon>
                                    <MapIcon />
                                </ListItemIcon>
                                <ListItemText primary={group.nombre} onClick={() => mostrarGrupo(group)} />
                                {isOpen(i) ?
                                    (
                                        <Tooltip title="Close group places">
                                            <ExpandLess onClick={() => { handleClick(i) }} />
                                        </Tooltip>)
                                    :
                                    (
                                        <Tooltip title="Show group places">
                                            <ExpandMore onClick={() => { handleClick(i) }} />
                                        </Tooltip>
                                    )}
                                <VerticalDivider orientation='vertical' flexItem />
                                <Tooltip title="Add place"  sx={{ ml:"0.4em" }}>
                                    
                                    <AddLocationIcon onClick={() => addPlace(group)} htmlColor="#81c784" />
                                </Tooltip>
                                <VerticalDivider orientation='vertical' flexItem />
                                <Tooltip title="Delete group" sx={{ ml:"0.4em" }}>
                                    <CloseIcon onClick={() => deleteGroup(group)} htmlColor="red" />
                                </Tooltip>
                            </ListItemButton>
                            <Collapse in={isOpen(i)} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {group.places.map((place, j) => {
                                        return (
                                            <React.Fragment key={i + "-" + j}>
                                                <ListItemButton sx={{ pl: 4 }}>
                                                    <ListItemIcon>
                                                        <PlaceIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={place.nombre} />
                                                    <SentimentSatisfiedAltIcon htmlColor="green" />
                                                </ListItemButton>
                                            </React.Fragment>
                                        )
                                    })}
                                </List>
                            </Collapse>
                        </React.Fragment>
                    )
                })}
            </>, props.daddy.current)
    })
    return <></>
}
