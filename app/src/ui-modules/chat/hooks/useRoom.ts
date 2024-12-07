import { useCallback, useEffect, useState } from 'react';
import { IMessage } from '../../../typings';
import uiEvent, {
  CONNECTIONS_UI,
  RECEIVE_MESSAGE_UI,
} from '../../../lib/uiEvent';
import { createMessage } from '../../../lib/message';
import { useBackend } from '../../../app/hooks';

export const useRoom = () => {
  const backend = useBackend();

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [peersCount, setPeersCount] = useState<number>(0);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const messageListener = uiEvent.on(
      RECEIVE_MESSAGE_UI,
      ({ memberId, message }: { memberId: string; message: IMessage }) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { ...message, local: false, memberId },
        ]);
      }
    );

    const peerCountListener = uiEvent.on(CONNECTIONS_UI, (count: number) => {
      setPeersCount(count);
    });

    return () => {
      messageListener.off();
      peerCountListener.off();
    };
  }, []);

  const appendMessage = useCallback((msg: string, local = false) => {
    if (msg.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        createMessage(msg, local),
      ]);
    }
  }, []);

  const handleSend = useCallback(() => {
    if (inputText.trim()) {
      backend?.sendMessage(inputText, appendMessage);
      setInputText('');
    }
  }, [backend, inputText, appendMessage]);

  return {
    messages,
    peersCount,
    inputText,
    handleSend,
    setInputText,
  };
};
