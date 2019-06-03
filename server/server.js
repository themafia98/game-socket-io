const http = require('http'),
    io = require('socket.io')(),
    port = 5000;

    io.set('log level',0);
    io.origins('localhost:*');
    io.listen(port);
    console.log('Listen io');

    let players = {};

io.on('connection', function(socket){

    console.log("New client has connected with id:",socket.id);

    socket.on('messageServer', function(e){
        let username = players[socket.id].name;
        io.emit('chatMessage', e, username);
      });

      socket.on('save',(player) => {

        console.log(`${player.name} connect!`);
        socket.player = player;
        socket.player.id = socket.id;

        players[socket.id] = player;
        socket.emit('changeState', player);
        io.emit('update', players);
    });

    socket.on('saveChanges',function(data){

        players[data.id].coords = data.coords;
        io.emit('update', players);
    });

    socket.on('disconnect',function(){

        console.log('user leave game');
        delete players[socket.id];
        io.emit('disconnectPlayer', socket.id);
    });

  });

