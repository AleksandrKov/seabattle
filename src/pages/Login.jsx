import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { generateGameId } from "../services/utils";
import '../index.css';

const Login = () => {
  const [invitationGame, setInvitationGame] = useState(false);
  const [gameId, setGameId] = useState("");
  const [nickName, setNickName] = useState("");

  const navigate = useNavigate();

  const handleFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
  
      if (!nickName.trim()) {
        alert("Введите имя!");
        return;
      }
  
      if (invitationGame && !gameId.trim()) {
        alert("Введите идентификатор игры!");
        return;
      }

      localStorage.setItem("nickName", nickName);
  
      if (!invitationGame) {
        if (!gameId) {
          const newGameId = generateGameId();
          setGameId(newGameId);
          localStorage.setItem("gameId", newGameId);
          navigate("/game/" + newGameId);
          return;
        }
      }
  
      navigate("/game/" + gameId);
    },
    [gameId, invitationGame, nickName, navigate]
  );
  

  const handleGameModeChange = useCallback((isInvitation) => {
    setInvitationGame(isInvitation);
    setGameId(""); 
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl font-semibold text-center mb-6">Игра Морской бой</h2>
        <p className="text-center text-sm text-gray-700 mb-4">Авторизация</p>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <label htmlFor="nickName" className="block text-sm font-medium text-gray-700">Ваше имя</label>
            <input
              type="text"
              name="nickName"
              id="nickName"
              value={nickName}
              onChange={(e) => setNickName(e.target.value)}
              aria-label="Введите своё имя"
              autoFocus
              className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="mb-6 flex justify-between">
            <div className="flex items-center">
              <input
                type="radio"
                name="typeEnter"
                id="gen"
                checked={!invitationGame}
                onChange={() => handleGameModeChange(false)}
                aria-label="Создать игру"
                className="mr-2"
              />
              <label htmlFor="gen" className="text-sm text-gray-700">Создать игру</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                name="typeEnter"
                id="inGame"
                checked={invitationGame}
                onChange={() => handleGameModeChange(true)}
                aria-label="Войти в игру по идентификатору"
                className="mr-2"
              />
              <label htmlFor="inGame" className="text-sm text-gray-700">Войти в игру по идентификатору</label>
            </div>
          </div>
          <div className="mb-6">
            {invitationGame && (
              <>
                <label htmlFor="gameId" className="block text-sm font-medium text-gray-700">Введите идентификатор игры</label>
                <input
                  type="text"
                  name="gameId"
                  id="gameId"
                  value={gameId}
                  onChange={(e) => setGameId(e.target.value)}
                  aria-label="Введите идентификатор игры"
                  className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={!nickName.trim() || (invitationGame && !gameId.trim())}
          >
            Играть
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;




