import React, { useEffect, useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import RoomControls from '../../../ui-modules/chat/components/RoomControls';
import Screen from '../../components/Screen';
import { useRoomCreate } from '../../../ui-modules/chat/hooks/useRoomCreate';
import { useRoomJoin } from '../../../ui-modules/chat/hooks/useRoomJoin';
import { TScreenProps } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';

export const HomeScreen = () => {
  const navigation = useNavigation<TScreenProps<'HomeScreen'>['navigation']>();

  const [roomTopicIn, setRoomTopicIn] = useState('');
  const {
    create,
    roomTopic: createdRoomTopic,
    loading: isRoomCreationLoading,
  } = useRoomCreate();
  const { join, roomTopic: joinedRoomTopic } = useRoomJoin(roomTopicIn);
  const handleCreate = async () => {
    await create();
  };

  useEffect(() => {
    if (createdRoomTopic) {
      navigation.navigate('MessagesScreen', { roomTopic: createdRoomTopic });
    }
  }, [createdRoomTopic]);

  const onJoinPress = () => {
    join();
  };

  useEffect(() => {
    if (joinedRoomTopic) {
      navigation.navigate('MessagesScreen', { roomTopic: joinedRoomTopic });
    }
  }, [joinedRoomTopic]);

  return (
    <Screen statusBarType="white">
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <RoomControls
            handleCreate={handleCreate}
            roomTopicIn={roomTopicIn}
            setRoomTopicIn={setRoomTopicIn}
            onJoinPress={onJoinPress}
            isLoading={isRoomCreationLoading}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B192C',
  },
});

export default HomeScreen;
