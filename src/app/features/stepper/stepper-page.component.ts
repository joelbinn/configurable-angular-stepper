import { Component, effect, OnInit, signal } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { IStepConfig } from './models/step-config.model'
import { ComponentRegistryService } from './services/component-registry.service'
import { IStepperDataModel, StepperStateService } from './services/stepper-state.service'
import { PersonalInfoComponent } from './example-components/personal-info.component'
import { AddressInfoComponent } from './example-components/address-info.component'
import { PaymentInfoComponent } from './example-components/payment-info.component'
import { ReviewComponent } from './example-components/review.component'
import { MainStepperComponent } from './components/horizontal-main-stepper/main-stepper.component'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MainStepperComponent],
  template: `
    <div style="padding: 24px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1>Angular Material Tvånivås-Stepper</h1>
          <p>
            Detta är ett exempel på en tvånivås stepper med horisontella huvudsteg och vertikala
            substeg med signal-baserad state management.
          </p>
        </div>
        <div style="display: flex; gap: 8px;">
          <button
            mat-raised-button
            color="primary"
            (click)="saveStepperData()"
            style="height: fit-content;"
          >
            💾 Spara Data
          </button>
          <button
            mat-raised-button
            color="warn"
            (click)="resetStepperData()"
            style="height: fit-content;"
          >
            🔄 Återställ
          </button>
        </div>
      </div>

      <app-main-stepper [config]="stepperConfig()" [linear]="false" />
    </div>

    <router-outlet />
  `,
  styles: ``,
})
export class StepperPage implements OnInit {
  protected readonly title = signal('angular20-material-playground');

  protected readonly stepperConfig = signal<IStepConfig>({
    steps: [
      {
        title: 'Användarinformation',
        subSteps: [
          {
            title: 'Personuppgifter',
            componentId: 'personal-info',
          },
          {
            title: 'Adress',
            componentId: 'address-info',
          },
        ],
      },
      {
        title: 'Betalning',
        subSteps: [
          {
            title: 'Betalningsinformation',
            componentId: 'payment-info',
          },
          {
            title: 'Granska',
            componentId: 'review',
          },
        ],
      },
    ],
  });

  constructor(
    private componentRegistry: ComponentRegistryService,
    private stepperState: StepperStateService
  ) {
    // Effect för att logga state-ändringar i konsolen
    effect(() => {
      const currentState = this.stepperState.data();
      console.log('📊 Stepper State Updated:', currentState);
    });
  }

  ngOnInit(): void {
    // Registrera alla komponenter med sina ID:n
    this.componentRegistry.registerBulk({
      'personal-info': PersonalInfoComponent,
      'address-info': AddressInfoComponent,
      'payment-info': PaymentInfoComponent,
      review: ReviewComponent,
    });

    // EXEMPEL: Initiera med befintlig data (t.ex. från API, localStorage, etc.)
    // Kommentera bort detta för att starta med tom data
    this.initializeWithExistingData();
  }

  /**
   * Exempel på hur du kan initiera stepper med befintlig data
   */
  private initializeWithExistingData(): void {
    const existingData: Partial<IStepperDataModel> = {
      'personal-info': {
        firstName: 'Anna',
        lastName: 'Andersson',
        email: 'anna.andersson@example.com',
      },
      'address-info': {
        street: 'Storgatan 1',
        postalCode: '123 45',
        city: 'Stockholm',
      },
      // Payment info lämnas tom för att demonstrera partiell initiering
    };

    this.stepperState.initializeData(existingData);
    console.log('✅ Stepper initialized with existing data');
  }

  /**
   * Exempel på hur du kan hämta all stepper-data
   * (t.ex. för att spara till API eller localStorage)
   */
  saveStepperData(): void {
    const allData = this.stepperState.data();
    console.log('💾 Saving stepper data:', allData);

    // Här kan du skicka data till API, localStorage, etc.
    // this.http.post('/api/save', allData).subscribe(...);
    // localStorage.setItem('stepperData', JSON.stringify(allData));
  }

  /**
   * Exempel på hur du kan återställa all data
   */
  resetStepperData(): void {
    this.stepperState.reset();
    console.log('🔄 Stepper data reset');
  }
}
