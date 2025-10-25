import { Injectable, signal } from '@angular/core'
import { Counsel } from '../model/counsel.model'

@Injectable({
  providedIn: 'root'
})
export class CounselStateService {
  private readonly state = signal<Partial<Counsel>>({});
  readonly data = this.state.asReadonly();

  patch(partialState: Partial<Counsel>) {
    this.state.update(current => ({...current, ...partialState}));
  }
}
