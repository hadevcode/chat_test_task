import {
  addMessage,
  setPeersCount,
  clearMessages,
  setCurrentRoom,
  selectMessages,
  selectRoomTopic,
  selectPeersCount,
  selectCurrentRoom,
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
  const currentRoom = useAppSelector(selectCurrentRoom);

  // Actions
  const addNewMessage = (message: IMessage) => dispatch(addMessage(message));

  const updatePeersCount = (count: number) => dispatch(setPeersCount(count));

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
    currentRoom,

    // Actions
    addNewMessage,
    updatePeersCount,
    updateRoomTopic,

    clearAllMessages,
    updateCurrentRoom,
    clearState,
  };
};
