var planck = require("planck-js");
var frameRate = 0.03333;
var world = planck.World();
var ground = world.createBody({
    type : "static",
    position: planck.Vec2(0,0)
});
ground.createFixture(planck.Edge(planck.Vec2(-40, -40 ), planck.Vec2(40  , -40 )), { userData: 'downEdge' });
ground.createFixture(planck.Edge(planck.Vec2(-40 , -40 ), planck.Vec2(-40 , 40 )), { userData: 'leftEdge' });
ground.createFixture(planck.Edge(planck.Vec2(40  , -40  ), planck.Vec2(40  , 40 )), { userData: 'rightEdge' });
ground.createFixture(planck.Edge(planck.Vec2(-40 , 40  ), planck.Vec2(40 , 40 )), { userData: 'upEdge' });
var xbounds=planck.Vec2(-40,40);
var ybounds= planck.Vec2(-40,40);
var obstacle1= world.createBody({
    type: "static",
    position: planck.Vec2(0,0)
});
obstacle1.createFixture(planck.Edge(planck.Vec2(-5,-5 ), planck.Vec2(5,-5 )));
var pointData= {
    point1: planck.Vec2(-5,-5),
    point2: planck.Vec2(5,-5)
}
var obstacleData=[];
obstacleData.push(pointData);
var spawnPoints = [];
spawnPoints.push(planck.Vec3(0, 0, 0));
spawnPoints.push(planck.Vec3(-10, 1, 0));
spawnPoints.push(planck.Vec3(10, 3, 0));
spawnPoints.push(planck.Vec3(0, 5, 0));
spawnPoints.push(planck.Vec3(1, 4, 0));
spawnPoints.push(planck.Vec3(1, -1, 0));
spawnPoints.push(planck.Vec3(-10, 0, 0));
spawnPoints.push(planck.Vec3(4, 0, 0));
spawnPoints.push(planck.Vec3(-5, 0, 0));
module.exports = {
    world,
    xbounds,
    ybounds,
    spawnPoints,
    frameRate,
    obstacleData
}