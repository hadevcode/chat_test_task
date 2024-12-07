import { useCallback, useEffect } from 'react';
import uiEvent, {
  CONNECTIONS_UI,
  RECEIVE_MESSAGE_UI,
} from '../../../lib/uiEvent';
import { createMessage } from '../../../lib/message';
import { useMessagesState } from '../hooks/useMessagesState';
import { IMessage } from '../../../typings';

export const useRoom = () => {
  const { messages, addNewMessage, updatePeersCount, peersCount } =
    useMessagesState(); // Use Redux state and actions for messages and peers count

  useEffect(() => {
    const messageListener = uiEvent.on(
      RECEIVE_MESSAGE_UI,
      ({ memberId, message }: { memberId: string; message: IMessage }) => {
        addNewMessage({
          ...message,
          local: false,
          memberId,
        });
      }
    );

    const peerCountListener = uiEvent.on(CONNECTIONS_UI, (count: number) => {
      updatePeersCount(count);
    });

    return () => {
      messageListener.off('');
      peerCountListener.off('');
    };
  }, [addNewMessage, updatePeersCount]);

  const appendMessage = useCallback(
    (msg: string, local = false) => {
      if (msg.trim()) {
        addNewMessage(createMessage(msg, local));
      }
    },
    [addNewMessage]
  );

  return {
    messages, // Redux-managed messages
    peersCount, // Redux-managed peers count
    appendMessage, // Redux-managed message adder
  };
};
