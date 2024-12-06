import { useState, useCallback, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Button,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useBackend } from '../../hooks';
import uiEvent, {
  CONNECTIONS_UI,
  RECEIVE_MESSAGE_UI,
} from '../../../lib/uiEvent';
import { createMessage } from '../../../lib/message';
import { useNavigation } from '@react-navigation/native';

export interface IMessage {
  local: boolean;
  message: string;
  timestamp: string;
  type: string;
}
export const HomeScreen = () => {
  const backend = useBackend();

  const [messages, setMessages] = useState<IMessage[]>([]);

  const [inputText, setInputText] = useState('');
  const [roomTopic, setRoomTopic] = useState('');
  const [roomTopicIn, setRoomTopicIn] = useState('');
  const [peersCount, setPeersCount] = useState<number>(0);

  useEffect(() => {
    const messageListener = uiEvent.on(
      RECEIVE_MESSAGE_UI,
      ({ memberId, message }: { memberId: string; message: IMessage }) => {
        setMessages((messages) => [
          ...messages,
          { ...message, local: false, memberId },
        ]);
      }
    );
    const peerCountListener = uiEvent.on(CONNECTIONS_UI, (count: number) => {
      setPeersCount(count);
    });
    return () => {
      messageListener.off();
      peerCountListener.off();
    };
  }, []);

  const appendMessage = (msg: string, local = false) => {
    if (msg.trim()) {
      setMessages((messages) => [...messages, createMessage(msg, local)]);
    }
  };

  const handleTopic = useCallback((topic) => setRoomTopic(topic), []);

  const handleCreate = useCallback(
    () => backend?.createRoom(handleTopic),
    [backend]
  );

  const handleJoin = useCallback(() => {
    console.log('join room with topic:', roomTopicIn);
    const topic = roomTopicIn.replace('Topic: ', '');
    handleTopic(topic);
    backend?.joinRoom(topic, handleTopic);
  }, [backend, roomTopicIn]);

  const handleSend = () => {
    if (inputText.trim()) {
      backend?.sendMessage(inputText, appendMessage);
      setInputText('');
    }
  };

  // @todo change
  const navigation = useNavigation<any>();

  const onJoinPress = () => {
    navigation.navigate('MessagesScreen');
  };

  return (
    // <Screen statusBarType="darkGrey" title="Home">
    //   <Layout includeSafeArea>
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      {roomTopic ? (
        <>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.innerContainer}>
              <View style={styles.messageList}>
                <Text selectable>Topic: {roomTopic}</Text>
                <Text>Peers: {peersCount}</Text>
                {messages &&
                  messages.map((event, idx) => (
                    <View
                      key={idx}
                      style={
                        event.local
                          ? [styles.message, styles.myMessage]
                          : styles.message
                      }
                    >
                      <Text style={styles.member}>
                        {event?.memberId ?? 'You'}
                      </Text>
                      <Text selectable>{event.message}</Text>
                    </View>
                  ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.msgInput}
              placeholder="Say something"
              value={inputText}
              onChangeText={setInputText}
            />
            <Button title={'send'} onPress={handleSend}></Button>
            <MaterialIcons name="send" size={16} color="white" />
          </View>
        </>
      ) : (
        <View style={styles.innerContainer}>
          <View style={styles.info}>
            <Text>
              Open up src/screen/HomeScreen.js to start working on your app!
            </Text>
            <Text>
              FYR lib/rpc and worklet/app.cjs has related backend code.
            </Text>
          </View>
          <Button
            // style={[styles.message, styles.sendButton]}
            onPress={handleCreate}
            title={'Create Room'}
          />
          <Text>Or</Text>
          <View style={styles.buttonGroup}>
            <TextInput
              value={roomTopicIn}
              onChangeText={setRoomTopicIn}
              style={styles.textInput}
            />
            <Button title={'Join'} onPress={onJoinPress}></Button>
          </View>
        </View>
      )}
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
    // </Layout>
    // </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  innerContainer: {
    flex: 1,
    padding: 10,
  },
  messageList: {
    paddingVertical: 10,
  },
  message: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#e6e6e6',
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#AAA',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  msgInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
    backgroundColor: '#f9f9f9',
  },
  sendButton: {
    backgroundColor: '#0aa',
    padding: 10,
    borderRadius: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    width: '100%',
    gap: 8,
  },
  textInput: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  buttonDisabled: {
    backgroundColor: 'grey',
  },
  info: {
    backgroundColor: '#EEE',
    padding: 10,
    borderRadius: 5,
    gap: 8,
  },
});

export default HomeScreen;
