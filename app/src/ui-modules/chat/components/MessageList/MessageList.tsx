import React, { useState } from 'react';
import { useStyles } from './MessageList.useStyles';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { IMessage } from '../../../../typings';
import Message from '../Message';

const MessageList = ({
  messages,
  roomTopic,
  peersCount,
}: IMessageListProps) => {
  const { styles } = useStyles();
  const [loading, setLoading] = useState(false);

  const loadMoreMessages = () => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);
    clearTimeout(timeout);
  };

  const ListLoader = () => {
    return loading ? (
      <View style={styles.listLoader}>
        <ActivityIndicator size={'small'} color={'white'} />
      </View>
    ) : null;
  };

  return (
    <FlatList
      inverted
      horizontal={false}
      bounces={false}
      data={messages.slice().reverse()}
      contentContainerStyle={styles.flatList}
      onEndReachedThreshold={0.5}
      // onEndReached={loadMoreMessages}
      // ListFooterComponent={ListLoader}
      keyExtractor={(item, index) =>
        `${item.timestamp}_${item.memberId}_${index}`
      }
      renderItem={({ item: message }) => <Message message={message} />}
    />
  );
};

export interface IMessageListProps {
  messages: IMessage[];
  roomTopic: string;
  peersCount: number;
}

export default MessageList;
