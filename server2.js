module.exports = function(app, io) {
    io.on('connection', socket => {
        socket.on('username', user => {
            if (!user || !user.trim()) {
                return socket.emit('errorMessage', 'No username!');
            }
            socket.username = String(user);
        });

        socket.on('room', requestedRoom => {
            if (!socket.username) {
                return socket.emit('errorMessage', 'Username not set!');
            }
            if (!requestedRoom) {
                return socket.emit('errorMessage', 'No room!');
            }
            if (socket.room) {
                socket.leave(socket.room);
            }
            socket.room = requestedRoom;
            socket.join(socket.room, () => {
                io.sockets.in(socket.room).emit('message', {
                    username: 'System',
                    content: `${socket.username} has joined`
                });
            });
        });

        socket.on('message', message => {
            if (!socket.room) {
                return socket.emit('errorMessage', 'No rooms joined!');
            }
            socket.to(socket.room).emit('message', {
                username: socket.username,
                content: message.content,
                photo: message.photo
            });
        });
    });
};
