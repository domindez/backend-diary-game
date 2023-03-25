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
const games_1 = require("../models/games");
const user_1 = require("../models/user");
const routerOnload = express.Router();
routerOnload.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newGame = yield games_1.default.findOne().sort({ gameID: -1 }).limit(1);
        const gameToSend = {
            gameReady: true,
            gameID: newGame === null || newGame === void 0 ? void 0 : newGame.gameID,
            initialPos: newGame === null || newGame === void 0 ? void 0 : newGame.initialPos,
            playerPos: newGame === null || newGame === void 0 ? void 0 : newGame.initialPos,
            bottlePos: newGame === null || newGame === void 0 ? void 0 : newGame.path[newGame.path.length - 1],
            trail: [newGame === null || newGame === void 0 ? void 0 : newGame.initialPos],
            path: newGame === null || newGame === void 0 ? void 0 : newGame.path,
            justDeath: false,
            canMove: true,
            clickedCell: [],
            isWin: false,
            maxLives: newGame === null || newGame === void 0 ? void 0 : newGame.lives,
            lives: newGame === null || newGame === void 0 ? void 0 : newGame.lives,
            userBottles: 0
        };
        res.send(gameToSend);
        if ((newGame === null || newGame === void 0 ? void 0 : newGame.nPlays) === undefined || (newGame === null || newGame === void 0 ? void 0 : newGame.nPlays) === null)
            return;
        newGame.nPlays = newGame.nPlays + 1;
        yield newGame.save();
        const body = req.body;
        const userExist = yield user_1.default.findOne({ userID: body.userID });
        if (userExist) {
            userExist.updatedAt = new Date();
            void userExist.save();
            return;
        }
        yield user_1.default.create(body);
    }
    catch (error) {
        console.log(error);
    }
}));
module.exports = routerOnload;
