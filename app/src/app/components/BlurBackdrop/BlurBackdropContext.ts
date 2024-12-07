import { createContext } from 'react';

const DO_NOTHING = () => undefined;
export const BlurBackdropContext = createContext<TBlurBackdropContext>([false, DO_NOTHING]);

type TBlurBackdropContext = [boolean, (isShown: boolean) => void];
