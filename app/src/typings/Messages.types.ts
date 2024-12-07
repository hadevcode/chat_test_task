export interface IMessage {
  local: boolean;
  message: string;
  timestamp: string;
  type: string;
  memberId?: string;
}
