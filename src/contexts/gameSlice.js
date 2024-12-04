// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { Board } from '../models/Board';
// import { placeShipsRandomly } from '../services/utils';

// interface GameState {
//   myBoard: Board;
//   hisBoard: Board;
//   roomCode: string;
//   rivalName: string;
//   shipsReady: boolean;
//   canShoot: boolean;
//   gameStarted: boolean;
//   shipsStatus: {
//     total: number;
//     hit: number;
//     intact: number;
//   };
// }

// const initialBoard = () => {
//   const board = new Board();
//   board.initCells();
//   placeShipsRandomly(board);
//   return board;
// };

// const initialState: GameState = {
//   myBoard: initialBoard(),
//   hisBoard: new Board(),
//   roomCode: '',
//   rivalName: '',
//   shipsReady: false,
//   canShoot: false,
//   gameStarted: false,
//   shipsStatus: {
//     total: 0, // Рассчитывается динамически после расстановки
//     hit: 0,
//     intact: 0,
//   },
// };

// const gameSlice = createSlice({
//   name: 'game',
//   initialState,
//   reducers: {
//     resetGame(state) {
//       state.myBoard = initialBoard();
//       state.hisBoard = new Board();
//       state.shipsReady = false;
//       state.canShoot = false;
//       state.gameStarted = false;
//       state.shipsStatus = {
//         total: state.myBoard.ships.length,
//         hit: 0,
//         intact: state.myBoard.ships.length,
//       };
//     },
//     setRoomCode(state, action: PayloadAction<string>) {
//       state.roomCode = action.payload;
//     },
//     setRivalName(state, action: PayloadAction<string>) {
//       state.rivalName = action.payload;
//     },
//     randomizeShips(state) {
//       if (!state.shipsReady && !state.gameStarted) {
//         const newBoard = new Board();
//         newBoard.initCells();
//         placeShipsRandomly(newBoard);
//         state.myBoard = newBoard;
//         state.shipsStatus = {
//           total: newBoard.ships.length,
//           hit: 0,
//           intact: newBoard.ships.length,
//         };
//       }
//     },
//     markShipHit(state, action: PayloadAction<{ x: number; y: number }>) {
//       const { x, y } = action.payload;
//       const cell = state.myBoard.cells[y][x];
//       if (cell.mark?.name === 'ship') {
//         state.myBoard.addDamage(x, y);
//         state.shipsStatus.hit += 1;
//         state.shipsStatus.intact -= 1;
//       } else {
//         state.myBoard.addMiss(x, y);
//       }
//     },
//     setGameStarted(state, action: PayloadAction<boolean>) {
//       state.gameStarted = action.payload;
//     },
//   },
// });

// export const {
//   resetGame,
//   setRoomCode,
//   setRivalName,
//   randomizeShips,
//   markShipHit,
//   setGameStarted,
// } = gameSlice.actions;

// export default gameSlice.reducer;

// src/slices/gameSlice.ts
// src/slices/gameSlice.js
