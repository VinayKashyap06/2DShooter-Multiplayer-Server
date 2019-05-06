var planck = require("planck-js");
var frameRate = 0.03333;
var world = planck.World();
var ground = world.createBody({
    type : "static",
    position: planck.Vec2(0,0)
});
ground.createFixture(planck.Edge(planck.Vec2(-40.5, -40.5), planck.Vec2(40.5 , -40.5)), { userData: 'downEdge' });
ground.createFixture(planck.Edge(planck.Vec2(-40.5 , -40.5), planck.Vec2(-40.5, 40.5)), { userData: 'leftEdge' });
ground.createFixture(planck.Edge(planck.Vec2(40.5 , -40.5 ), planck.Vec2(40.5 , 40.5)), { userData: 'rightEdge' });
ground.createFixture(planck.Edge(planck.Vec2(-40.5, 40.5 ), planck.Vec2(40.5, 40.5)), { userData: 'upEdge' });
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
    ground,
    spawnPoints,
    frameRate
}