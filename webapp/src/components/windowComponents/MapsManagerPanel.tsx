import { Box, Collapse, Divider, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MapIcon from '@mui/icons-material/Map';
import { getMyGroups, getUserInSesion } from '../../api/api';
import { Group, User } from '../../shared/shareddtypes';
import AddIcon from '@mui/icons-material/Add';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import PlaceIcon from '@mui/icons-material/Place';
import CloseIcon from '@mui/icons-material/Close';
import { AddPlaceForm } from './AddPlaceForm';
import { AddGroupForm } from './AddGroupForm';
import { useNavigate, useParams } from 'react-router-dom';

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

export const MapsManagerPanel = () => {

    const userGroups = () => {
        let myGroups: Group[] = [];
        let user = getUserInSesion();
        getMyGroups(user).then(function (groups) {
            for (let i = 0; i < groups.length; i++) {
                myGroups.push(groups[i]);
            }
        })
        myGroups.push({
            "nombre": "grupo1",
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

    const { op } = useParams()

    const [groups, setGroups] = useState(userGroups())

    const navigate = useNavigate()

    const [addForm, setAddForm] = useState("")

    if (op != addForm) setAddForm(op)

    const updateGroups = () => {
        setGroups(userGroups())
    }

    const mostrarGrupo = (i: number) => {
        console.log("Se muestra el grupo " + i)
    }

    const generateOpen = () => {
        let str = ""
        for (let i = 0; i < groups.length; i++) {
            str += '0';
        }
        return str;
    }

    const [open, setOpen] = React.useState(generateOpen());

    const handleClick = (item: number) => {
        let c = open.charAt(item) == '0' ? '1' : '0';
        let newOpen = ""
        for (let i = 0; i < open.length; i++) {
            newOpen += (i == item ? c : open.charAt(i));
        }
        setOpen(newOpen)
        console.log(newOpen)
    }

    const isOpen = (item: number) => {
        return open.charAt(item) == '0' ? false : true;
    }

    const deleteGroup = (group: number) => {
        alert("eliminar grupo " + group);
    }

    return (
        <ScrollBox>
            {addForm == "0" ?
                <List onLoad={updateGroups}
                    sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            Tus grupos de mapas
                        </ListSubheader>
                    }
                >
                    <AddItem onClick={() => navigate("/home/2")}>
                        <ListItemIcon>
                            <AddIcon htmlColor='#81c784' />
                        </ListItemIcon>
                        <ListItemText primary="Añadir grupo" />
                    </AddItem>
                    <Divider light color="#81c784" />
                    {groups.map((group, i) => {
                        return (
                            <React.Fragment key={i}>
                                < ListItemButton>
                                    <ListItemIcon>
                                        <MapIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={group.nombre} />
                                    {isOpen(i) ?
                                        (
                                            <Tooltip title="Close group places">
                                                <ExpandLess onClick={() => { mostrarGrupo(i); handleClick(i) }} />
                                            </Tooltip>)
                                        :
                                        (
                                            <Tooltip title="Show group places">
                                                <ExpandMore onClick={() => { mostrarGrupo(i); handleClick(i) }} />
                                            </Tooltip>
                                        )}
                                    <VerticalDivider orientation='vertical' flexItem />
                                    <Tooltip title="Delete group">
                                        <CloseIcon onClick={() => deleteGroup(i)} htmlColor="red" />
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
                </List >
                :
                (addForm == "1" ?
                    <AddPlaceForm ></AddPlaceForm>
                    :
                    <AddGroupForm ></AddGroupForm>
                )
            }
        </ScrollBox >
    )
}

