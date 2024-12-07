import { createContext, useState, useEffect } from 'react';
import { getBackend } from '../../../lib/rpc';

import type { ReactNode } from 'react';
import { IMessagingService } from '../../../typings';
import useWorklet from '../../../ui-modules/chat/hooks/useWorklet';

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
    // @todo worklet was passed as the second argument, check if it's needed or not [@author Hrant]
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
  rpcHandler: (req: {
    // @todo fixme
    command: any;
    data: Uint8Array<ArrayBufferLike>;
  }) => void;
}

export default BareProvider;
