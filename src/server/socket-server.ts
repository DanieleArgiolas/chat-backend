import { createServer, Server as HttpServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import { SocketClient } from '../classes/socket-client';
import { SocketService } from '../services/socket-service';
import { inject,injectable } from 'inversify';
import { ServerStarter } from './server-starter';

@injectable()
class SocketServer {
  private httpServer: HttpServer;
  private io: SocketIOServer;

  sockets: SocketClient[] = []

  constructor(@inject('ServerStarter') server: ServerStarter, @inject('SocketService') private socketService: SocketService) {
    this.httpServer = server.getHttpServer();
    this.io = new SocketIOServer(this.httpServer, {
      cors: {
        origin: '*'
      }
    });

    this.io.on('connection', (socket: Socket) => this.onConnection(socket));
  }

  private onConnection(socket: Socket) {
    console.log('a user connected');

    


    const connectedSocket = new SocketClient(socket);

    this.sockets.push(connectedSocket)

    this.socketService.sockets = this.sockets

    // emit to the new socket the other users
    connectedSocket.emit('all_sockets', this.sockets.filter(x => x.cid !== connectedSocket.cid).map(x => x.data))
    //broadcast to others
    socket.broadcast.emit('socket_joined', connectedSocket.data)


    socket.on('disconnect', () => {

      this.sockets = this.sockets.filter(x => x.cid !== connectedSocket.cid)
      
    this.socketService.sockets = this.sockets
      socket.broadcast.emit('socket_left', connectedSocket.data)
    });
  }

  public start(port: number) {
    this.httpServer.listen(port, () => {
      console.log(`Socket server is running on port ${port}`);
    });
  }
}

export { SocketServer };