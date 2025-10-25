import { signal } from '@angular/core'
import { CounselDetailId } from '../model/counsel.model'

export class CounselDetailEditor {
  readonly counselDetailId = signal<CounselDetailId | null>(null)
}
