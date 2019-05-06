var ServerEvents= require("../ServerSettings/ServerEvents");
var socketList={}

var SendData=function SendData(frameNo, data) {
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
var AddSocket= function AddSocket(socket,key){
    socketList[key]=socket;
}
var RemoveSocket= function RemoveSocket(key){
   delete socketList[key];
}
module.exports={
    SendData,
    AddSocket,
    RemoveSocket
}