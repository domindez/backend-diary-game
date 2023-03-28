"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const StatisticsSchema = new Schema({
    nWins: Number,
    gamesWonInARow: Number,
    longestWinningStreak: Number,
    averageAttemptsPerWin: Number,
    lastGameWonID: Number,
    totalDeaths: Number
});
const usersSchema = new Schema({
    userID: Number,
    livesSaved: Number,
    nBottles: Number,
    level: Number,
    skins: [String],
    usingSkin: String,
    statistics: StatisticsSchema,
    bonus: Boolean,
    extras: Object
}, { timestamps: true });
const Users = mongoose.model('diarygameusers', usersSchema);
exports.default = Users;
