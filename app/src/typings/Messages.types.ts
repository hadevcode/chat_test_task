export interface IMessage {
  local: boolean;
  id: string;
  message: string;
  timestamp: string;
  type: string;
  memberId?: string;
}
