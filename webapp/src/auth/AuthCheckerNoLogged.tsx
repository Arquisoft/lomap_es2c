import { getUserInSesion } from 'api/api';
import React from 'react'
import { Navigate } from 'react-router-dom';
import { User } from 'shared/shareddtypes';
import { readCookie } from 'utils/CookieReader';

export const AuthCheckerNoLogged = (props: { children: any }) => {

    if (readCookie("isPodLogged") != "true") {
        return props.children;
    } else {
        return <Navigate to="/home" />
    }
}

