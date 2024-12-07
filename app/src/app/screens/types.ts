import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';

export type TAppScreens = {
  MessagesScreen: { roomTopic: string };
};

export type TMainScreens = {
  Drawer: NavigatorScreenParams<TAppScreens>;
};

export type TScreenProps<TScreen extends keyof TAppScreens> =
  CompositeScreenProps<
    NativeStackScreenProps<TAppScreens, TScreen>,
    NativeStackScreenProps<TAppScreens>
  >;
