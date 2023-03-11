class Friendship {
    sender: User
    receiver: User
    status: Boolean

    constructor(sender: User, receiver: User, status: Boolean) {
        this.sender = sender
        this.receiver = receiver
        this.status = status
    }
}