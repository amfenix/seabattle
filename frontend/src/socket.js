import { io } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? `https://api.seabattle.react-learning.ru` : `http://localhost:3005`;

export const socket = io(URL, { autoConnect: false });