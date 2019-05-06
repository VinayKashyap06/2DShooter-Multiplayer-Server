var gameLoop = require("node-gameloop");
var SocketData= require("./Data Models/SocketData");
var currentFrame=0;
var data={

}
// var deltaTime= 0;
// var d= new Date();
// var nt=0;
// var t=0;
var loopID=gameLoop.setGameLoop(function(){    
       
    // t=Date.now();
    // deltaTime=nt-t;
    //console.log("deltaTime"+deltaTime);
    currentFrame=currentFrame+1;
    SocketData.SendData(currentFrame,data); 
    //nt=Date.now();
},1000/30);

var GetCurrentFrame= function GetCurrentFrame(){
    return currentFrame;
}
module.exports={
    GetCurrentFrame   
}