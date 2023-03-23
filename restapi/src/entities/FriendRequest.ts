import {User} from "../facade";
export { FriendRequest }
class FriendRequest{
    sender:User;
    receiver:User;
    status:Boolean;
    constructor(sender:User,receiver:User,status:Boolean) {
        this.sender=sender;
        this.receiver=receiver;
        this.status=status;
    }
}