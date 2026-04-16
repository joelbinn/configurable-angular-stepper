import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
  viewChildren,
  ViewContainerRef,
} from '@angular/core'
import { MatStepperModule } from '@angular/material/stepper'
import { MatButtonModule } from '@angular/material/button'
import { ISubStep } from '../../models/step-config.model'
import { ComponentRegistryService } from '../../services/component-registry.service'

/**
 * Vertikal sub-stepper som visar substeg för ett huvudsteg.
 * Laddar dynamiskt komponenter baserat på componentId från konfigurationen.
 */
@Component({
  selector: 'app-vertical-sub-stepper',
  imports: [MatStepperModule, MatButtonModule],
  template: `
    <mat-stepper orientation="vertical" [linear]="linear()">
      @for (subStep of subSteps(); track subStep.componentId; let idx = $index) {
        <mat-step [label]="subStep.title">
          <div #container></div>
          <div style="margin-top: 16px;">
            <button mat-button matStepperPrevious>Tillbaka</button>
            <button mat-button matStepperNext>Nästa</button>
          </div>
        </mat-step>
      }
    </mat-stepper>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalSubStepperComponent implements AfterViewInit {
  private componentRegistry = inject(ComponentRegistryService)

  /** Lista av substeg att visa */
  subSteps = input.required<ISubStep[]>();

  /** Om steppern ska vara linjär (måste gå steg för steg) */
  linear = input<boolean>(false);

  /** Referens till alla containers där komponenter laddas dynamiskt */
  containers = viewChildren<unknown, ViewContainerRef>('container', { read: ViewContainerRef });

  private componentsLoaded = signal(false);

  ngAfterViewInit(): void {
    // Ladda alla komponenter efter att vyn har initierats
    if (!this.componentsLoaded()) {
      this.loadAllComponents();
      this.componentsLoaded.set(true);
    }
  }

  /**
   * Laddar alla dynamiska komponenter i sina respektive containers
   */
  private loadAllComponents(): void {
    const containerRefs = this.containers();
    const steps = this.subSteps();

    containerRefs.forEach((containerRef, index) => {
      if (index < steps.length) {
        const subStep = steps[index];
        this.loadComponent(subStep.componentId, containerRef);
      }
    });
  }

  /**
   * Laddar en dynamisk komponent i containern
   */
  private loadComponent(componentId: string, containerRef: ViewContainerRef): void {
    const component = this.componentRegistry.getComponent(componentId);

    if (component) {
      containerRef.clear();
      containerRef.createComponent(component);
      console.log("Component",componentId,"created");
    } else {
      console.warn(`Component with id "${componentId}" not found in registry`);
    }
  }
}
