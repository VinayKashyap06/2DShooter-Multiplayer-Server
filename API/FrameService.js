var gameLoop = require("node-gameloop");
var SocketData= require("./Data Models/SocketData");
var currentFrame=0;
var data={

}

var loopID=gameLoop.setGameLoop(function(){
    currentFrame=currentFrame+1;   
    SocketData.SendData(currentFrame,data);      
},1000/30);
var GetCurrentFrame= function GetCurrentFrame(){
    return currentFrame;
}
module.exports={
    GetCurrentFrame   
}