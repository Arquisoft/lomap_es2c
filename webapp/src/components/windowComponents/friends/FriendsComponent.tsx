import { Divider, Tooltip } from '@mui/material'
import React, { createRef, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
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
import CloseIcon from '@mui/icons-material/Close';
import { render } from 'react-dom';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { temporalSuccessMessage } from 'utils/MessageGenerator';


const VerticalDivider = styled(Divider)({
    padding: '0em 0.4em 0em'
})


export const FriendsComponent = (props: { friends: Promise<Friend[]>, daddy: any, refresh: any }) => {

    const [url, setUrl] = useState("../testUser.jfif");

    const navigate = useNavigate()

    const [open, setOpen] = React.useState("");

    const generateOpen = (elems: number) => {
        let str = ""
        for (let i = 0; i < elems; i++) {
            str += '0';
        }
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

    const deleteFriend = (friend: User) => {
        alert("eliminar amigo " + friend);
        props.refresh()
        temporalSuccessMessage("Tú amigo <em>" + friend.username + "</em> ha sido eliminado correctamente.");
    }

    const showFriendProfile = async (user: User) => {
        let usr = user;
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

    const showGroup = (group: Group, user: User) => {
        navigate("/home/friends/" + user.username + "/" + group.name);
        alert("Mostrando el grupo " + user.username + "/" + group.name)
    }

    props.friends.then((frds: Friend[]) => {
        if (open.length != frds.length) setOpen(generateOpen(frds.length))
        try {
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
                                        <ExpandLess onClick={() => handleClick(i)} />
                                        :
                                        <ExpandMore onClick={() => handleClick(i)} />
                                    }
                                    <VerticalDivider orientation='vertical' flexItem />
                                    <Tooltip title="Delete friend" sx={{ ml: "0.5em" }}>
                                        <CloseIcon onClick={() => deleteFriend(friend.user)} htmlColor="red" />
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
        } catch (e: any) { }
    })
    return <></>
}
