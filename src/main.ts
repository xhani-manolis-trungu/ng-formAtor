import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormGeneratorComponent } from './app/form-generator/components/form-generator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormGeneratorComponent],
  template: `
    <div class="app-container">
      <h1>Form Configuration Generator</h1>
      <app-form-generator></app-form-generator>
    </div>
  `,
  styles: [`
    .app-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 30px;
    }
  `]
})
export class App {
}

bootstrapApplication(App);