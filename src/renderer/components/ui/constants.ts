export enum COLORS {}

export const TEXT = {};

export const BUTTONS = {
  primary: {
    base: 'border-transparent text-white focus:outline-none',
    active:
      'bg-indigo-600 hover:bg-indigo-500 focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700',
    disabled: 'bg-indigo-400',
  },
  default: {
    base: 'border-gray-300',
    active:
      'bg-white text-gray-700 hover:text-gray-500 focus:border-blue-300 focus:shadow-outline',
    disabled: 'bg-gray-100',
  },
  danger: {
    base: 'border-transparent text-white',
    active:
      'bg-red-600 hover:bg-red-500 focus:border-red-700 focus:shadow-outline-red',
    disabled: 'bg-red-400',
  },
  clear: {
    base: 'border-gray-300',
    active:
      'text-gray-700 hover:text-gray-500 focus:border-blue-300 focus:shadow-outline',
    disabled: 'bg-gray-100',
  },
};
