import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

/**
 * Exempel-komponent för granskning och sammanfattning
 */
@Component({
  selector: 'app-review',
  imports: [MatCardModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Granska din beställning</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>Här kan du granska all information innan du skickar in din beställning.</p>
        <ul>
          <li>Personlig information</li>
          <li>Adressinformation</li>
          <li>Betalningsinformation</li>
        </ul>
        <p style="margin-top: 16px; font-weight: 500;">
          Kontrollera att allt är korrekt innan du fortsätter.
        </p>
      </mat-card-content>
    </mat-card>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewComponent {}
