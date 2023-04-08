import { User } from "../facade";
export { FriendRequest }
class FriendRequest {
    sender: User;
    receiver: User;
    status: Number;
    constructor(sender: User, receiver: User, status: Number) {
        this.sender = sender;
        this.receiver = receiver;
        this.status = status;
    }
}