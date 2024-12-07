import React from 'react';
import { useStyles } from './MessageList.useStyles';
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import { IMessage } from '../../../../typings';

const MessageList = ({
  messages,
  roomTopic,
  peersCount,
}: IMessageListProps) => {
  const { styles } = useStyles();
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.innerContainer}>
        <View style={styles.messageList}>
          <Text selectable>Topic: {roomTopic}</Text>
          <Text>Peers: {peersCount}</Text>
          {messages.map((event: IMessage, idx: number) => (
            <View
              key={idx}
              style={[styles.message, event.local ? styles.myMessage : null]}
            >
              <Text style={styles.member}>{event?.memberId ?? 'You'}</Text>
              <Text selectable>{event.message}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export interface IMessageListProps {
  messages: IMessage[];
  roomTopic: string;
  peersCount: number;
}

export default MessageList;
