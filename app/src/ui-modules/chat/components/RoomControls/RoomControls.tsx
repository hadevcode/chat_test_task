import React from 'react';
import { useStyles } from './RoomControls.useStyles';
import {
  Button,
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { IMessage } from '../../../../typings';
import { Layout } from '../../../../ui-kit';

const RoomControls = ({
  handleCreate,
  roomTopicIn,
  setRoomTopicIn,
  onJoinPress,
}: IRoomControlsProps) => {
  const { styles } = useStyles();
  return (
    <Layout style={styles.container}>
      <View style={styles.buttonGroup}>
        <TextInput
          value={roomTopicIn}
          onChangeText={setRoomTopicIn}
          style={styles.textInput}
        />
        <Button title="Join" onPress={onJoinPress} disabled={!roomTopicIn} />
      </View>
      <View style={styles.divider} />
      <Button onPress={handleCreate} title="Create Room" />
    </Layout>
  );
};

export interface IRoomControlsProps {
  handleCreate: () => void;
  roomTopicIn: string;
  setRoomTopicIn: React.Dispatch<React.SetStateAction<string>>;
  onJoinPress: () => void;
}

export default RoomControls;
