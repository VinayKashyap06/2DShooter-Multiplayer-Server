var gameLoop = require("node-gameloop");
var EntryPoint= require("../EntryPoint");
var currentFrame=0;
var data={

}

var loopID=gameLoop.setGameLoop(function(){
    currentFrame=currentFrame+1;
    //console.log("run at 30fps. current frame="+currentFrame );
    //console.log("ss"+JSON.stringify(entryPoint.socketList));
    EntryPoint.SendData(currentFrame+3,data);
   
    //entryPoint.SendData((currentFrame+3),data);
},1000/30);

module.exports={
    currentFrame: currentFrame
}