import { Box, Divider, Tooltip } from '@mui/material'
import React, { createRef, useEffect, useState } from 'react'
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
import AddIcon from '@mui/icons-material/Add';
import { FireHydrantAltOutlined } from '@mui/icons-material';
import { render } from 'react-dom';
import { useRef } from 'react';


interface Friend {
    user: User,
    groups: Group[],
}

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

export const FriendManagerPanel = () => {

    const ref = useRef<HTMLDivElement>(null);


    const userFriends = async () => {
        console.log("Ejecucion")
        let myFriends: Friend[] = [];
        let user = getUserInSesion();
        await getMyFriends(user).then(function (friends) {
            console.log(friends.length)
            for (let i = 0; i < friends.length; i++) {
                let friendGroups: Group[] = []
                getMyGroups(friends[i]).then(function (groups) {
                    for (let j = 0; j < groups.length; j++)
                        friendGroups.push(groups[j]);
                })
                myFriends.push({
                    "user": friends[i],
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
                    }],
                });
                myFriends.push({
                    "user": friends[i],
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
                    }],
                });
            }
        })
        console.log(myFriends)
        return myFriends;
    }

    const addFriend = () => {
    }

    const mostrarGrupo = (i: number) => {
        console.log("Se muestra el grupo " + i)
    }

    return (
        <ScrollBox>
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Tus amigos
                    </ListSubheader>
                }
            >
                <AddItem onClick={() => addFriend()}>
                    <ListItemIcon>
                        <AddIcon htmlColor='#81c784' />
                    </ListItemIcon>
                    <ListItemText primary="Añadir grupo" />
                </AddItem>
                <Divider light color="#81c784" />
                <Box ref={ref}>
                    <Friends friends={userFriends()} daddy={ref} />
                </Box>
            </List>
        </ScrollBox >
    )
}

const Friends = (props: { friends: Promise<Friend[]>, daddy: any }) => {

    const [open, setOpen] = React.useState("");

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

    const deleteFriend = (friend: number) => {
        alert("eliminar amigo " + friend);
    }

    props.friends.then((frds: Friend[]) => {
        if (open.length != frds.length) setOpen(generateOpen(frds.length))
        render(
            <>
                {frds.map((friend, i) => {
                    return (
                        <>
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
                                                <React.Fragment key={i + "-" + j}>
                                                    <Tooltip title="Show on map">
                                                        <ListItemButton sx={{ pl: 4 }}>
                                                            <ListItemIcon>
                                                                <MapIcon />
                                                            </ListItemIcon>
                                                            <ListItemText primary={group.nombre} />
                                                        </ListItemButton>
                                                    </Tooltip>
                                                </React.Fragment>
                                            )
                                        })}
                                    </List>
                                </Collapse>
                            </React.Fragment>
                        </>)
                })}
            </>, props.daddy.current)
    })
    return <></>
}