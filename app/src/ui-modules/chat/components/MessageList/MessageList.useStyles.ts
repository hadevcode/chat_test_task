import { StyleSheet } from 'react-native';

export function useStyles() {
  const styles = StyleSheet.create({
    separator: {
      height: 1,
      width: '100%',
      backgroundColor: '#CCC',
    },
    flatList: {
      paddingBottom: 10,
    },
    listLoader: {
      marginVertical: 10,
    },
  });

  return { styles };
}
