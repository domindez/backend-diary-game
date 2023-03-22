"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const usersSchema = new Schema({
    userID: String,
    nBottles: Number,
    livesSaved: Number
}, { timestamps: true });
const User = mongoose.model('diarygameusers', usersSchema);
exports.default = User;
