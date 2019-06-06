const http = require('http'),
  logger = require('./logger'),
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
    logger.info(`${data.player.name} connect!`);
    socket.player = data.player;
    socket.player.id = socket.id;

    players[socket.id] = data.player;
    players[socket.id].world = data.worldNumber;
    logger.info('Saved! user world:' + players[socket.id].world);
    socket.join(`${data.worldNumber}`, () => {

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

    logger.info(`User ${players[socket.id].name} leave game`);
    let world = players[socket.id].world;
    delete players[socket.id];
    socket.leave(socket.rooms);
    io.to(world).emit('disconnectPlayer', socket.id);
  });

});