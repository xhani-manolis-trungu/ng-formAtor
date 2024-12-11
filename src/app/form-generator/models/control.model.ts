import { ValidatorState } from './validator-state.model';

export interface FormControlModel {
  name: string;
  label: string;
  value: string;
  type: string;
  controlType?: 'nested' | 'array' | undefined;
  validators: ValidatorState[];
  errorMessages: string;
  nestedControls?: FormControlModel[];
}

export const CONTROL_TYPES = {
  NESTED: 'nested',
  ARRAY: 'array'
} as const;

export const AVAILABLE_INPUT_TYPES = [
  { value: 'text', label: 'Text' },
  { value: 'number', label: 'Number' },
  { value: 'email', label: 'Email' },
  { value: 'password', label: 'Password' },
  { value: 'textarea', label: 'Textarea' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'radio', label: 'Radio' },
  { value: 'select', label: 'Select' },
  { value: 'range', label: 'Range' },
  { value: 'toggle', label: 'Toggle' }
];