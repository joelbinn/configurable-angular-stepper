import { Component, computed, inject } from '@angular/core'
import { CounselDetailEditor } from './counsel-detail-editor'
import { ApplicationDetails, PlacementDetails } from '../model/counsel.model'
import { CounselStateService } from '../services/counsel-state.service'
import { JsonPipe } from '@angular/common'

@Component({
  selector: 'app-placements-details-editor',
  imports: [
    JsonPipe
  ],
  template: `
    <h1>Placement details</h1>
    <h2>{{counselDetailId()}}</h2>
    <pre>
      {{ placementsDetails() | json }}
    </pre>
  `,
  styles: ``,
})
export class PlacementsDetailsEditor extends CounselDetailEditor{
  protected placementsDetails = computed<PlacementDetails | null>(() => {
    console.log("Get state from", this.counselState.data())
    const counselDetailId = this.counselDetailId()
    if (counselDetailId != null) {
      const value = this.counselState.data().counselDetails?.values[counselDetailId] as PlacementDetails
      console.log("State",value)
      return value
    } else {
      return null
    }
  })
  private readonly counselState = inject(CounselStateService)

}
