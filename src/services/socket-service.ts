

import { Socket } from 'socket.io';
import { SocketClient } from '../classes/socket-client';

import { inject, injectable } from 'inversify';
@injectable()
class SocketService{


    public sockets: Array<SocketClient> = []

}



export {SocketService}