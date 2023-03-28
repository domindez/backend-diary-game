
export class Game {
  gameReady: boolean
  gameID: number
  initialPos: number[]
  playerPos: number[]
  bottlePos: number[]
  path: number[][]
  trail: number[][]
  justDeath: boolean
  canMove: boolean
  isWin: boolean
  clickedCell: number[]
  maxLives: number
  lives: number

  constructor (gameID: number, initialPos: number[], path: number[][], lives: number) {
    this.gameReady = true
    this.gameID = gameID
    this.initialPos = initialPos
    this.playerPos = initialPos
    this.path = path
    this.bottlePos = path[path.length - 1]
    this.trail = [initialPos]
    this.justDeath = false
    this.canMove = true
    this.isWin = false
    this.clickedCell = []
    this.maxLives = lives
    this.lives = lives
  }
}
