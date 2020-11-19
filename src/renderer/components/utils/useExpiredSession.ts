import { useEffect, useRef, useMemo } from 'react';
import shallow from 'zustand/shallow';
import { useStore } from '../../../stores';
import { sleep } from '../../functions/util';
import { useNotify } from './context';

export default function useExpiredSession() {
  const { notify } = useNotify();

  const { expiredSession, expireSession } = useStore(
    (state) => ({
      expiredSession: state.expiredSession,
      expireSession: state.expireSession,
    }),
    shallow
  );

  const expiredRef = useRef(expiredSession);

  useEffect(() => {
    expiredRef.current = expiredSession;
  }, [expiredSession]);

  const fns = useMemo(
    () => ({
      expireSession() {
        expireSession();
      },
      async awaitReauth() {
        notify({
          title: 'Session Expired',
          message: 'Pausing the request until you revalidate the session',
          level: 'warning',
        });

        while (expiredRef.current === true) {
          await sleep(2000);
        }

        if (expiredRef.current === false) {
          notify({
            title: 'Session Restored',
            message: 'Request is now resuming',
            level: 'success',
          });
        }
      },
    }),
    []
  );

  return [expiredRef, fns] as const;
}
