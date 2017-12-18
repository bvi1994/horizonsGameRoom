module.exports = function(app) {
    const io = require('socket.io')(app);
    let room = "";
    io.on('connection', socket => {
<<<<<<< HEAD
        socket.on('username', username => {
            if (!username || !username.trim()) {
                return socket.emit('errorMessage', 'No username!');
            }
            socket.username = String(username);
            // console.log(socket.username);
        });

        socket.on('room', requestedRoom => {
            // console.log("requestedRoom", requestedRoom);
            if (!socket.username) {
                return socket.emit('errorMessage', 'Username not set!');
            }
            if (!requestedRoom) {
                return socket.emit('errorMessage', 'No room!');
            }
            if (socket.room) {
                // console.log("Left room");
                socket.leave(socket.room);
            }
            room = requestedRoom;
            socket.join(requestedRoom, () => {
                socket.to(requestedRoom).emit('message', {
=======
        socket.on('username', user => {
            if (!user || !user.trim()) {
                return socket.emit('errorMessage', 'No username!');
            }
            console.log('AAA: ', user);
            socket.username = String(user);
        });

        socket.on('room', requestedRoom => {
            console.log("requestedRoom", requestedRoom);
            if (!socket.username) {
                console.log(1);
                return socket.emit('errorMessage', 'Username not set!');
            }
            if (!requestedRoom) {
                console.log(2);
                return socket.emit('errorMessage', 'No room!');
            }
            if (socket.room) {
                console.log(3);
                socket.leave(socket.room);
            }
            socket.room = requestedRoom;
            console.log("socketROOM", socket.room);
            socket.join(socket.room, () => {
                console.log(4);
                io.sockets.in(socket.room).emit('message', {
>>>>>>> 168e9aba8606050a3efdef268f25a5d86573649c
                    username: 'System',
                    content: `${socket.username} has joined`
                });
            });
        });

        socket.on('message', message => {
<<<<<<< HEAD
            if (!room) {
                return socket.emit('errorMessage', 'No rooms joined!');
            }
            console.log("Socket.on message username: ", socket.username);
            socket.to(room).emit('message', {
=======
            console.log('socket.room: ', socket.room);
            if (!socket.room) {
                return socket.emit('errorMessage', 'No rooms joined!');
            }
            socket.to(socket.room).emit('message', {
>>>>>>> 168e9aba8606050a3efdef268f25a5d86573649c
                username: socket.username,
                content: message
            });
        });
    });
<<<<<<< HEAD
}
=======
};
>>>>>>> 168e9aba8606050a3efdef268f25a5d86573649c
