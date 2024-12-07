import { useCallback, useState } from 'react';
import { useBackend } from '../../../app/hooks';

export const useRoomJoin = (roomTopicIn: string) => {
  const backend = useBackend();
  const [roomTopic, setRoomTopic] = useState('');
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const join = useCallback(async () => {
    try {
      setLoading(true);
      const topic = roomTopicIn.replace('Topic: ', '');
      handleTopic(topic, false);
      await backend?.joinRoom(topic, handleTopic);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }, [roomTopicIn]);

  const handleTopic = useCallback((topic: string, done: boolean) => {
    setJoined(done);
    setRoomTopic(topic);
  }, []);

  return { roomTopic, join, setRoomTopic, joined, loading, error };
};
