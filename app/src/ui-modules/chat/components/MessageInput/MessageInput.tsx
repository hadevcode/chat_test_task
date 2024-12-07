import React from 'react';
import { useStyles } from './MessageList.useStyles';
import {
  Button,
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { IMessage } from '../../../../typings';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const MessageInput = ({
  inputText,
  setInputText,
  handleSend,
}: IMessageInputProps) => {
  const { styles } = useStyles();
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.msgInput}
        placeholder="Say something"
        value={inputText}
        onChangeText={setInputText}
      />
      <Button title="Send" onPress={handleSend} />
      <MaterialIcons name="send" size={16} color="white" />
    </View>
  );
};

export interface IMessageInputProps {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  handleSend: () => void;
}

export default MessageInput;
