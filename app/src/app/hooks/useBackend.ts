import { useContext } from 'react';
import { BareApiContext } from '../components';

export const useBackend = () => {
  return useContext(BareApiContext);
};
