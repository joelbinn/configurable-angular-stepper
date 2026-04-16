## Context

The stepper consists of three component layers:

- **MainStepperComponent**: Horizontal stepper with main steps (Personal Info, Address, Payment)
- **VerticalSubStepperComponent**: Vertical stepper containing leaf components
- **Leaf components**: PersonalInfoComponent, AddressInfoComponent, PaymentInfoComponent, ReviewComponent

Each leaf component uses ReactiveForms with validation. Currently, validation state is only visible when the step is expanded.

## Goals / Non-Goals

**Goals:**

- Show visual indicator in stepper header when a step has validation errors
- Indicator should be visible even when step is collapsed
- Purely visual - does not affect linear navigation or completed state

**Non-Goals:**

- Showing specific error messages in stepper header
- Blocking navigation based on validation
- Modifying Angular Material stepper's native [completed] or [editable] bindings

## Decisions

### 1. Leaf component validity output

**Decision**: Use Angular 21 `output()` signal-based output from each leaf component.

```typescript
// Example: PersonalInfoComponent
readonly
isValid = output<boolean>();

// In constructor, emit on form status changes
this.form.statusChanges.pipe(takeUntilDestroyed()).subscribe(status => {
  this.isValid.emit(status === 'VALID');
});
```

**Rationale**: Angular 21 signal-based outputs are the modern approach. Each leaf component already has a FormGroup, so we can derive validity directly.

### 2. Aggregating validity in VerticalSubStepper

**Decision**: Use Angular 21 `viewChildren` with `{ read: ... }` to query child components and aggregate validity.

```typescript
// In VerticalSubStepperComponent
children = viewChildren(ValidateInterface);

isValid = computed(() => {
  const childArray = this.children();
  if (childArray.length === 0) return true;
  return childArray.every(child => child.isValid());
});
```

**Alternative considered**: Use content projection with template variables - rejected because it adds complexity to the template.

### 3. Visual indicator approach

**Decision**: Add CSS class to mat-step based on validation state using `[class.step-invalid]`.

```html

<mat-step [label]="step.title" [class.step-invalid]="!stepIsValid()">
```

**Alternative considered**: Custom step header template - rejected as unnecessarily complex for just indicating valid/invalid.

### 4. ValidationInterface

**Decision**: Create a shared interface that leaf components implement.

```typescript
export interface HasValidationState {
  isValid: () => boolean;
}
```

**Rationale**: Provides type safety when querying children and makes the contract explicit.

## Risks / Trade-offs

- **[Risk]**: Dynamic component loading timing - children might not be available immediately
  - **Mitigation**: Use `afterNextRender` or check validity in computed with fallback to `true` for empty state

- **[Risk]**: Multiple sub-steps within one main step - how to aggregate?
  - **Mitigation**: All children must be valid for the main step to be valid (AND aggregation)

- **[Trade-off]**: Only showing valid/invalid, not specific errors
  - **Acceptable**: User can expand step to see specific errors; header just needs high-level status

## Migration Plan

1. Create `HasValidationState` interface
2. Update leaf components to implement interface and emit validity
3. Update VerticalSubStepper to aggregate and re-emit validity
4. Update MainStepper to apply CSS class based on validity
5. Add CSS for `.step-invalid` styling
6. Verify with existing tests

## Open Questions

- Should the indicator also show when a step is partially filled but not yet validated? → **No, only validated state (valid/invalid)**
