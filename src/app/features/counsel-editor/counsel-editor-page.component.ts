import {
  AfterViewInit,
  Component,
  computed,
  effect,
  inject,
  signal,
  viewChildren,
  ViewContainerRef
} from '@angular/core'
import { CounselDetailId, Layout } from './model/counsel.model'
import { ComponentRegistryService } from './services/component-registry.service'
import { PersonalInfoComponent } from '../stepper/example-components/personal-info.component'
import { AddressInfoComponent } from '../stepper/example-components/address-info.component'
import { PaymentInfoComponent } from '../stepper/example-components/payment-info.component'
import { ReviewComponent } from '../stepper/example-components/review.component'
import { ApplicationsDetailsEditor } from './counsel-detail-editors/applications-details-editor'
import { PlacementsDetailsEditor } from './counsel-detail-editors/placements-details-editor'
import { CounselStateService } from './services/counsel-state.service'

@Component({
  selector: 'app-counsel-page',
  imports: [],
  template: `
    @for (step of layout().steps; track step.counselDetailId) {
      <div #container [attr.data-counsel-detail-id]="step.counselDetailId"></div>
    }
  `,
  styles: ``,
})
export class CounselEditorPage {
  protected readonly layout = computed<Layout>(() => this.counsel().counselDetails?.layout ?? {steps: []})
  private readonly componentRegistry = inject(ComponentRegistryService)
  private readonly counselState = inject(CounselStateService)

  /** Referens till alla containers där komponenter laddas dynamiskt */
  protected containers = viewChildren<unknown, ViewContainerRef>('container', {read: ViewContainerRef})
  private componentsLoaded = signal(false)
  private counsel = computed(() => this.counselState.data());


  constructor() {
    this.componentRegistry.registerBulk({
      APPLICATION_DETAILS: ApplicationsDetailsEditor,
      PLACEMENT_DETAILS: PlacementsDetailsEditor
    });

    effect(async () => {
      this.counselState.create("CT1");
    })

    effect(() => {
      console.log("containers changed",this.componentsLoaded(), this.containers());
      if (!this.componentsLoaded()) {
        this.loadAllComponents()
      }
    })
  }


  /**
   * Laddar alla dynamiska komponenter i sina respektive containers
   */
  private loadAllComponents(): void {
    console.log("Try to load component tree")
    const containerRefs = this.containers()
    console.log("containers",containerRefs)
    if (!containerRefs?.length) {
      return;
    }

    containerRefs.forEach((containerRef, index) => {
      const counselDetailId: CounselDetailId = containerRef.element.nativeElement.attributes['data-counsel-detail-id'].nodeValue
      const componentRef = this.componentRegistry.loadComponent(counselDetailId, containerRef)
      componentRef.instance.counselDetailId.set(counselDetailId);
    })
    this.componentsLoaded.set(true)

  }


}
