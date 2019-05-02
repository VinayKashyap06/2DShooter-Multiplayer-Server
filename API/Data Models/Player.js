var shortID = require("shortid");
var WorldPhysics = require("../WorldPhysics");
var planck= require("planck-js");
module.exports = class Player {
    constructor() {
        this.playerName = "";
        this.playerID = shortID.generate();
        this.position = this.GetRandomFromArray(WorldPhysics.spawnPoints);      
        this.body = WorldPhysics.world.createBody({
            type: "dynamic",
            position: this.position
        });
        // this.body.createFixture({
        //     shape: planck.Box(5,5,planck.Vec2(this.position.x,this.position.y),0)
        // });
        
    }
    MoveForward() {      
        //this.body'
        this.body.c_position= planck.Vec3(this.position.x,this.position.y,this.position.z+1*WorldPhysics.frameRate);
        this.position= this.body.c_position;
        return this.position;
    }
    MoveBackward() {
        this.body.c_position= planck.Vec3(this.position.x,this.position.y,this.position.z-1*WorldPhysics.frameRate);
        this.position= this.body.c_position;
        return this.position;
    }
    Jump() {

    }

    GetRandomFromArray(array) {    
        var randomnumber = Math.floor(Math.random() * (array.length - 0 + 1)) + 0;
        return array[randomnumber];
    }
}