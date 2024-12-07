import React from 'react';
import { useStyles } from './MessageList.useStyles';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { SendIcon } from '../../../../ui-kit/icons';

const MessageInput = ({
  inputText,
  setInputText,
  handleSend,
}: IMessageInputProps) => {
  const { styles } = useStyles();
  return (
    <View style={styles.chatFooterContainer}>
      <TextInput
        onChangeText={(text) => {
          setInputText(text);
        }}
        value={inputText}
        placeholder="Say something"
        style={styles.input}
        multiline
        placeholderTextColor={'#fff'}
      />
      <TouchableOpacity onPress={handleSend} disabled={!inputText?.length}>
        <SendIcon width={40} height={25} color={'#FFF'} />
      </TouchableOpacity>
    </View>
  );
};

export interface IMessageInputProps {
  inputText: string;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  handleSend: () => void;
}

export default MessageInput;
