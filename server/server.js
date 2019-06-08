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
let storageSocket = new Map();
let players = new Map();

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


let configs = config();
let limit = configs.map.limit;


function addNewPlayer(id,socket){
    storageSocket.set(id,socket);
}


io.on('connection', function (socket) {

  console.log("New client has connected with id:", socket.id);

  socket.on('messageServer', function (data) {
    let username = players.get(socket.id).name;
    io.to(`${data.world}`).emit('chatMessage', data.msg, username);
  });

  socket.on('save', (data) => {

    data.player = JSON.parse(data.player);
    if (typeof data === 'object' && data.hasOwnProperty('player')) {

      logger.info(`${data.player.name} connect!`);
      data.player.id = socket.id;
      players.set(socket.id,data.player);
      addNewPlayer(socket.id, socket);

      logger.info('Saved! user world:' + players.get(socket.id).world);

      socket.join(`${data.player.world}`, () => {
          io.to(`${data.player.world}`).emit('connectPlayer', players.get(socket.id));
      }).emit('changeState', data.player);

  } else ogger.error('Error in save player');
  });

 
  socket.on('movePlayer', function (player) {

    player = JSON.parse(player);
    console.log(player.input);
    switch(player.input){
        case 40:
        case 83:
        case 115:
        player.coords.y += player.speed;
        player.position = 'down';
          break;
        case 38:
        case 87:
        case 199:
        player.coords.y -= player.speed;
        player.position = 'up';
          break;
        case 37:
        case 65:
        case 97:
        player.coords.x -= player.speed;
        player.position = 'left';
          break;
          case 39:
          case 68:
          case 100:
        player.coords.x += player.speed;
        player.position = 'right';
          break;
  }

    if(player.coords.x - 100 < 0){
      player.coords.x = 100;
  }
  if(player.coords.y - 150 < 0){
    player.coords.y = 150;
  }


  if(player.coords.x > limit[0]){
    player.coords.x = limit[0]-5;
  }
  if(player.coords.y > limit[1]){
    player.coords.y = limit[1]-5;
  }

  players.set(socket.id,player);
  });

  setInterval(function updateState(time) {

    players.forEach(player =>{
      storageSocket.get(player.id).emit('update',{ self: player, players: players });
    });

    },1000 / 60);



  socket.on('disconnect', function (string) {
    console.log(string);
    let player = players.get(socket.id);
    logger.info(`User ${player.name} leave game`);
    let world = player.world;
    delete player;
    socket.leave(socket.rooms);
    io.to(world).emit('disconnectPlayer', socket.id);
  });

});