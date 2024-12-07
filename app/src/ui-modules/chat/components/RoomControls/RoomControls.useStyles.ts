import { StyleSheet, useWindowDimensions } from 'react-native';

export function useStyles() {
  const { width } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#0B192C',
    },
    appName: {
      color: 'white',
      fontSize: 40,
      textAlign: 'center',
    },
    homeBox: {
      flex: 1,
      gap: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      width: '100%',
    },

    inputWrapper: {
      flexDirection: 'row',
      width: '100%',
    },
    inputContainer: {
      width: '80%',
    },
    input: {
      color: 'white',
    },
    loadingIndicator: {
      color: 'black',
    },
  });

  return { styles };
}
