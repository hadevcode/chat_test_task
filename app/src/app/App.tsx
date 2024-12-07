import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { BareProvider } from './components';
import React from 'react';
import RootNavigator from './navigators/RootNavigator';
import { rpcHandler } from '../lib/rpc';
import { BlurBackdropProvider } from './components/BlurBackdrop';
import { MenuProvider } from 'react-native-popup-menu';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BareProvider rpcHandler={rpcHandler}>
        <NavigationContainer>
          <MenuProvider>
            <BlurBackdropProvider>
              <RootNavigator />
            </BlurBackdropProvider>
          </MenuProvider>
        </NavigationContainer>
      </BareProvider>
    </GestureHandlerRootView>
  );
}
