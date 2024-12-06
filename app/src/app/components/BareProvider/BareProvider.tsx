import { createContext, useState, useEffect } from 'react';
import useWorklet from '../../../hook/useWorklet';
import { getBackend } from '../../../lib/rpc';

import type { ReactNode } from 'react';
import { IMessagingService } from '../../../typings';

export const BareApiContext = createContext<IMessagingService | null>(null);

const noop = () => {};

const BareProvider = ({ children, rpcHandler = noop }: IBareProviderProps) => {
  const [backend, setBackend] = useState<IMessagingService | null>(null);
  const [worklet, rpc] = useWorklet(rpcHandler);

  useEffect(() => {
    if (!worklet) return;
    worklet.start('/app.bundle', require('../../../../worklet/app.bundle'));
  }, [worklet]);

  useEffect(() => {
    if (!rpc || !worklet) return;
    // @todo worklet was passed aws the second argument, check if it's needed or not [@author Hrant]
    const bareBackend = getBackend(rpc);
    setBackend(bareBackend);
  }, [rpc, worklet]);

  return (
    <BareApiContext.Provider value={backend}>
      {children}
    </BareApiContext.Provider>
  );
};

export interface IBareProviderProps {
  children: ReactNode;
  rpcHandler: () => void;
}

export default BareProvider;
