"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const gamesSchema = new Schema({
    gameID: Number,
    nPlays: Number,
    initialPos: Array,
    path: Array,
    lives: Number
}, { timestamps: true });
const Games = mongoose.model('diarygames', gamesSchema);
exports.default = Games;
