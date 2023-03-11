import { UserInt } from '../facade'
export { User }

class User implements UserInt {
    username: String
    password: String
    webID: String

    constructor(username: String, password: String, webid: String) {
        this.username = username
        this.password = password
        this.webID = webid
    }
}