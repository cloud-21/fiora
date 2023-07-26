import { Socket } from 'socket.io';

export function getSocketIp(socket: Socket) {
    console.warn(socket.handshake.headers['x-real-ip']);
    console.warn('----------------');
    console.warn(socket.request.connection.remoteAddress);

    return (
        (socket.handshake.headers['x-real-ip'] as string) ||
        socket.request.connection.remoteAddress ||
        ''
    );
}
