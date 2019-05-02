var io= require("socket.io")({ transports: ['websocket'], });
var SocketSettings= require("./API/ServerSettings/SocketSettings");
var ServerEvents= require("./API/ServerEvents");
var Player= require("./API/Data Models/Player");

var playerList={};
var socketList={};
io.attach(SocketSettings.socketPort);

io.on('connection', function (socket) {
    var player= new Player();
    var playerID= player.playerID;
    playerList[playerID]= player;
    socketList[playerID]= socket;

    console.log('A user connected');  
    console.log('player pos '+player.position);

    socket.emit(ServerEvents.ON_USER_CONNECTED,{playerID: playerID, playerPosition: player.position});//PlayerID for myself
    
    var opponentData= {
        opponentID: playerID,
        opponentPosition : player.position
    }

    socket.broadcast.emit(ServerEvents.ON_OPPONENT_CONNECTED, opponentData);

    socket.on(ServerEvents.MOVE_FORWARD,function(data){
        console.log("move forward called");
       var newpos= player.MoveForward();
        socket.emit(ServerEvents.ON_MOVE_FORWARD,{newPosition : newpos});
    });
    socket.on("disconnect",function(data){
        console.log("disconnected player");
        delete playerList[playerID];
        delete socketList[playerID];
    });
});