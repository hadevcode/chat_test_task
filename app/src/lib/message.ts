export function createMessage(msg: string, local = false) {
  return {
    timestamp: new Date(),
    message: msg,
    local,
    type: 'text',
  };
}