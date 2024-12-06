import { useContext } from 'react';
import { BareApiContext } from '../components';

export const useBackend = () => {
  const context = useContext(BareApiContext);
  // if (context === null) {
  //   throw new Error('useBackend must be used within an KeetProvider');
  // }
  return context;
};
