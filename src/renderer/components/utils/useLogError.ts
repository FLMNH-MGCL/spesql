import { useEffect, useRef } from 'react';
import { useStore } from '../../../stores';
import shallow from 'zustand/shallow';

export default function useLogError() {
  const errors = useStore((state) => state.errors, shallow);

  const errorsRef = useRef(errors);

  useEffect(() => {
    errorsRef.current = errors;
  }, [
    errors.select,
    errors.count,
    errors.delete,
    errors.bulkInsert,
    errors.singleInsert,
    errors.update,
    errors.global,
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

  const updaters = {
    select: updateSelectLog,
    count: updateCountLog,
    delete: updateDeleteLog,
    update: updateUpdateLog,
    bulkInsert: updateBulkInsertLog,
    singleInsert: updateSingleInsertLog,
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
  };

  return loggingFunctions;
}
