import { StyleSheet } from 'react-native';

export function useStyles() {
  const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderTopWidth: 1,
      borderTopColor: '#ccc',
      backgroundColor: '#fff',
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
  });

  return { styles };
}
