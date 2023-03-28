import express = require('express')
import { Game } from '../logic/Class/GameClass'
import { User } from '../logic/Class/userClass'
import Games from '../models/games'
import Users from '../models/user'

const routerOnload = express.Router()

routerOnload.post('/', async (req, res) => {
  const userID = req.body.userID
  try {
    // Crear juego para enviar
    const newGame = await Games.findOne().sort({ gameID: -1 }).limit(1)
    if (newGame?.nPlays == null || !newGame?.gameID || !newGame?.lives) throw new Error('No Game in DB')

    const game = new Game(newGame.gameID, newGame.initialPos, newGame.path, newGame.lives)
    let user

    const userExsit = await Users.findOne({ userID: userID })
    if (userExsit) {
      user = userExsit
    } else {
      user = new User(userID)
      await Users.create(user)
    }

    res.send({ game, user })

    // Aumentar en uno el numero de veces jugado
    newGame.nPlays = newGame.nPlays + 1
    await newGame.save()
  } catch (error) {
    console.log(error)
  }
})

module.exports = routerOnload
