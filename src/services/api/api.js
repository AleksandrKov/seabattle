export const api = {
    // Подключиться к комнате
    joinRoom: (roomCode, onMessageReceived) => {},
    
    // Отправить сообщение в комнату
    sendMessage: (roomCode, message) => {},
    
    // Отписаться от комнаты (завершить чат)
    leaveRoom: (roomCode) => {},
    
    // Настроить событие получения сообщения
    onMessage: (callback) => {},
  };