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
    var keys=Object.keys(playerList);
    for(var i=0;i<keys.length;i++){
        var data={
            opponentID: keys[i],
            opponentPosition : playerList[keys[i]].position
        }
        socket.emit(ServerEvents.ON_OPPONENT_CONNECTED,data);
    }
    socket.broadcast.emit(ServerEvents.ON_OPPONENT_CONNECTED, opponentData);

    socket.on(ServerEvents.MOVE_FORWARD,function(data){
        //console.log("move forward called");
       var newpos= player.MoveForward();
        socket.emit(ServerEvents.ON_MOVE_FORWARD,{playerID:player.playerID,newPosition : newpos});
        socket.broadcast.emit(ServerEvents.ON_MOVE_BACKWARD,{playerID:player.playerID,newPosition : newpos});
    });
    socket.on(ServerEvents.MOVE_BACKWARD,function(data){
        //console.log("move backward called");
       var newpos= player.MoveBackward();
        socket.emit(ServerEvents.ON_MOVE_BACKWARD,{playerID:player.playerID,newPosition : newpos});       
        socket.broadcast.emit(ServerEvents.ON_MOVE_BACKWARD,{playerID:player.playerID,newPosition : newpos});       
    });
    socket.on("disconnect",function(data){
        console.log("disconnected player");
        socket.emit(ServerEvents.ON_USER_DISCONNECTED,{playerID:player.playerID});
        delete playerList[playerID];
        delete socketList[playerID];
    });
});