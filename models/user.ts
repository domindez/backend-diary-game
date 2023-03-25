import mongoose = require('mongoose')
const Schema = mongoose.Schema

const StatisticsSchema = new Schema({
  nWins: Number,
  gamesWonInARow: Number,
  longestWinningStreak: Number,
  averageAttemptsPerWin: Number,
  lastGameWonID: Number,
  totalDeaths: Number
})

const usersSchema = new Schema({
  userID: Number,
  livesSaved: Number,
  nBottles: Number,
  level: Number,
  usingSkin: String,
  statistics: StatisticsSchema,
  bonus: Boolean,
  extras: Object
}, { timestamps: true })

// Crear modelo
const User = mongoose.model('diarygameusers', usersSchema)

export default User
