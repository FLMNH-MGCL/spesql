import { Button, FormSubmitValues, Modal } from '@flmnh-mgcl/ui';
import React from 'react';
import shallow from 'zustand/shallow';
import { useStore } from '../../../stores';
import api from '../../functions/api';
import { buildConditionalObjects } from '../../functions/builder';
import { flattenDBSpecimen } from '../../functions/conversions';
import { collectConditionalsFromForm } from '../../functions/util';
import SelectQueryForm from '../forms/SelectQueryForm';
import { allRelations } from '../utils/constants';
import { useNotify } from '../utils/context';
import CreateHelpModal from './CreateHelpModal';
import CreateLogModal from './CreateLogModal';

type Props = {
  open: boolean;
  onClose(): void;
};

export default function NewSelectModal({ open, onClose }: Props) {
  const { notify } = useNotify();

  const toggleLoading = useStore((state) => state.toggleLoading);

  const setData = useStore((state) => state.queryData.setData);

  const loading = useStore((state) => state.loading, shallow);

  async function handleSubmit(values: FormSubmitValues) {
    toggleLoading(true);
    const { loadRelations, labName } = values;

    const rawConditions = collectConditionalsFromForm(values);
    const conditions = buildConditionalObjects(rawConditions);

    const res = await api
      .select(
        labName,
        loadRelations.includes('all') ? allRelations : loadRelations,
        conditions
      )
      .catch((err) => err.response);

    if (res.status === 200) {
      const { data } = res;

      if (data.length < 1) {
        notify({
          title: 'Empty Return',
          message: 'Query yielded no data',
          level: 'warning',
        });
      } else {
        const flattened = data.map((obj: any) => flattenDBSpecimen(obj));
        setData(flattened);

        onClose();
      }
    } else {
      notify({
        title: 'HANDLE ME',
        message: res.data,
        level: 'error',
      });
    }

    toggleLoading(false);
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={onClose} size="medium">
        <Modal.Content title="Select Query">
          <SelectQueryForm onSubmit={handleSubmit} />
        </Modal.Content>

        <Modal.Footer>
          <Button.Group>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              variant="primary"
              type="submit"
              form="select-form"
              loading={loading}
            >
              Confirm
            </Button>
          </Button.Group>

          <div className="flex space-x-2 flex-1">
            <CreateLogModal initialTab={0} watch="select" />
            <CreateHelpModal variant="select" />
          </div>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}
