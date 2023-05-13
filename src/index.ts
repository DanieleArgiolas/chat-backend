import 'reflect-metadata';

import { SocketServer } from './server/socket-server';
import { SocketService } from './services/socket-service';
import { DependencyContainer } from './utils/dependency-container';
import { Container } from 'inversify';
import { ServerStarter } from './server/server-starter';


// 
const container = new DependencyContainer();


// const container = new Container({ autoBindInjectable: true });
// container.bind<SocketService>('SocketService').to(SocketService);
// container.bind<ServerStarter>('ServerStarter').to(ServerStarter);


const socketServer = container.resolve<SocketServer>(SocketServer);


socketServer.start(3000);

// taskkill /F /IM node.exe