var gameLoop = require("node-gameloop");
var SocketData= require("./Data Models/SocketData");
var WorldPhysics= require('./WorldPhysics');
var gameUpdateLoop= require("gameupdate-loop");
var currentFrame=0;
var data={};
// var deltaTime= 0;
// var d= new Date();
// var nt=0;
// var t=0;
// var loopID=gameLoop.setGameLoop(function(delta){    
       
//     //console.log("delta 1"+delta);
//     // t=Date.now();
//     // deltaTime=nt-t;
//     //console.log("deltaTime"+deltaTime);
//     currentFrame=currentFrame+1;
//     SocketData.SendData(currentFrame,data); 
//     WorldPhysics.world.step=1000/30;
//     //nt=Date.now();
// },1000/30);

var gameN= new gameUpdateLoop(30,function(delta){
    //console.log("delta 2"+delta);
    currentFrame=currentFrame+1;
    SocketData.SendData(currentFrame,data); 
    WorldPhysics.world.step=1000/30;
});
gameN.StartGameLoop();

var GetCurrentFrame= function GetCurrentFrame(){
    return currentFrame;
}
module.exports={
    GetCurrentFrame   
}