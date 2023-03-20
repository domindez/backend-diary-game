import express = require('express')
import { createPath } from '../logic/createMap'

const routerOnload = express.Router()

routerOnload.get('/', async (req, res) => {
  try {
    const path = createPath()
    console.log(path)
    res.send(path)
  } catch (error) {
    console.log(error)
  }
})

module.exports = routerOnload
