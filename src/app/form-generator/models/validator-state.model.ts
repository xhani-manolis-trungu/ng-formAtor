export interface ValidatorState {
  type: string;
  value?: number;
  enabled: boolean;
}

export interface ValidatorStateMap {
  [key: string]: ValidatorState;
}