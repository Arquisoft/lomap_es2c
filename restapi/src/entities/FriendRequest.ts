import { User } from "../facade";
export { FriendRequest }
class FriendRequest {
    sender: User;
    receiver: User;
    status: number;
    constructor(sender: User, receiver: User, status: number) {
        this.sender = sender;
        this.receiver = receiver;
        this.status = status;
    }
}