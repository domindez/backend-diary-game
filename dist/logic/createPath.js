"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPath = void 0;
const alto = 12;
const ancho = 7;
const y = 0;
const x = 1;
const createPath = (initialPos, pathLength) => {
    const tablero = [];
    for (let y = 0; y < alto; y++) {
        tablero[y] = [];
        for (let x = 0; x < ancho; x++) {
            const coordenadasCelda = [y, x];
            tablero[y][x] = coordenadasCelda;
        }
    }
    const path = [initialPos];
    while (path.length < pathLength) {
        const lastCell = path[path.length - 1];
        const availableDirections = [];
        if (lastCell[y] !== 0 && checkValid(tablero, path, lastCell, 'up'))
            availableDirections.push('up');
        if (lastCell[y] !== alto - 1 && checkValid(tablero, path, lastCell, 'down'))
            availableDirections.push('down');
        if (lastCell[x] !== 0 && checkValid(tablero, path, lastCell, 'left'))
            availableDirections.push('left');
        if (lastCell[x] !== ancho - 1 && checkValid(tablero, path, lastCell, 'right'))
            availableDirections.push('right');
        const direction = availableDirections[Math.floor(Math.random() * availableDirections.length)];
        const nextCell = [...lastCell];
        switch (direction) {
            case 'up':
                nextCell[y] = lastCell[y] - 1;
                break;
            case 'down':
                nextCell[y] = lastCell[y] + 1;
                break;
            case 'left':
                nextCell[x] = lastCell[x] - 1;
                break;
            case 'right':
                nextCell[x] = lastCell[x] + 1;
                break;
            default:
                break;
        }
        if (direction) {
            path.push(nextCell);
        }
        else {
            path.splice(0, path.length);
            path.push(initialPos);
        }
    }
    return path;
};
exports.createPath = createPath;
const checkValid = (tablero, path, lastCell, direction) => {
    let valid = true;
    const newCell = [...lastCell];
    switch (direction) {
        case 'up':
            newCell[y] = lastCell[y] - 1;
            newCell[x] = lastCell[x];
            break;
        case 'down':
            newCell[y] = lastCell[y] + 1;
            newCell[x] = lastCell[x];
            break;
        case 'left':
            newCell[y] = lastCell[y];
            newCell[x] = lastCell[x] - 1;
            break;
        case 'right':
            newCell[y] = lastCell[y];
            newCell[x] = lastCell[x] + 1;
            break;
        default:
            break;
    }
    const cell1 = newCell[y] - 1 >= 0 ? tablero[newCell[y] - 1][newCell[x]] : null;
    const cell2 = newCell[y] + 1 < tablero.length ? tablero[newCell[y] + 1][newCell[x]] : null;
    const cell3 = newCell[x] - 1 >= 0 ? tablero[newCell[y]][newCell[x] - 1] : null;
    const cell4 = newCell[x] + 1 < tablero[0].length ? tablero[newCell[y]][newCell[x] + 1] : null;
    let cellsToCheck = [cell1, cell2, cell3, cell4];
    cellsToCheck = cellsToCheck.filter(cellToCheck => cellToCheck !== null);
    cellsToCheck.forEach(element => {
        const indexToDelete = cellsToCheck.indexOf(element);
        if (element !== null) {
            if (element[y] === lastCell[y] && element[x] === lastCell[x])
                cellsToCheck.splice(indexToDelete, 1);
        }
    });
    cellsToCheck.forEach(cellToCheck => {
        if (cellToCheck !== null) {
            path.forEach(cellInPath => {
                if (cellToCheck[y] === cellInPath[y] && cellToCheck[x] === cellInPath[x]) {
                    valid = false;
                    return valid;
                }
            });
        }
    });
    const isDuplicate = path.some(cellInPath => {
        return cellInPath[y] === newCell[y] && cellInPath[x] === newCell[x];
    });
    if (isDuplicate) {
        valid = false;
    }
    return valid;
};
