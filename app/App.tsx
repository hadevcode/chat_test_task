import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { rpcHandler } from './src/lib/rpc';
import { BareProvider } from './src/app/components';
import RootNavigator from './src/app/navigators/RootNavigator';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BareProvider rpcHandler={rpcHandler}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </BareProvider>
    </GestureHandlerRootView>
  );
}
