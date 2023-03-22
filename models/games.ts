import mongoose = require('mongoose')
const Schema = mongoose.Schema

const gamesSchema = new Schema({
  gameID: Number,
  nPlays: Number,
  initialPos: Array,
  path: Array,
  lives: Number
}, { timestamps: true })

// Crear modelo
const Games = mongoose.model('diarygames', gamesSchema)

export default Games
