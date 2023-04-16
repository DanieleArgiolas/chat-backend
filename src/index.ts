
import { Server } from './server/server';
import { SocketServer } from './server/socket-server';

const app = new Server();

const httpServer = new Server().getHttpServer();
const socketServer = new SocketServer(httpServer);

socketServer.start(3000);