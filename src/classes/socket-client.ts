import { inject } from 'inversify';
import { Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';
import { SocketService } from '../services/socket-service';
class SocketClient {


    // public id: string;

    public cid: string;

    public data: Socket['data'];

    private socket: Socket;

    constructor(socket: Socket) {


        socket.data = {
            customID: uuidv4()
        }

        this.socket = socket;

        this.data = socket.data;

        this.cid = socket.data.customID;

        this.join(this.cid)
        // this.id = socket.id;

        this.init()
    }

    public join(room: string) {
        this.socket.join(room)
        this.emit('self', this.data)
    }

    private init() {
        this.join(this.data.customID)
        this.on('send_message', (data: { text: string, to: SocketClient['cid'] }) => {
            console.log('send_message', data);

            console.log(data);


            // I WANT SO SEND A MESSAGE TO ANOTHER SOCKET
            this.socket.to(data.to).emit('incoming_message', {
                text: data.text,
                from: this.cid,
                to: data.to,
            })

            this.socket.emit('incoming_message', {
                text: data.text,
                from: this.cid,
                to: data.to,
            })
       
        })
    }

    public on<T>(event: string, listener: (args: T) => void): void {
        this.socket.on(event, listener);
    }

    public emit<T>(event: string, data: T): void {
        this.socket.emit(event, data);
    }

    public disconnect(): void {
        this.socket.disconnect();
    }
}

export { SocketClient };