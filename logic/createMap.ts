const alto = 12
const ancho = 7
const y = 0
const x = 1

export const createPath = () => {
  const initialPos = [10, 6]
  const tablero: number[][][] = []

  // Crear tablero
  for (let y = 0; y < alto; y++) {
    tablero[y] = []

    for (let x = 0; x < ancho; x++) {
      const coordenadasCelda = [y, x]
      tablero[y][x] = coordenadasCelda
    }
  }

  const path: number[][] = [initialPos, [11, 4], [11, 6]]

  const lastCell = path[path.length - 1]

  // Decidir en qué direccion va el siguiente paso
  const availableDirections: string[] = []
  if (lastCell[y] !== 0 && checkValid(tablero, path, lastCell, 'up')) availableDirections.push('up')
  if (lastCell[y] !== alto - 1 && checkValid(tablero, path, lastCell, 'down')) availableDirections.push('down')
  if (lastCell[x] !== 0 && checkValid(tablero, path, lastCell, 'left')) availableDirections.push('left')
  if (lastCell[x] !== ancho - 1 && checkValid(tablero, path, lastCell, 'right')) availableDirections.push('right')

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

  // Añadir celda al path si hay alguna válida
  if (direction) path.push(nextCell)

  return path
}

const checkValid = (tablero: number[][][], path: number[][], lastCell: number[], direction: string) => {
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

  // Celdas adyacentes
  const cell1 = newCell[y] - 1 >= 0 ? tablero[newCell[y] - 1][newCell[x]] : null
  const cell2 = newCell[y] + 1 < tablero.length ? tablero[newCell[y] + 1][newCell[x]] : null
  const cell3 = newCell[x] - 1 >= 0 ? tablero[newCell[y]][newCell[x] - 1] : null
  const cell4 = newCell[x] + 1 < tablero[0].length ? tablero[newCell[y]][newCell[x] + 1] : null

  let cellsToCheck = [cell1, cell2, cell3, cell4]

  // Comprueba que las adyacentes no sean nulas
  cellsToCheck = cellsToCheck.filter(cellToCheck => cellToCheck !== null)

  // Elimina la última celda
  cellsToCheck.forEach(element => {
    const indexToDelete = cellsToCheck.indexOf(element)
    if (element !== null) {
      if (element[y] === lastCell[y] && element[x] === lastCell[x]) cellsToCheck.splice(indexToDelete, 1)
    }
  })

  // Comprueba que las adyacentes no están en el path
  cellsToCheck.forEach(cellToCheck => {
    if (cellToCheck !== null) {
      path.forEach(cellInPath => {
        if (cellToCheck[y] === cellInPath[y] && cellToCheck[x] === cellInPath[x]) {
          valid = false
          return valid
        }
      })
    }
  })

  const isDuplicate = path.some(cellInPath => {
    return cellInPath[y] === newCell[y] && cellInPath[x] === newCell[x]
  })
  if (isDuplicate) {
    valid = false
  }

  return valid
}
