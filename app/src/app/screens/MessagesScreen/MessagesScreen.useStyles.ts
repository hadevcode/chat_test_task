import { StyleSheet } from 'react-native';

export function useStyles() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });

  return { styles };
}
