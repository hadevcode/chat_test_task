import React from 'react';
import { useStyles } from './RoomControls.useStyles';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Layout } from '../../../../ui-kit';
import { Button, Input } from '@rneui/base';
import { SafeAreaView } from 'react-native-safe-area-context';
import Clipboard from '@react-native-clipboard/clipboard';

const RoomControls = ({
  handleCreate,
  roomTopicIn,
  setRoomTopicIn,
  onJoinPress,
  isLoading,
}: IRoomControlsProps) => {
  const onPaste = async () => {
    const copiedText = await Clipboard.getString();
    setRoomTopicIn(copiedText);
  };

  const { styles } = useStyles();
  return (
    <Layout style={styles.container}>
      <Text style={styles.appName}>P2P Chat</Text>
      <View style={styles.homeBox}>
        <View style={styles.inputWrapper}>
          <Input
            placeholder="Enter Chat Topic"
            value={roomTopicIn}
            onChangeText={setRoomTopicIn}
            containerStyle={styles.inputContainer}
            style={styles.input}
          />
          <Button
            onPress={onPaste}
            type={'outline'}
            color={'primary'}
            title={'Paste'}
          />
        </View>

        <Button
          containerStyle={styles.button}
          title="Join"
          onPress={onJoinPress}
          disabled={!roomTopicIn}
        />
      </View>
      <Button
        loading={isLoading}
        containerStyle={styles.createButton}
        onPress={handleCreate}
        title={'Create Room'}
      />
    </Layout>
  );
};

export interface IRoomControlsProps {
  handleCreate: () => void;
  roomTopicIn: string;
  setRoomTopicIn: React.Dispatch<React.SetStateAction<string>>;
  onJoinPress: () => void;
  isLoading?: boolean;
}

export default RoomControls;
