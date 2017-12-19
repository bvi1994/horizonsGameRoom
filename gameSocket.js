module.exports = function(app) {
    const io = require('socket.io')(app);
    const games = new Map();
    //don't use username, room, message
    io.on('connection', socket => {
        // socket.on('username', user => {
        //     if (!user || !user.trim()) {
        //         return socket.emit('errorMessage', 'No username!');
        //     }
        //     console.log('AAA: ', user);
        //     socket.username = String(user);
        // });
        //
        // socket.on('room', requestedRoom => {
        //     console.log("requestedRoom", requestedRoom);
        //     if (!socket.username) {
        //         console.log(1);
        //         return socket.emit('errorMessage', 'Username not set!');
        //     }
        //     if (!requestedRoom) {
        //         console.log(2);
        //         return socket.emit('errorMessage', 'No room!');
        //     }
        //     if (socket.room) {
        //         console.log(3);
        //         socket.leave(socket.room);
        //     }
        //     socket.room = requestedRoom;
        //     console.log("socketROOM", socket.room);
        //     socket.join(socket.room, () => {
        //         console.log(4);
        //         io.sockets.in(socket.room).emit('message', {
        //             username: 'System',
        //             content: `${socket.username} has joined`
        //         });
        //     });
        // });
        //
        // socket.on('message', message => {
        //     console.log('socket.room: ', socket.room);
        //     if (!socket.room) {
        //         return socket.emit('errorMessage', 'No rooms joined!');
        //     }
        //     socket.to(socket.room).emit('message', {
        //         username: socket.username,
        //         content: message
        //     });
        // });
        socket.on('createGame', idGame => {
            socket.game = idGame.username + idGame.game;
            socket.join(socket.game);
            games.set(socket.game, idGame.state);
        });
        socket.on('gameMove', move => {
            if (!socket.username) {
                console.log(1);
                return socket.emit('errorMessage', 'Username not set!');
            }
            if (!socket.game) {
                return socket.emit('errorMessage', 'No game room created.');
            }
            if(!move) {
                return socket.emit('errorMessage', 'No move!');
            }
            games.set(socket.game, move);
            io.sockets.in(socket.game).emit('move', move);
        });
        socket.on('watch', game => {
            if(!game) {
                return socket.emit('errorMessage', 'Invalid game room name');
            }
            if(!io.sockets.adaptor.rooms[game]) {
                return socket.emit('errorMessage', 'Game room does not exist.');
            }
            socket.join(game);
            socket.emit('gameMove', games.get(game));
        });
        socket.on('gameOver', game => {
            if(!game) {
                return socket.emit('errorMessage', 'Invalid game room name');
            }
            if(!io.sockets.adaptor.rooms[game]) {
                return socket.emit('errorMessage', 'Game room does not exist.');
            }
            io.sockets.in(socket.game).emit('gameEnd');
            io.sockets.clients(game).forEach(u => {
                u.leave(game)
            });
        });
    });
};
