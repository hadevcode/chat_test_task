import React, { useEffect, useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import RoomControls from '../../../ui-modules/chat/components/RoomControls';
import Screen from '../../components/Screen';
import { useRoomCreate } from '../../../ui-modules/chat/hooks/useRoomCreate';
import { useRoomJoin } from '../../../ui-modules/chat/hooks/useRoomJoin';

export const HomeScreen = () => {
  const navigation = useNavigation<any>();

  const [roomTopicIn, setRoomTopicIn] = useState('');
  const { create, roomTopic: createdRoomTopic } = useRoomCreate();
  const { join, roomTopic: joinedRoomTopic } = useRoomJoin(roomTopicIn);

  const handleCreate = async () => {
    await create();
  };

  useEffect(() => {
    if (createdRoomTopic) {
      navigation.navigate('MessagesScreen', { roomTopic: createdRoomTopic });
    }
  }, [createdRoomTopic]);

  const onJoinPress = async () => {
    await join();
  };

  useEffect(() => {
    if (joinedRoomTopic) {
      navigation.navigate('MessagesScreen', { roomTopic: joinedRoomTopic });
    }
  }, [joinedRoomTopic]);

  return (
    <Screen statusBarType="primaryDarkGray">
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <RoomControls
          handleCreate={handleCreate}
          roomTopicIn={roomTopicIn}
          setRoomTopicIn={setRoomTopicIn}
          onJoinPress={onJoinPress}
        />
      </KeyboardAvoidingView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
