import { SEAL_TEXT } from '@fiora/utils/const';
import { getSocketIp } from '@fiora/utils/socket';
import { Socket } from 'socket.io';
import {
    getSealIpKey,
    getSealUserKey,
    Redis,
} from '@fiora/database/redis/initRedis';

/**
 * 拦截被封禁用户的请求
 */
export default function seal(socket: Socket) {
    //socket.use(([event, ...args], next) => {})
    return async ([, , cb]: MiddlewareArgs, next: MiddlewareNext) => {
        //       guest
        //       {
        //         os: 'Windows',
        //         browser: 'Chrome',
        //         environment: 'Chrome 112.0.0.0 on Windows 10 64-bit'
        //       }
        //       [Function (anonymous)]

        const ip = getSocketIp(socket);

        const isSealIp = await Redis.has(getSealIpKey(ip));
        const isSealUser =
            socket.data.user &&
            (await Redis.has(getSealUserKey(socket.data.user)));

        if (isSealUser || isSealIp) {
            cb(SEAL_TEXT);
        } else {
            next();
        }
    };
}
