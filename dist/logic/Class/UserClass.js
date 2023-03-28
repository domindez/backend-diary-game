"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(userID) {
        this.userID = userID;
        this.livesSaved = 0;
        this.nBottles = 0;
        this.level = 1;
        this.skins = ['pirate', 'zombi'];
        this.usingSkin = 'pirate';
        this.bonus = false;
        this.extras = {};
        this.statistics = {
            nWins: 0,
            gamesWonInARow: 0,
            longestWinningStreak: 0,
            averageAttemptsPerWin: 0,
            lastGameWonID: 0,
            totalDeaths: 0
        };
    }
}
exports.User = User;
