import mitt from 'mitt';
import { useEffect } from 'react';

const emitter = mitt<TMeatballEvents>();

/** Allows to open meatball menu by ID from any place of the app. */
export const MeatballMenuEmitter = {
  useEmitter: (meatballMenuId: string) => {
    const openMeatballMenu = () => {
      emitter.emit('OPEN_MEATBALL', meatballMenuId);
    };

    return { openMeatballMenu };
  },
  useListener: (meatballMenuId: string | undefined, callback: () => void) => {
    useEffect(() => {
      const handler = (menuId: string) => {
        if (menuId === meatballMenuId) {
          callback();
        }
      };
      if (meatballMenuId) {
        emitter.on('OPEN_MEATBALL', handler);
      }

      return () => {
        if (meatballMenuId) {
          emitter.off('OPEN_MEATBALL', handler);
        }
      };
    }, []);
  },
};

type TMeatballEvents = {
  OPEN_MEATBALL: string;
};
