import 'react-native-gesture-handler';
import { enableScreens, enableFreeze } from 'react-native-screens';
import { registerRootComponent } from 'expo';
import { Text, TextInput, Platform } from 'react-native';
import App from './src/app/App';

if (Text.defaultProps == null) {
  Text.defaultProps = {};
}
Text.defaultProps.allowFontScaling = false;

if (TextInput.defaultProps == null) {
  TextInput.defaultProps = {};
}
TextInput.defaultProps.allowFontScaling = false;
TextInput.defaultProps.disableFullscreenUI = true;
TextInput.defaultProps.autoCorrect = true;
TextInput.defaultProps.spellCheck = false;

// Experimental enable all 'react-native-screens' optimizations trying to improve Android performance
if (Platform.OS === 'android') {
  enableScreens(true);
  enableFreeze(true);
}

registerRootComponent(App);
