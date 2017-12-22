import io from "socket.io-client";
export const BASE_URL = 'https://horizonsplayground.herokuapp.com';
// export const BASE_URL = 'http://localhost:3001';
// 'https://horizonsplayground.herokuapp.com'
export const SOCKET = io(BASE_URL, {transports: ['websocket']});
