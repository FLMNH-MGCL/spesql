export type MySqlCredentials = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
};

export const DEFAULT_CONFIG: MySqlCredentials = {
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
};
