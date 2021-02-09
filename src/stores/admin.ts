import create from 'zustand';

export type AdminUserError = {
  serverStatus: number;
  code?: string | number;
  sql?: string;
  message: string | boolean;
};

export type AdminTableError = AdminUserError;

export type AdminErrors = {
  userErrors: AdminUserError[];
  tableErrors: AdminTableError[];
};

type AdminStore = {
  adminErrors: AdminErrors;

  updateUserErrors(newLog: AdminUserError[]): void;
  updateTableErrors(newLog: AdminTableError[]): void;

  clearErrors(logName: keyof AdminErrors): void;
};

export const useAdminStore = create<AdminStore>((set, _get) => ({
  adminErrors: {
    userErrors: [],
    tableErrors: [],
  },

  updateUserErrors: function (newLog) {
    set((state) => ({
      ...state,
      adminErrors: {
        ...state.adminErrors,
        userErrors: newLog,
      },
    }));
  },

  updateTableErrors: function (newLog) {
    set((state) => ({
      ...state,
      adminErrors: {
        ...state.adminErrors,
        tableErrors: newLog,
      },
    }));
  },

  clearErrors: function (logName) {
    set((state) => ({
      ...state,
      adminErrors: {
        ...state.adminErrors,
        [logName]: [],
      },
    }));
  },
}));
