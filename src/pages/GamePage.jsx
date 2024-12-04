import { useEffect, useState } from "react";
import React from "react";
import BoardComponent from "../components/BoardComponents";
import ActionsInfo from "../components/ActionsInfo";
import { Board } from "../models/Board";
import { useParams, useNavigate } from "react-router-dom";
import { ref, set, onChildAdded, push } from "firebase/database";
import { db } from "../services/api/firebase";
import { placeShipsRandomly } from "../services/utils";
import { api } from "../services/api/api";

const GamePage = () => {
  const [myBoard, setMyBoard] = useState(new Board());
  const [hisBoard, setHisBoard] = useState(new Board());
  const [rivalName, setRivalName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [shipsReady, setShipsReady] = useState(false);
  const [canShoot, setCanShoot] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { gameId } = useParams();
  const navigate = useNavigate();

  function restart() {
    const newMyBoard = new Board();
    const newHisBoard = new Board();
    newMyBoard.initCells();
    newHisBoard.initCells();

    placeShipsRandomly(newMyBoard);

    setMyBoard(newMyBoard);
    setHisBoard(newHisBoard);
  }

  const randomizeShips = () => {
    if (!shipsReady) {
      const newBoard = new Board();
      newBoard.initCells();
      placeShipsRandomly(newBoard);
      setMyBoard(newBoard);
    }
  };

  useEffect(() => {
    if (gameId) {
      setRoomCode(gameId);
      api.joinRoom(gameId, (message) => {
        const { type, payload } = message;
        const { userName, x, y, canStart, rivalName, success } = payload;

        switch (type) {
          case "connectToPlay":
            if (!success) {
              return navigate("/");
            }
            setRivalName(rivalName);
            break;
          case "readyToPlay":
            if (payload.userName === localStorage.nickName && canStart) {
              setCanShoot(true);
            }
            break;
          case "afterShootByMe":
            if (userName !== localStorage.nickName) {
              const isPrefectHit = myBoard.cells[y][x].mark?.name === "ship";
              changeBoardAfterShoot(myBoard, setMyBoard, x, y, isPrefectHit);
              api.sendMessage(gameId, {
                event: "checkShoot",
                payload: { ...payload, isPrefectHit },
              });
              if (!isPrefectHit) {
                setCanShoot(true);
              }
            }
            break;
          case "isPrefectHit":
            if (userName === localStorage.nickName) {
              changeBoardAfterShoot(
                hisBoard,
                setHisBoard,
                x,
                y,
                payload.isPrefectHit
              );
              payload.isPrefectHit ? setCanShoot(true) : setCanShoot(false);
            }
            break;
          default:
            break;
        }
      });
      restart();
    }
  }, [gameId]);

  function changeBoardAfterShoot(board, setBoard, x, y, isPrefectHit) {
    isPrefectHit ? board.addDamage(x, y) : board.addMiss(x, y);
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  const handleGenerateRoom = async () => {
    setLoading(true);
    setError("");
    try {
      await api.generateRoomAndJoin((code) => {
        setRoomCode(code);
        navigate(`/game/${code}`);
      });
    } catch (err) {
      setError("Ошибка при создании комнаты. Попробуйте снова.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
  };

  return (
    <div className="flex flex-col items-center">
      {!roomCode && (
        <div>
          <button onClick={handleGenerateRoom} disabled={loading}>
            {loading ? "Создание комнаты..." : "Сгенерировать код игры"}
          </button>
        </div>
      )}
      {roomCode && (
        <div className="flex items-center mb-4">
          <h2 className="mr-4 text-xl font-bold text-gray-800">
            Отправте код для подключения к игре: {roomCode}
          </h2>
          <button
            onClick={handleCopyRoomCode}
            className="bg-green-500 text-white py-1 px-4 rounded-md hover:bg-green-600 transition duration-300"
          >
            Копировать
          </button>
        </div>
      )}
      <div>
        <p className="text-2xl font-bold text-center my-4">К бою!</p>
        <div className="boards-container">
          <div className="mr-8">
            <p className="nick text-lg font-semibold text-blue-600">
              {localStorage.nickName}
            </p>
            <BoardComponent
              board={myBoard}
              isMyBoard
              setBoard={setMyBoard}
              shipsReady={shipsReady}
              canShoot={false}
            />
            <button
              onClick={randomizeShips}
              disabled={shipsReady}
              className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              {shipsReady
                ? "Корабли готовы!"
                : "Случайная расстановка кораблей"}
            </button>
          </div>
          <div>
            <p className="nick text-lg font-semibold text-blue-600">
              {rivalName || "Соперник не определен"}
            </p>
            <BoardComponent
              board={hisBoard}
              setBoard={setHisBoard}
              canShoot={canShoot}
              shipsReady={shipsReady}
            />
          </div>
        </div>
        <ActionsInfo canShoot={canShoot} shipsReady={shipsReady} />
      </div>
    </div>
  );
};

export default GamePage;
