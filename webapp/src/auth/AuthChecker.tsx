import { Navigate } from 'react-router-dom';

export const AuthChecker = (props: { children: any }) => {
    if (window.localStorage.getItem("isLogged") == "true") {
        return props.children;
    } else {
        return <Navigate to="/login" />
    }
}

