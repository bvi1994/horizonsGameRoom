module.exports = function(app) {
    const io = require('socket.io')(app);
    const games = new Map();
    //don't use username, room, message
    io.on('connection', socket => {
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
                u.leave(game);
            });
        });
    });
};
