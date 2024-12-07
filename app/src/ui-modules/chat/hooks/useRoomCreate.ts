import { SetStateAction, useCallback, useState } from 'react';
import { useBackend } from '../../../app/hooks';

export const useRoomCreate = () => {
  const backend = useBackend();
  const [roomTopic, setRoomTopic] = useState('');
  const [loading, setLoading] = useState(false);

  const create = async () => {
    try {
      setLoading(true);
      await backend?.createRoom((topic: string) => {
        setRoomTopic(topic);
      });
    } catch (error) {
      console.error('Error in handleCreate:', error);
    } finally {
      setLoading(false);
    }
  };

  return { roomTopic, create, loading };
};
