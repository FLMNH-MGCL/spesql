import { createContext, useContext } from 'react';
import { NotificationContent } from '../../types';

export const NotificationContext = createContext<{
  notify(content: NotificationContent): void;
}>({ notify: () => {} });

export const useNotify = () => useContext(NotificationContext);
