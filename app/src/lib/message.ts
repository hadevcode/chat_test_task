export function createMessage(msg: string, local = false) {
  return {
    timestamp: new Date().toISOString(),
    message: msg,
    local,
    type: 'text',
  };
}
