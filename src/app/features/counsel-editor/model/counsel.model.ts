import { Optional } from '@angular/core'

export type CounselDetailId = 'PLACEMENT_DETAILS' | 'APPLICATION_DETAILS'

export interface CounselDetail {
  id: CounselDetailId
}

export interface PlacementDetails extends CounselDetail {
  type: 'PlacementDetails'
  placementData: string
}

export interface ApplicationDetails extends CounselDetail {
  type: 'ApplicationDetails'
  applData: string
}

export type CounselDetailUnion = ApplicationDetails | PlacementDetails

export interface Counsel {
  id: string
  counselDetails: {
    values: Partial<Record<CounselDetailId, CounselDetailUnion>>
    layout: {
      steps: {
        title: string
        subSteps: {
          title: string
          counselDetailId: CounselDetailId
        }[]
      }[]
    }
  }
}
