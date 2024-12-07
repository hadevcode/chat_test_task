import { useState } from 'react';
import { useBackend } from '../../../app/hooks';
import { useMessagesState } from '../../../ui-modules/chat/hooks/useMessagesState';

export const useRoomCreate = () => {
  const { updateRoomTopic } = useMessagesState();
  const backend = useBackend();
  const [loading, setLoading] = useState(false);

  const create = async () => {
    try {
      setLoading(true);
      await backend?.createRoom((topic: string) => {
        updateRoomTopic(topic);
      });
    } catch (error) {
      console.error('Error in handleCreate:', error);
    } finally {
      setLoading(false);
    }
  };

  return { create, loading };
};
