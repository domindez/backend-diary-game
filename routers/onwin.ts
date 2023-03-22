import express = require('express')
import User from '../models/user'

interface userData {
  userID: string
  livesSaved: number
  nBottles: number
}

const routerOnwin = express.Router()

routerOnwin.post('/', async (req, res) => {
  try {
    const body: userData = req.body

    const user = await User.findOne({ userID: body.userID })
    if (user?.nBottles === undefined || user.livesSaved === undefined) return
    user.nBottles = user.nBottles + body.nBottles
    user.livesSaved = user.livesSaved + body.livesSaved
    await user.save()
  } catch (error) {
    console.log(error)
  }
})

module.exports = routerOnwin
