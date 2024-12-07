import React, { useRef } from 'react';
import { FlashList } from '@shopify/flash-list';
import { IMessage } from '../../../../typings';
import Message from '../Message';

const MessageList = ({ messages }: IMessageListProps) => {
  const flashListRef = useRef<FlashList<IMessage>>(null);

  return (
    <FlashList
      ref={flashListRef}
      data={messages.slice().reverse()}
      inverted
      estimatedItemSize={40}
      keyExtractor={(item, index) => `${item.timestamp}_${index}`}
      renderItem={({ item: message }) => <Message message={message} />}
    />
  );
};

export interface IMessageListProps {
  messages: IMessage[];
}

export default MessageList;
