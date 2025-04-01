import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('SearchComponent', () => {
  let component: SearchComponent
  let fixture: ComponentFixture<SearchComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [ReactiveFormsModule]
    }).compileComponents()

    fixture = TestBed.createComponent(SearchComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('deve emitir o valor ao chamar searchAction', () => {
    spyOn(component.search, 'emit')
    component.inputSearch.setValue('Rick')
    component.searchAction()
    expect(component.search.emit).toHaveBeenCalledWith('Rick')
  })

  it('deve limpar o campo e emitir valor vazio ao chamar clearAction', () => {
    spyOn(component.search, 'emit')
    component.inputSearch.setValue('Morty')
    component.clearAction()
    expect(component.inputSearch.value).toBe('')
    expect(component.search.emit).toHaveBeenCalledWith('')
  })

  it('deve emitir valor ao pressionar Enter no input', () => {
    spyOn(component, 'searchAction')
    const input = fixture.debugElement.query(By.css('input')).nativeElement
    input.value = 'Summer'
    input.dispatchEvent(new Event('input'))
    input.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }))
    fixture.detectChanges()
    expect(component.searchAction).toHaveBeenCalled()
  })
})
