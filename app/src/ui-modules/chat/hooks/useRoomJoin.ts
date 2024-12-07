import { useCallback, useState } from 'react';
import { useBackend } from '../../../app/hooks';

export const useRoomJoin = (roomTopicIn: string) => {
  const backend = useBackend();
  const [roomTopic, setRoomTopic] = useState('');

  const join = useCallback(() => {
    const topic = roomTopicIn.replace('Topic: ', '');
    handleTopic(topic);
    backend?.joinRoom(topic, handleTopic);
  }, [roomTopicIn]);

  const handleTopic = useCallback((topic: string) => {
    setRoomTopic(topic);
  }, []);

  return { roomTopic, join };
};
