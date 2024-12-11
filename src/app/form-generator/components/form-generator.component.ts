import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlModel } from '../models/control.model';
import { FormGeneratorService } from '../services/form-generator.service';
import { ControlRowComponent } from './control-row/control-row.component';

@Component({
  selector: 'app-form-generator',
  standalone: true,
  imports: [CommonModule, ControlRowComponent],
  template: `
    <div class="container">
      <h2>Form Generator</h2>
      
      <div class="controls-container">
        <app-control-row
          *ngFor="let control of formControls; let i = index"
          [control]="control"
          (onAdd)="addControl()"
          (onRemove)="removeControl(i)"
        ></app-control-row>
      </div>

      <div class="actions">
        <button (click)="generateJson()" class="btn btn-success">Generate JSON</button>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    .controls-container {
      margin: 20px 0;
    }
    .actions {
      margin-top: 20px;
    }
    .btn-success {
      background-color: #28a745;
      color: white;
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class FormGeneratorComponent {
  formControls: FormControlModel[] = [this.formGeneratorService.createEmptyControl()];

  constructor(private formGeneratorService: FormGeneratorService) {}

  addControl() {
    this.formControls.push(this.formGeneratorService.createEmptyControl());
  }

  removeControl(index: number) {
    if (this.formControls.length > 1) {
      this.formControls.splice(index, 1);
    }
  }

  generateJson() {
    const config = this.formGeneratorService.generateConfig(this.formControls);
    this.formGeneratorService.downloadJson(config);
  }
}