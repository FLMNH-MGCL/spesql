import React, { useEffect } from 'react';

// https://jquense.github.io/react-widgets/api/DateTimePicker/
// https://react-day-picker.js.org/
// https://flatpickr.js.org/examples/

type Props = {
  futureOnly?: boolean;
  pastOnly?: boolean;
};

// TODO: make me plz
// @ts-ignore
export default function Datepicker({ futureOnly, pastOnly }: Props) {
  // const [minDate, setMinDate] = useState();
  // const [maxDate, setMaxDate] = useState();

  useEffect(() => {
    // set min and max dates based on props
  }, []);

  return <div></div>;
}
