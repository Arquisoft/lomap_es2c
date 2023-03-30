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
import { getMyFriends, getMyGroups, getUserDetails, getUserInSesion, searchUserByUsername, sendFriendRequest } from '../../../api/api';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import { AccountCircle, FireHydrantAltOutlined } from '@mui/icons-material';
import { render } from 'react-dom';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import InputAdornment from '@mui/material/InputAdornment';
import { SubmitHandler, useForm } from 'react-hook-form';
import CheckIcon from '@mui/icons-material/Check';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';


const VerticalDivider = styled(Divider)({
    padding: '0em 0.4em 0em'
})


export const FriendRequestsComponent = (props: { friendRequests: Promise<FriendRequest[]>, daddy: any }) => {

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

    const declineRequest = (request: FriendRequest) => {
        alert("Declined")
    }

    const acceptRequest = (request: FriendRequest) => {
        alert("Acepted")
    }

    props.friendRequests.then((frds: FriendRequest[]) => {
        if (open.length != frds.length) setOpen(generateOpen(frds.length))
        render(
            <>
                {frds.map((request, i) => {
                    return (
                        <React.Fragment key={i}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Tooltip title="See friend profile">
                                        <PersonIcon onClick={() => showFriendProfile(request.sender)} />
                                    </Tooltip>
                                </ListItemIcon>
                                <ListItemText primary={request.sender.username} />
                                <Tooltip title="Decline request">
                                    <CloseIcon onClick={() => declineRequest(request)} htmlColor="red" />
                                </Tooltip>
                                <VerticalDivider orientation='vertical' flexItem />
                                <Tooltip title="Accept request">
                                    <CheckIcon onClick={() => acceptRequest(request)} htmlColor="green" />
                                </Tooltip>
                            </ListItemButton>
                        </React.Fragment>)
                })}
            </>, props.daddy.current)
    })
    return <></>
}
