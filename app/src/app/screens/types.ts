import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompositeScreenProps } from '@react-navigation/native';

export type TAppScreens = {
  MessagesScreen: { roomTopic: string };
  HomeScreen: undefined;
};

export type TScreenProps<TScreen extends keyof TAppScreens> =
  CompositeScreenProps<
    NativeStackScreenProps<TAppScreens, TScreen>,
    NativeStackScreenProps<TAppScreens>
  >;
