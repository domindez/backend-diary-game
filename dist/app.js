"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const express = require("express");
const cors = require("cors");
const gameManager_1 = require("./logic/gameManager");
const app = express();
const PUERTO = (process.env.PORT != null) || 4000;
app.listen(PUERTO, () => { console.log(`Servidor escuchando en puerto ${PUERTO}...`); });
void (0, db_1.connectDB)();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const routerOnload = require('./routers/onload');
app.use('/api/onload', routerOnload);
const routerOnwin = require('./routers/onwin');
app.use('/api/onwin', routerOnwin);
void (0, gameManager_1.gameManager)();