module.exports = function(app) {
    const io = require('socket.io')(app);
    io.on('connection', socket => {
        socket.on('username', user => {
            if (!user || !user.trim()) {
                return socket.emit('errorMessage', 'No username!');
            }
            socket.username = String(user);
        });

        socket.on('room', requestedRoom => {
            console.log("requestedRoom", requestedRoom);
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
                socket.to(socket.room).emit('message', {
                    username: 'System',
                    content: `${socket.username} has joined`
                });
            });
        });

        socket.on('message', message => {
            console.log(socket.room);
            if (!socket.room) {
                return socket.emit('errorMessage', 'No rooms joined!');
            }
            socket.to(socket.room).emit('message', {
                username: socket.username,
                content: message
            });
        });
    });
};
