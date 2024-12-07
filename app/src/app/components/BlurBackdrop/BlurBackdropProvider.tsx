import { useState, type ReactNode } from 'react';

import { StyleSheet, View } from 'react-native';
import { BlurBackdropContext } from './BlurBackdropContext';

const BlurBackdropProvider = ({ children }: IHintProviderProps) => {
  const [isShown, setIsShown] = useState(false);

  return (
    <BlurBackdropContext.Provider value={[isShown, setIsShown]}>
      {children}
      {isShown ? (
        <View
          style={[
            { backgroundColor: 'rgba(0,0,0,0.5)' },
            StyleSheet.absoluteFillObject,
          ]}
        />
      ) : null}
    </BlurBackdropContext.Provider>
  );
};

interface IHintProviderProps {
  children: ReactNode;
}

export default BlurBackdropProvider;
