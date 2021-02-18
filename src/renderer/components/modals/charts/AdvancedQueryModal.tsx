import { Button, Modal, Text } from '@flmnh-mgcl/ui';
import React, { useState } from 'react';
import { useChartStore } from '../../../../stores/chart';
import CircleButton from '../../buttons/CircleButton';
import FullScreenButton from '../../buttons/FullScreenButton';
import CodeEditor from '../../CodeEditor';
import useQuery from '../../utils/useQuery';
import useToggle from '../../utils/useToggle';

export default function AdvancedQueryModal() {
  const [open, { on, off }] = useToggle(false);
  const [code, setCode] = useState(`write your SQL code here`);
  const [size, setSize] = useState('medium');

  const { runChartQuery } = useQuery();
  const setData = useChartStore((state) => state.setData);
  const setCurrentQuery = useChartStore((state) => state.setCurrentQuery);

  function changeModalSize() {
    if (size === 'medium') {
      setSize('almostMassive');
    } else {
      setSize('medium');
    }
  }

  async function handleSubmit() {
    console.log(code);

    const data = await runChartQuery(code);

    if (data) {
      const header = [Object.keys(data[0])];

      let convertedData = header;

      for (let i = 0; i < data.length; i++) {
        convertedData.push(Object.values(data[i]));
      }

      setData(convertedData);
      setCurrentQuery(code);
      off();
    }
  }

  return (
    <React.Fragment>
      <Modal open={open} onClose={off} size={size}>
        <Modal.Content title="Advanced Data Loading">
          <Text className="pb-3">
            This allows for a more advanced query to be loaded in. Write your
            SQL query below and hit confirm to run it.
          </Text>
          <CodeEditor code={code} setCode={setCode} />
        </Modal.Content>
        <Modal.Footer>
          <Button.Group>
            <Button onClick={off}>Close</Button>
            <Button onClick={handleSubmit}>Confirm</Button>
          </Button.Group>
          <div className="flex-1">
            <FullScreenButton
              fullScreen={size === 'almostMassive'}
              toggle={changeModalSize}
            />
          </div>
        </Modal.Footer>
      </Modal>

      <CircleButton
        icon={
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
            />
          </svg>
        }
        onClick={on}
      />
    </React.Fragment>
  );
}
