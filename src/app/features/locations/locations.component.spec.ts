import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocationsComponent } from './locations.component';
import { StoreModule } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LocationsComponent', () => {
  let component: LocationsComponent
  let fixture: ComponentFixture<LocationsComponent>

  beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ LocationsComponent ],
        imports: [ HttpClientTestingModule, StoreModule.forRoot({}) ]
      })
      .compileComponents();

    fixture = TestBed.createComponent(LocationsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('deve criar o componente', () => {
    expect(component).toBeTruthy()
  })

  it('deve atualizar o nome e resetar a página ao buscar', () => {
    const spy = spyOn(component, 'loadDependencies')
    component.searcCharacters('Earth')
    expect(component.name).toBe('Earth')
    expect(component.currentPage).toBe(1)
    expect(spy).toHaveBeenCalled()
  })

  it('deve atualizar a página e chamar loadDependencies ao paginar', () => {
    const spy = spyOn(component, 'loadDependencies')
    component.pageChange(4)
    expect(component.currentPage).toBe(4)
    expect(spy).toHaveBeenCalled()
  })
})
