"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
class Game {
    constructor(gameID, initialPos, path, lives) {
        this.gameReady = true;
        this.gameID = gameID;
        this.initialPos = initialPos;
        this.playerPos = initialPos;
        this.path = path;
        this.bottlePos = path[path.length - 1];
        this.trail = [initialPos];
        this.justDeath = false;
        this.canMove = true;
        this.isWin = false;
        this.clickedCell = [];
        this.maxLives = lives;
        this.lives = lives;
    }
}
exports.Game = Game;
