import React, { useState } from 'react';
import clsx from 'clsx';
import { forwardRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import OutsideClickHandler from 'react-outside-click-handler';
import useKeyboard from '../utils/useKeyboard';
import useToggle from '../utils/useToggle';

export type SelectOption = {
  label: string;
  value: any;
};

type SelectBadgeProps = {
  label: string;
  onDelete(): void;
};

function SelectedBadge({ label, onDelete }: SelectBadgeProps) {
  return (
    <span className="flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-gray-100 text-gray-800 hover:bg-gray-200 space-x-2 max-w-1/2 truncate">
      <p>{label}</p>

      <svg
        onClick={onDelete}
        className="w-3 h-3 cursor-pointer"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </span>
  );
}

type SelectItemProps = {
  label: string;
  selected: boolean;
  onSelect(): void;
};

function SelectItem({ label, selected, onSelect }: SelectItemProps) {
  return (
    <li
      id="listbox-item-0"
      role="option"
      className="bg-white text-gray-900 cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-gray-50"
      onClick={onSelect}
    >
      <div className="flex items-center space-x-3">
        <span
          aria-label="Online"
          className={clsx(
            selected ? 'bg-green-400' : 'bg-gray-200',
            'flex-shrink-0 inline-block h-2 w-2 rounded-full'
          )}
        />
        <span className="font-normal block truncate">{label}</span>
      </div>
    </li>
  );
}

type UISelectProps = {
  multiple?: boolean;
  errors: any; // TODO: type me
  display: SelectOption | SelectOption[] | undefined;
  options: SelectOption[];
  disabled?: boolean;
  onSelect(item: SelectOption): void;
  calculateSelected(item: SelectOption): boolean;
};

function UISelect({
  multiple,
  display,
  options,
  onSelect,
  calculateSelected,
  disabled,
  errors,
}: UISelectProps) {
  const [visible, { toggle, off }] = useToggle(false);

  useKeyboard('Escape', () => {
    off();
  });

  return (
    <OutsideClickHandler onOutsideClick={off}>
      <div className="relative">
        <span className="inline-block w-full rounded-md shadow-sm">
          <button
            type="button"
            onClick={toggle}
            className={clsx(
              errors &&
                'border border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:shadow-outline-red',
              errors ??
                'border  border-gray-300 placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300',
              'appearance-none block w-full text-left pl-3 pr-10 px-3 py-2 rounded-md transition duration-150 ease-in-out text-sm leading-5',
              disabled ? 'bg-gray-100' : 'bg-white'
            )}
          >
            <div className="flex items-center space-x-3">
              {Array.isArray(display) ? (
                display.length > 0 ? (
                  <React.Fragment>
                    {display.slice(0, 3).map((item: SelectOption) => {
                      return (
                        <SelectedBadge
                          key={`badge-${item.value}`}
                          onDelete={() => onSelect(item)}
                          label={item.label}
                        />
                      );
                    })}
                  </React.Fragment>
                ) : (
                  <p className="text-gray-400">Select</p>
                )
              ) : display ? (
                <p>{display.label}</p>
              ) : (
                <p className="text-gray-400">Select</p>
              )}
            </div>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
        </span>

        <AnimatePresence>
          {visible && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.1, ease: 'easeInOut' }}
              className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-50"
            >
              <ul className="bg-white max-h-60 rounded-md py-1 text-base leading-6 shadow-xs overflow-auto focus:outline-none sm:text-sm sm:leading-5">
                {options.map((option) => {
                  return (
                    <SelectItem
                      key={option.label}
                      selected={calculateSelected(option)}
                      label={option.label}
                      onSelect={() => {
                        onSelect(option);

                        if (!multiple) {
                          off();
                        }
                      }}
                    />
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {errors && (
        <p className="mt-2 text-sm text-red-600">* {errors.message}</p>
      )}
    </OutsideClickHandler>
  );
}

// I do not like the way I allow controllable forms here. I need to do more research into this
export type Props = {
  label?: string;
  fullWidth?: boolean;
  options: SelectOption[];
  updateControlled?(newVal: any): void;
} & React.ComponentProps<'select'>;

export default forwardRef<HTMLSelectElement, Props>(
  (
    {
      label,
      className,
      fullWidth,
      multiple,
      options,
      updateControlled,
      ...props
    },
    ref
  ) => {
    // @ts-ignore: this will work I promise
    const errors = props.errors && props.name && props.errors[props.name];

    const [display, setDisplay] = useState<SelectOption | SelectOption[]>();
    const [selected, setSelected] = useState<string | string[]>();

    function handleSelection(item: SelectOption) {
      if (multiple) {
        if (!display || !selected) {
          setDisplay([item]);
          setSelected([item.value]);
        } else if (Array.isArray(display) && Array.isArray(selected)) {
          const existing = display.find(
            (el: SelectOption) => el.value === item.value
          );

          if (existing) {
            setDisplay(
              display.filter((el: SelectOption) => el.value !== item.value)
            );

            setSelected(selected.filter((el: string) => el !== item.value));
          } else {
            setDisplay([...display, item]);
            setSelected([...selected, item.value]);
          }
        }
      } else {
        updateControlled && updateControlled(item.value);
        setDisplay(item);
        setSelected(item.value);
      }
    }

    function calculateSelected(item: SelectOption) {
      if (!selected || !display) {
        return false;
      } else if (multiple && Array.isArray(display)) {
        if (display.some((el: SelectOption) => el.value === item.value)) {
          return true;
        }
      } else if (!multiple) {
        if (selected === item.value) {
          return true;
        }
      }

      return false;
    }

    // console.log('SELECT COMP', selected);

    return (
      <label
        className={clsx(
          className,
          fullWidth && 'flex-1',
          'block text-sm font-medium leading-5 text-gray-700'
        )}
      >
        {label}
        <div className="mt-1 relative">
          <select
            value={selected}
            className="hidden"
            onChange={() => selected}
            multiple={multiple}
            ref={ref}
            {...props}
          >
            {options.map((item: SelectOption) => (
              <option
                key={`raw-option-${item.value}`}
                // selected={calculateSelected(item)} // FIXME: this throws a warning about not setting selected on option
                value={item.value}
              >
                {item.label}
              </option>
            ))}
          </select>
          <UISelect
            multiple={multiple}
            errors={errors}
            display={display}
            onSelect={handleSelection}
            options={options}
            disabled={props.disabled}
            calculateSelected={calculateSelected}
          />
        </div>
      </label>
    );
  }
);
