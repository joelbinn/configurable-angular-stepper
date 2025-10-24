Jag vill skapa en stepper med hjälp av en 
Angular Material Stepper (https://material.angular.dev/components/stepper/overview) 

Jag vill kunn stega i två nivåer:
- Högsta nivån med steg horisontellt
- Undernivå med steg vertikalt

Jag vill dock kunna konfigurera steg med data i följande format:
```typescript
interface StepConfig {
  steps: Step[]
}

interface Step {
  title: string
  subSteps: SubStep[]
}

interface SubStep {
  title: string
  // The component-ID is used specify the component to be displayed in the step
  componentId: string
}
```
