import { readCookie } from 'utils/CookieReader';
import { FriendRequest, Group, SesionManager, User, User2 } from '../shared/shareddtypes';

export function getUserInSesion(): User {
    return readCookie("userInSession") !== "" ? JSON.parse(readCookie("userInSession")) : null as User;
}

export function logout() {
    document.cookie = "isLogged=; path=/"
    document.cookie = "userInSession=; path=/"
    document.cookie = "isPodLogged=; path=/"
    document.cookie = "userWebId=; path=/"
    document.cookie = "session=; path=/"
    document.cookie = "sameWebId=; path=/"
}

export async function signup(user: User): Promise<User> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint + '/sesionmanager/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'user': user })
    });

    switch (response.status) {
        case 404: {
            let res = await response.json();
            throw new Error(res.error);
        }
        case 200: return response.json();
        default: throw new Error("Unexpected error");
    }
}

export async function login(user: User): Promise<User> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint + '/sesionmanager/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'user': user })
    });

    switch (response.status) {
        case 404: {
            let res = await response.json();
            throw new Error(res.error);
        }
        case 200: return setSessionUser(response);
        default: throw new Error("Unexpected error");
    }
}

async function setSessionUser(response: Response): Promise<User> {
    let user = await response.json();
    document.cookie = "isLogged=true; path=/"
    document.cookie = "userInSession=" + JSON.stringify(user) + "; path=/"
    return user;
}

export async function editUserDetails(user: User): Promise<User> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint + '/usermanager/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'user': user })
    });
    //The objects returned by the api are directly convertible to User objects
    switch (response.status) {
        case 404: {
            let res = await response.json();
            throw new Error(res.error);
        }
        case 200: return setSessionUser(response);
        default: throw new Error("Unexpected error");
    }
}

export async function getMyFriends(user: User): Promise<User[]> {
    console.log("empieza")
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint + '/friendmanager/friends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'user': user })
    });

    switch (response.status) {
        case 404: {
            let res = await response.json();
            throw new Error(res.error);
        }
        case 200: return response.json();
        default: throw new Error("Unexpected error");
    }
}

export async function sendFriendRequest(user: User): Promise<String> {

    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint + '/friendmanager/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'receiver': user, 'sender': getUserInSesion() })
    });
    switch (response.status) {
        case 404: {
            let res = await response.json();
            throw new Error(res.error);
        }
        case 200: return response.json();
        default: throw new Error("Unexpected error");
    }
}

export async function searchUserByUsername(username: string): Promise<User> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api';
    try {
        let response = await fetch(`${apiEndPoint}/usermanager/searchUserByUsername?username=${username}`, { method: 'GET' })
            .then(async (res) => {
                if (!res.ok) {
                    let e = await res.json();
                    throw new Error(e.error.toString());
                }
                return res
            }).then((user) => {
                return user.json();
            })
        return response

    } catch (error) {
        throw error
    }
}

export async function updateRequest(req: FriendRequest, status: number) {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint + "/friendmanager/updaterequest/" + status, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "friendrequest": req })
    });
    //The objects returned by the api are directly convertible to User objects
    switch (response.status) {
        case 404: {
            let res = await response.json();
            throw new Error(res.error);
        }
        case 200: return response.json();
        default: throw new Error("Unexpected error");
    }
}

export async function addGroup(group: Group): Promise<Group[]> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint + '/mapmanager/addgroup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'group': group, "user": getUserInSesion() })
    });
    switch (response.status) {
        case 404: {
            let res = await response.json();
            throw new Error(res.error);
        }
        case 200: return response.json();
        default: throw new Error("Unexpected error");
    }
}

export async function getMyFriendRequests(user: User): Promise<FriendRequest[]> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint + '/friendmanager/friendrequests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'user': user })
    });
    switch (response.status) {
        case 404: {
            let res = await response.json();
            throw new Error(res.error);
        }
        case 200: return response.json();
        default: throw new Error("Unexpected error");
    }
}

export async function editPassword(oldpss: String, newpss: String): Promise<User> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint + '/usermanager/editpsw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'oldpss': oldpss, 'newpss': newpss, 'user': getUserInSesion() })
    });
    switch (response.status) {
        case 404: {
            let res = await response.json();
            throw new Error(res.error);
        }
        case 200: return response.json();
        default: throw new Error("Unexpected error");
    }
}

export async function deleteFriendApi(friend: User): Promise<FriendRequest> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint + '/friendmanager/deletefriend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'friend': friend, "user": getUserInSesion() })
    });
    switch (response.status) {
        case 404: {
            let res = await response.json();
            throw new Error(res.error);
        }
        case 200: return response.json();
        default: throw new Error("Unexpected error");
    }
}


// IMAGES

export async function getCloudinaryImageUrl(imageUrl: String): Promise<string> {
   
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    
    let response = await fetch(apiEndPoint + '/imagemanager/uploadimage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'imageUrl': imageUrl })
    });

    switch (response.status) {
        case 404: {
            let res = await response.json();
            throw new Error(res.error);
        }
        case 200: {
            const secure_url  = await response.toString();
            return secure_url;
        }
        default: throw new Error("Unexpected error. Failed to upload image");
    }
}
