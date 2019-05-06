var shortID = require("shortid");
var WorldPhysics = require("../WorldPhysics");
var Bullet= require("./Bullet");
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
        this.body.createFixture(planck.Box(1,1));
        this.bullet= null;
        
    }
    MoveUp() {      
        //this.body'

        this.body.c_position= planck.Vec3(this.position.x,this.position.y+1*WorldPhysics.frameRate,this.position.z);
        this.position= this.body.c_position;
        return this.position;
    }
    MoveDown() {
        this.body.c_position= planck.Vec3(this.position.x,this.position.y-1*WorldPhysics.frameRate,this.position.z);
        this.position= this.body.c_position;
        return this.position;
    }
    Jump() {

    }

    GetRandomFromArray(array) {    
        var randomnumber = Math.floor(Math.random() * (array.length - 0 + 1)) + 0;
        return array[randomnumber];
    }
    FireBullet(){
        // var bulletPosition=this.position+ planck.Vec3(0,0,0.5);
        // this.bullet= WorldPhysics.world.createBody({
        //    type: "dynamic",
        //     position: bulletPosition,
        //     linearVelocity: bulletPosition* Bullet.bulletSpeed,
        //     linearDamping: 0            
        // });
        Bullet.CreateBullet(this.position);


    }

}