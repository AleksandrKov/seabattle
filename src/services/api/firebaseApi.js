import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, push, onChildAdded } from "firebase/database";
import { api } from "./api"; 

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);

let roomRef = null;

api.joinRoom = (roomCode, onMessageReceived) => {
  roomRef = ref(database, `rooms/${roomCode}/messages`);

  onChildAdded(roomRef, (snapshot) => {
    const message = snapshot.val();
    onMessageReceived(message);
  });
};

api.sendMessage = (roomCode, message) => {
  if (!roomRef) return;

  push(roomRef, { text: message, timestamp: Date.now() });
};

api.leaveRoom = (roomCode) => {
  roomRef = null;
};

api.onMessage = (callback) => {
  if (roomRef) {
    onChildAdded(roomRef, (snapshot) => {
      const message = snapshot.val();
      callback(message);
    });
  }
};

api.createRoom = async (roomCode, initialData = {}) => {
  const roomRef = ref(database, `rooms/${roomCode}`);
  await set(roomRef, {
    ...initialData,
    createdAt: Date.now(),
    messages: [],
  });
};

api.generateRoomAndJoin = async (onRoomCreated) => {
  const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase(); // Генерация случайного кода
  await api.createRoom(roomCode, { owner: localStorage.nickName || "Guest" });
  onRoomCreated(roomCode); // Вызываем callback для обработки кода комнаты в компоненте
};


export { api };
