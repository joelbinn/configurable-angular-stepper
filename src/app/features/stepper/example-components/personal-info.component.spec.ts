import { PersonalInfoComponent } from './personal-info.component'
import { render, screen } from '@testing-library/angular/zoneless'

describe('PersonalInfoComponent', () => {
  it('renders counter', async () => {
    await render(PersonalInfoComponent, {
      bindings: [],
    })

    expect(screen.getByText('Förnamn')).toBeTruthy()
  })
})
