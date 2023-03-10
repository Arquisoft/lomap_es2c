import { UserManager } from '../../../restapi/src/controllers/UserManager';
import { SesionManager, User, User2 } from '../shared/shareddtypes';

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

export async function getUserInSesion(): Promise<User> {
    const apiEndPoint = process.env.REACT_APP_API_URI || 'http://localhost:5000/api'
    let response = await fetch(apiEndPoint + '/sesionmanager/user');
    //The objects returned by the api are directly convertible to User objects
    return response.json()
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
    return response.json()
}