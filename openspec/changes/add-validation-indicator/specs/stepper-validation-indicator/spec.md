## ADDED Requirements

### Requirement: Validation indicator in stepper header

The stepper SHALL display a visual indicator in each step header showing whether the step is valid or has validation errors. This indicator MUST be visible even when the step is collapsed.

#### Scenario: Valid step shows positive indicator

- **WHEN** a step contains a form that is valid
- **THEN** the step header displays a visual indication of valid state

#### Scenario: Invalid step shows error indicator

- **WHEN** a step contains a form with validation errors
- **THEN** the step header displays a visual indication of invalid state

#### Scenario: Indicator visible when step is collapsed

- **WHEN** a step with validation errors is collapsed (not expanded)
- **THEN** the error indicator is still visible in the step header

#### Scenario: Indicator updates when form validation changes

- **WHEN** a user corrects validation errors in a form
- **THEN** the step header indicator updates to show valid state

### Requirement: Aggregation of validation state

A main step (containing multiple sub-steps) SHALL show as valid only when ALL sub-steps are valid.

#### Scenario: All sub-steps valid

- **WHEN** all sub-steps within a main step are valid
- **THEN** the main step header shows valid state

#### Scenario: One sub-step invalid

- **WHEN** at least one sub-step within a main step has validation errors
- **THEN** the main step header shows invalid state

### Requirement: Visual-only indication

The validation indicator SHALL NOT affect step navigation or the linear behavior of the stepper.

#### Scenario: Can navigate to invalid step

- **WHEN** a step has validation errors
- **THEN** the user can still navigate to and view that step

#### Scenario: Linear mode not affected

- **WHEN** stepper is in linear mode
- **THEN** validation indicator is purely visual and does not block or allow navigation
