import mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
  userID: String,
  nBottles: Number,
  livesSaved: Number
}, { timestamps: true })

// Crear modelo
const User = mongoose.model('diarygameusers', usersSchema)

export default User
