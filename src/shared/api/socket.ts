import { io } from 'socket.io-client';

const WS_URL = import.meta.env.VITE_WS_URL || window.location.origin;

export const socket = io(WS_URL, {
  transports: ['websocket'],
  autoConnect: false,
});
