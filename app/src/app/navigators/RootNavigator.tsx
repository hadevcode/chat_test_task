import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import MessagesScreen from '../screens/MessagesScreen';

// import ChannelJoinScreen from './screens/ChannelJoinScreen'; // Import your ChannelJoinScreen
// import MessageScreen from './screens/MessageScreen'; // Import your MessageScreen
const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        freezeOnBlur: true, // Freeze screens when navigating away
      }}
      detachInactiveScreens // Detach inactive screens for performance
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
        key="MessagesScreen"
        name="MessagesScreen"
        component={MessagesScreen}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
