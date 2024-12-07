export interface IMessagingService {
  ping: (callback: any) => void;
  reverse: (callback: any) => void;
  createRoom: (callback: any) => Promise<void>;
  joinRoom: (topic: any, callback: any) => Promise<void>;
  sendMessage: (message: any, callback: any) => void;
}
