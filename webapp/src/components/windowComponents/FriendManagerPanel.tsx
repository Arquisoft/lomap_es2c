import { Box, Divider, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import MapIcon from '@mui/icons-material/Map';
import PlaceIcon from '@mui/icons-material/Place';
import PersonIcon from '@mui/icons-material/Person';
import { Group, Place, User } from '../../shared/shareddtypes';
import { getMyFriends, getMyGroups, getUserInSesion } from '../../api/api';
import CloseIcon from '@mui/icons-material/Close';


interface Friend {
    user: User,
    groups: Group[],
}

const ScrollBox = styled(Box)({
    maxHeight: '60vh',
    overflow: 'auto',
    scrollbarColor: 'black white'
})

const VerticalDivider = styled(Divider)({
    padding: '0em 0.4em 0em'
})

export const FriendManagerPanel = () => {

    const userFriends = () => {
        let myFriends: Friend[] = [];
        let user = getUserInSesion();
        getMyFriends(user).then(function (friends) {
            for (let i = 0; i < friends.length; i++) {
                let friendGroups: Group[] = []
                getMyGroups(friends[1]).then(function (groups) {
                    for (let j = 0; j < groups.length; j++)
                        friendGroups.push(groups[j]);
                })
                myFriends.push({
                    "user": friends[i],
                    "groups": friendGroups,
                });
            }
        })
        myFriends.push({
            "user": {
                "username": "Paula",
                "webID": "<3",
                "password": "Universidad2023-",
            },
            "groups": [{
                "nombre": "Grupo 1",
                "places": [{
                    "latitude": "5",
                    "longitud": "6",
                    "nombre": "Lugar 1"
                }, {
                    "latitude": "5",
                    "longitud": "6",
                    "nombre": "Lugar 1"
                }]
            }]
        })
        return myFriends;
    }

    const [friends, setFriends] = useState(userFriends())

    const updateFriends = () => {
        setFriends(userFriends())
    }

    const addFriend = () => {
        updateFriends()
    }

    const mostrarGrupo = (i: number) => {
        console.log("Se muestra el grupo " + i)
    }

    const generateOpen = () => {
        let str = ""
        for (let i = 0; i < friends.length; i++) {
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

    const deleteFriend = (friend: number) => {
        alert("eliminar amigo " + friend);
    }

    return (
        <ScrollBox>
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
                {friends.map((friend, i) => {
                    return (
                        <React.Fragment key={i}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Tooltip title="See friend profile">
                                        <PersonIcon />
                                    </Tooltip>
                                </ListItemIcon>
                                <ListItemText primary={friend.user.username} />
                                {isOpen(i) ?
                                    (<Tooltip title="Close friend groups">
                                        <ExpandLess onClick={() => handleClick(i)} />
                                    </Tooltip>)
                                    :
                                    (<Tooltip title="See friend groups">
                                        <ExpandMore onClick={() => handleClick(i)} />
                                    </Tooltip>)}
                                <VerticalDivider orientation='vertical' flexItem />
                                <Tooltip title="Delete friend">
                                    <CloseIcon onClick={() => deleteFriend(i)} htmlColor="red" />
                                </Tooltip>
                            </ListItemButton>
                            <Collapse in={isOpen(i)} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {friend.groups.map((group, j) => {
                                        return (
                                            <Tooltip title="Show on map">
                                                <ListItemButton sx={{ pl: 4 }}>
                                                    <ListItemIcon>
                                                        <MapIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary={group.nombre} />
                                                </ListItemButton>
                                            </Tooltip>)
                                    })}

                                </List>
                            </Collapse>
                        </React.Fragment>)
                })}
            </List>
        </ScrollBox >
    )
}
