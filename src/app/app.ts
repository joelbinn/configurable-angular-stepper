import { Component, signal, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HorizontalMainStepperComponent } from './features/stepper/components/horizontal-main-stepper/horizontal-main-stepper.component';
import { IStepConfig } from './features/stepper/models/step-config.model';
import { ComponentRegistryService } from './features/stepper/services/component-registry.service';
import { PersonalInfoComponent } from './features/stepper/example-components/personal-info.component';
import { AddressInfoComponent } from './features/stepper/example-components/address-info.component';
import { PaymentInfoComponent } from './features/stepper/example-components/payment-info.component';
import { ReviewComponent } from './features/stepper/example-components/review.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HorizontalMainStepperComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
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

  constructor(private componentRegistry: ComponentRegistryService) {}

  ngOnInit(): void {
    // Registrera alla komponenter med sina ID:n
    this.componentRegistry.registerBulk({
      'personal-info': PersonalInfoComponent,
      'address-info': AddressInfoComponent,
      'payment-info': PaymentInfoComponent,
      review: ReviewComponent,
    });
  }
}
