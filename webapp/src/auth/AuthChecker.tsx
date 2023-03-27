import { getUserInSesion } from 'api/api';
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { User } from 'shared/shareddtypes';

export const AuthChecker = (props: { children: any }) => {
    const navigate = useNavigate();

    let user: User = getUserInSesion()
    console.log(user)
    if (user != null) {
        return props.children;
    } else {
        return <Navigate to="/login" />
    }
}

