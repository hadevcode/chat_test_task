import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function useStyles() {
  const { bottom } = useSafeAreaInsets();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      paddingVertical: 10,
      backgroundColor: '#0B192C',
      width: '100%',
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },
    membersContainer: {
      maxWidth: '85%',
      gap: 10,
      overflow: 'hidden',
    },
    members: {
      fontSize: 14,
      color: '#fff',
    },
    membersNames: {
      fontSize: 16,
      color: '#fff',
    },
    userNamesContainer: {
      flexDirection: 'row',
    },
    safeArea: { flex: 1, backgroundColor: '#0b192c', paddingBottom: bottom },
    meatballMenuWrapper: { marginRight: 16 },
    header: {
      backgroundColor: '#0b192c',
    },
  });

  return { styles };
}
