import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import MessagesScreen from '../screens/MessagesScreen';
import { TAppScreens } from '../screens/types';

const Stack = createStackNavigator<TAppScreens>();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        freezeOnBlur: true,
      }}
      detachInactiveScreens
    >
      {/* Channel Join Screen */}
      <Stack.Screen
        key="HomeScreen"
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />

      {/* Message Screen */}
      <Stack.Screen
        options={{
          headerBackButtonDisplayMode: 'minimal',
          headerLeftContainerStyle: {
            left: 16,
          },
          headerTitleStyle: {
            color: 'white',
          },
          headerTintColor: 'white',
          gestureEnabled: false,
        }}
        key="MessagesScreen"
        name="MessagesScreen"
        component={MessagesScreen}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
