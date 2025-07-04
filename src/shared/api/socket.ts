import { io } from 'socket.io-client';

export const socket = io('http://localhost:5000', {
  // const WS_URL = import.meta.env.VITE_WS_URL || window.location.origin;
  // export const socket = io(WS_URL, {
  transports: ['websocket'],
  autoConnect: false,
});
