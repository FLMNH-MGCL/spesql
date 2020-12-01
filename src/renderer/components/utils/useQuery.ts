import { useMemo } from 'react';
import shallow from 'zustand/shallow';
import { useStore } from '../../../stores';
import { resetSelectedSpecimen } from '../../functions/util';
import { BACKEND_URL } from '../../types';
import { useNotify } from './context';
import useExpiredSession from './useExpiredSession';
import axios from 'axios';
import { CountQueryReturn } from '../modals/CreateCountModal';
import { User } from '../UsersTable';
import { queriablesStats } from '../../../main/server/endpoints/sql/utils/queriablesStats';

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
      async createUser(newUser: Partial<User>) {
        const creationResponse = await axios
          .post(BACKEND_URL + '/api/admin/user/create', { newUser })
          .catch((error) => error.response);

        if (creationResponse.status === 201) {
          notify({
            title: 'Success',
            message: `Created new user @${newUser.username}`,
            level: 'success',
          });
        } else if (creationResponse.status === 401) {
          expireSession();

          await awaitReauth();
          await queries.createUser(newUser);
        } else {
          notify({
            title: 'Error Occurred',
            message: 'Please check the logs',
            level: 'error',
          });

          return {
            status: creationResponse.status,
            data: creationResponse.data,
          };
        }

        return;
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
      async deleteUser(id: number): Promise<boolean> {
        const deleteResponse = await axios
          .post(BACKEND_URL + '/api/admin/user/delete', { id })
          .catch((error) => error.response);

        if (deleteResponse.status === 200) {
          return true;
        } else if (deleteResponse.status === 401) {
          expireSession();

          await awaitReauth();
          return await queries.deleteUser(id);
        } else {
          notify({
            title: 'Unknown Error',
            message: 'Please notify Aaron of this bug',
            level: 'error',
          });

          return false;
        }
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
      async queriablesStats(): Promise<any[]> {
        const statsResponse = await axios
          .get(BACKEND_URL + '/api/admin/queriables/stats')
          .catch((error) => error.response);

        if (statsResponse.status === 200 && statsResponse.data) {
          return statsResponse.data;
        } else if (statsResponse.status === 401) {
          expireSession();

          await awaitReauth();
          return await queries.queriablesStats();
        } else {
          return [];
        }
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
      async updateTable(table: string, updates: any) {},
    }),
    [query, selectedSpecimen]
  );

  // TODO: change return if adding more stuff to this hook
  return queries;
}
