import { Injectable } from '@angular/core';
import { FormControlModel } from '../models/control.model';
import { FormConfig, FormControl } from '../models/form-config.interface';
import { VALIDATORS } from '../models/validator.model';

@Injectable({
  providedIn: 'root'
})
export class FormGeneratorService {
  createEmptyControl(): FormControlModel {
    return {
      name: '',
      label: '',
      value: '',
      type: 'text',
      validators: VALIDATORS.map(v => ({
        type: v.type,
        enabled: false,
        value: undefined
      })),
      errorMessages: '',
      nestedControls: []
    };
  }

  generateConfig(controls: FormControlModel[]): FormConfig {
    return {
      controls: controls.map(control => this.mapToFormControl(control))
    };
  }

  private mapToFormControl(control: FormControlModel): FormControl {
    const formControl: FormControl = {
      name: control.name,
      label: control.label,
      value: '',
      type: control.type,
      validators: {}
    };

    if (control.controlType) {
      formControl.controlType = control.controlType;
    }

    // Map enabled validators with their values
    formControl.validators = control.validators
      .filter(v => v.enabled)
      .reduce((acc, v) => ({
        ...acc,
        [v.type]: v.value ?? true
      }), {});

    if (control.nestedControls?.length) {
      formControl.controls = control.nestedControls.map(nestedControl => 
        this.mapToFormControl(nestedControl)
      );
    }

    return formControl;
  }

  downloadJson(config: FormConfig): void {
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'form-config.json';
    a.click();
    window.URL.revokeObjectURL(url);
  }
}