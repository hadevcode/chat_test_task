import mitt from 'mitt';

export const StatusBarEmitter = mitt<{ documentPickerClosed: void }>();
