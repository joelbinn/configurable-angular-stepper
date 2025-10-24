# Signal-baserad State Management för Tvånivås-Stepper

## Översikt

Detta dokument beskriver hur signal-baserad state management implementerats för att hantera tvåvägs-dataflöde mellan parent-komponenten (`app.ts`) och dynamiskt laddade stepper-komponenter.

## Arkitektur

### 1. State Management Service

**Fil:** `src/app/features/stepper/services/stepper-state.service.ts`

Denna service använder Angular Signals för reaktiv state management:

```typescript
@Injectable({ providedIn: 'root' })
export class StepperStateService {
  private readonly state = signal<Partial<IStepperDataModel>>({});
  readonly data = this.state.asReadonly();

  // Computed signals för varje steg
  readonly personalInfo = computed(() => this.state()['personal-info']);
  readonly addressInfo = computed(() => this.state()['address-info']);
  readonly paymentInfo = computed(() => this.state()['payment-info']);

  // Metoder för att uppdatera state
  initializeData(initialData: Partial<IStepperDataModel>): void
  updateStepData<K>(stepId: K, data: Partial<IStepperDataModel[K]>): void
  setStepData<K>(stepId: K, data: IStepperDataModel[K]): void
  getStepData<K>(stepId: K): IStepperDataModel[K] | undefined
  reset(): void
}
```

### 2. Datamodell

**Fil:** `src/app/features/stepper/services/stepper-state.service.ts`

```typescript
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
```

## Implementation

### Initiering av Data (app.ts)

```typescript
export class App implements OnInit {
  constructor(
    private componentRegistry: ComponentRegistryService,
    private stepperState: StepperStateService
  ) {
    // Effect för att logga state-ändringar
    effect(() => {
      const currentState = this.stepperState.data();
      console.log('📊 Stepper State Updated:', currentState);
    });
  }

  ngOnInit(): void {
    // Initiera med befintlig data
    this.initializeWithExistingData();
  }

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
    };

    this.stepperState.initializeData(existingData);
  }

  // Hämta all data
  saveStepperData(): void {
    const allData = this.stepperState.data();
    console.log('💾 Saving stepper data:', allData);
    // Skicka till API eller localStorage
  }

  // Återställ all data
  resetStepperData(): void {
    this.stepperState.reset();
  }
}
```

### Form-komponenter

Varje form-komponent (personal-info, address-info, payment-info) följer samma mönster:

```typescript
export class PersonalInfoComponent {
  private fb = inject(FormBuilder);
  private stateService = inject(StepperStateService);

  form = this.fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor() {
    // 1. Ladda befintlig data från state när komponenten skapas
    effect(() => {
      const existingData = this.stateService.personalInfo();
      if (existingData) {
        this.form.patchValue(existingData, { emitEvent: false });
      }
    });

    // 2. Spara ändringar till state när formuläret ändras
    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      this.stateService.setStepData('personal-info', {
        firstName: value.firstName || '',
        lastName: value.lastName || '',
        email: value.email || '',
      });
    });
  }
}
```

### Review-komponent

Review-komponenten visar data från state:

```typescript
export class ReviewComponent {
  readonly stateService = inject(StepperStateService);

  // Template kan direkt använda computed signals:
  // {{ stateService.personalInfo()?.firstName }}
}
```

## Dataflöde

```
┌─────────────────┐
│    app.ts       │
│  (Parent)       │
└────────┬────────┘
         │
         │ initializeData()
         ▼
┌─────────────────────────┐
│  StepperStateService    │◄────┐
│   (Signal-based)        │     │
└────────┬────────────────┘     │
         │                      │
         │ computed signals     │ setStepData()
         ▼                      │
┌─────────────────────────┐    │
│  Form Komponenter       │────┘
│  (Dynamiskt laddade)    │
└─────────────────────────┘
```

### Flödet steg för steg:

1. **Initiering (app.ts → State Service)**
   ```typescript
   stepperState.initializeData(existingData)
   ```

2. **Ladda data (State Service → Form Komponent)**
   ```typescript
   effect(() => {
     const data = stateService.personalInfo();
     form.patchValue(data, { emitEvent: false });
   });
   ```

3. **Uppdatera data (Form Komponent → State Service)**
   ```typescript
   form.valueChanges.subscribe(value => {
     stateService.setStepData('personal-info', value);
   });
   ```

4. **Läsa data (app.ts ← State Service)**
   ```typescript
   const allData = stepperState.data();
   ```

## Fördelar med denna approach

### ✅ Signal-baserad Reaktivitet
- Automatisk change detection
- Effektiv rendering med OnPush
- Inbyggd immutability

### ✅ Typning
- Full TypeScript-stöd
- Compile-time säkerhet
- Intellisense i IDE

### ✅ Enkelhet
- Ingen boilerplate
- Självdokumenterande API
- Enkel testning

### ✅ Separation of Concerns
- Business logic i service
- UI i komponenter
- Clear data ownership

### ✅ Skalbarhet
- Enkelt att lägga till nya steg
- Kan enkelt utökas med localStorage persistence
- Kan enkelt integrera med API

## Användningsexempel

### Spara till localStorage

```typescript
saveStepperData(): void {
  const allData = this.stepperState.data();
  localStorage.setItem('stepperData', JSON.stringify(allData));
}

loadFromLocalStorage(): void {
  const saved = localStorage.getItem('stepperData');
  if (saved) {
    const data = JSON.parse(saved);
    this.stepperState.initializeData(data);
  }
}
```

### Spara till API

```typescript
saveStepperData(): void {
  const allData = this.stepperState.data();
  this.http.post('/api/stepper-data', allData).subscribe({
    next: () => console.log('✅ Data saved'),
    error: (err) => console.error('❌ Save failed', err)
  });
}

loadFromAPI(): void {
  this.http.get<Partial<IStepperDataModel>>('/api/stepper-data').subscribe({
    next: (data) => this.stepperState.initializeData(data),
    error: (err) => console.error('❌ Load failed', err)
  });
}
```

### Validera hela stepper innan submit

```typescript
isStepperValid(): boolean {
  const data = this.stepperState.data();
  return !!(
    data['personal-info']?.firstName &&
    data['personal-info']?.email &&
    data['address-info']?.street &&
    data['payment-info']?.cardNumber
  );
}

submitStepper(): void {
  if (!this.isStepperValid()) {
    alert('Vänligen fyll i alla obligatoriska fält');
    return;
  }

  const allData = this.stepperState.data();
  // Submit to API
}
```

## Debugging

State service har inbyggd logging som kan aktiveras:

```typescript
constructor(private stepperState: StepperStateService) {
  stepperState.enableLogging();
}
```

Detta loggar alla state-ändringar i konsolen för enkel debugging.

## Testing

### Service Test

```typescript
describe('StepperStateService', () => {
  let service: StepperStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepperStateService);
  });

  it('should initialize with data', () => {
    const testData = { 'personal-info': { firstName: 'Test', lastName: 'User', email: 'test@test.com' } };
    service.initializeData(testData);

    expect(service.personalInfo()).toEqual(testData['personal-info']);
  });

  it('should update step data', () => {
    service.setStepData('personal-info', {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com'
    });

    expect(service.personalInfo()?.firstName).toBe('John');
  });
});
```

### Component Test

```typescript
describe('PersonalInfoComponent', () => {
  let component: PersonalInfoComponent;
  let stateService: StepperStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PersonalInfoComponent],
      providers: [StepperStateService]
    });

    component = TestBed.createComponent(PersonalInfoComponent).componentInstance;
    stateService = TestBed.inject(StepperStateService);
  });

  it('should load existing data', () => {
    stateService.setStepData('personal-info', {
      firstName: 'Anna',
      lastName: 'Andersson',
      email: 'anna@example.com'
    });

    TestBed.flushEffects();

    expect(component.form.value.firstName).toBe('Anna');
  });

  it('should save changes to state', () => {
    component.form.patchValue({ firstName: 'New Name' });

    expect(stateService.personalInfo()?.firstName).toBe('New Name');
  });
});
```

## Slutsats

Denna signal-baserade approach ger en modern, typesafe och effektiv lösning för state management i Angular 20-applikationer. Den kombinerar enkelhet med kraft och skapar ett tydligt dataflöde mellan parent och dynamiskt laddade komponenter.
