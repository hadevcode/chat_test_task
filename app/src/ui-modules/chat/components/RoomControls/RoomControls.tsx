import React from 'react';
import { useStyles } from './RoomControls.useStyles';
import { Text, View } from 'react-native';
import { Layout } from '../../../../ui-kit';
import { Button, Input } from '@rneui/base';
import Clipboard from '@react-native-clipboard/clipboard';

const RoomControls = ({
  handleCreate,
  roomTopicIn,
  setRoomTopicIn,
  onJoinPress,
  isJoinLoading,
  isRoomCreationLoading,
  error,
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
            errorMessage={error}
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
          loading={isJoinLoading}
          disabled={isJoinLoading || !roomTopicIn}
          loadingProps={styles.loadingIndicator}
        />
      </View>
      <Button
        loading={isRoomCreationLoading}
        onPress={handleCreate}
        disabled={isRoomCreationLoading}
        title={'Create Room'}
        loadingProps={styles.loadingIndicator}
      />
    </Layout>
  );
};

export interface IRoomControlsProps {
  handleCreate: () => void;
  roomTopicIn: string;
  setRoomTopicIn: React.Dispatch<React.SetStateAction<string>>;
  onJoinPress: () => void;
  isRoomCreationLoading?: boolean;
  isJoinLoading?: boolean;
  error?: string;
}

export default RoomControls;
