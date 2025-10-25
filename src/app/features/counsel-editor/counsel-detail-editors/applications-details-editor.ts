import { Component, computed, inject, signal } from '@angular/core'
import { CounselStateService } from '../services/counsel-state.service'
import { ApplicationDetails, CounselDetailId } from '../model/counsel.model'
import { CommonModule } from '@angular/common'
import { CounselDetailEditor } from './counsel-detail-editor'

@Component({
  selector: 'app-applications-details-editor',
  imports: [CommonModule],
  template: `
    <h1>Application details</h1>
    <h2>{{counselDetailId()}}</h2>
    <pre>
      {{ applicationsDetails() | json }}
    </pre>
  `,
  styles: ``,
})
export class ApplicationsDetailsEditor extends CounselDetailEditor {
  protected applicationsDetails = computed<ApplicationDetails | null>(() => {
    console.log("Get state from", this.counselState.data())
    const counselDetailId = this.counselDetailId()
    if (counselDetailId != null) {
      const value = this.counselState.data().counselDetails?.values[counselDetailId] as ApplicationDetails
      console.log("State",value)
      return value
    } else {
      return null
    }
  })
  private readonly counselState = inject(CounselStateService)


}
