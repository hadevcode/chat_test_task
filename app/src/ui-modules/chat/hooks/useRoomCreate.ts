import { useCallback, useState } from 'react';
import { useBackend } from '../../../app/hooks';

export const useRoomCreate = () => {
  const backend = useBackend();
  const [roomTopic, setRoomTopic] = useState('');

  const create = useCallback(async () => {
    try {
      await backend?.createRoom(handleTopic);
    } catch (error) {
      console.error('Error in handleCreate:', error);
    }
  }, []);

  const handleTopic = useCallback((topic: string) => {
    setRoomTopic(topic);
  }, []);

  return { roomTopic, create };
};
