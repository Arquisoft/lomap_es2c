import { Divider, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import { Friend, FriendRequest, Group, Place, User } from '../../../shared/shareddtypes';
import { searchUserByUsername, sendFriendRequest, updateRequest } from '../../../api/api';
import CloseIcon from '@mui/icons-material/Close';
import { render } from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import CheckIcon from '@mui/icons-material/Check';
import { temporalSuccessMessage } from 'utils/MessageGenerator';


const VerticalDivider = styled(Divider)({
    padding: '0em 0.4em 0em'
})


export const FriendRequestsComponent = (props: { friendRequests: Promise<FriendRequest[]>, daddy: any, refresh: any, refreshFriends: any }) => {

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

    const showFriendProfile = async (user: string) => {
        let usr = await searchUserByUsername(user);
        Swal.fire({
            title: 'Mi perfil',
            html: ` <label for="name-gp" class="swal2-label">Nombre de usuario: </label>
                    <input type="text" id="name-gp" class="swal2-input" disabled placeholder=` + usr.username + `>
                    <label for="biography-gp" class="swal2-label">Biografía: </label>
                    <textarea rows="5" id="biography-gp" class="swal2-input" disabled placeholder="` + (usr.description ? usr.description : "Escribe una descripción") + `"></textarea>`,
            focusConfirm: false,
            imageUrl: url,
            imageWidth: 'auto',
            imageHeight: 200,
            imageAlt: 'Foto de perfil actual',
        })
    }

    const declineRequest = (request: FriendRequest) => {
        updateRequest(request, -1)
        props.refresh();
        props.refreshFriends();
        temporalSuccessMessage("Solicitud de amistad de <em>" + request.sender + "</em> rechazada correctamente.");
    }

    const acceptRequest = (request: FriendRequest) => {
        updateRequest(request, 1)
        props.refresh();
        props.refreshFriends();
        temporalSuccessMessage("La solicitud de amistad de <em>" + request.sender + "</em> ha sido aceptada correctamente.");
    }

    props.friendRequests.then((frds: FriendRequest[]) => {
        if (open.length != frds.length) setOpen(generateOpen(frds.length))
        try {
            render(
                <>
                    {frds.map((request, i) => {
                        console.log(request)
                        return (
                            <React.Fragment key={i}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Tooltip title="See friend profile">
                                            <PersonIcon onClick={() => showFriendProfile(request.sender)} />
                                        </Tooltip>
                                    </ListItemIcon>
                                    <ListItemText primary={request.sender} />
                                    <Tooltip title="Decline request">
                                        <CloseIcon onClick={() => declineRequest(request)} htmlColor="red" />
                                    </Tooltip>
                                    <VerticalDivider orientation='vertical' flexItem />
                                    <Tooltip title="Accept request" sx={{ ml: "0.5em" }}>
                                        <CheckIcon onClick={() => acceptRequest(request)} htmlColor="green" />
                                    </Tooltip>
                                </ListItemButton>
                            </React.Fragment>)
                    })}
                </>, props.daddy.current)
        } catch (e: any) { }
    })
    return <></>
}
