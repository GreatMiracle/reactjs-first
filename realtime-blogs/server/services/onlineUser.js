
class OnlineUsers {
    static onlineUsers = [];

    static addOnlineUser(userId) {
        if (!this.onlineUsers.includes(userId)) {
            this.onlineUsers.push(userId);
        }
    }

    static getOnlineUsers() {
        return this.onlineUsers;
    }
}

module.exports = OnlineUsers;