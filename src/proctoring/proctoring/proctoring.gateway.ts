import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class ProctoringGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('flag-event')
  async handleFlag(
    @MessageBody() data: { sessionId: string; studentId: string; type: string },
    @ConnectedSocket() client: Socket,
  ) {
    this.server.to(`session-${data.sessionId}-teacher`).emit('student-flagged', {
      studentId: data.studentId,
      type: data.type,
      at: new Date(),
    });
  }

  @SubscribeMessage('join-session')
  handleJoin(
    @MessageBody() data: { sessionId: string; role: string },
    @ConnectedSocket() client: Socket,
  ) {
    const room = data.role === 'TEACHER'
      ? `session-${data.sessionId}-teacher`
      : `session-${data.sessionId}-student`;
    client.join(room);
  }
}