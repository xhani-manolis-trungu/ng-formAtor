import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormControlModel } from '../../models/control.model';
import { VALIDATORS } from '../../models/validator.model';
import { ValidatorState } from '../../models/validator-state.model';
import { ValidatorCheckboxComponent } from './validator-checkbox.component';

@Component({
  selector: 'app-validator-input',
  standalone: true,
  imports: [CommonModule, FormsModule, ValidatorCheckboxComponent],
  template: `
    <div class="validators-container">
      <h4>Validators</h4>
      <div class="validators-list">
        <app-validator-checkbox
          *ngFor="let validator of validators"
          [validator]="validator"
          [state]="getValidatorState(validator.type)"
          (stateChange)="updateValidatorState($event, validator.type)"
        ></app-validator-checkbox>
      </div>
    </div>
  `,
  styles: [`
    .validators-container {
      border: 1px solid #ddd;
      padding: 10px;
      border-radius: 4px;
      background-color: #f9f9f9;
    }
    h4 {
      margin: 0 0 10px 0;
      color: #333;
    }
    .validators-list {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }
  `]
})
export class ValidatorInputComponent implements OnInit {
  @Input() control!: FormControlModel;
  validators = VALIDATORS;

  ngOnInit() {
    if (!this.control.validators) {
      this.control.validators = VALIDATORS.map(v => ({
        type: v.type,
        enabled: false,
        value: undefined
      }));
    }
  }

  getValidatorState(type: string): ValidatorState {
    return (
      this.control.validators.find(v => v.type === type) || 
      { type, enabled: false, value: undefined }
    );
  }

  updateValidatorState(state: ValidatorState, type: string) {
    const index = this.control.validators.findIndex(v => v.type === type);
    if (index !== -1) {
      this.control.validators[index] = state;
    } else {
      this.control.validators.push(state);
    }
  }
}