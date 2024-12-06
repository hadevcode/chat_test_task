export interface IMessagingService {
  ping: (callback: any) => void;
  reverse: (callback: any) => void;
  createRoom: (callback: any) => void;
  joinRoom: (topic: any, callback: any) => void;
  sendMessage: (message: any, callback: any) => void;
}
