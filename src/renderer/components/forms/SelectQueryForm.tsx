import React, { useEffect, useState } from 'react';
import { relationsOptions } from '../utils/constants';
import { useStore } from '../../../stores';
import ConditionalForm from './ConditionalForm';
import shallow from 'zustand/shallow';
import { Form, FormSubmitValues, SelectOption } from '@flmnh-mgcl/ui';
import api from '../../functions/api';

type Props = {
  onSubmit(values: FormSubmitValues): void;
};

export default function SelectQueryForm({ onSubmit }: Props) {
  const [labs, setLabs] = useState<SelectOption[]>([]);

  const { expireSession, expiredSession } = useStore(
    (store) => ({
      expireSession: store.expireSession,
      expiredSession: store.expiredSession,
    }),
    shallow
  );

  useEffect(() => {
    async function init() {
      const res = await api.getLabs();

      console.log(res);

      if (res && res.status === 200) {
        setLabs([
          { label: 'Any', value: 'any' },
          ...res.data.map((lab: any) => {
            return { label: lab.name, value: lab.name };
          }),
        ]);
      }
      // const errored = await fetchTables(setTables);

      // if (errored) {
      //   if (errored === 'BAD SESSION') {
      //     expireSession();
      //   } else {
      //     console.log(errored);
      //     throw new Error('Some other error occurred!');
      //   }
      // }
    }

    init();
  }, [expiredSession]);

  return (
    <Form onSubmit={onSubmit} id="select-form" mode="onChange">
      <Form.Group flex>
        <Form.Select
          name="loadRelations"
          label="Relations"
          fullWidth
          multiple
          options={relationsOptions}
          defaultValue={relationsOptions[0].value}
          searchable
        />

        <Form.Select
          name="labName"
          label="Lab"
          fullWidth
          defaultValue="any"
          options={labs}
          searchable
        />
      </Form.Group>

      <ConditionalForm advanced={false} />
    </Form>
  );
}
