var WorldPhysics = require("../WorldPhysics");
var bulletSpeed = 5;
var bulletLife = 10

var CreateBullet = function CreateBullet(position) {
    var bulletPosition = position + planck.Vec3(0, 0, 0.5);
    var bullet = WorldPhysics.world.createBody({
        type: "dynamic",
        position: bulletPosition,
        linearVelocity: bulletPosition * bulletSpeed
        //linearDamping: 0
    });
    
}
WorldPhysics.world.on('begin-contact',OnContact);

var OnContact= function OnContact(arguement){
    console.log("OnContact called");

}
var OnBulletLifeOver= function OnBulletLifeOver(){

}
module.exports = {
   CreateBullet,
   OnContact
}