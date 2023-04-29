export { FriendRequest }
class FriendRequest {
    sender: string;
    receiver: string;
    status: number;
    constructor(sender: string, receiver: string, status: number) {
        this.sender = sender;
        this.receiver = receiver;
        this.status = status;
    }
}