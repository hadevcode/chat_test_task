import React, { useRef } from 'react';
import { useStyles } from './Message.useStyles';
import { GestureResponderEvent, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { IMessage } from '../../../../typings';
import { dayjs } from '../../../../common/utils';

const Message = ({ message }: IMessageListProps) => {
  const startX = useRef(0);
  const { styles } = useStyles(message.local);
  const translateX = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const onTouchMove = (e: GestureResponderEvent) => {
    const delta = e.nativeEvent.pageX - startX.current;

    if (message.local && delta < 0) {
      translateX.value = delta / 2;
    } else if (!message.local && delta > 0) {
      translateX.value = delta / 2;
    }
  };

  const onTouchStart = (e: GestureResponderEvent) => {
    startX.current = e.nativeEvent.pageX;
  };

  return (
    <Animated.View
      style={[styles.animatedContainerStyle, animatedStyle]}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={() => {
        translateX.value = withTiming(0);
      }}
    >
      <View style={styles.chatItemContainer}>
        <View style={styles.chatItem}>
          <Text style={styles.message}>{message.message}</Text>
        </View>
      </View>
      <Text style={styles.timeStamp}>{dayjs(message.timestamp).fromNow()}</Text>
    </Animated.View>
  );
};

export interface IMessageListProps {
  message: IMessage;
}

export default Message;
