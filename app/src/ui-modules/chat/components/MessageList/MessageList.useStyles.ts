import { StyleSheet } from 'react-native';

export function useStyles() {
  const styles = StyleSheet.create({
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
    member: {},
  });

  return { styles };
}
