const http = require('http'),
    io = require('socket.io')(),
    port = 5000;

    

    io.set('log level',1);
    io.origins('localhost:*');
    io.listen(port);
    console.log('Listen io');

    let players = {};
    let channels = {1:[], 2: []};

    io.on('connection', function(socket){

    console.log("New client has connected with id:",socket.id);


    

    socket.on('messageServer', function(e){
        let username = players[socket.id].name;
        io.emit('chatMessage', e, username);
      });

      socket.on('save',(data) => {

        console.log(`${data.player.name} connect!`);
        socket.player = data.player;
        socket.player.id = socket.id;

        players[socket.id] = data.player;

        socket.join(`world ${data.worldNumber}`, () => {
            console.log(Object.keys(socket.rooms));
          });

        socket.emit('changeState', data.player);
        io.emit('update', players);
    });

    socket.on('saveChanges',function(data){

        players[data.id].coords = data.coords;
        io.emit('update', players);
    });

    socket.on('disconnect',function(){

        console.log('user leave game');
        delete players[socket.id];
        console.log(socket.rooms);
        socket.leave(Object.keys(socket.rooms));
        console.log(socket.rooms);
        io.emit('disconnectPlayer', socket.id);
    });

  });

