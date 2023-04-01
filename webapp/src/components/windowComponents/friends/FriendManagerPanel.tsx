import { Box, Button, Divider, Input, InputLabel, TextField, Tooltip } from '@mui/material'
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
import { Friend, FriendRequest, Group, Place, User } from '../../../shared/shareddtypes';
import { getMyFriendRequests, getMyFriends, getMyGroups, getUserDetails, getUserInSesion, searchUserByUsername, sendFriendRequest } from '../../../api/api';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { AccountCircle, FireHydrantAltOutlined } from '@mui/icons-material';
import { render } from 'react-dom';
import { useRef } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import InputAdornment from '@mui/material/InputAdornment';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FriendsComponent } from './FriendsComponent';
import { FriendRequestsComponent } from './FriendRequestsComponent'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import GroupIcon from '@mui/icons-material/Group';

const ScrollBox = styled(Box)({
    maxHeight: '60vh',
    overflow: 'auto',
    scrollbarColor: 'black white'
})

const VerticalDivider = styled(Divider)({
    padding: '0em 0.4em 0em'
})

const AddFriendBox = styled(Box)({
    padding: '1em 0em 1em',
    display: 'flex',
    alignItems: 'flex-end',
})

const OptionsBox = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row'
})

const HorizontalDivider = styled(Divider)({
    minWidth: '25vw'
})

export const FriendManagerPanel = () => {

    const [url, setUrl] = useState("../testUser.jfif");

    const ref = useRef<HTMLDivElement>(null);

    const { op } = useParams()

    const navigate = useNavigate()

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
                friends[i].username = "Manolo"
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

    const [friends, setFriends] = useState<Promise<Friend[]>>(userFriends());

    const userFriendRequests = async (): Promise<FriendRequest[]> => {
        console.log("Ejecucion")
        let myFriendRequests: FriendRequest[] = [];
        let user = getUserInSesion();
        await getMyFriendRequests(user).then((friendRequests) => {
            for (let i = 0; i < friendRequests.length; i++)
                myFriendRequests.push(friendRequests[i]);
        });
        myFriendRequests.push({
            sender: {
                username: "Acosador",
                webID: "WebID de acosador",
                password: ".",
            },
            receiver: {
                username: "security2",
                webID: "WebID de acosador",
                password: ".",
            },
            status: 0
        })
        myFriendRequests.push({
            sender: {
                username: "security",
                webID: "WebID de acosador",
                password: ".",
            },
            receiver: {
                username: "security2",
                webID: "WebID de acosador",
                password: ".",
            },
            status: 0
        })
        return myFriendRequests;
    }

    const [friendRequests, setFriendRequests] = useState<Promise<FriendRequest[]>>(userFriendRequests());

    const searchUser = (username: string) => {
        searchUserByUsername(username).then((user) => {
            showAddFriendConfirm(user)
        })
    }

    const showAddFriendConfirm = async (user: User) => {
        let usr = await getUserDetails(user);
        Swal.fire({
            title: 'Mi perfil',
            html: ` <label for="name-gp" class="swal2-label">Nombre de usuario: </label>
                    <input type="text" id="name-gp" class="swal2-input" disabled placeholder=` + usr.username + `>
                    <label for="webid-gp" class="swal2-label">WebID: </label>
                    <input type="text" id="webid-gp" class="swal2-input" disabled placeholder=` + usr.webID + `>
                    <label for="biography-gp" class="swal2-label">Biografía: </label>
                    <textarea rows="4" id="biography-gp" class="swal2-input" disabled placeholder="Biografía..."></textarea>`,
            confirmButtonText: 'Editar',
            focusConfirm: false,
            imageUrl: url,
            imageWidth: 'auto',
            imageHeight: 200,
            imageAlt: 'Foto de perfil actual',
            preConfirm: () => {
                sendFriendRequest(user)
            }
        })
    }

    return (
        <>
            <OptionsBox>
                <Tooltip title="Friends">
                    <GroupIcon onClick={() => navigate("/home/friends/main")} htmlColor={op == "main" ? "#1f4a21" : "#81c784"} />
                </Tooltip>
                <Tooltip title="Friend requests">
                    <NotificationsActiveIcon onClick={() => navigate("/home/friends/requests")} htmlColor={op == "requests" ? "#1f4a21" : "#81c784"} />
                </Tooltip>
            </OptionsBox>
            {op != "requests" ?
                <>{/* CONVERTIR EN UN FORMULARIO */}
                    <AddFriendBox>
                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField label="Añadir un amigo" variant="standard" />
                        <Tooltip title="Add friend">
                            <Button>
                                <AddIcon htmlColor='#81c784' />
                            </Button>
                        </Tooltip>
                    </AddFriendBox>
                    <HorizontalDivider light color="#81c784" />
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
                            <Box ref={ref}>
                                <FriendsComponent friends={friends} daddy={ref} />
                            </Box>
                        </List>
                    </ScrollBox >
                </>
                :
                <>
                    <HorizontalDivider light color="#81c784" />
                    <ScrollBox>
                        <List
                            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    Solicitudes de amistad
                                </ListSubheader>
                            }
                        >
                            <Box ref={ref}>
                                <FriendRequestsComponent friendRequests={friendRequests} daddy={ref} />
                            </Box>
                        </List>
                    </ScrollBox >
                </>
            }
        </>)
}

const FriendRequests = (props: { friends: Promise<Friend[]>, daddy: any }) => {

    const [url, setUrl] = useState("../testUser.jfif");

    const navigate = useNavigate()

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

    const showFriendProfile = async (user: User) => {
        let usr = await getUserDetails(user);
        Swal.fire({
            title: 'Mi perfil',
            html: ` <label for="name-gp" class="swal2-label">Nombre de usuario: </label>
                    <input type="text" id="name-gp" class="swal2-input" disabled placeholder=` + usr.username + `>
                    <label for="webid-gp" class="swal2-label">WebID: </label>
                    <input type="text" id="webid-gp" class="swal2-input" disabled placeholder=` + usr.webID + `>
                    <label for="biography-gp" class="swal2-label">Biografía: </label>
                    <textarea rows="5" id="biography-gp" class="swal2-input" disabled placeholder="Biografía..."></textarea>`,
            focusConfirm: false,
            imageUrl: url,
            imageWidth: 'auto',
            imageHeight: 200,
            imageAlt: 'Foto de perfil actual',
        })
    }

    const showGroup = (group: Group, user: User) => {
        navigate("/home/friends/" + user.username + "/" + group.nombre);
        alert("Mostrando el grupo " + user.username + "/" + group.nombre)
    }

    props.friends.then((frds: Friend[]) => {
        if (open.length != frds.length) setOpen(generateOpen(frds.length))
        render(
            <>
                {frds.map((friend, i) => {
                    return (
                        <React.Fragment key={i}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Tooltip title="See friend profile">
                                        <PersonIcon onClick={() => showFriendProfile(friend.user)} />
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
                                                    <ListItemButton sx={{ pl: 4 }} onClick={() => showGroup(group, friend.user)}>
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
                        </React.Fragment>)
                })}
            </>, props.daddy.current)
    })
    return <></>
}