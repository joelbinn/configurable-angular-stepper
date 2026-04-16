import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { IStepConfig } from '../../models/step-config.model';
import { VerticalSubStepperComponent } from '../vertical-sub-stepper/vertical-sub-stepper.component';

/**
 * Horisontell huvudstepper som visar högsta nivån av steg.
 * Varje steg innehåller en vertikal sub-stepper med substeg.
 */
@Component({
  selector: 'app-main-stepper',
  imports: [MatStepperModule, MatButtonModule, VerticalSubStepperComponent],
  template: `
    <mat-stepper orientation="vertical" [linear]="linear()">
      @for (step of config().steps; track $index) {
        <mat-step [label]="step.title">
          <app-vertical-sub-stepper [subSteps]="step.subSteps" [linear]="linear()" />

          <div style="margin-top: 24px;">
            <button mat-button matStepperPrevious>Föregående huvudsteg</button>
            <button mat-button matStepperNext>Nästa huvudsteg</button>
          </div>
        </mat-step>
      }
    </mat-stepper>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
      padding: 24px;
    }

    mat-stepper {
      background: transparent;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainStepperComponent {
  /** Konfiguration för stepper-hierarkin */
  config = input.required<IStepConfig>();

  /** Om steppern ska vara linjär (måste gå steg för steg) */
  linear = input<boolean>(false);
}
