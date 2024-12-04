import { Mark } from "./Mark";

export class Ship extends Mark {
  constructor(cell) {
    super(cell);
    this.logo = "🚢";
    this.name = "ship";
    this.color = "grey";
  }
}

