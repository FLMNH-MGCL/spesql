import { Select, SelectOption } from '@flmnh-mgcl/ui';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import shallow from 'zustand/shallow';
import { useStore } from '../../stores';
import { BACKEND_URL } from '../types';

type Props = {
  className?: string;
  label?: string;
  name?: string;
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
};

export default function TableSelect({
  className,
  label = 'Select a Table',
  name = 'databaseTable',
  value,
  onChange,
}: Props) {
  const [tables, setTables] = useState<SelectOption[]>([]);

  const { expiredSession, expireSession } = useStore(
    (state) => ({
      expiredSession: state.expiredSession,
      expireSession: state.expireSession,
    }),
    shallow
  );

  const expiredRef = useRef(expiredSession);

  const mountedRef = useRef(true);

  useEffect(() => {
    async function init() {
      const res = await axios
        .get(BACKEND_URL + '/api/queriables/select/')
        .catch((error) => error.response);

      if (res.data && res.data.tables) {
        if (mountedRef.current === true) {
          setTables(
            res.data.tables.map((table: string) => {
              return { label: table, value: table };
            })
          );
        }
      } else if (res.status === 401) {
        expireSession();
      }
    }

    expiredRef.current = expiredSession;
    if (mountedRef.current === true) {
      init();
    }

    return () => {
      mountedRef.current = false;
    };
  }, [expiredSession]);

  return (
    <Select
      name={name}
      className={className}
      options={tables}
      value={value}
      label={label}
      updateControlled={(newVal: any) => {
        onChange(newVal);
      }}
    />
  );
}
