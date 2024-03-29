import { Box, Button, CircularProgress, Divider, TextField, Tooltip } from '@mui/material'
import { useState } from 'react'
import { styled } from '@mui/material/styles';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import { Friend, FriendRequest, Group, User } from '../../../shared/shareddtypes';
import { getMyFriendRequests, getMyFriends, getUserInSesion, searchUserByUsername, sendFriendRequest } from '../../../api/api';
import AddIcon from '@mui/icons-material/Add';
import { AccountCircle } from '@mui/icons-material';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FriendsComponent } from './FriendsComponent';
import { FriendRequestsComponent } from './FriendRequestsComponent'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import GroupIcon from '@mui/icons-material/Group';
import { useForm } from "react-hook-form";
import { temporalSuccessMessage } from 'utils/MessageGenerator';
import { showError } from 'utils/fieldsValidation';
import { verMapaDeAmigo } from 'podManager/MapManager';
import { ErrorPage } from 'components/mainComponents/ErrorPage';
import { ShowFriendGroup } from '../groups/groupViews/ShowFriendGroup';
import { useSession } from '@inrupt/solid-ui-react';
import ShowFriendPlace from '../places/placeViews/ShowFriendPlace';
import { getFriendProfilePhoto } from './getFriendProfilePhoto';

const ScrollBox = styled(Box)({
    maxHeight: '50vh',
    overflow: 'auto',
    scrollbarColor: '#81c784 white',
})

const AddFriendBox = styled(Box)({
    padding: '1em 0em 1em',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
})

const OptionsBox = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row'
})

const HorizontalDivider = styled(Divider)({
    marginTop: "1.51em",
    width: '100%'
})

const BoxCircularProgress = styled(Box)({
    paddingTop: '3em',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
})

export const FriendManagerPanel = () => {

    const { session } = useSession();

    const [loading, setLoading] = useState(true)

    const ref = useRef<HTMLDivElement>(null);

    const { op } = useParams()

    const navigate = useNavigate()

    const userFriends = async () => {

        let myFriends: Friend[] = [];
        let user = getUserInSesion();
        await getMyFriends(user).then(async function (friends) {
            for (let i = 0; i < friends.length; i++) {
                let friendGroups: Group[] = []
                await verMapaDeAmigo(friends[i], session).then(function (groups) {
                    for (let j = 0; j < groups.length; j++)
                        friendGroups.push(groups[j]);
                })
                myFriends.push({
                    "user": friends[i],
                    "groups": friendGroups,
                });
            }
        }).catch((err: any) => {
            showError("Error al listar tus amigos.", err.message, Swal.close);
        });
        return myFriends;
    }

    const [friends, setFriends] = useState<Promise<Friend[]>>(userFriends());

    const userFriendRequests = async (): Promise<FriendRequest[]> => {
        let myFriendRequests: FriendRequest[] = [];
        let user = getUserInSesion();
        await getMyFriendRequests(user).then((friendRequests) => {
            for (let i = 0; i < friendRequests.length; i++)
                myFriendRequests.push(friendRequests[i]);
        }).catch((err: any) => {
            showError("Error al listar tus solicitudes de amistad", err.message, Swal.close);
        });;
        return myFriendRequests;
    }

    const [friendRequests, setFriendRequests] = useState<Promise<FriendRequest[]>>(userFriendRequests());
    const { register, handleSubmit, formState: { errors } } = useForm<User>();


    const onSubmit = handleSubmit(data => searchUser(data));

    const searchUser = async (user: User) => {
        await searchUserByUsername(user.username).then(async (res) => {
            if (res !== null && res.username !== null)
                await showAddFriendConfirm(res)
        }).catch((err: any) => {
            showError("Error al buscar el usuario " + user.username + ".", err.message, Swal.close);
        });
    }

    const showAddFriendConfirm = async (user: User) => {
        let imgUrl = await getFriendProfilePhoto(user.webID);
        let imgHtml = ` <img id="profileImageFriend" src="defaultUser2.png" alt="Foto de perfil" >`;
        if (imgUrl !== null) {
            imgHtml = ` <img id="profileImagePodFriend" src= ` + imgUrl + ` alt="Foto de perfil" crossOrigin="anonymous" />`
        }
        let usr = user;
        Swal.fire({
            title: '¿Enviar solicitud?',
            html: imgHtml + `</br> <label for="name-gp" class="swal2-label">Nombre de usuario: </label>
                    <input type="text" id="name-gp" class="swal2-input" disabled placeholder=` + usr.username + `>
                    <label for="biography-gp" class="swal2-label">Biografía: </label>
                    <textarea rows="4" id="biography-gp" class="swal2-input" disabled placeholder="` + (user.description ? user.description : "Escribe una descripción") + `"></textarea>`,
            confirmButtonText: 'Enviar',
            confirmButtonColor: "#81c784",
            focusConfirm: false,
            preConfirm: () => {
                sendFriendRequest(user).then(() => {
                    temporalSuccessMessage("La solicitud de amistad a <em><b>" + user.username + "</b></em> ha sido enviada correctamente.")
                }).catch((err: any) => {
                    showError("Error al enviar la solicitud de amistad.", err.message, Swal.close);
                });
            }
        }).then(() => { }).catch((e) => {
            showError("Error inesperado.", e.message, Swal.close);
        })
    }

    return (
        <>
            {op === "showgroup" ?
                <ShowFriendGroup />
                :
                (op === "showplace" ?
                    <ShowFriendPlace />
                    :
                    <>
                        <OptionsBox>
                            <Tooltip title="Friends">
                                <GroupIcon data-testid="goFriendsIcon" onClick={() => navigate("/home/friends/main")} htmlColor={op === "main" ? "#1f4a21" : "#81c784"} />
                            </Tooltip>
                            <Tooltip title="Friend requests">
                                <NotificationsActiveIcon data-testid="goRequestsIcon" onClick={() => navigate("/home/friends/requests")} htmlColor={op === "requests" ? "#1f4a21" : "#81c784"} />
                            </Tooltip>
                        </OptionsBox>
                        <HorizontalDivider light color="#81c784" />
                        {op === "main" ?
                            <>
                                <AddFriendBox data-testid="addFriendForm" component="form" onSubmit={onSubmit}>
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
                                <ScrollBox>
                                    <List
                                        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                        aria-labelledby="nested-list-subheader"
                                        subheader={
                                            <ListSubheader component="div" id="nested-list-subheader">
                                                Tus amigos
                                            </ListSubheader>
                                        }
                                    >
                                        {loading &&
                                            <BoxCircularProgress>
                                                <CircularProgress size={100} color="primary" />
                                            </BoxCircularProgress>
                                        }
                                        <Box ref={ref}>
                                            <FriendsComponent friends={friends} daddy={ref} refresh={() => setFriends(userFriends())} stopLoading={() => setLoading(false)} />
                                        </Box>
                                    </List>
                                </ScrollBox >
                            </>
                            :
                            (op === "requests" ?
                                <>
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
                                            {loading &&
                                                <BoxCircularProgress>
                                                    <CircularProgress size={100} color="primary" />
                                                </BoxCircularProgress>
                                            }
                                            <Box ref={ref}>
                                                <FriendRequestsComponent friendRequests={friendRequests} daddy={ref} stopLoading={() => setLoading(false)} refresh={() => setFriendRequests(userFriendRequests())} refreshFriends={() => setFriends(userFriends())} />
                                            </Box>
                                        </List>
                                    </ScrollBox >
                                </>
                                :
                                <ErrorPage></ErrorPage>
                            )
                        }
                    </>
                )
            }
        </>
    )
}