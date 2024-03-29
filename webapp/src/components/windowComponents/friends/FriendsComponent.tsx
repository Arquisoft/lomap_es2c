import { Box, Divider, Tooltip } from '@mui/material'
import React from 'react'
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
import { Friend, Group, MarkerData, User } from '../../../shared/shareddtypes';
import CloseIcon from '@mui/icons-material/Close';
import { render } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { temporalSuccessMessage } from 'utils/MessageGenerator';
import { deleteFriendApi } from 'api/api';
import { showError } from 'utils/fieldsValidation';
import { useDispatch } from 'react-redux';
import { addFriendsMarkers, clearFriendsMarkers, setFriendGroupMarker, setFriendUsername } from 'utils/redux/action';
import { mostrarGrupoPod } from 'podManager/MapManager';
import { getFriendProfilePhoto } from './getFriendProfilePhoto';


const VerticalDivider = styled(Divider)({
    padding: '0em 0.4em 0em'
})

const InfoBox = styled(Box)({
    color: '#1f4a21',
    textAlign: 'center'
})


export const FriendsComponent = (props: { friends: Promise<Friend[]>, daddy: any, refresh: any, stopLoading: any }) => {

    const navigate = useNavigate()

    const dispatch = useDispatch();

    const [open, setOpen] = React.useState("");

    const generateOpen = (elems: number) => {
        let str = ""
        for (let i = 0; i < elems; i++) {
            str += '0';
        }
        return str;
    }

    const handleClick = (item: number) => {
        let c = open.charAt(item) === '0' ? '1' : '0';
        let newOpen = ""
        for (let i = 0; i < open.length; i++) {
            newOpen += (i === item ? c : open.charAt(i));
        }
        setOpen(newOpen)
    }

    const isOpen = (item: number) => {
        let c = open.charAt(item);
        if (c !== '0' && c !== '1') return false;
        return open.charAt(item) === '0' ? false : true;
    }

    const deleteFriend = (friend: User) => {
        showQuestion(friend)
    }

    const showQuestion = (friend: User) => {
        Swal.fire({
            title: "Eliminar amigo",
            html: `<p>¿Esta seguro de que quieres eliminar al amigo <em><b> ${friend.username}</b></em>?</p>`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#81c784',
            cancelButtonColor: 'grey',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Volver'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteFriendApi(friend).then(() => {
                    props.refresh()
                    temporalSuccessMessage("Tú amigo <em><b>" + friend.username + "</b></em> ha sido eliminado correctamente.");
                }).catch((err: any) => {
                    showError("Error al eliminar al amigo " + friend.username + ".", err.message, Swal.close);
                });;
            } else {
                Swal.close();
            }
        }).catch((e) => {
            showError("Error inesperado", e.message, Swal.close)
        })
    }

    const showFriendProfile = (user: User) => {
        let imgUrl = getFriendProfilePhoto(user.webID).then(() => {
            let imgHtml = ` <img id="profileImageFriend" src="defaultUser2.png" alt="Foto de perfil" >`;
            if (imgUrl !== null) {
                imgHtml = ` <img id="profileImagePodFriend" src= ` + imgUrl + ` alt="Foto de perfil" crossOrigin="anonymous" />`
            }
            let usr = user;
            Swal.fire({
                title: 'Perfil de amigo',
                html: imgHtml + `</br>  <label for="name-gp" class="swal2-label">Nombre de usuario: </label>
                    <input type="text" id="name-gp" class="swal2-input" disabled placeholder=` + usr.username + `>
                    <label for="biography-gp" class="swal2-label">Biografía: </label>
                    <textarea rows="5" id="biography-gp" class="swal2-input" disabled placeholder="` + (usr.description ? usr.description : "Escribe una descripción") + `"></textarea>`,
                focusConfirm: false,
                confirmButtonText: '¡Vale!',
                confirmButtonColor: '#81c784',
            }).then(() => { }).catch((e) => {
                showError("Error inesperado", e.message, Swal.close)
            })
        }).catch((e) => {
            showError("Error inesperado", e.message, Swal.close)
        })
    }

    const showGroup = (group: Group, user: User) => {
        navigate("/home/friends/showgroup/" + user.username + "/" + group.name);

        dispatch(clearFriendsMarkers())
        dispatch(setFriendGroupMarker(group.name as string))
        dispatch(setFriendUsername(user.username as string))

        const groupPlaces = mostrarGrupoPod(group, null);

        const groupMarkers: MarkerData[] = [];

        groupPlaces.forEach((place) => {
            groupMarkers.push({
                position: [parseFloat(place.latitude), parseFloat(place.longitude)],
                name: place.nombre,
                type: "friend",
                iconUrl: "friendsMarker.png",
                category: place.category,
                imageUrl: place.images[0]?.url
            })
        })

        dispatch(addFriendsMarkers(groupMarkers));

        temporalSuccessMessage("Se esta mostrando el grupo <b><em>" + group.name + "</em></b> de <b><em>" + user.username + "</em></b>")
    }

    props.friends.then((frds: Friend[]) => {
        if (open.length !== frds.length) setOpen(generateOpen(frds.length))
        try {
            render(
                <>
                    {frds.length > 0 ?
                        <React.Fragment key="friend-render">
                            {frds.map((friend, i) => {
                                return (
                                    <React.Fragment key={i}>
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <Tooltip title="See friend profile">
                                                    <PersonIcon data-testid={friend.user.username} onClick={() => showFriendProfile(friend.user)} />
                                                </Tooltip>
                                            </ListItemIcon>
                                            <ListItemText primary={friend.user.username} />
                                            {friend.groups.length > 0 ?
                                                isOpen(i) ?
                                                    <ExpandLess onClick={() => handleClick(i)} />
                                                    :
                                                    <ExpandMore data-testid={friend.user.username + "xm"} onClick={() => handleClick(i)} />
                                                :
                                                <></>
                                            }
                                            <VerticalDivider orientation='vertical' flexItem />
                                            <Tooltip title="Delete friend" sx={{ ml: "0.5em" }}>
                                                <CloseIcon data-testid={"deleteFriend" + friend.user.username} onClick={() => deleteFriend(friend.user)} htmlColor="red" />
                                            </Tooltip>
                                        </ListItemButton>
                                        <Collapse in={isOpen(i)} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                {friend.groups.map((group, j) => {
                                                    return (
                                                        <React.Fragment key={i + "-" + j}>
                                                            <Tooltip title="Show on map">
                                                                <ListItemButton data-testid={friend.user.username + group.name} sx={{ pl: 4 }} onClick={() => showGroup(group, friend.user)}>
                                                                    <ListItemIcon>
                                                                        <MapIcon />
                                                                    </ListItemIcon>
                                                                    <ListItemText primary={group.name} />
                                                                </ListItemButton>
                                                            </Tooltip>
                                                        </React.Fragment>
                                                    )
                                                })}
                                            </List>
                                        </Collapse>
                                    </React.Fragment>)
                            })}
                        </React.Fragment>
                        :
                        <InfoBox>
                            <p><b>No tienes amigos añadidos.</b></p><p>¡Corre a preguntarles su nombre de usuario!</p>
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
