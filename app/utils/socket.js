module.exports = socketHandler = socket => {
  console.log('User connected');
  socket.emit('news', 'Hello client');
};