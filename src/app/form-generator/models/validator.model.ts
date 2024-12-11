export interface ValidatorConfig {
  type: ValidatorType;
  label: string;
  requiresValue: boolean;
  valueType: 'number' | 'none';
}

export type ValidatorType = 'required' | 'minLength' | 'maxLength' | 'email' | 'pattern' | 'min' | 'max';

export const VALIDATORS: ValidatorConfig[] = [
  { type: 'required', label: 'Required', requiresValue: false, valueType: 'none' },
  { type: 'minLength', label: 'Min Length', requiresValue: true, valueType: 'number' },
  { type: 'maxLength', label: 'Max Length', requiresValue: true, valueType: 'number' },
  { type: 'email', label: 'Email', requiresValue: false, valueType: 'none' },
  { type: 'pattern', label: 'Pattern', requiresValue: false, valueType: 'none' },
  { type: 'min', label: 'Min', requiresValue: true, valueType: 'number' },
  { type: 'max', label: 'Max', requiresValue: true, valueType: 'number' }
];