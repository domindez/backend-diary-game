import Games from '../models/games'
import { createPath } from './createPath'

export const createNewGame = async () => {
  const lastGame = await Games.findOne().sort({ gameID: -1 }).limit(1)
  const lastGameID = lastGame?.gameID ?? 1

  const LIVES = 20
  const PATH_LENGTH = 20
  const aviableInitialPos = [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [1, 0], [1, 6]]
  const randomIndex = Math.floor(Math.random() * aviableInitialPos.length)
  const initialPos = aviableInitialPos[randomIndex]
  const path = createPath(initialPos, PATH_LENGTH)

  const newGame = {
    gameID: lastGameID + 1,
    initialPos: initialPos,
    playerPos: initialPos,
    bottlePos: path[path.length - 1],
    trail: [initialPos],
    path: path,
    nPlays: 0,
    lives: LIVES
  }

  await Games.create(newGame)
  console.log('Nuevo juego creado')
}
