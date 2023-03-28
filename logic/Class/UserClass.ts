
export class User {
  userID: string
  livesSaved: number
  nBottles: number
  level: number
  skins: string[]
  usingSkin: string
  bonus: boolean
  extras: object
  statistics: {
    nWins: number
    gamesWonInARow: number
    longestWinningStreak: number
    averageAttemptsPerWin: number
    lastGameWonID: number
    totalDeaths: number
  }

  constructor (userID: string) {
    this.userID = userID
    this.livesSaved = 0
    this.nBottles = 0
    this.level = 1
    this.skins = []
    this.usingSkin = 'pirate'
    this.bonus = false
    this.extras = {}
    this.statistics = {
      nWins: 0,
      gamesWonInARow: 0,
      longestWinningStreak: 0,
      averageAttemptsPerWin: 0,
      lastGameWonID: 0,
      totalDeaths: 0
    }
  }
}
