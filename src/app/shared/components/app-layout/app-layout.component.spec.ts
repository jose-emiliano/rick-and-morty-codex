import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppLayoutComponent } from './app-layout.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('AppLayoutComponent', () => {
  let component: AppLayoutComponent
  let fixture: ComponentFixture<AppLayoutComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppLayoutComponent],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(AppLayoutComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('deve criar o componente', () => {
    expect(component).toBeTruthy()
  })

  it('deve alternar o menu se a tela for mobile', () => {
    spyOn(window, 'matchMedia').and.returnValue({
      matches: true,
      media: '',
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
      addListener: () => {},
      removeListener: () => {}
    } as MediaQueryList)
    

    component.opened = false
    component.toggleMenu()
    expect(component.opened).toBeTrue()

    component.toggleMenu()
    expect(component.opened).toBeFalse()
  })

  it('não deve alternar o menu se a tela não for mobile', () => {
    spyOn(window, 'matchMedia').and.returnValue({
      matches: false,
      media: '',
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
      addListener: () => {},
      removeListener: () => {}
    } as MediaQueryList)
    

    component.opened = false
    component.toggleMenu()
    expect(component.opened).toBeFalse()
  })
})
