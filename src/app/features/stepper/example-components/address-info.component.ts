import { Component, ChangeDetectionStrategy, inject, effect } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StepperStateService } from '../services/stepper-state.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/**
 * Exempel-komponent för adressinformation
 */
@Component({
  selector: 'app-address-info',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  template: `
    <form [formGroup]="form">
      <h3>Adressinformation</h3>
      <mat-form-field appearance="outline" style="width: 100%; margin-bottom: 16px;">
        <mat-label>Gatuadress</mat-label>
        <input matInput formControlName="street" placeholder="Gatugatan 1" />
        @if (form.controls['street'].hasError('required')) {
          <mat-error>Gatuadress är obligatorisk</mat-error>
        }
      </mat-form-field>

      <mat-form-field appearance="outline" style="width: 100%; margin-bottom: 16px;">
        <mat-label>Postnummer</mat-label>
        <input matInput formControlName="postalCode" placeholder="123 45" />
        @if (form.controls['postalCode'].hasError('required')) {
          <mat-error>Postnummer är obligatoriskt</mat-error>
        }
      </mat-form-field>

      <mat-form-field appearance="outline" style="width: 100%;">
        <mat-label>Stad</mat-label>
        <input matInput formControlName="city" placeholder="Stockholm" />
        @if (form.controls['city'].hasError('required')) {
          <mat-error>Stad är obligatorisk</mat-error>
        }
      </mat-form-field>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddressInfoComponent {
  private fb = inject(FormBuilder);
  private stateService = inject(StepperStateService);

  form = this.fb.nonNullable.group({
    street: ['', Validators.required],
    postalCode: ['', Validators.required],
    city: ['', Validators.required],
  });

  constructor() {
    // Ladda befintlig data från state när komponenten skapas
    effect(() => {
      const existingData = this.stateService.addressInfo();
      if (existingData) {
        this.form.patchValue(existingData, { emitEvent: false });
      }
    });

    // Spara ändringar till state när formuläret ändras
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      this.stateService.setStepData('address-info', {
        street: value.street || '',
        postalCode: value.postalCode || '',
        city: value.city || '',
      });
    });
  }
}