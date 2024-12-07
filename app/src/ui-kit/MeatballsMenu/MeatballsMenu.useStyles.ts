import { StyleSheet, useWindowDimensions } from 'react-native';

export function useStyles() {
  const isTablet = false;
  const dimensions = useWindowDimensions();

  const buttonStyleColorsSet = {
    default: 'black',
    destructive: 'red',
  };
  const buttonStyleSet = {
    default: StyleSheet.create({
      buttonStyle: {
        color: buttonStyleColorsSet.default,
      },
    }),
    destructive: StyleSheet.create({
      buttonStyle: {
        color: buttonStyleColorsSet.destructive,
      },
    }),
  };
  const wrapperSizeStyleSet = {
    default: StyleSheet.create({
      size: {
        width: 150,
      },
    }),
    'full-width': StyleSheet.create({
      size: {
        maxWidth: Math.min(dimensions.width - 32, 343),
        width: 'auto',
      },
    }),
  };

  const styles = StyleSheet.create({
    optionsWrapper: {
      backgroundColor: '#FFF',
      borderRadius: 15,
      marginRight: -8,
      borderWidth: 0.6,
      borderColor: '#0B192C',
      // overflow: 'hidden',
      shadowColor: '#FFF',
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 3,
    },
    optionWrapper: {
      padding: 16,
    },
    optionsContainerStyle: {
      borderRadius: 20,
      width: 150,
    },
    separator: {
      borderBottomColor: '#CCC',
      borderBottomWidth: 1,
      height: 1,
    },
    icon: {
      alignItems: 'center',
      height: 18,
      justifyContent: 'center',
      marginRight: 10,
      width: 18,
    },
    description: {
      color: '#CCC',
      fontSize: 16,
      paddingLeft: 28,
    },
  });

  return {
    buttonStyleSet,
    wrapperSizeStyleSet,
    buttonStyleColorsSet,
    styles,
    isTablet,
  };
}
