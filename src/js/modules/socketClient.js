import io from 'socket.io-client';

export default function SocketIOClient(views){

const socket = io('http://localhost:5000/', { transport : ['websocket']});

socket.on('connection',function(socket){

    console.log('Listen socket io :' + socket);
});

  socket.on('error', function() {
    console.log('there was an error');
  });

  socket.on('connect', function() {
    console.log('socket connection established');
  });

  return socket;
}