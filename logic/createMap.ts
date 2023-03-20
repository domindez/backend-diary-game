const alto = 12
const ancho = 7
const y = 0
const x = 1

export const createPath = () => {
  const initialPos = [11, 6]
  const tablero: number[][][] = []

  // Crear tablero
  for (let y = 0; y < alto; y++) {
    tablero[y] = []

    for (let x = 0; x < ancho; x++) {
      const coordenadasCelda = [y, x]
      tablero[y][x] = coordenadasCelda
    }
  }

  const path: number[][] = [initialPos, [10, 6]]

  const lastCell = path[path.length - 1]

  // Decidir en qué direccion va el siguiente paso
  const availableDirections: string[] = []
  if (lastCell[y] !== 0 && checkNotAdjacent(tablero, path, lastCell, 'up')) availableDirections.push('up')
  if (lastCell[y] !== alto - 1 && checkNotAdjacent(tablero, path, lastCell, 'down')) availableDirections.push('down')
  if (lastCell[x] !== 0 && checkNotAdjacent(tablero, path, lastCell, 'left')) availableDirections.push('left')
  if (lastCell[x] !== ancho - 1 && checkNotAdjacent(tablero, path, lastCell, 'right')) availableDirections.push('right')

  console.log('object')

  const direction = availableDirections[Math.floor(Math.random() * availableDirections.length)]

  const nextCell = [...lastCell]

  switch (direction) {
    case 'up':
      nextCell[y] = lastCell[y] - 1
      break
    case 'down':
      nextCell[y] = lastCell[y] + 1
      break
    case 'left':
      nextCell[x] = lastCell[x] - 1
      break
    case 'right':
      nextCell[x] = lastCell[x] + 1
      break

    default:
      break
  }

  // Añadir celda al path
  path.push(nextCell)

  return path
}

const checkNotAdjacent = (tablero: number[][][], path: number[][], lastCell: number[], direction: string) => {
  let valid = true

  const newCell = [...lastCell]

  switch (direction) {
    case 'up':
      newCell[y] = lastCell[y] - 1
      newCell[x] = lastCell[x]
      break
    case 'down':
      newCell[y] = lastCell[y] + 1
      newCell[x] = lastCell[x]
      break
    case 'left':
      newCell[y] = lastCell[y]
      newCell[x] = lastCell[x] - 1
      break
    case 'right':
      newCell[y] = lastCell[y]
      newCell[x] = lastCell[x] + 1
      break

    default:
      break
  }

  console.log('newCell :>> ', newCell)

  // Celdas adyacentes
  const cell1 = tablero[newCell[y] - 1][newCell[x]]
  const cell2 = tablero[newCell[y] + 1][newCell[x]]
  const cell3 = tablero[newCell[y]][newCell[x] - 1]
  const cell4 = tablero[newCell[y]][newCell[x] + 1]

  const cellsToCheck = [cell1, cell2, cell3, cell4]

  // Elimina de las adyacentes los undefinidos
  cellsToCheck.forEach(element => {
    const indexToDelete = cellsToCheck.indexOf(element)
    if (element === undefined) cellsToCheck.splice(indexToDelete, 1)
  })

  // Elimina de las adyacentes la celda anterior --- ESTO ESTA MAL, LA ANTERIOR NO PUEDE ESTAR
  // cellsToCheck.forEach(cell => {
  //   if (cell[y] === lastCell[y] && cell[x] === lastCell[x]) {
  //     const indexToDelete = cellsToCheck.indexOf(cell)
  //     cellsToCheck.splice(indexToDelete, 1)
  //   }
  // })

  // HACER QUE EL PRIMER FALSE RETORNE

  // Comprueba que las adyacentes no están en el path
  cellsToCheck.forEach(cellToCheck => {
    path.forEach(cellInPath => {
      if (cellToCheck[y] === cellInPath[y] && cellToCheck[x] === cellInPath[x]) valid = false
    })
  })

  // Comprueba que la celda no está en el path
  path.forEach(cellsInPath => {
    cellsInPath.forEach(cellInPath => {
      if (newCell[y] === cellInPath[y] && newCell[x] === cellInPath[x]) valid = false
    })
  })

  console.log('path :>> ', path)
  console.log('direction :>> ', direction)
  console.log('newCell :	>> ', newCell)
  console.log('cellsToCheck :>> ', cellsToCheck)
  console.log('valid :>> ', valid)

  return valid
}
