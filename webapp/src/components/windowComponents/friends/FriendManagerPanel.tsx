import { Box, Button, Divider, TextField, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import MapIcon from '@mui/icons-material/Map';
import PersonIcon from '@mui/icons-material/Person';
import { Friend, FriendRequest, Group, Place, User } from '../../../shared/shareddtypes';
import { getMyFriendRequests, getMyFriends, getMyGroups, getUserInSesion, searchUserByUsername, sendFriendRequest } from '../../../api/api';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { AccountCircle, FireHydrantAltOutlined } from '@mui/icons-material';
import { render } from 'react-dom';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FriendsComponent } from './FriendsComponent';
import { FriendRequestsComponent } from './FriendRequestsComponent'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import GroupIcon from '@mui/icons-material/Group';
import { useForm, SubmitHandler } from "react-hook-form";

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
                    "groups": friendGroups,
                });
            }
        })
        return myFriends;
    }

    const [friends, setFriends] = useState<Promise<Friend[]>>(userFriends());

    const userFriendRequests = async (): Promise<FriendRequest[]> => {

        let myFriendRequests: FriendRequest[] = [];
        let user = getUserInSesion();
        await getMyFriendRequests(user).then((friendRequests) => {
            for (let i = 0; i < friendRequests.length; i++)
                myFriendRequests.push(friendRequests[i]);
        });
        return myFriendRequests;
    }

    const [friendRequests, setFriendRequests] = useState<Promise<FriendRequest[]>>(userFriendRequests());
    const { register, handleSubmit, formState: { errors } } = useForm<User>();


    const onSubmit: SubmitHandler<User> = data => searchUser(data);

    const searchUser = (user: User) => {
        try {
            searchUserByUsername(user.username).then((res) => {
                if (res != null && res.username != null)
                    showAddFriendConfirm(res)
            })
                .catch((err: Error) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err.message,
                    })
                });

        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se ha enviado la solicitud de amistad',
            })
        }

    }

    const showAddFriendConfirm = async (user: User) => {
        let usr = user;
        Swal.fire({
            title: 'Mi perfil',
            html: ` <label for="name-gp" class="swal2-label">Nombre de usuario: </label>
                    <input type="text" id="name-gp" class="swal2-input" disabled placeholder=` + usr.username + `>
                    <label for="webid-gp" class="swal2-label">WebID: </label>
                    <input type="text" id="webid-gp" class="swal2-input" disabled placeholder=` + usr.webID + `>
                    <label for="biography-gp" class="swal2-label">Biografía: </label>
                    <textarea rows="4" id="biography-gp" class="swal2-input" disabled placeholder="` + (user.description ? user.description : "Escribe una descripción") + `"></textarea>`,
            confirmButtonText: 'Enviar',
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
                <>
                    <AddFriendBox component="form" onSubmit={handleSubmit(onSubmit)}>
                        <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                        <TextField
                            label="Añadir un amigo"
                            variant="standard"
                            placeholder="Nombre de usuario"
                            {...register("username", { maxLength: 20 })}
                            helperText={errors.username ? 'Debe introducir un nombre de usuario válido' : ''}
                        />
                        <Tooltip title="Add friend">
                            <Button type="submit">
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
                                <FriendsComponent friends={friends} daddy={ref} refresh={() => setFriends(userFriends())} />
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
                                <FriendRequestsComponent friendRequests={friendRequests} daddy={ref} refresh={() => setFriendRequests(userFriendRequests())} refreshFriends={() => setFriends(userFriends())} />
                            </Box>
                        </List>
                    </ScrollBox >
                </>
            }
        </>)
}