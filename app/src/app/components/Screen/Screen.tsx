import React, { cloneElement, isValidElement, useLayoutEffect } from 'react';
import { styles } from './Screen.styles';
import type { ReactNode } from 'react';
import { View, ViewProps } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSetStatusBar } from '../../hooks';

/** Top level wrapper for screen components.
 * 	1. Allows managing status bar, navigation bar.
 * 	3. Allows setting screen title which can be dynamic.
 */
function Screen({
  children,
  title,
  statusBarType,
  passScreenStyles = false,
}: IScreen) {
  useSetStatusBar(statusBarType);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (title) navigation.setOptions({ title: title.toString() });
  }, [title]);

  return (
    <>
      {passScreenStyles && isValidElement(children)
        ? cloneElement(children, {
            style: styles.screen,
            contentContainerStyle: styles.screenContent,
          } as ViewProps)
        : children}
    </>
  );
}

export type TStatusBarType =
  | 'white'
  | 'darkGrey'
  | 'primaryDarkGray'
  | 'translucent';

export interface IScreen {
  children: ReactNode;
  title?: string;
  statusBarType: TStatusBarType;
  /** Passes prepared style & contentContainerStyle to next component, it should be ScrollView, FlatList, KeyboardAwareScrollView, etc. */
  passScreenStyles?: boolean;
}

export default Screen;
