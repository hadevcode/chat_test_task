import React, {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { MeatballMenuEmitter } from './MeatballMenuEmitter';

import {
  BackHandler,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  type PressableProps,
} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';

import { useStyles } from './MeatballsMenu.useStyles';

import type { FC } from 'react';
import { BlurBackdropContext } from '../../app/components/BlurBackdrop';
import { MeatBallIcon } from '../icons';
import { SvgProps } from 'react-native-svg';

export interface IMeatballEvent {
  text: string;
  onPress: () => void;
  type?: 'default' | 'destructive';
  IconComponent?: FC<SvgProps>;
  description?: string;
}

const MeatballsMenu = ({
  options,
  placement = 'auto',
  testID = 'MeatballsMenu',
  Icon = MeatBallIcon,
  menuId,
  size = 'default',
  iconColor,
}: IMeatballsMenuProps) => {
  const { buttonStyleSet, wrapperSizeStyleSet, buttonStyleColorsSet, styles } =
    useStyles();
  const [menuOpened, toggleMenuOpened] = useState(false);
  const [, isBackdropShown] = useContext(BlurBackdropContext);
  MeatballMenuEmitter.useListener(menuId, () => toggleMenuOpened(true));

  const onBackPress = useCallback(() => {
    if (menuOpened) {
      toggleMenuOpened(false);
    }
    return false;
  }, [menuOpened]);

  useEffect(() => {
    if (menuOpened) {
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
    } else {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }
  }, [menuOpened]);

  if (!options?.length) {
    return null;
  }
  const pressableProps: PressableProps = {
    hitSlop: { top: 6, right: 6, bottom: 6, left: 6 },
    style: ({ pressed }: { pressed: boolean }) =>
      Icon === null
        ? {}
        : {
            width: 30,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            opacity: pressed && Platform.OS === 'ios' ? 0.5 : 1.0,
          },
    android_ripple: {
      borderless: true,
    },
  };

  if (!options.length) {
    return null;
  }
  return (
    <>
      <Menu
        opened={menuOpened}
        renderer={
          Platform.OS === 'android'
            ? renderers.NotAnimatedContextMenu
            : renderers.ContextMenu
        }
        rendererProps={{
          anchorStyle: { display: 'none' },
          placement,
        }}
        onBackdropPress={() => toggleMenuOpened(false)}
        onOpen={() => isBackdropShown(true)}
        onClose={() => isBackdropShown(false)}
      >
        <MenuTrigger
          customStyles={{
            triggerTouchable: pressableProps,
            TriggerTouchableComponent: Pressable,
          }}
          onPress={() => toggleMenuOpened(true)}
        >
          {Icon && <Icon fill={iconColor || 'black'} testID={testID} />}
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsWrapper: styles.optionsWrapper,
          }}
          optionsContainerStyle={[
            styles.optionsContainerStyle,
            wrapperSizeStyleSet[size].size,
          ]}
        >
          {options?.map((option, index) => {
            const {
              text,
              onPress,
              type = 'default',
              IconComponent,
              description,
            } = option;
            return (
              <Fragment key={text}>
                <TouchableOpacity
                  onPress={() => {
                    toggleMenuOpened(false);
                    onPress();
                  }}
                >
                  <View style={styles.optionWrapper}>
                    <View style={{ flexDirection: 'row' }}>
                      {IconComponent ? (
                        <View style={styles.icon}>
                          <IconComponent fill={buttonStyleColorsSet[type]} />
                        </View>
                      ) : null}
                      <Text style={buttonStyleSet[type].buttonStyle}>
                        {text}
                      </Text>
                    </View>
                    {description ? (
                      <Text style={styles.description}>{description}</Text>
                    ) : null}
                  </View>
                </TouchableOpacity>
                {index !== options.length - 1 ? (
                  <View style={styles.separator} />
                ) : null}
              </Fragment>
            );
          })}
        </MenuOptions>
      </Menu>
    </>
  );
};

export interface IMeatballsMenuProps {
  options: IMeatballEvent[] | undefined;
  placement?: 'top' | 'right' | 'bottom' | 'left' | 'auto';
  testID?: string;
  Icon?: any;
  menuId?: string;
  size?: 'default' | 'full-width';
  iconColor?: string;
}

export default MeatballsMenu;
