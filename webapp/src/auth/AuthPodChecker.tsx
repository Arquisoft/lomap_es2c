import { Navigate } from 'react-router-dom';
import { readCookie } from 'utils/CookieReader';

export const AuthPodChecker = (props: { children: any }) => {
    console.log(readCookie("isPodLogged"))
    if (readCookie("isPodLogged") === "true") {
        return props.children;
    } else {
        return <Navigate to="/login" />
    }
}

