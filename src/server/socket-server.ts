import { createServer, Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';

class SocketServer {
  private httpServer: HttpServer;
  private io: SocketIOServer;

  constructor(server : HttpServer ) {
    this.httpServer = server;
    this.io = new SocketIOServer(this.httpServer);

    this.io.on('connection', this.onConnection.bind(this));
  }

  private onConnection(socket: Socket) {
    console.log('a user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  }

  public start(port: number) {
    this.httpServer.listen(port, () => {
      console.log(`Socket server is running on port ${port}`);
    });
  }
}

export { SocketServer };