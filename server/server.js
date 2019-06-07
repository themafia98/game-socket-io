const app = require('http').createServer(handler),
config = require('./config'),
http = require('http'),
  fs = require('fs'),
  logger = require('./logger'),
  io = require('socket.io')(app);

io.origins('*:*');

process.env.NODE_ENV = process.env.PORT ? 'production': 'development';

let port = process.env.PORT || 5000;
app.listen(port);

let players = {};

function handler(req,res) {

  if (req.url === '/'){
    res.writeHead(200, {'Content-Type': 'text/html'});
    console.log(__dirname + '/index.html');
    let index = fs.createReadStream(__dirname + '/index.html');
    index.pipe(res);
  } else if (req.url === "/settings"){

    res.writeHead(200, {'Content-Type': 'text/html'});
    console.log(__dirname + '/index.html');
    let index = fs.createReadStream(__dirname + '/index.html');
    index.pipe(res);
  }  else if ('/statistic'){

    res.writeHead(200, {"content-type":"text/plain"});
    res.end(JSON.stringify(players));
  }
  
  else {

    res.writeHead(200, {'Content-Type': 'text/html'});
    console.log(__dirname + '/index.html');
    let index = fs.createReadStream(__dirname + '/index.html');
    index.pipe(res);
  } 
};


logger.info(`Server listen on ${port} `);


io.on('connection', function (socket) {

  console.log("New client has connected with id:", socket.id);

  socket.on('messageServer', function (data) {
    let username = players[socket.id].name;
    io.to(`${data.world}`).emit('chatMessage', data.msg, username);
  });

  socket.on('save', (data) => {
    console.log(data.worldNumber);
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

    // if (data.hasOwnProperty('input')){
  
    console.log(data.player);
    switch(data.player.input){
      case 83: {
        data.player.coords.y += data.player.speed;
        data.player.position = 'down';
          break;
      }
      case 87: {
        data.player.coords.y -= data.player.speed;
        data.player.position = 'up';
          break;
      }
      case 65: {
        data.player.coords.x -= data.player.speed;
        data.player.position = 'left';
          break;
      }
      case 68: {
        data.player.coords.x += data.player.speed;
        data.player.position = 'right';
          break;
      }
  // }
  // data = data.player;
  }


    if(data.player.coords.x - 100 < 0){
      data.player.coords.x = 100;
  }
  if(data.player.coords.y - 150 < 0){
    data.player.coords.y = 150;
  }


  let limit = config().map.limit;

  if(data.player.coords.x > limit[0]){
    data.player.coords.x = limit[0]-5;
  }
  if(data.player.coords.y > limit[1]){
    data.player.coords.y = limit[1]-5;
  }

  players[socket.id] = data.player;

    io.to(players[socket.id].world).emit('update', players);
  });

  socket.on('disconnect', function (string) {
    console.log(string);
    logger.info(`User ${players[socket.id].name} leave game`);
    let world = players[socket.id].world;
    delete players[socket.id];
    socket.leave(socket.rooms);
    io.to(world).emit('disconnectPlayer', socket.id);
  });

});