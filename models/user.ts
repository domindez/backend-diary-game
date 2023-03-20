import mongoose = require('mongoose')
const Schema = mongoose.Schema

const testUsersSchema = new Schema({
  userName: String
})

// Crear modelo
const User = mongoose.model('tests', testUsersSchema)

export default User
