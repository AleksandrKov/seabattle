import React from "react";
import CellComponent from "./CellComponents";

const BoardComponent = ({
  board,
  setBoard,
  shipsReady,
  isMyBoard,
  canShoot,
  shoot,
}) => {
  const boardClasses = ["board"];

  function addMark(x, y) {
    if (canShoot && !isMyBoard) {
      shoot(x, y);
    }
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  if (canShoot) {
    boardClasses.push("active-shoot");
  }

  return (
    <div className={boardClasses.join(" ")}>
      {board.cells.map((row, rowIndex) => (
        <React.Fragment key={rowIndex}>
          {row.map((cell) => (
            <CellComponent key={cell.id} cell={cell} addMark={addMark} />
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BoardComponent;
