import { readCookie } from 'utils/CookieReader';
import { FriendRequest, Group, SesionManager, User, User2 } from '../shared/shareddtypes';

export async function addUser(user: User2): Promise<boolean> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint + '/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'name': user.name, 'email': user.email })
    });
    if (response.status === 200)
        return true;
    else
        return false;
}

export async function getUsers(): Promise<User2[]> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint + '/users/list');
    //The objects returned by the api are directly convertible to User objects
    return response.json()
}

export function getUserInSesion(): User {
    return JSON.parse(readCookie("userInSession") ?? null) as User;
}

export function logout() {
    document.cookie = "isLogged=; path=/"
    document.cookie = "userInSession=; path=/"
    document.cookie = "isPodLogged=; path=/"
    document.cookie = "userWebId=; path=/"
}

export async function signup(user: User): Promise<User> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint + '/sesionmanager/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'user': user })
    });
    //The objects returned by the api are directly convertible to User objects
    return response.json()
}

export async function login(user: User): Promise<User> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint + '/sesionmanager/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'user': user })
    });
    //The objects returned by the api are directly convertible to User objects
    switch (response.status) {
        case 505: throw new Error("La contraseña y usuario introducidos no coinciden.");
        case 506: throw new Error("La contraseña y usuario introducidos no coinciden.");
        case 507: throw new Error("La contraseña y usuario introducidos no coinciden.");
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
    return setSessionUser(response);
}

export async function getMyGroups(user: User): Promise<Group[]> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    // let response = await fetch(apiEndPoint + '/mapmanager/usermap', {
    //   method: 'POST',
    //  headers: { 'Content-Type': 'application/json' },
    // body: JSON.stringify({ 'user': user })
    //});
    return []
}
export async function getMyFriends(user: User): Promise<User[]> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint + '/friendmanager/friends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'user': user })
    });
    return response.json()
}

export async function sendFriendRequest(user: User): Promise<String> {
    console.log("llamando a añadir amigo1")
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint + '/friendmanager/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'receiver': user, 'sender': getUserInSesion() })
    });
    return response.json()
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
    return response.json()
}

export async function addGroup(group: Group): Promise<Group[]> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint + '/mapmanager/addgroup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'group': group, "user": getUserInSesion() })
    });
    return response.json()
}

export async function getMyFriendRequests(user: User): Promise<FriendRequest[]> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint + '/friendmanager/friendrequests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'user': user })
    });
    return response.json()
}

export async function editPassword(oldpss: String, newpss: String): Promise<User> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint + '/usermanager/editpsw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'oldpss': oldpss, 'newpss': newpss, 'user': getUserInSesion() })
    });
    console.log(oldpss + "-" + newpss)
    let user = { 'username': 'editpss', 'webID': 'editpss', 'description': 'editpss', 'img': 'editpss', 'password': '..' }
    window.localStorage.setItem('userInSession', JSON.stringify(user));
    window.localStorage.setItem('isLogged', "true");
    return user
}

export async function deleteFriend(friend: User): Promise<FriendRequest> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint + '/friendmanager/deletefriend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'friend': friend, "user": getUserInSesion() })
    });
    return response.json()
}