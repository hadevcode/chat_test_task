import { KeyboardAvoidingView } from 'react-native';

import { useStyles } from './MessagesScreen.useStyles';
import Screen from '../../components/Screen';

import { useRoom } from '../../../ui-modules/chat/hooks/useRoom';
import MessageList from '../../../ui-modules/chat/components/MessageList';
import MessageInput from '../../../ui-modules/chat/components/MessageInput';

import type { TScreenProps } from '../types';

export const MessagesScreen = ({
  navigation,
  route,
}: TScreenProps<'MessagesScreen'>) => {
  const { styles } = useStyles();
  const { messages, peersCount, inputText, handleSend, setInputText } =
    useRoom();

  return (
    <Screen statusBarType={'darkGrey'} title={peersCount.toString()}>
      <KeyboardAvoidingView style={styles.container}>
        <MessageList
          messages={messages}
          roomTopic={route.params.roomTopic}
          peersCount={peersCount}
        />
        <MessageInput
          inputText={inputText}
          setInputText={setInputText}
          handleSend={handleSend}
        />
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default MessagesScreen;
