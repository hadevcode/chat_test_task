import b4a from 'b4a';

import uiEvent, { CONNECTIONS_UI, RECEIVE_MESSAGE_UI } from './uiEvent';
import {
  API_PING,
  API_REVERSE,
  API_CREATE_ROOM,
  API_JOIN_ROOM,
  API_SEND_MESSAGE,
  API_RECEIVE_MESSAGE,
  API_UPDATE_CONNECTIONS,
} from '../../worklet/api.mjs';
import { Worklet } from 'react-native-bare-kit';
import { Callback } from '@react-native-async-storage/async-storage/lib/typescript/types';

// RPCs receiver from worklet to UI
export const rpcHandler = async (req: {
  // @todo fixme
  command: any;
  data: Uint8Array<ArrayBufferLike>;
}) => {
  console.log('from worklet:', req.command);
  switch (req.command) {
    case API_RECEIVE_MESSAGE:
      const data = JSON.parse(b4a.toString(req.data, 'utf8'));
      const message = JSON.parse(data?.event);
      const memberId = data?.memberId;
      console.log('got message:', message);
      uiEvent.emit(RECEIVE_MESSAGE_UI, { memberId, message });
      break;
    case API_UPDATE_CONNECTIONS:
      const count = b4a.toString(req.data, 'utf8');
      console.log('current peer cnt:', count);
      uiEvent.emit(CONNECTIONS_UI, count);
      break;
    default:
      break;
  }
};

// RPCs call from UI worklet
export const getBackend = (rpc: Worklet['RPC']) => ({
  ping: (callback: Callback) => {
    if (!rpc || !callback) return;
    const req = rpc.request(API_PING);
    req.send('Hello from RN UI!');
    req.reply('utf8').then((res: Error | null | undefined) => callback(res));
  },
  reverse: (callback: Callback) => {
    if (!rpc || !callback) return;
    const req = rpc.request(API_REVERSE);
    req.send('Reverse RN UI!');
    req.reply('utf8').then((res: Error | null | undefined) => callback(res));
  },
  createRoom: (callback: Callback) => {
    if (!rpc || !callback) return;
    const req = rpc.request(API_CREATE_ROOM);
    req.send('Create Room!');
    req.reply('utf8').then((res: string) => {
      const { done, topic } = JSON.parse(res);
      console.log(
        done ? `[info] Created new chat room: ${topic}` : `[info] Create fail`
      );
      callback(topic);
    });
  },
  joinRoom: (topic: string, callback: Callback) => {
    console.log(topic, 'topictopictopic');
    console.log(topic);
    if (!rpc || !callback || !topic) return;
    const req = rpc.request(API_JOIN_ROOM);
    req.send(topic);
    req.reply('utf8').then((res: string) => {
      const { done, topic } = JSON.parse(res);
      console.log(done ? `[info] Joined chat room` : `[info] Joined fail`);
      callback(topic);
    });
  },
  sendMessage: (
    message: string,
    callback: (message: string, arg1: boolean) => void
  ) => {
    if (!rpc || !callback || !message) return;
    const req = rpc.request(API_SEND_MESSAGE);
    req.send(message);
    req.reply('utf8').then((message: string) => callback(message, true));
  },
});