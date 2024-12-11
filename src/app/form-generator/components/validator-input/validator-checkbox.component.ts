import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ValidatorConfig } from '../../models/validator.model';
import { ValidatorState } from '../../models/validator-state.model';

@Component({
  selector: 'app-validator-checkbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="validator-checkbox">
      <label [for]="validator.type" class="checkbox-label">
        <input
          type="checkbox"
          [id]="validator.type"
          [checked]="state.enabled"
          (change)="toggleValidator($event)"
        />
        {{ validator.label }}
      </label>
      
      <input
        *ngIf="validator.requiresValue && state.enabled"
        type="number"
        [min]="0"
        [value]="state.value"
        (input)="updateValue($event)"
        class="validator-value"
      />
    </div>
  `,
  styles: [`
    .validator-checkbox {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 5px 0;
    }
    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 5px;
      cursor: pointer;
    }
    .validator-value {
      width: 80px;
      padding: 4px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  `]
})
export class ValidatorCheckboxComponent {
  @Input() validator!: ValidatorConfig;
  @Input() state!: ValidatorState;
  @Output() stateChange = new EventEmitter<ValidatorState>();

  toggleValidator(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.stateChange.emit({
      ...this.state,
      enabled: checked,
      value: checked ? this.state.value : undefined
    });
  }

  updateValue(event: Event) {
    const value = Number((event.target as HTMLInputElement).value);
    this.stateChange.emit({
      ...this.state,
      value
    });
  }
}