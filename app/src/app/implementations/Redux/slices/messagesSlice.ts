import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage } from '../../../../typings';

export interface IMessagesState {
  messages: IMessage[];
  roomTopic: string | null;
  peersCount: number;
  currentRoom: string | null;
  isConnected: boolean;
}

const initialState: IMessagesState = {
  messages: [],
  roomTopic: null,
  peersCount: 0,
  currentRoom: null,
  isConnected: false,
};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, { payload }: PayloadAction<IMessage>) => {
      state.messages.push(payload);
    },

    setPeersCount: (state, { payload }: PayloadAction<number>) => {
      state.peersCount = payload;
    },

    clearMessages: (state) => {
      state.messages = [];
    },

    setCurrentRoom: (state, { payload }: PayloadAction<string | null>) => {
      state.currentRoom = payload;
    },
    setRoomTopic: (state, action) => {
      state.roomTopic = action.payload;
    },
    clearState: () => initialState,
  },
});

// Actions
export const {
  addMessage,
  setRoomTopic,
  setPeersCount,
  clearMessages,
  setCurrentRoom,
  clearState,
} = messageSlice.actions;

// Selectors
export const selectMessages = (state: { messages: IMessagesState }) =>
  state.messages.messages;
export const selectRoomTopic = (state: { messages: IMessagesState }) =>
  state.messages.roomTopic;
export const selectPeersCount = (state: { messages: IMessagesState }) =>
  state.messages.peersCount;
export const selectCurrentRoom = (state: { messages: IMessagesState }) =>
  state.messages.currentRoom;

// Reducer
export default messageSlice.reducer;
