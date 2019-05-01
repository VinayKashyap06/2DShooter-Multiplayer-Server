var shortID = require("shortid");
module.exports = class Player {
    constructor() {
        this.playerName = "";
        this.playerID= shortID.generate();
        this.position = null;
    }
    MoveForward() {

    }
    MoveBackward() {

    }
    Jump() {

    }
}