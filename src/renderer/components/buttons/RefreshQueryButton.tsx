import React from 'react';
import { useStore } from '../../../stores';
import { BACKEND_URL } from '../../types';
import Button from '../ui/Button';
import axios from 'axios';
import { useNotify } from '../utils/context';
import shallow from 'zustand/shallow';

export default function RefreshQueryButton({
  disabled,
}: {
  disabled?: boolean;
}) {
  const { notify } = useNotify();

  const { queryString, setData } = useStore(
    (state) => ({
      queryString: state.queryData.queryString,
      setData: state.queryData.setData,
    }),
    shallow
  );

  const toggleLoading = useStore((state) => state.toggleLoading);

  async function refresh() {
    if (!queryString || queryString === '') {
      return;
    }

    setData([]);

    toggleLoading(true);

    const selectResponse = await axios
      .post(BACKEND_URL + '/api/select', {
        query: queryString,
      })
      .catch((error) => error.response);

    console.log(selectResponse);

    if (selectResponse.status === 200 && selectResponse.data) {
      const { specimen } = selectResponse.data;
      setData(specimen);
    } else {
      // TODO: interpret status
      const error = selectResponse.data;
      notify({ title: 'TODO', message: error, level: 'error' });
    }

    toggleLoading(false);
  }
  return (
    <Button variant="clear" rounded disabled={disabled} onClick={refresh}>
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
        />
      </svg>
    </Button>
  );
}
