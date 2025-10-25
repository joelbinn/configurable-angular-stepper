import { Routes } from '@angular/router';
import { StepperPage } from './features/stepper/stepper-page.component'
import { CounselEditorPage } from './features/counsel-editor/counsel-editor-page.component'

export const routes: Routes = [
  {
    title: "Stepper",
    component: StepperPage,
    path: "stepper"
  },
  {
    title: "Counsel editor",
    component: CounselEditorPage,
    path: "counsel-editor"
  }
];
