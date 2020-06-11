const chatModel = require('../models/chat/chat.model'),
    userModel = require('../models/userAPI/user.model')

module.exports = io => {
    const users = [],
        privateMessage = "private-message",
        typing = "typing",
        newUser = "newUser",
        chat = "chat",
        userOnline = 'userOnline';

    io.on('connection', (socket) => {
        socket.on(newUser, userId => {
            users[userId] = socket.id;
            userModel.userOnline(userId);
            socket.on('disconnect', () => {
                userModel.userOffline(userId);
            })
        })
        socket.on(chat, async message => {
            let socketId = users[message.receiveUser]
            await chatModel.insertMessage(message.sendUser, message.receiveUser, message.message, message.time);
            socket.to(socketId).emit(privateMessage, message)
            socket.emit(privateMessage, message)
        })
        socket.on(typing, data => {
            let socketId = users[data.receiveUser]
            socket.to(socketId).emit(typing, data)
        })
    })
}