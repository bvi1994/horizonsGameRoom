module.exports = function(app) {
    const io = require('socket.io')(app);
    io.on('connection', socket => {
        console.log('connected');
        socket.on('username', username => {
            if (!username || !username.trim()) {
                return socket.emit('errorMessage', 'No username!');
            }
            socket.username = String(username);
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
      socket.join(requestedRoom, () => {
        socket.to(requestedRoom).emit('message', {
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
        content: message
      });
    });
  });
}
