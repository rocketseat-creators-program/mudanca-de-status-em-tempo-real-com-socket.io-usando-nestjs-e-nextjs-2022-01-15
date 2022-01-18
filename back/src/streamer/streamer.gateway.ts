import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'ws';

@WebSocketGateway({ cors: true, namespace: '/streamer' })
export class StreamerGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger(StreamerGateway.name);
  @WebSocketServer() server: Server;

  public afterInit(server: Server): void {
    return this.logger.log('Init');
  }

  public handleDisconnect(client: Socket): void {
    return this.logger.log(`Client dis: ${client.id}`);
  }

  public handleConnection(client: Socket): void {
    return this.logger.log(`Client con: ${client.id}`);
  }

  public handleStatus(payload: any): Promise<WsResponse<any>> {
    this.logger.log(`Change status: ${payload.room}, ${payload.status}`);
    return this.server.to(payload.room).emit('statusToClient', payload);
  }

  @SubscribeMessage('joinStatus')
  public joinStatus(client: Socket, room: string): void {
    this.logger.log(`joinStatus: ${room}`);
    client.join(room);
  }

  @SubscribeMessage('leaveStatus')
  public leaveStatus(client: Socket, room: string): void {
    this.logger.log(`leaveStatus: ${room}`);
    client.leave(room);
  }
}
