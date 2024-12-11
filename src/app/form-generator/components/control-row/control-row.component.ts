import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  FormControlModel,
  AVAILABLE_INPUT_TYPES,
  CONTROL_TYPES,
} from '../../models/control.model';
import { FormGeneratorService } from '../../services/form-generator.service';
import { ValidatorInputComponent } from '../validator-input/validator-input.component';

@Component({
  selector: 'app-control-row',
  standalone: true,
  imports: [CommonModule, FormsModule, ValidatorInputComponent],
  template: `
    <div class="control-container">
      <div class="input-group">
        <input 
          [(ngModel)]="control.name" 
          placeholder="Control name"
          class="form-control"
        />

        <input 
          [(ngModel)]="control.label" 
          placeholder="Label"
          class="form-control"
        />

        <select [(ngModel)]="control.type" class="form-control">
          <option *ngFor="let type of inputTypes" [value]="type.value">
            {{type.label}}
          </option>
        </select>

        <select [(ngModel)]="control.controlType" class="form-control">
          <option [ngValue]="undefined">Regular Control</option>
          <option [value]="CONTROL_TYPES.NESTED">Nested Form</option>
          <option [value]="CONTROL_TYPES.ARRAY">Form Array</option>
        </select>

        <app-validator-input [control]="control"></app-validator-input>

        <textarea 
          [(ngModel)]="control.errorMessages"
          placeholder="Error messages (JSON format)"
          class="form-control"
        ></textarea>

        <button (click)="onRemove.emit()" class="btn btn-danger">-</button>
        <button (click)="onAdd.emit()" class="btn btn-primary">+</button>
      </div>

      <div *ngIf="control.controlType" class="nested-controls">
        <h4>{{ control.controlType === CONTROL_TYPES.NESTED ? 'Nested Controls' : 'Array Controls' }}</h4>
        <div class="nested-controls-container">
          <app-control-row
            *ngFor="let nestedControl of control.nestedControls; let i = index"
            [control]="nestedControl"
            (onAdd)="addNestedControl()"
            (onRemove)="removeNestedControl(i)"
          ></app-control-row>
          <button *ngIf="!control.nestedControls?.length" 
                  (click)="addNestedControl()" 
                  class="btn btn-outline-primary">
            Add {{ control.controlType === CONTROL_TYPES.NESTED ? 'Nested' : 'Array' }} Control
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
    .control-container {
      margin-bottom: 20px;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    .input-group {
      display: flex;
      gap: 10px;
      align-items: flex-start;
      margin-bottom: 15px;
    }
    .form-control {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .btn-primary {
      background-color: #007bff;
      color: white;
    }
    .btn-outline-primary {
      border: 1px solid #007bff;
      color: #007bff;
      background: none;
    }
    .btn-outline-primary:hover {
      background-color: #007bff;
      color: white;
    }
    .btn-danger {
      background-color: #dc3545;
      color: white;
    }
    .nested-controls {
      margin-left: 20px;
      padding: 10px;
      border-left: 2px solid #007bff;
    }
    .nested-controls h4 {
      margin-bottom: 15px;
      color: #007bff;
    }
  `,
  ],
})
export class ControlRowComponent {
  @Input() control!: FormControlModel;
  @Output() onAdd = new EventEmitter<void>();
  @Output() onRemove = new EventEmitter<void>();

  inputTypes = AVAILABLE_INPUT_TYPES;
  CONTROL_TYPES = CONTROL_TYPES;

  constructor(private formGeneratorService: FormGeneratorService) {}

  addNestedControl() {
    if (!this.control.nestedControls) {
      this.control.nestedControls = [];
    }
    this.control.nestedControls.push(
      this.formGeneratorService.createEmptyControl()
    );
  }

  removeNestedControl(index: number) {
    if (this.control.nestedControls && this.control.nestedControls.length > 0) {
      this.control.nestedControls.splice(index, 1);
    }
  }
}
