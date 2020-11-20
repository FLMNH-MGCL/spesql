import { createContext, useContext } from 'react';
import { NotificationContent } from '../../types';

export const NotificationContext = createContext<{
  notify(
    content: NotificationContent,
    sound?: 'error' | 'success' | 'warning'
  ): void;
}>({ notify: () => {} });

export const useNotify = () => useContext(NotificationContext);
