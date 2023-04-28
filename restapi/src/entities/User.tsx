import { User } from '../facade'
export { UserImpl }

class UserImpl implements User {
    username: string
    password: string
    webID: string
    description: string
    img: string;

    constructor(username: string, password: string, webid: string, description?: string, img?: string) {
        this.username = username
        this.password = password
        this.webID = webid
        this.img = img;

        if (description) {
            this.description = description;
        }
    }

}