import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { StepperStateService } from '../services/stepper-state.service';
import { JsonPipe } from '@angular/common';

/**
 * Exempel-komponent för granskning och sammanfattning
 */
@Component({
  selector: 'app-review',
  imports: [MatCardModule, JsonPipe],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Granska din beställning</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <h4>Personlig Information</h4>
        @if (stateService.personalInfo(); as data) {
          <ul>
            <li><strong>Namn:</strong> {{ data.firstName }} {{ data.lastName }}</li>
            <li><strong>E-post:</strong> {{ data.email }}</li>
          </ul>
        } @else {
          <p style="color: #999;">Ingen data tillgänglig</p>
        }

        <h4 style="margin-top: 16px;">Adressinformation</h4>
        @if (stateService.addressInfo(); as data) {
          <ul>
            <li><strong>Gatuadress:</strong> {{ data.street }}</li>
            <li><strong>Postnummer:</strong> {{ data.postalCode }}</li>
            <li><strong>Stad:</strong> {{ data.city }}</li>
          </ul>
        } @else {
          <p style="color: #999;">Ingen data tillgänglig</p>
        }

        <h4 style="margin-top: 16px;">Betalningsinformation</h4>
        @if (stateService.paymentInfo(); as data) {
          <ul>
            <li><strong>Kortnummer:</strong> **** **** **** {{ data.cardNumber.slice(-4) }}</li>
            <li><strong>Utgångsdatum:</strong> {{ data.expiryDate }}</li>
          </ul>
        } @else {
          <p style="color: #999;">Ingen data tillgänglig</p>
        }

        <p style="margin-top: 24px; font-weight: 500;">
          Kontrollera att allt är korrekt innan du fortsätter.
        </p>

        <details style="margin-top: 24px;">
          <summary style="cursor: pointer; font-weight: 500;">Visa rådata (för debugging)</summary>
          <pre style="background: #f5f5f5; padding: 12px; border-radius: 4px; margin-top: 8px;">{{
            stateService.data() | json
          }}</pre>
        </details>
      </mat-card-content>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewComponent {
  readonly stateService = inject(StepperStateService);
}
