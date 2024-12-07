import {
  addMessage,
  setPeersCount,
  clearMessages,
  setCurrentRoom,
  selectMessages,
  selectRoomTopic,
  selectPeersCount,
  selectIsConnected,
  selectCurrentRoom,
  setConnectionStatus,
  setRoomTopic,
  clearState as clearReduxState,
} from '../../../app/implementations/Redux/slices/messagesSlice';
import { IMessage } from '../../../typings';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../app/implementations/Redux/store';

export const useMessagesState = () => {
  const dispatch = useAppDispatch();

  // Selectors
  const messages = useAppSelector(selectMessages);
  const roomTopic = useAppSelector(selectRoomTopic);
  const peersCount = useAppSelector(selectPeersCount);
  const isConnected = useAppSelector(selectIsConnected);
  const currentRoom = useAppSelector(selectCurrentRoom);

  // Actions
  const addNewMessage = (message: IMessage) => dispatch(addMessage(message));

  const updatePeersCount = (count: number) => dispatch(setPeersCount(count));

  const updateConnectionStatus = (status: boolean) =>
    dispatch(setConnectionStatus(status));

  const clearAllMessages = () => dispatch(clearMessages());

  const updateCurrentRoom = (room: string | null) =>
    dispatch(setCurrentRoom(room));

  const updateRoomTopic = (roomTopic: string | null) =>
    dispatch(setRoomTopic(roomTopic));

  const clearState = () => dispatch(clearReduxState());

  return {
    // State
    messages,
    roomTopic,
    peersCount,
    isConnected,
    currentRoom,

    // Actions
    addNewMessage,
    updatePeersCount,
    updateRoomTopic,
    updateConnectionStatus,
    clearAllMessages,
    updateCurrentRoom,
    clearState,
  };
};
