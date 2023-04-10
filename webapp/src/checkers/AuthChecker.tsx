import { Navigate } from 'react-router-dom';
import { readCookie } from 'utils/CookieReader';

export const AuthChecker = (props: { children: any }) => {
    if (readCookie("isLogged") == "true") {
        return props.children;
    } else {
        return <Navigate to="/login" />
    }
}

