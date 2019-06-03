const http = require('http'),
    io = require('socket.io')(),
    port = 5000;

    io.origins('localhost:*');
    io.listen(port);
    console.log('Listen io');


io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('messageServer', function(e){
        console.log(socket.username);
        io.emit('chatMessage', e, socket.username);
      });

      socket.on('save',(username) => {

        console.log(`${username} connect!`);

        socket.username = username;
        
        socket.emit('changeState', username);
    });

    socket.on('saveCoords',function(data){
        socket.coords = data;
    });
  });
