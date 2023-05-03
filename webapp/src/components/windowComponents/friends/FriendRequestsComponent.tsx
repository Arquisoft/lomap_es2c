import { Box, Divider, Tooltip } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import { FriendRequest } from '../../../shared/shareddtypes';
import { getUserInSesion, searchUserByUsername, updateRequest } from '../../../api/api';
import CloseIcon from '@mui/icons-material/Close';
import { render } from 'react-dom';
import Swal from 'sweetalert2';
import CheckIcon from '@mui/icons-material/Check';
import { temporalSuccessMessage } from 'utils/MessageGenerator';
import { showError } from 'utils/fieldsValidation';
import { useSession } from '@inrupt/solid-ui-react';
import { añadirPermisosAmigo } from 'podManager/MapManager';
import { getFriendProfilePhoto } from './getFriendProfilePhoto';



const VerticalDivider = styled(Divider)({
    padding: '0em 0.4em 0em'
})

const InfoBox = styled(Box)({
    color: '#1f4a21',
    textAlign: 'center'
})

export const FriendRequestsComponent = (props: { friendRequests: Promise<FriendRequest[]>, daddy: any, refresh: any, refreshFriends: any, stopLoading: any }) => {

    const { session } = useSession();

    const [open, setOpen] = React.useState("");

    const generateOpen = (elems: number) => {
        let str = ""
        for (let i = 0; i < elems; i++) {
            str += '0';
        }
        return str;
    }

    const showFriendProfile = async (user: string) => {

        await searchUserByUsername(user).then((usr) => {
            let imgUrl = getFriendProfilePhoto(usr.webID);

            let imgHtml = ` <img id="profileImageFriend" src="defaultUser2.png" alt="Foto de perfil" >`;
            if (imgUrl !== null) {
                imgHtml = ` <img id="profileImagePodFriend" src= ` + imgUrl + ` alt="Foto de perfil" crossOrigin="anonymous" />`
            }

            Swal.fire({
                title: 'Solicitud de amistad',
                html: imgHtml + `</br> <label for="name-gp" class="swal2-label">Nombre de usuario: </label>
                        <input type="text" id="name-gp" class="swal2-input" disabled placeholder=` + usr.username + `>
                        <label for="biography-gp" class="swal2-label">Biografía: </label>
                        <textarea rows="5" id="biography-gp" class="swal2-input" disabled placeholder="` + (usr.description ? usr.description : "Escribe una descripción") + `"></textarea>`,
                focusConfirm: false,
            }).then(() => { }).catch((e) => {
                showError("Error inesperado", e.message, Swal.close)
            })
        }).catch((err: any) => {
            showError("Error mostrar el perfil de " + user + ".", err.message, Swal.close);
        });
    }

    const declineRequest = (request: FriendRequest) => {
        updateRequest(request, -1).then((req) => {
            props.refresh();
            props.refreshFriends();
            temporalSuccessMessage("Solicitud de amistad de <em><b>" + req.sender + "</b></em> rechazada correctamente.");
        }).catch((err: any) => {
            showError("Error al rechazar la solicitud de " + request.sender + ".", err.message, Swal.close);
        });
    }

    const acceptRequest = (request: FriendRequest) => {
        updateRequest(request, 1).then((req) => {
            props.refresh();
            props.refreshFriends();
            searchUserByUsername(request.sender).then((friend) => {
                añadirPermisosAmigo(getUserInSesion().webID, friend.webID, session).then(() => {
                    temporalSuccessMessage("La solicitud de amistad de <em><b>" + request.sender + "</b></em> ha sido aceptada correctamente.");
                }).catch((err: any) => {
                    showError("Error procesar los permisos de Inrupt", err.message, Swal.close);
                });
            }).catch((e) => {
                showError("Error inesperado", e.message, Swal.close)
            })
        }).catch((err: any) => {
            showError("Error al aceptar la solicitud de " + request.sender + ".", err.message, Swal.close);
        });
    }

    props.friendRequests.then((frds: FriendRequest[]) => {
        if (open.length !== frds.length) setOpen(generateOpen(frds.length))
        try {
            render(
                <>
                    {frds.length > 0 ?
                        <React.Fragment key="loaded">
                            {frds.map((request, i) => {
                                return (
                                    <React.Fragment key={i}>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <Tooltip title="See friend profile">
                                                    <PersonIcon data-testid={request.sender} onClick={() => showFriendProfile(request.sender).then(() => { }).catch((e) => {
                                                        showError("Error inesperado", e.message, Swal.close)
                                                    })} />
                                                </Tooltip>
                                            </ListItemIcon>
                                            <ListItemText primary={request.sender} />
                                            <Tooltip title="Decline request">
                                                <CloseIcon data-testid={request.sender + "Decline"} onClick={() => declineRequest(request)} htmlColor="red" />
                                            </Tooltip>
                                            <VerticalDivider orientation='vertical' flexItem />
                                            <Tooltip title="Accept request" sx={{ ml: "0.5em" }}>
                                                <CheckIcon data-testid={request.sender + "Accept"} onClick={() => acceptRequest(request)} htmlColor="green" />
                                            </Tooltip>
                                        </ListItemButton>
                                    </React.Fragment>)
                            })}
                        </React.Fragment>
                        :
                        <InfoBox>
                            <p><b>No tienes solicitudes pendientes.</b></p><p>¿Ya añadiste a todos tus amigos?</p>
                        </InfoBox>
                    }
                </>, props.daddy.current)
            props.stopLoading()
        } catch (e: any) { }
    }).catch((e) => {
        showError("Error inesperado", e.message, Swal.close)
    })
    return (<></>)
}

