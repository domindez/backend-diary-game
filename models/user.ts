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
  skins: [String],
  usingSkin: String,
  statistics: StatisticsSchema,
  bonus: Boolean,
  extras: Object
}, { timestamps: true })

// Crear modelo
const Users = mongoose.model('diarygameusers', usersSchema)

export default Users
