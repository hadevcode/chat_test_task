import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { MenuProvider } from 'react-native-popup-menu';
import { Provider as ReduxProvider } from 'react-redux';

import RootNavigator from './navigators/RootNavigator';

import { BareProvider } from './components';
import { store } from './implementations/Redux/store';
import { BlurBackdropProvider } from './components/BlurBackdrop';

import { rpcHandler } from '../lib/rpc';

export default function App() {
  return (
    <ReduxProvider store={store}>
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
    </ReduxProvider>
  );
}
