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
const user_1 = require("../models/user");
const routerOnwin = express.Router();
routerOnwin.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const user = yield user_1.default.findOne({ userID: body.userID });
        if ((user === null || user === void 0 ? void 0 : user.nBottles) === undefined || user.livesSaved === undefined)
            return;
        user.nBottles = body.nBottles;
        user.livesSaved = body.livesSaved;
        user.level = body.level;
        yield user.save();
    }
    catch (error) {
        console.log(error);
    }
}));
module.exports = routerOnwin;
