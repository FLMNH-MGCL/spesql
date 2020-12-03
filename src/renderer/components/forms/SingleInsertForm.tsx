import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import shallow from 'zustand/shallow';
import { useStore } from '../../../stores';
import {
  validateCatalogNumber,
  validateOtherCatalogNumber,
  validateTableSelection,
} from '../../functions/validation';
import Form, { Values } from '../ui/Form';
import Heading from '../ui/Heading';
import { SelectOption } from '../ui/Select';
import { fetchTables } from './utils';

type FormPart = {
  page: number;
};

function Cataloging({ page }: FormPart) {
  const [tables, setTables] = useState<SelectOption[]>([]);

  const { expireSession, expiredSession } = useStore(
    (store) => ({
      expireSession: store.expireSession,
      expiredSession: store.expiredSession,
    }),
    shallow
  );

  useEffect(() => {
    async function init() {
      const errored = await fetchTables(setTables);

      if (errored) {
        if (errored === 'BAD SESSION') {
          expireSession();
        } else {
          console.log(errored);
          throw new Error('Some other error occurred!');
        }
      }
    }

    init();
  }, [expiredSession]);

  return (
    <div className={clsx(page !== 0 && 'hidden')}>
      <Heading centered className="py-2">
        Cataloging Information
      </Heading>
      <Form.Group flex>
        <Form.Input
          name="queryType"
          disabled
          value="INSERT"
          label="Query Type"
          fullWidth
        />

        <Form.Select
          name="databaseTable"
          label="Table"
          fullWidth
          options={tables}
          register={{ validate: validateTableSelection }}
        />
      </Form.Group>

      <Form.Group flex>
        <Form.Input
          name="catalogNumber"
          label="catalogNumber"
          register={{ validate: validateCatalogNumber }}
          fullWidth
        />
        <Form.Input
          name="otherCatalogNumber"
          label="otherCatalogNumber"
          register={{ validate: validateOtherCatalogNumber }}
          fullWidth
        />
      </Form.Group>

      <Form.Group flex>
        <Form.Input name="recordNumber" label="recordNumber" fullWidth />
        <Form.Input name="projectNumber" label="projectNumber" fullWidth />
        <Form.Input name="otherIdentifier" label="otherIdentifier" fullWidth />
      </Form.Group>
    </div>
  );
}

function ConfirmationPage() {}

type Props = {
  page: number;
  changePage(direction: 'back' | 'forward'): void;
  onSubmit(values: Values): void;
};

export default function SingleInsertForm({
  page,
  changePage,
  onSubmit,
}: Props) {
  return (
    <Form onSubmit={onSubmit}>
      <Cataloging page={page} />
    </Form>
  );
}
