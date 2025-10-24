import { Injectable, signal, computed, effect } from '@angular/core';

/**
 * Datamodell för all stepper-data
 */
export interface IStepperDataModel {
  'personal-info': {
    firstName: string;
    lastName: string;
    email: string;
  };
  'address-info': {
    street: string;
    postalCode: string;
    city: string;
  };
  'payment-info': {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  };
}

/**
 * Service för att hantera global state för stepper-data.
 * Använder signals för reaktiv datahantering.
 */
@Injectable({
  providedIn: 'root',
})
export class StepperStateService {
  /**
   * Privat writable signal som innehåller all stepper-data
   */
  private readonly state = signal<Partial<IStepperDataModel>>({});

  /**
   * Publik readonly version av state
   */
  readonly data = this.state.asReadonly();

  /**
   * Computed signals för varje steg
   */
  readonly personalInfo = computed(() => this.state()['personal-info']);
  readonly addressInfo = computed(() => this.state()['address-info']);
  readonly paymentInfo = computed(() => this.state()['payment-info']);

  /**
   * Initierar state med befintlig data
   */
  initializeData(initialData: Partial<IStepperDataModel>): void {
    this.state.set(initialData);
  }

  /**
   * Uppdaterar data för ett specifikt steg
   */
  updateStepData<K extends keyof IStepperDataModel>(
    stepId: K,
    data: Partial<IStepperDataModel[K]>
  ): void {
    this.state.update((current) => ({
      ...current,
      [stepId]: {
        ...(current[stepId] || {}),
        ...data,
      },
    }));
  }

  /**
   * Sätter all data för ett specifikt steg
   */
  setStepData<K extends keyof IStepperDataModel>(stepId: K, data: IStepperDataModel[K]): void {
    this.state.update((current) => ({
      ...current,
      [stepId]: data,
    }));
  }

  /**
   * Hämtar data för ett specifikt steg
   */
  getStepData<K extends keyof IStepperDataModel>(stepId: K): IStepperDataModel[K] | undefined {
    return this.state()[stepId];
  }

  /**
   * Återställer all data
   */
  reset(): void {
    this.state.set({});
  }

  /**
   * Återställer data för ett specifikt steg
   */
  resetStepData<K extends keyof IStepperDataModel>(stepId: K): void {
    this.state.update((current) => {
      const updated = { ...current };
      delete updated[stepId];
      return updated;
    });
  }

  /**
   * Kontrollerar om ett steg har data
   */
  hasStepData<K extends keyof IStepperDataModel>(stepId: K): boolean {
    return !!this.state()[stepId];
  }

  /**
   * Loggar state-ändringar (för debugging)
   */
  enableLogging(): void {
    effect(() => {
      console.log('Stepper State Changed:', this.state());
    });
  }
}
