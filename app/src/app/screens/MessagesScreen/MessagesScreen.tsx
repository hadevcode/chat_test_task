import React, { useLayoutEffect } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';

import {
  View,
  Platform,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { useStyles } from './MessagesScreen.useStyles';
import Screen from '../../components/Screen';

import { useRoom } from '../../../ui-modules/chat/hooks/useRoom';
import MessageList from '../../../ui-modules/chat/components/MessageList';
import MessageInput from '../../../ui-modules/chat/components/MessageInput';

import { MeatballsMenu } from '../../../ui-kit';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TAppScreens } from '../types';
import { IMeatballEvent } from '../../../ui-kit/MeatballsMenu/MeatballsMenu';

const imageBackground = require('../../../../assets/messagesBackground.jpg');

export const MessagesScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<TAppScreens, 'MessagesScreen'>) => {
  const { styles } = useStyles();
  const { messages, peersCount, inputText, handleSend, setInputText } =
    useRoom();

  const meatballOptions: IMeatballEvent[] = [
    {
      onPress: () => {
        Clipboard.setString(route.params.roomTopic);
      },
      text: 'Copy Topic',
    },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.meatballMenuWrapper}>
          <MeatballsMenu options={meatballOptions} placement="bottom" />
        </View>
      ),
      headerStyle: styles.header,
      headerTitleStyle: {
        color: 'white',
      },
      headerTintColor: 'white',
    });
  }, [navigation, peersCount]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // Adjust the offset if needed
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Screen statusBarType={'darkGrey'} title="Messages">
          <View style={styles.safeArea}>
            <ImageBackground
              source={imageBackground}
              style={styles.container}
              resizeMode="cover"
            >
              <MessageList
                messages={messages}
                roomTopic={route.params?.roomTopic}
                peersCount={peersCount}
              />
            </ImageBackground>
            <MessageInput
              inputText={inputText}
              setInputText={setInputText}
              handleSend={handleSend}
            />
          </View>
        </Screen>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default MessagesScreen;
