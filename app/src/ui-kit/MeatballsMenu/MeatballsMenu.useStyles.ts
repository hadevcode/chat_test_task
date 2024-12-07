import { StyleSheet, useWindowDimensions } from 'react-native';

export function useStyles() {
  const isTablet = false;
  const dimensions = useWindowDimensions();

  const buttonStyleColorsSet = {
    default: '#2e2e2e',
    destructive: '#ed4337',
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
        width: 220,
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
      color: '#7e7e7e',
      fontSize: 12,
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
