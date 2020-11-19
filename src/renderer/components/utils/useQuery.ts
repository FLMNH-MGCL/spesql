import { useMemo } from 'react';
import shallow from 'zustand/shallow';
import { useStore } from '../../../stores';
import { resetSelectedSpecimen } from '../../functions/util';
import { BACKEND_URL } from '../../types';
import { useNotify } from './context';
import useExpiredSession from './useExpiredSession';
import axios from 'axios';
import { CountQueryReturn } from '../modals/CreateCountModal';

export default function useQuery() {
  const { notify } = useNotify();

  const {
    query,
    setData,
    setTable,
    setCurrentQuery,
    selectedSpecimen,
    setSelectedSpecimen,
    toggleLoading,
  } = useStore(
    (state) => ({
      query: state.queryData.queryString,
      setData: state.queryData.setData,
      setTable: state.queryData.setTable,
      setCurrentQuery: state.queryData.setCurrentQuery,
      selectedSpecimen: state.selectedSpecimen,
      setSelectedSpecimen: state.setSelectedSpecimen,
      toggleLoading: state.toggleLoading,
    }),
    shallow
  );

  const [, { expireSession, awaitReauth }] = useExpiredSession();

  const queries = useMemo(
    () => ({
      async count(
        query: string,
        columns: any[],
        conditions: any[] | null,
        setState: React.Dispatch<
          React.SetStateAction<CountQueryReturn | undefined>
        >
      ) {
        const countResponse = await axios
          .post(BACKEND_URL + '/api/count', {
            query,
            columns,
            conditions,
          })
          .catch((error) => error.response);

        if (countResponse.status === 200 && countResponse.data) {
          const { count, query } = countResponse.data;

          setState({ numTuples: count, queryString: query });
        } else if (countResponse.status === 401) {
          expireSession();

          await awaitReauth();
          queries.count(query, columns, conditions, setState);
        } else {
          // TODO: interpret status
          // const error = selectResponse.data;
          notify({ title: 'TODO', message: 'TODO', level: 'error' });
        }
      },
      async deleteSpecimen(id: number, table: string) {
        const deleteResponse = await axios.post(BACKEND_URL + '/api/delete', {
          id,
          table,
        });

        if (deleteResponse.status === 200) {
          setSelectedSpecimen(null);
          queries.refresh();
        } else if (deleteResponse.status === 401) {
          expireSession();

          await awaitReauth();
          await queries.deleteSpecimen(id, table);
        } else {
          notify({
            title: 'Unknown Error',
            message: 'Please notify Aaron of this bug',
            level: 'error',
          });
        }
      },
      async deleteUser() {
        // TODO: make me please
      },
      async deleteTable() {
        // TODO: make me please
      },
      async refresh() {
        if (!query || query === '') {
          return;
        }

        setData([]);

        toggleLoading(true);

        const selectResponse = await axios
          .post(BACKEND_URL + '/api/select', {
            query,
          })
          .catch((error) => error.response);

        if (selectResponse.status === 200 && selectResponse.data) {
          const { specimen } = selectResponse.data;
          setData(specimen);
          resetSelectedSpecimen(
            selectedSpecimen,
            setSelectedSpecimen,
            specimen
          );
        } else if (selectResponse.status === 401) {
          expireSession();

          await awaitReauth();
          queries.refresh();
        } else {
          // TODO: interpret status
          const error = selectResponse.data;
          notify({ title: 'Error Occurred', message: error, level: 'error' });
        }

        toggleLoading(false);
      },
      async select(
        query: string,
        columns: any[],
        conditions: any[] | null,
        databaseTable: string,
        callback: () => void
      ) {
        const selectResponse = await axios
          .post(BACKEND_URL + '/api/select', {
            query,
            columns,
            conditions,
          })
          .catch((error) => error.response);

        if (selectResponse.status === 200 && selectResponse.data) {
          const { specimen, query } = selectResponse.data;

          if (!specimen.length) {
            notify({
              title: 'Empty Return',
              message: 'Query yielded no data',
              level: 'warning',
            });
          } else {
            callback();
            setData(specimen);
            setTable(databaseTable);
            setCurrentQuery(query);
          }
        } else if (selectResponse.status === 401) {
          expireSession();

          await awaitReauth();
          await queries.select(
            query,
            columns,
            conditions,
            databaseTable,
            callback
          );
        } else {
          // TODO: interpret status
          // const error = selectResponse.data;
          notify({ title: 'TODO', message: 'TODO', level: 'error' });
        }

        toggleLoading(false);
      },
      async update(query: string, conditions: any[], updates: any) {
        const updateResponse = await axios
          .post(BACKEND_URL + '/api/update', {
            query,
            conditions,
            updates,
          })
          .catch((error) => error.response);

        if (updateResponse.status === 200 && updateResponse.data) {
          const { message } = updateResponse.data;

          notify({
            title: 'Update Successful',
            message,
            level: 'success',
          });

          await queries.refresh();
        } else if (updateResponse.status === 401) {
          expireSession();

          await awaitReauth();
          await queries.update(query, conditions, updates);
        }
      },
    }),
    [query, selectedSpecimen]
  );

  // TODO: change return if adding more stuff to this hook
  return [queries] as const;
}
