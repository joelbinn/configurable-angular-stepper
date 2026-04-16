## Why

Currently, the stepper doesn't show validation errors when a step is collapsed. Users must expand each step to see if there are validation errors, which creates a poor UX. We need to indicate validation status directly in the stepper header.

## What Changes

- Add `isValid` output to leaf components (PersonalInfoComponent, AddressInfoComponent, PaymentInfoComponent, ReviewComponent)
- Add `isValid` output to VerticalSubStepperComponent that aggregates validity from all child components
- Add visual indicator in MainStepperComponent showing valid/invalid state for each main step
- CSS styling to differentiate valid steps from invalid steps

## Capabilities

### New Capabilities

- `stepper-validation-indicator`: Show validation status (valid/invalid) in stepper headers when steps are collapsed

### Modified Capabilities

- None

## Impact

- Modify leaf components in `example-components/` to export `isValid` output
- Modify `VerticalSubStepperComponent` to aggregate validity from children
- Modify `MainStepperComponent` to display validation indicators
- Add CSS for invalid step indication