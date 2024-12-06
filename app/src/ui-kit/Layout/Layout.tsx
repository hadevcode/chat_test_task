import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from './Layout.styles';

import type { ReactNode } from 'react';
import type { ColorValue, ViewStyle } from 'react-native';

/** Wrapper to the whole screen which takes position for the content */
const Layout = ({
  children,
  style,
  backgroundColor = 'white',
  includeSafeArea = false,
}: ILayoutProps) => {
  const Wrapper = includeSafeArea ? SafeAreaView : React.Fragment;
  return (
    <View style={[styles.layout, { backgroundColor }]}>
      <View style={[styles.layoutWrapper, style]}>
        <Wrapper>{children}</Wrapper>
      </View>
    </View>
  );
};

export interface ILayoutProps {
  children: ReactNode;
  style?: ViewStyle;
  backgroundColor?: ColorValue;
  includeSafeArea?: boolean;
}

export default Layout;
