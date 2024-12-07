export interface IMessage {
  local: boolean;
  message: string;
  timestamp: string | Date;
  type: string;
  memberId?: string;
}
