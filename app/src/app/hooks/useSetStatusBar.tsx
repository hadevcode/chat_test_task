import { useMemo } from 'react';
import type { StatusBarProps } from 'react-native';
import { TStatusBarType } from '../components/Screen/Screen';
import { useStatusBar } from './useStatusBar';

export const useSetStatusBar = (statusBarType: TStatusBarType) => {
  const statusBar: StatusBarProps = useMemo<StatusBarProps>(
    function pickUpStatusBarProps() {
      switch (statusBarType) {
        case 'white':
          return { backgroundColor: '#fff', barStyle: 'light-content' };
        case 'primaryDarkGray':
          return { backgroundColor: '#636363', barStyle: 'dark-content' };
        case 'translucent':
          return { translucent: true };
        case 'darkGrey':
        default:
          return {
            backgroundColor: '#424242',
            barStyle: 'light-content',
          };
      }
    },
    [statusBarType]
  );

  useStatusBar(statusBar);
};
