import { Damage } from "./Damage";
import { Cell } from "./Cell";
import { Ship } from "./Ship";
import { Miss } from "./Miss";

export class Board {
  constructor() {
    this.cells = [];
  }

  initCells() {
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 10; j++) {
        row.push(new Cell(this, j, i, null));
      }
      this.cells.push(row);
    }
    return this;
  }

  getCopyBoard() {
    const newBoard = new Board();
    newBoard.cells = this.cells.map((row) =>
      row.map((cell) => new Cell(this, cell.x, cell.y, cell.mark))
    );
    return newBoard;
  }

  getCells(x, y) {
    if (x < 0 || x >= 10 || y < 0 || y >= 10) {
      throw new Error("Координаты выходят за пределы доски");
    }
    return this.cells[y][x];
  }

  addShip(x, y) {
    const cell = this.getCells(x, y);
    cell.mark = new Ship(cell);
  }

  addMiss(x, y) {
    const cell = this.getCells(x, y);
    cell.mark = new Miss(cell);
  }

  addDamage(x, y) {
    const cell = this.getCells(x, y);
    cell.mark = new Damage(cell);
  }
}
