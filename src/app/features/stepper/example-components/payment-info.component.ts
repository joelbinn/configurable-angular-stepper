import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/**
 * Exempel-komponent för betalningsinformation
 */
@Component({
  selector: 'app-payment-info',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  template: `
    <form [formGroup]="form">
      <h3>Betalningsinformation</h3>
      <mat-form-field appearance="outline" style="width: 100%; margin-bottom: 16px;">
        <mat-label>Kortnummer</mat-label>
        <input matInput formControlName="cardNumber" placeholder="1234 5678 9012 3456" />
        @if (form.controls['cardNumber'].hasError('required')) {
          <mat-error>Kortnummer är obligatoriskt</mat-error>
        }
      </mat-form-field>

      <mat-form-field appearance="outline" style="width: 100%; margin-bottom: 16px;">
        <mat-label>Utgångsdatum</mat-label>
        <input matInput formControlName="expiryDate" placeholder="MM/ÅÅ" />
        @if (form.controls['expiryDate'].hasError('required')) {
          <mat-error>Utgångsdatum är obligatoriskt</mat-error>
        }
      </mat-form-field>

      <mat-form-field appearance="outline" style="width: 100%;">
        <mat-label>CVV</mat-label>
        <input matInput formControlName="cvv" type="password" placeholder="123" />
        @if (form.controls['cvv'].hasError('required')) {
          <mat-error>CVV är obligatoriskt</mat-error>
        }
      </mat-form-field>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentInfoComponent {
  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    cardNumber: ['', Validators.required],
    expiryDate: ['', Validators.required],
    cvv: ['', Validators.required],
  });
}