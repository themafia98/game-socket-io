const http = require('http'),
  io = require('socket.io')();

io.origins('*:*');

process.env.NODE_ENV = process.env.PORT ? 'production': 'development';

let port = process.env.PORT || 5000;
io.listen(port);

let players = {};

io.on('connection', function (socket) {

  console.log("New client has connected with id:", socket.id);

  socket.on('messageServer', function (data) {
    let username = players[socket.id].name;
    io.to(`${data.world}`).emit('chatMessage', data.msg, username);
  });

  socket.on('save', (data) => {

    if (typeof data === 'object' && data.hasOwnProperty('player')) {
    console.log(`${data.player.name} connect!`);
    socket.player = data.player;
    socket.player.id = socket.id;

    console.log(players[socket.id]);
    players[socket.id] = data.player;
    players[socket.id].world = data.worldNumber;
    console.log('Saved! user world:' + players[socket.id].world);
    socket.join(`${data.worldNumber}`, () => {
      console.log(Object.keys(socket.rooms));
      io.to(`${data.worldNumber}`).emit('connectPlayer', players[socket.id]);
      io.to(`${data.worldNumber}`).emit('update', players);

    }).emit('changeState', data.player);
  } else return {data: 'no save player', status: '404'};
  });

  socket.on('saveChanges', function (data) {

    players[data.id].coords = data.coords;
    io.to(data.player.world).emit('update', players);
  });

  socket.on('disconnect', function () {

    console.log('user leave game');
    let world = players[socket.id].world;
    delete players[socket.id];
    socket.leave(socket.rooms);
    io.to(world).emit('disconnectPlayer', socket.id);
  });

});