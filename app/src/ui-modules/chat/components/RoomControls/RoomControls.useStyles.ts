import { StyleSheet } from 'react-native';

export function useStyles() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      justifyContent: 'flex-end',
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
    divider: {
      height: 1,
      width: '100%',
      backgroundColor: 'red',
      marginVertical: 8,
    },
  });

  return { styles };
}
