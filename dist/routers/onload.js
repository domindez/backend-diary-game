"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const GameClass_1 = require("../logic/Class/GameClass");
const userClass_1 = require("../logic/Class/userClass");
const games_1 = require("../models/games");
const user_1 = require("../models/user");
const routerOnload = express.Router();
routerOnload.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.body.userID;
    try {
        const newGame = yield games_1.default.findOne().sort({ gameID: -1 }).limit(1);
        if ((newGame === null || newGame === void 0 ? void 0 : newGame.nPlays) == null || !(newGame === null || newGame === void 0 ? void 0 : newGame.gameID) || !(newGame === null || newGame === void 0 ? void 0 : newGame.lives))
            throw new Error('No Game in DB');
        const game = new GameClass_1.Game(newGame.gameID, newGame.initialPos, newGame.path, newGame.lives);
        let user;
        const userExsit = yield user_1.default.findOne({ userID: userID });
        if (userExsit) {
            user = userExsit;
        }
        else {
            user = new userClass_1.User(userID);
            yield user_1.default.create(user);
        }
        res.send({ game, user });
        newGame.nPlays = newGame.nPlays + 1;
        yield newGame.save();
    }
    catch (error) {
        console.log(error);
    }
}));
module.exports = routerOnload;
