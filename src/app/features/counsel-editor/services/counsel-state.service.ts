import { Injectable, signal } from '@angular/core'
import { Counsel, CounselType } from '../model/counsel.model'

@Injectable({
  providedIn: 'root'
})
export class CounselStateService {
  private readonly state = signal<Partial<Counsel>>({});
  readonly data = this.state.asReadonly();

  create(counselType: CounselType) {
    const counsel: Counsel = {
      id: 'ae23-fd12',
      counselDetails: {
        values: {
          APPLICATION_DETAILS: {
            id: 'APPLICATION_DETAILS',
            type: 'ApplicationDetails',
            applData: 'appdata'
          },
          PLACEMENT_DETAILS: {
            id: 'PLACEMENT_DETAILS',
            type: 'PlacementDetails',
            placementData: 'placdata'
          },
        },
        layout: {
          steps: [
            {
              title: 'Step Uno',
              counselDetailId: 'APPLICATION_DETAILS'
            },
            {
              title: 'Step due',
              counselDetailId: 'PLACEMENT_DETAILS'
            },
          ]
        }
      }
    }
    this.state.set(counsel);
  }

  patch(partialState: Partial<Counsel>) {
    this.state.update(current => ({...current, ...partialState}));
  }
}
