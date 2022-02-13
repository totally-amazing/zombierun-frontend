import socket from 'socket.io-client';

class Socket {
  constructor(baseURL) {
    this.io = socket(baseURL);

    this.io.on('connect_error', (error) => {
      console.log(`socket error:::::${error.message}`);
    });
  }

  on = (event, callback) => {
    if (!this.io.connected) {
      this.io.connect();
    }

    this.io.on(event, callback);
    return () => this.io.off(event);
  };

  emit = (event, args) => {
    if (!this.io.connected) {
      this.io.connect();
    }

    this.io.emit(event, ...args);
  };
}

export default Socket;
