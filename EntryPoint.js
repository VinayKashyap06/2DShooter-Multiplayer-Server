var io = require("socket.io")({ transports: ['websocket'], });
var SocketSettings = require("./API/ServerSettings/SocketSettings");
var ServerEvents = require("./API/ServerEvents");
var Player = require("./API/Data Models/Player");
//var FrameService = require("./API/FrameService");
var gameLoop = require("node-gameloop");
var currentFrame = 0;
var nextFrame=currentFrame+3;
var loopData = {
}

var loopID = gameLoop.setGameLoop(function () {
    currentFrame = currentFrame + 1;
    //nextFrame=currentFrame+3;
    //console.log("run at 30fps. current frame="+currentFrame );    
    //SendData(nextFrame, loopData);
    //loopData={};    
}, 1000 / 30);

var playerList = {};
var socketList = {};

function SendData(frameNo, data) {
    // if (data == {}) {
    //     return;
    // }
    if (socketList == null || socketList == undefined) {
        return;
    }
    var keys = Object.keys(socketList);
    for (var i = 0; i < keys.length; i++) {
        socketList[keys[i]].emit(ServerEvents.ON_ADD_FRAME_DATA, { frameNo: frameNo, playerID: keys[i], data: data });
    }
}

io.attach(SocketSettings.socketPort);

io.on('connection', function (socket) {
    var player = new Player();
    var playerID = player.playerID;
    playerList[playerID] = player;
    socketList[playerID] = socket;

    //console.log('player pos ' + player.position);
    console.log('A user connected on frame no' + currentFrame);

    socket.emit(ServerEvents.ON_USER_CONNECTED, { playerID: playerID, playerPosition: player.position, frameNo: currentFrame });

    var keys = Object.keys(playerList);
    for (var i = 0; i < keys.length; i++) {
        if (keys[i] == playerID) {
            continue;
        }
        var data = {
            opponentID: keys[i],
            opponentPosition: playerList[keys[i]].position
        }
        socket.emit(ServerEvents.ON_OPPONENT_CONNECTED, data);
    }
    var opponentData = {
        opponentID: playerID,
        opponentPosition: player.position
    }
    socket.broadcast.emit(ServerEvents.ON_OPPONENT_CONNECTED, opponentData);

    socket.on(ServerEvents.MOVE_FORWARD, function (data) {
        //console.log("move forward called");
        var newpos = player.MoveForward();
        loopData={
            playerID: player.playerID,
            newPosition:newpos
        }
        nextFrame= currentFrame+3;
        SendData(nextFrame,loopData);
        loopData={};
        // socket.emit(ServerEvents.ON_MOVE_FORWARD, { playerID: player.playerID, newPosition: newpos });
        // socket.broadcast.emit(ServerEvents.ON_MOVE_BACKWARD, { playerID: player.playerID, newPosition: newpos });
    });
    socket.on(ServerEvents.MOVE_BACKWARD, function (data) {
        var newpos = player.MoveBackward();
        socket.emit(ServerEvents.ON_MOVE_BACKWARD, { playerID: player.playerID, newPosition: newpos });
        socket.broadcast.emit(ServerEvents.ON_MOVE_BACKWARD, { playerID: player.playerID, newPosition: newpos });
    });
    socket.on("disconnect", function (data) {
        console.log("disconnected player");
        socket.emit(ServerEvents.ON_USER_DISCONNECTED, { playerID: player.playerID });
        delete playerList[playerID];
        delete socketList[playerID];
    });

});
