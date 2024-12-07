import { StyleSheet, useWindowDimensions } from 'react-native';

const ICON_SIZE = 60;
export function useStyles() {
  const { width } = useWindowDimensions();
  const styles = StyleSheet.create({
    chatFooterContainer: {
      height: ICON_SIZE,
      paddingHorizontal: 8,
      paddingVertical: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#0B192C',
      justifyContent: 'space-between',
    },
    input: {
      padding: 10,
      borderWidth: 0.5,
      borderRadius: 5,
      letterSpacing: 1,
      color: '#fff',
      borderColor: 'white',
      width: width - 60,
    },
  });

  return { styles };
}
