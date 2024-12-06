import { Text, KeyboardAvoidingView, Platform } from 'react-native';

export const MessagesScreen = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <Text>Aper</Text>
    </KeyboardAvoidingView>
  );
};

export default MessagesScreen;
