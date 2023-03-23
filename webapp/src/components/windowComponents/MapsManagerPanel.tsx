import { Box, Collapse, Divider } from '@mui/material'
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
import { ExpandLess } from '@mui/icons-material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import PlaceIcon from '@mui/icons-material/Place';

const ScrollBox = styled(Box)({
    maxHeight: '60vh',
    overflow: 'auto',
    scrollbarColor: 'black white'
})

const AddItem = styled(ListItemButton)({
    color: '#81c784',
})

export const MapsManagerPanel = () => {

    const userGroups = () => {
        let myGroups: Group[] = [];
        getUserInSesion().then(function (user) {
            getMyGroups(user).then(function (groups) {
                for (let i = 0; i < groups.length; i++) {
                    myGroups.push(groups[i]);
                }
            })
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

    const [groups, setGroups] = useState(userGroups())

    const updateGroups = () => {
        setGroups(userGroups())
    }

    const addGroup = () => {
        updateGroups()
    }

    const handleClick = (i: number) => {

    }

    return (
        <ScrollBox>
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
                <AddItem onClick={() => addGroup()}>
                    <ListItemIcon>
                        <AddIcon htmlColor='#81c784' />
                    </ListItemIcon>
                    <ListItemText primary="Añadir" />
                </AddItem>
                <Divider light color="#81c784" />
                {groups.map((group, i) => {
                    return (
                        <>
                            <ListItemButton onClick={() => handleClick(i)}>
                                <ListItemIcon>
                                    <MapIcon />
                                </ListItemIcon>
                                <ListItemText primary={group.nombre} />
                                <ExpandLess />
                            </ListItemButton>
                            <Collapse in={true} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {group.places.map((place, j) => {
                                        return (
                                            <>
                                                <ListItemButton sx={{ pl: 4 }}>
                                                    <ListItemIcon>
                                                        <PlaceIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={place.nombre} />
                                                    <SentimentSatisfiedAltIcon htmlColor="green" />
                                                </ListItemButton>
                                            </>
                                        )
                                    })}
                                </List>
                            </Collapse>
                        </>
                    )
                })}
            </List>
        </ScrollBox>
    )
}
function getMyMaps(user: User) {
    throw new Error('Function not implemented.');
}

