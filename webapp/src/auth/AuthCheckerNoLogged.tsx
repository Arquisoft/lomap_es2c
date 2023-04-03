import { getUserInSesion } from 'api/api';
import React from 'react'
import { Navigate } from 'react-router-dom';
import { User } from 'shared/shareddtypes';

export const AuthCheckerNoLogged = (props: { children: any }) => {

    if (window.localStorage.getItem("isLogged") != "true") {
        return props.children;
    } else {
        return <Navigate to="/home" />
    }
}

