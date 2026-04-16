## 1. Create shared interface

- [ ] 1.1 Create `HasValidationState` interface in models folder

## 2. Update leaf components

- [ ] 2.1 Update PersonalInfoComponent to implement HasValidationState and emit isValid
- [ ] 2.2 Update AddressInfoComponent to implement HasValidationState and emit isValid
- [ ] 2.3 Update PaymentInfoComponent to implement HasValidationState and emit isValid
- [ ] 2.4 Update ReviewComponent to implement HasValidationState and emit isValid

## 3. Update VerticalSubStepperComponent

- [ ] 3.1 Import HasValidationState interface
- [ ] 3.2 Add viewChildren query to get child components
- [ ] 3.3 Create computed isValid that aggregates all children
- [ ] 3.4 Add isValid output to component

## 4. Update MainStepperComponent

- [ ] 4.1 Add CSS for step-invalid class
- [ ] 4.2 Add validity check for each main step
- [ ] 4.3 Apply step-invalid class when step is invalid

## 5. Testing

- [ ] 5.1 Run existing tests to ensure no regressions
- [ ] 5.2 Add tests for new isValid outputs if needed