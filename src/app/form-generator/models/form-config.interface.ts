export interface ValidatorConfig {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  email?: boolean;
  pattern?: string;
  min?: number;
  max?: number;
}

export interface ControlOptions {
  min?: string;
  max?: string;
  step?: string;
  icon?: string;
}

export interface FormControl {
  name: string;
  label: string;
  value: any;
  type: string;
  controlType?: 'nested' | 'array';
  validators?: ValidatorConfig;
  options?: ControlOptions;
  controls?: FormControl[];
}

export interface FormConfig {
  controls: FormControl[];
}