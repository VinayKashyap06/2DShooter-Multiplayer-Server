var io= require("socket.io")({ transports: ['websocket'], });
var SocketSettings= require("./API/ServerSettings/SocketSettings");
var ServerEvents= require("./API/ServerEvents");
var Player= require("./API/Data Models/Player");
io.attach(SocketSettings.socketPort);

io.on('connection', function (socket) {
    console.log('A user connected');  
    socket.emit(ServerEvents.ON_USER_CONNECTED);

    socket.on(ServerEvents.MOVE_FORWARD,function(data){
        console.log("move forward called");
    });
});