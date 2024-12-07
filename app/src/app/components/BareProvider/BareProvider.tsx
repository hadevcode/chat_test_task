import { createContext, useState, useEffect } from 'react';
import { getBackend } from '../../../lib/rpc';

import type { ReactNode } from 'react';
import { IMessagingService } from '../../../typings';
import useWorklet from '../../../ui-modules/chat/hooks/useWorklet';

import { useMessagesState } from '../../../ui-modules/chat/hooks/useMessagesState';

export const BareApiContext = createContext<IMessagingService | null>(null);

const noop = () => {};

const BareProvider = ({ children, rpcHandler = noop }: IBareProviderProps) => {
  const [backend, setBackend] = useState<IMessagingService | null>(null);
  const [worklet, rpc] = useWorklet(rpcHandler);
  const { updateConnectionStatus } = useMessagesState();

  useEffect(() => {
    if (!worklet) return;
    worklet.start('/app.bundle', require('../../../../worklet/app.bundle'));
  }, [worklet]);

  useEffect(() => {
    if (!rpc || !worklet) return;

    const bareBackend = getBackend(rpc);
    setBackend(bareBackend);

    updateConnectionStatus(true);

    return () => {
      updateConnectionStatus(false);
    };
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
    command: any; // @todo fixme
    data: Uint8Array<ArrayBufferLike>;
  }) => void;
}

export default BareProvider;
