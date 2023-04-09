import { useState } from "react";
import Swal from "sweetalert2";
import { readCookie } from "./CookieReader";
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import { Box, Tooltip, styled } from "@mui/material";

export function temporalSuccessMessage(text: String) {
    if (readCookie("notifications") != "mute")
        Swal.fire({
            position: 'top',
            title: text,
            showConfirmButton: false,
            timer: 3000,
            width: '98.7vw',
            backdrop: false,
            customClass: {
                popup: 'swal-popup',
                title: 'swal-text-success',
            },
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
            willOpen: function () {
                const swalContainer = Swal.getPopup();
                swalContainer.addEventListener('mouseenter', () => {
                    Swal.stopTimer();
                });
                swalContainer.addEventListener('mouseleave', () => {
                    Swal.resumeTimer();
                });
            }
        })
}

const NotiBox = styled(Box)({
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column'
})

export const NotificationManager = () => {

    const [muted, setMuted] = useState(readCookie("notifications") == "mute")

    function activeNotifications() {
        document.cookie = "notifications=; path=/"
        setMuted(false)
    }

    function muteNotifications() {
        document.cookie = "notifications=mute; path=/"
        setMuted(true)
    }
    return (
        <NotiBox>
            {muted ?
                < Tooltip title="Activar notificaciones" >
                    < NotificationsOffIcon onClick={activeNotifications} />
                </Tooltip >
                :
                <Tooltip title="Mutear notificaciones">
                    <NotificationsActiveIcon onClick={muteNotifications} />
                </Tooltip>
            }
        </NotiBox>
    )
}

export function temporalInfoMessage(text: String) {
    if (readCookie("notifications") != "mute")
        Swal.fire({
            position: 'top',
            title: text,
            showConfirmButton: false,
            timer: 3000,
            width: '98.7vw',
            backdrop: false,
            customClass: {
                popup: 'swal-popup',
                title: 'swal-text-info',
            },
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
            willOpen: function () {
                const swalContainer = Swal.getPopup();
                swalContainer.addEventListener('mouseenter', () => {
                    Swal.stopTimer();
                });
                swalContainer.addEventListener('mouseleave', () => {
                    Swal.resumeTimer();
                });
            }
        })
}

/*
*/