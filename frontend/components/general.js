import io from "socket.io-client";
export const BASE_URL = 'https://horizonsplayground.herokuapp.com';
//  'http://localhost:3000';
// 'https://horizonsplayground.herokuapp.com'
export const SOCKET = io(BASE_URL, {transports: ['websocket']});
