var io = require("socket.io")({ transports: ['websocket'], });
var SocketSettings = require("./API/ServerSettings/SocketSettings");
var ServerEvents = require("./API/ServerSettings/ServerEvents");
var Player = require("./API/Data Models/Player");
var FrameService = require("./API/FrameService");
var WorldPhysics = require("./API/WorldPhysics");
var SocketData = require("./API/Data Models/SocketData");
var BulletModel= require("./API/Data Models/Bullet");



var playerList = {};
var socketList = SocketData.socketList;
//var frameService= new FrameService();
console.log("frameService" + FrameService.GetCurrentFrame());

io.attach(SocketSettings.socketPort);

io.on('connection', function (socket) {
    var player = new Player();
    var playerID = player.playerID;
    playerList[playerID] = player;
    SocketData.AddSocket(socket, playerID);
    socketList = SocketData.socketList;
    console.log('A user connected on frame no' + FrameService.GetCurrentFrame()+"position"+player.position);
    var obstacleData = WorldPhysics.obstacleData;
    socket.emit(ServerEvents.ON_USER_CONNECTED, { playerID: playerID, playerPosition: player.position, startFrame: (FrameService.GetCurrentFrame() - 3) });

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
        var newpos = player.MoveUp();
        var nextFrame = FrameService.GetCurrentFrame()+3;
        console.log("new pos"+ JSON.stringify(newpos)+"   frame to execute"+nextFrame);
        var playerData = {
            playerID: player.playerID,
            newPosition: newpos
        }
        var loopData = {
            data: playerData,
            eventName: ServerEvents.ON_MOVE_FORWARD,
            frameNo: nextFrame
        }
        SocketData.SendData(nextFrame, loopData);       
    });
    socket.on(ServerEvents.MOVE_BACKWARD, function (data) {
        var newpos = player.MoveDown();
        var nextFrame = FrameService.GetCurrentFrame()+3;
        var playerData = {
            playerID: player.playerID,
            newPosition: newpos
        }
        var loopData = {
            data: playerData,
            eventName: ServerEvents.ON_MOVE_BACKWARD,
            frameNo: nextFrame
        }
        SocketData.SendData(nextFrame, loopData);     
    });
    socket.on(ServerEvents.FIRE, function (data) {       
        var bulletPosition = player.FireBullet();                
        var fireData = {
            playerID: playerID,
            position: bulletPosition,
            bulletSpeed: BulletModel.bulletSpeed            
        }
        var loopData = {
            data: fireData,
            eventName: ServerEvents.ON_FIRE,
            frameNo: FrameService.GetCurrentFrame()+3
        }
        SocketData.SendData(FrameService.GetCurrentFrame()+3, loopData);

    });
    socket.on("disconnect", function (data) {
        console.log("disconnected player" + playerID);
        //socket.emit(ServerEvents.ON_USER_DISCONNECTED, { playerID: playerID });
        socket.broadcast.emit(ServerEvents.ON_USER_DISCONNECTED, { playerID: playerID });
        delete playerList[playerID];
        SocketData.RemoveSocket(playerID);
        socketList = SocketData.socketList;
    });

});
