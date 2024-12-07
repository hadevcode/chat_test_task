import { StyleSheet } from 'react-native';

export function useStyles(isLocal: boolean) {
  const styles = StyleSheet.create({
    chatItemContainer: {
      width: '100%',
      alignSelf: 'center',
      marginLeft: isLocal ? 0 : 7,
      marginRight: isLocal ? 7 : 0,
    },

    chatItem: {
      marginTop: 10,
      marginBottom: 3,
      padding: 10,
      width: 'auto',
      maxWidth: '80%',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      backgroundColor: isLocal ? '#0A97B0' : '#112643',
      borderBottomLeftRadius: isLocal ? 10 : 0,
      borderBottomRightRadius: isLocal ? 0 : 10,
      alignSelf: isLocal ? 'flex-end' : 'flex-start',
    },
    timeStamp: {
      top: 0,
      color: 'rgb(241,241,241)',
      fontSize: 10,
      textAlign: isLocal ? 'right' : 'left',
    },
    message: {
      color: '#FFF',
    },
    animatedContainerStyle: {
      marginHorizontal: 8,
      flex: 1,
      flexDirection: isLocal ? 'row' : 'row-reverse',
      alignItems: 'flex-end',
    },
  });

  return { styles };
}
