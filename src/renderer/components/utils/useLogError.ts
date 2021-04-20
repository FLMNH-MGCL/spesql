import { useEffect, useRef } from 'react';
import { useStore } from '../../../stores';
import shallow from 'zustand/shallow';
import { useAdminStore } from '../../../stores/admin';
import { cleanObject } from '../../functions/util';

export default function useLogError() {
  const errors = useStore((state) => state.errors, shallow);
  const adminErrors = useAdminStore((state) => state.adminErrors, shallow);

  const errorsRef = useRef(errors);
  const adminErrorsRef = useRef(adminErrors);

  useEffect(() => {
    errorsRef.current = errors;
    adminErrorsRef.current = adminErrors;
  }, [
    errors.select,
    errors.count,
    errors.delete,
    errors.bulkInsert,
    errors.singleInsert,
    errors.update,
    errors.global,
    adminErrors.userErrors,
    adminErrors.tableErrors,
  ]);

  const {
    updateSelectLog,
    updateCountLog,
    updateUpdateLog,
    updateSingleInsertLog,
    updateBulkInsertLog,
    updateDeleteLog,
  } = useStore((state) => ({
    updateSelectLog: state.updateSelectLog,
    updateCountLog: state.updateCountLog,
    updateUpdateLog: state.updateUpdateLog, // TODO:
    updateSingleInsertLog: state.updateSingleInsertLog, // TODO:
    updateBulkInsertLog: state.updateBulkInsertLog, // TODO:
    updateDeleteLog: state.updateDeleteLog, // TODO:
  }));

  const { updateUserErrors, updateTableErrors } = useAdminStore((state) => ({
    updateUserErrors: state.updateUserErrors,
    updateTableErrors: state.updateTableErrors,
  }));

  const updaters = {
    select: updateSelectLog,
    count: updateCountLog,
    delete: updateDeleteLog,
    update: updateUpdateLog,
    bulkInsert: updateBulkInsertLog,
    singleInsert: updateSingleInsertLog,
    userError: updateUserErrors,
    tableError: updateTableErrors,
  };

  const loggingFunctions = {
    logSqlError(responseData: any, logName: keyof typeof errors) {
      const logs = errorsRef.current[logName];
      let error: any = {};
      try {
        const { code, sqlMessage, sql } = responseData;
        error = { code, message: sqlMessage, sql };
      } catch {
        error = {
          code: 'CLIENTERR',
          message: 'Error during the logging process of previous error!',
        };
      }

      const update = updaters[logName as keyof typeof updaters];
      if (logs && logs.length) {
        let newErrrors = [error, ...logs];
        update(newErrrors);
      } else {
        update([error]);
      }
    },

    logError(data: any, logName: keyof typeof errors) {
      const logs = errorsRef.current[logName];
      let error: any = {};
      try {
        const {
          code,
          message,
          sql,
          field,
          fieldValue,
          catalogNumber,
          level,
        } = data;

        error = cleanObject({
          code,
          message,
          sql,
          field,
          fieldValue,
          catalogNumber,
          level,
        });
      } catch {
        error = {
          code: 'CLIENTERR',
          message: 'Error during the logging process of previous error!',
        };
      }

      const update = updaters[logName as keyof typeof updaters];
      if (logs && logs.length) {
        let newErrrors = [error, ...logs];
        update(newErrrors);
      } else {
        update([error]);
      }
    },

    logAdminUserError(responseData: any) {
      const logs = adminErrorsRef.current?.userErrors;
      let error: any = {};

      try {
        const { status, data } = responseData;
        const { code, sqlMessage } = data;

        error = { serverStatus: status, code, message: sqlMessage };
      } catch {
        error = {
          code: 'CLIENTERR',
          message: 'Error during the logging process of previous error!',
        };
      }

      const update = updaters.userError;

      if (logs && logs.length) {
        let newErrrors = [error, ...logs];
        update(newErrrors);
      } else {
        update([error]);
      }
    },
    logAdminTableError(responseData: any) {
      const logs = adminErrorsRef.current?.tableErrors;
      let error: any = {};

      console.log(responseData);

      try {
        const { status, data } = responseData;
        const { code, sqlMessage } = data;

        error = { serverStatus: status, code, message: sqlMessage };
      } catch {
        error = {
          code: 'CLIENTERR',
          message: 'Error during the logging process of previous error!',
        };
      }

      const update = updaters.tableError;

      if (logs && logs.length) {
        let newErrrors = [error, ...logs];
        update(newErrrors);
      } else {
        update([error]);
      }
    },
  };

  return loggingFunctions;
}
