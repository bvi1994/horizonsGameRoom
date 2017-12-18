module.exports = function(app) {
    const io = require('socket.io')(app);
    let room = "";
    let username = "";
    io.on('connection', socket => {
        socket.on('username', user => {
            if (!user || !user.trim()) {
                return socket.emit('errorMessage', 'No username!');
            }
            username = String(user);
        });

        socket.on('room', requestedRoom => {
            console.log("requestedRoom", requestedRoom);
            if (!username) {
                return socket.emit('errorMessage', 'Username not set!');
            }
            if (!requestedRoom) {
                return socket.emit('errorMessage', 'No room!');
            }
            if (room) {
                socket.leave(room);
            }
            room = requestedRoom;
            socket.join(room, () => {
                socket.to(room).emit('message', {
                    username: 'System',
                    content: `${username} has joined`
                });
            });
        });

        socket.on('message', message => {
            if (!room) {
                return socket.emit('errorMessage', 'No rooms joined!');
            }
            socket.to(room).emit('message', {
                username: username,
                content: message
            });
        });
    });
};
