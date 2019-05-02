var planck= require("planck-js");
var frameRate= 0.03333;
var world= planck.World();
var spawnPoints=[];
spawnPoints.push(planck.Vec3(0,0,0));
spawnPoints.push(planck.Vec3(-10,0,0));
spawnPoints.push(planck.Vec3(10,0,0));
spawnPoints.push(planck.Vec3(0,0,-10));
spawnPoints.push(planck.Vec3(0,0,10));
spawnPoints.push(planck.Vec3(10,0,10));
spawnPoints.push(planck.Vec3(-10,0,-10));
spawnPoints.push(planck.Vec3(10,0,-10));
spawnPoints.push(planck.Vec3(-10,0,10));
spawnPoints.push(planck.Vec3(5,0,5));
module.exports={
    world,
    spawnPoints,
    frameRate
}