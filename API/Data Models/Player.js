var shortID = require("shortid");
var WorldPhysics = require("../WorldPhysics");
var Bullet= require("./Bullet");
var planck= require("planck-js");
module.exports = class Player {
    constructor() {
        this.playerName = "";
        this.playerID = shortID.generate();
        this.position = this.GetRandomFromArray(WorldPhysics.spawnPoints);      
        //console.log("position player constructor"+this.position);
        this.body = WorldPhysics.world.createBody({
            type: "dynamic",
            position: this.position
        });
        this.body.c_position=this.position;
        this.body.createFixture(planck.Box(1,1));
        this.bullet= null;
        
    }
    MoveUp() {      
        //this.body
        if(!this.IsInBounds()){
            return this.position;
        }
        this.body.c_position= planck.Vec3(this.position.x,this.position.y+1*WorldPhysics.frameRate,this.position.z);
        this.position= this.body.c_position;
        return this.position;
    }
    MoveDown() {
        if(!this.IsInBounds()){
            return this.position;
        }
        this.body.c_position= planck.Vec3(this.position.x,this.position.y-1*WorldPhysics.frameRate,this.position.z);
        this.position= this.body.c_position;
        return this.position;
        }


    GetRandomFromArray(array) {    
        var randomnumber = Math.floor(Math.random() * (array.length - 0 + 1)) + 0;
        return array[randomnumber];
    }
    FireBullet(){
        var newBullet=Bullet.CreateBullet(this.position);    
        //console.log(Object.keys(newBullet));     
        return newBullet.c_position;
    }

    IsInBounds(){        
        //console.log("current position"+JSON.stringify(this.body.c_position));
        return (this.body.c_position.x>=WorldPhysics.xbounds.x && this.body.c_position.x <= WorldPhysics.xbounds.y &&
        this.body.c_position.y>=WorldPhysics.ybounds.x && this.body.c_position.y <= WorldPhysics.ybounds.y)
    }

}