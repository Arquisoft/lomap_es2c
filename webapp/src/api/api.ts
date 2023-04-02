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
    return JSON.parse(window.localStorage.getItem('userInSession') ?? null) as User;
}

export function logout() {
    window.localStorage.removeItem('userInSession');
    window.localStorage.setItem('isLogged', "false");
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
        case 200: window.localStorage.setItem('userInSession', JSON.stringify(user));
            window.localStorage.setItem('isLogged', "true");
            ; return response.json();
        default: throw new Error("Unexpected error");
    }
}

export async function getUserDetails(user: User): Promise<User> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint + '/usermanager/details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'user': user })
    });
    //The objects returned by the api are directly convertible to User objects
    return response.json()
}

export async function editUserDetails(user: User): Promise<User> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint + '/usermanager/edit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'user': user })
    });
    //The objects returned by the api are directly convertible to User objects
    return response.json()
}

export async function getMyGroups(user: User): Promise<Group[]> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint + '/mapmanager/usermap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'user': user })
    });
    return response.json()
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
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint + '/friendmanager/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'user': user })
    });
    return response.json()
}

export async function searchUserByUsername(username: string): Promise<User> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint + '/usermanager/find/' + username);
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