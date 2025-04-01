import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharactersComponent } from './characters.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CharactersComponent', () => {
  let component: CharactersComponent
  let fixture: ComponentFixture<CharactersComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharactersComponent],
      imports: [HttpClientTestingModule, StoreModule.forRoot({})],
    }).compileComponents()

    fixture = TestBed.createComponent(CharactersComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('deve criar o componente', () => {
    expect(component).toBeTruthy()
  })

  it('deve atualizar o nome e resetar a página ao buscar', () => {
    const spy = spyOn(component as any, 'loadDependencies')
    component.searcCharacters('Rick')
    expect(component.name).toBe('Rick')
    expect(component.currentPage).toBe(1)
    expect(spy).toHaveBeenCalled()
  })

  it('deve atualizar a página e chamar loadDependencies ao paginar', () => {
    const spy = spyOn(component as any, 'loadDependencies')
    component.pageChange(4)
    expect(component.currentPage).toBe(4)
    expect(spy).toHaveBeenCalled()
  })
})
