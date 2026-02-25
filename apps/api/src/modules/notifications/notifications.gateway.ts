import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
})
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join-admin')
  handleJoinAdmin(client: Socket) {
    client.join('admin-room');
    return { event: 'joined', data: 'Admin room joined' };
  }

  emitNotification(notification: any) {
    this.server.to('admin-room').emit('notification', notification);
  }

  emitNewLead(lead: any) {
    this.server.to('admin-room').emit('new-lead', lead);
  }

  emitDashboardUpdate(data: any) {
    this.server.to('admin-room').emit('dashboard-update', data);
  }
}
