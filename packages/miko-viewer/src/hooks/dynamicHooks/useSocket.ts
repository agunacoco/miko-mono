import { SOCKET_URL } from '@src/const';
import { useRef } from 'react';
import io, { Socket } from 'socket.io-client';

class SingletonSocket {
  private static socket: Socket;

  private static addBaseEvent() {
    SingletonSocket.socket
      .on('connect', () => {
        console.log('socket connect 👌 ', SingletonSocket.socket.connected);
      })
      .on('connect_error', err => {
        console.error('socket_connect_error', err);
        setTimeout(() => SingletonSocket.socket.connect(), 1000);
      })
      .on('error', err => {
        console.error('socket error', err);
      })
      .on('disconnect', reason => {
        console.error('socket disconnect', reason);
      });
  }

  private static generateNewSocket() {
    const aSocket = io(SOCKET_URL, {
      autoConnect: true,
      transports: ['polling', 'websocket'], // websocket 사용후 polling으로 업그레이드
    });

    return aSocket;
  }

  public static getSocket(): Socket {
    if (!SingletonSocket.socket) {
      SingletonSocket.socket = this.generateNewSocket();
      SingletonSocket.addBaseEvent();
    }
    return SingletonSocket.socket;
  }
}

export const useSocket = () => {
  const socket = useRef<Socket>(SingletonSocket.getSocket());
  return socket.current;
};
