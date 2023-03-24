import express = require('express')
import Games from '../models/games'
import User from '../models/user'

interface userData {
  userID: string
  livesSaved: number
  nBottles: number
}

const routerOnload = express.Router()

routerOnload.post('/', async (req, res) => {
  try {
    // Envíar el juego activo
    const newGame = await Games.findOne().sort({ gameID: -1 }).limit(1)
    const gameToSend = {
      gameReady: true,
      gameID: newGame?.gameID,
      initialPos: newGame?.initialPos,
      playerPos: newGame?.initialPos,
      bottlePos: newGame?.path[newGame.path.length - 1],
      trail: [newGame?.initialPos],
      path: newGame?.path,
      justDeath: false,
      canMove: true,
      clickedCell: [],
      isWin: false,
      maxLives: newGame?.lives,
      lives: newGame?.lives,
      userBottles: 0
    }
    res.send(gameToSend)

    // Aumentar en uno el numero de veces jugado
    if (newGame?.nPlays === undefined || newGame?.nPlays === null) return
    newGame.nPlays = newGame.nPlays + 1
    await newGame.save()

    // Si no existe en la bd, apuntar al ususario
    const body: userData = req.body
    const userExist = await User.findOne({ userID: body.userID })
    if (userExist) {
      userExist.updatedAt = new Date()
      void userExist.save()
      return
    }
    await User.create(body)
  } catch (error) {
    console.log(error)
  }
})

module.exports = routerOnload
