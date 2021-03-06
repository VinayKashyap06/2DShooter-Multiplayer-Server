var WorldPhysics = require("../WorldPhysics");
var planck= require("planck-js");
var bulletSpeed = 5.0;
var bulletLife = 10

var CreateBullet = function CreateBullet(position) {
    var bulletPosition = planck.Vec2(position.x+0.5,position.y);
    var bullet = WorldPhysics.world.createBody({
        type: "dynamic",
        position: bulletPosition,
        linearVelocity: planck.Vec2(15,0)     
    });
    bullet.c_position= bulletPosition;
    return bullet;
    
}
WorldPhysics.world.on('begin-contact',OnContact);

var OnContact= function OnContact(arguement){
    console.log("OnContact called");

}
var OnBulletLifeOver= function OnBulletLifeOver(){

}
module.exports = {
   CreateBullet,
   OnContact,
   bulletSpeed,
   bulletLife
}