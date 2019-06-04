const http = require('http'),
    io = require('socket.io')(),
    port = 5000;

    io.origins('localhost:*');
    io.listen(port);

    let players = {};

    io.on('connection', function(socket){

    console.log("New client has connected with id:",socket.id);

    socket.on('messageServer', function(data){
        let username = players[socket.id].name;
        io.to(`${data.world}`).emit('chatMessage', data.msg, username);
      });

      socket.on('save',(data) => {

        console.log(`${data.player.name} connect!`);
        socket.player = data.player;
        socket.player.id = socket.id;

        console.log(data);

        players[socket.id] = data.player;
        players[socket.id].world = data.worldNumber;
        console.log('Saved! user world:' + players[socket.id].world);
        socket.join(`${data.worldNumber}`, () => {
            console.log(Object.keys(socket.rooms));

            io.to(`${data.worldNumber}`).emit('update', players);

          }).emit('changeState', data.player);
    });

    socket.on('saveChanges',function(data){

        players[data.id].coords = data.coords;
        io.to(data.player.world).emit('update', players);
    });

    socket.on('disconnect',function(){

        console.log('user leave game');
        let world = players[socket.id].world;
        delete players[socket.id];
        socket.leave(socket.rooms);
        io.to(world).emit('disconnectPlayer', socket.id);
    });

  });

