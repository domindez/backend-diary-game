import express = require('express')
import User from '../models/user'

interface userData {
  userID: string
  livesSaved: number
  nBottles: number
  level: number
}

const routerOnwin = express.Router()

routerOnwin.post('/', async (req, res) => {
  try {
    const body: userData = req.body

    const user = await User.findOne({ userID: body.userID })
    if (user?.nBottles === undefined || user.livesSaved === undefined) return
    Object.assign(user, body)
    await user.save()
  } catch (error) {
    console.log(error)
  }
})

module.exports = routerOnwin
