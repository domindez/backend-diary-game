import { createNewGame } from './createNewGame'
import * as cron from 'node-cron'

export const gameManager = async () => {
  console.log('Game Manager activo...')

  // Ejecutar la función cada día a las 23:59:59 en horario de España
  cron.schedule('59 59 23 * * *', () => {
    void createNewGame()
  }, {
    timezone: 'Europe/Madrid'
  })
}
