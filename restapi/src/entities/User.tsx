import { User } from '../facade'
export { UserImpl }

class UserImpl implements User {
    username: string
    password: string
    webID: string

    img:String;

    constructor(username: string, password: string, webid: string,img?:string) {
        this.username = username
        this.password = password
        this.webID = webid
        if(img){
            this.img=img;
        }
    }

}