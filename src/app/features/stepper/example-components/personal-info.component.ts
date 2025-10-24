import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

/**
 * Exempel-komponent för personlig information
 */
@Component({
  selector: 'app-personal-info',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  template: `
    <form [formGroup]="form">
      <h3>Personlig Information</h3>
      <mat-form-field appearance="outline" style="width: 100%; margin-bottom: 16px;">
        <mat-label>Förnamn</mat-label>
        <input matInput formControlName="firstName" placeholder="Ange ditt förnamn" />
        @if (form.controls['firstName'].hasError('required')) {
          <mat-error>Förnamn är obligatoriskt</mat-error>
        }
      </mat-form-field>

      <mat-form-field appearance="outline" style="width: 100%; margin-bottom: 16px;">
        <mat-label>Efternamn</mat-label>
        <input matInput formControlName="lastName" placeholder="Ange ditt efternamn" />
        @if (form.controls['lastName'].hasError('required')) {
          <mat-error>Efternamn är obligatoriskt</mat-error>
        }
      </mat-form-field>

      <mat-form-field appearance="outline" style="width: 100%;">
        <mat-label>E-post</mat-label>
        <input matInput formControlName="email" type="email" placeholder="din@email.com" />
        @if (form.controls['email'].hasError('required')) {
          <mat-error>E-post är obligatorisk</mat-error>
        }
        @if (form.controls['email'].hasError('email')) {
          <mat-error>Ange en giltig e-postadress</mat-error>
        }
      </mat-form-field>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalInfoComponent {
  private fb = inject(FormBuilder);

  form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });
}