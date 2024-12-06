import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';

export type TAppScreens = {
  EditNetworkConnectionScreen?: { networkConnectionId: string };
};

export type TMainScreens = {
  Drawer: NavigatorScreenParams<TAppScreens>;
};
