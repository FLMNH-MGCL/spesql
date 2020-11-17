import React, { useEffect, useState } from 'react';
import BackButton from '../components/buttons/BackButton';
import ReactJson from 'react-json-view';
import axios from 'axios';
import { MySqlCredentials } from '../../main/server/types';
import { useNotify } from '../components/utils/context';
import CreateUpdateConfigModal from '../components/modals/CreateUpdateConfigModal';
import { BACKEND_URL } from '../types';

// use the component in your app!

export default function Settings() {
  const { notify } = useNotify();

  const [config, setConfig] = useState<MySqlCredentials | {}>({});
  const [newConfig, setNewConfig] = useState<MySqlCredentials | {}>({});

  async function getConfig() {
    const config = await axios.get(BACKEND_URL + '/api/config/get');

    if (config.status === 201) {
      // file did not exist, created it
      notify({
        title: 'Config Created',
        message:
          'A spesql config file was created, please complete it in Settings',
        level: 'warning',
      });

      setConfig({
        host: '',
        port: 0,
        user: '',
        password: '',
        database: '',
      });
    } else if (config.status === 500) {
      // server error
      notify({
        title: 'Server Error',
        message: `Error when trying to access/create spesql config: ${config.data}`,
        level: 'error',
      });
    } else if (config.status === 200) {
      setConfig(config.data as MySqlCredentials);
    }
  }

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    async function updateConfig() {
      const updatedResponse = await axios
        .post('/api/config/update', {
          newConfig,
        })
        .catch((error) => error.response);

      if (updatedResponse.status !== 201) {
        notify({
          title: 'Server Error',
          message: updatedResponse.data,
          level: 'error',
        });
      } else {
        notify({
          title: 'Updated Config',
          message: '',
          level: 'success',
        });

        getConfig();
      }
    }

    if (Object.keys(newConfig).length) {
      updateConfig();
    }
  }, [newConfig]);

  return (
    <div className="relative">
      <div className="absolute top-4 left-4">
        <BackButton to="/home" />
      </div>

      <div className="h-screen flex items-center">
        <div className="mx-auto w-full max-w-lg py-8 px-10 bg-white shadow rounded-lg">
          <label className="block text-sm font-medium leading-5 text-gray-700 pb-3">
            MySQL Access Credentials
          </label>
          <div className="bg-gray-100 rounded-lg py-2 px-3">
            <ReactJson src={config ?? {}} collapsed name="credentials" />
          </div>
          <div className="flex pt-6 justify-end">
            <CreateUpdateConfigModal setJson={setNewConfig} />
          </div>
        </div>
      </div>
    </div>
  );
}
