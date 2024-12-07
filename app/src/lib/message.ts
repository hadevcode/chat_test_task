import { IMessage } from '../typings';

export function createMessage(msg: string, local = false): IMessage {
  return {
    timestamp: new Date(),
    message: msg,
    local,
    type: 'text',
  };
}
