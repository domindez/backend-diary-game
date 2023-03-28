/* eslint-disable @typescript-eslint/no-var-requires */
import { connectDB } from './db'
import express = require('express')
import cors = require('cors')
import { gameManager } from './logic/gameManager'

const app = express()

const PUERTO = process.env.PORT ?? 4000

app.listen(PUERTO, () => { console.log(`Servidor escuchando en puerto ${PUERTO}...`) })
void connectDB()
app.use(cors({
  origin: 'https://trivify.es',
  optionsSuccessStatus: 200
}))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const routerOnload = require('./routers/onload')
app.use('/api/onload', routerOnload)

const routerOnwin = require('./routers/onwin')
app.use('/api/onwin', routerOnwin)

void gameManager()
