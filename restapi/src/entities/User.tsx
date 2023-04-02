import { User } from '../facade'
export { UserImpl }

class UserImpl implements User {
    username: String
    password: String
    webID: String

    img:String;

    constructor(username: String, password: String, webid: String,img?:String) {
        this.username = username
        this.password = password
        this.webID = webid
        if(img){
            this.img=img;
        }
    }

}