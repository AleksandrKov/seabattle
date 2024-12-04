import { nanoid } from "nanoid";

export const generateGameId = () => {
  return nanoid(6);
};

export function placeShipsRandomly(board) {
  const shipSizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];

  for (const size of shipSizes) {
    let placed = false;

    while (!placed) {
      const isHorizontal = Math.random() < 0.5;

      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);

      if (canPlaceShip(board, x, y, size, isHorizontal)) {
        placeShip(board, x, y, size, isHorizontal);
        placed = true;
      }
    }
  }
}

function canPlaceShip(board, x, y, size, isHorizontal) {
  if (isHorizontal) {
    if (x + size > 10) return false;
  } else {
    if (y + size > 10) return false;
  }

  for (let i = 0; i < size; i++) {
    const checkX = isHorizontal ? x + i : x;
    const checkY = isHorizontal ? y : y + i;

    if (!isCellAvailable(board, checkX, checkY)) {
      return false;
    }
  }

  return true;
}

function isCellAvailable(board, x, y) {
  if (x < 0 || x >= 10 || y < 0 || y >= 10) return false;

  const cell = board.getCells(x, y);
  if (cell.mark) return false;

  for (let dx = -1; dx <= 1; dx++) {
    for (let dy = -1; dy <= 1; dy++) {
      const neighborX = x + dx;
      const neighborY = y + dy;

      if (
        neighborX >= 0 &&
        neighborX < 10 &&
        neighborY >= 0 &&
        neighborY < 10 &&
        board.getCells(neighborX, neighborY).mark
      ) {
        return false;
      }
    }
  }

  return true;
}

function placeShip(board, x, y, size, isHorizontal) {
  for (let i = 0; i < size; i++) {
    const cellX = isHorizontal ? x + i : x;
    const cellY = isHorizontal ? y : y + i;

    board.addShip(cellX, cellY);
  }
}
