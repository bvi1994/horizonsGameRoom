module.exports = function(app) {
    const io = require('socket.io')(app);
    let room = "";
    io.on('connection', socket => {
        socket.on('username', username => {
            if (!username || !username.trim()) {
                return socket.emit('errorMessage', 'No username!');
            }
            socket.username = String(username);
            console.log(socket.username);
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
        console.log("Left room");
        socket.leave(socket.room);
      }
      room = requestedRoom;
      socket.join(requestedRoom, () => {
        socket.to(requestedRoom).emit('message', {
          username: 'System',
          content: `${socket.username} has joined`
        });
      });
    });

    socket.on('message', message => {
      if (!room) {
        return socket.emit('errorMessage', 'No rooms joined!');
      }
      console.log("Socket.on message username: ", socket.username);
      socket.to(room).emit('message', {
        username: socket.username,
        content: message
      });
    });
  });
}
