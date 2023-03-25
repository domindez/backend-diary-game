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
exports.createNewGame = void 0;
const games_1 = require("../models/games");
const createPath_1 = require("./createPath");
const createNewGame = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const lastGame = yield games_1.default.findOne().sort({ gameID: -1 }).limit(1);
    const lastGameID = (_a = lastGame === null || lastGame === void 0 ? void 0 : lastGame.gameID) !== null && _a !== void 0 ? _a : 1;
    const LIVES = 20;
    const PATH_LENGTH = 20;
    const aviableInitialPos = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [1, 0], [1, 6]];
    const randomIndex = Math.floor(Math.random() * aviableInitialPos.length);
    const initialPos = aviableInitialPos[randomIndex];
    const path = (0, createPath_1.createPath)(initialPos, PATH_LENGTH);
    const newGame = {
        gameID: lastGameID + 1,
        initialPos: initialPos,
        playerPos: initialPos,
        bottlePos: path[path.length - 1],
        trail: [initialPos],
        path: path,
        nPlays: 0,
        maxLives: LIVES,
        lives: LIVES
    };
    yield games_1.default.create(newGame);
    console.log('Nuevo juego creado');
});
exports.createNewGame = createNewGame;
