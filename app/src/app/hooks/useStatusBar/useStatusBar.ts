import { useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import type { StatusBarProps } from 'react-native';
import { AppState, Keyboard, Platform, StatusBar } from 'react-native';
import { StatusBarEmitter } from './StatusBarEmitter';

const defaultProps: Required<StatusBarProps> = Object.freeze({
  hidden: false,
  translucent: false,
  backgroundColor: 'black',
  animated: true,
  showHideTransition: 'slide',
  networkActivityIndicatorVisible: true,
  barStyle: 'dark-content',
});

/** Handles styles and behavior of status bar. */
export function useStatusBar(statusBarProps: StatusBarProps) {
  const isFocused = useIsFocused();

  const setStatusBar = () => {
    const props = { ...defaultProps, ...statusBarProps };
    StatusBar.setHidden(props.hidden);
    StatusBar.setBarStyle(props.barStyle ?? 'default');

    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(props.backgroundColor);
      StatusBar.setTranslucent(props.translucent);
    }
  };

  useEffect(() => {
    if (isFocused) {
      setStatusBar();

      if (Platform.OS !== 'ios') return;

      const keyboardWillShowListener = Keyboard.addListener(
        'keyboardWillShow',
        setStatusBar
      );
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        setStatusBar
      );
      const keyboardWillHideListener = Keyboard.addListener(
        'keyboardWillHide',
        setStatusBar
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        setStatusBar
      );
      const keyboardDidChangeFrameListener = Keyboard.addListener(
        'keyboardDidChangeFrame',
        setStatusBar
      );
      const keyboardWillChangeFrameListener = Keyboard.addListener(
        'keyboardWillChangeFrame',
        setStatusBar
      );
      const appStateListener = AppState.addEventListener(
        'change',
        setStatusBar
      );
      StatusBarEmitter.on('documentPickerClosed', setStatusBar);
      return () => {
        keyboardWillShowListener.remove();
        keyboardDidShowListener.remove();
        keyboardWillHideListener.remove();
        keyboardDidHideListener.remove();
        keyboardDidChangeFrameListener.remove();
        keyboardWillChangeFrameListener.remove();
        appStateListener.remove();
        StatusBarEmitter.off('documentPickerClosed', setStatusBar);
      };
    }
  }, [isFocused]);
}
