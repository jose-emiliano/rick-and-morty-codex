import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent
  let fixture: ComponentFixture<PaginatorComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaginatorComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(PaginatorComponent)
    component = fixture.componentInstance
    component.currentPage = 1
    component.totalPages = 5
    fixture.detectChanges()
  })

  it('deve emitir o evento ao ir para a próxima página', () => {
    spyOn(component.pageChange, 'emit')
    component.nextPage()
    expect(component.pageChange.emit).toHaveBeenCalledWith(2)
  })

  it('deve emitir o evento ao voltar para a página anterior', () => {
    component.currentPage = 3
    fixture.detectChanges()

    spyOn(component.pageChange, 'emit')
    component.previousPage()
    expect(component.pageChange.emit).toHaveBeenCalledWith(2)
  })

  it('não deve emitir se estiver na última página e clicar em "Próxima"', () => {
    component.currentPage = 5
    fixture.detectChanges()

    spyOn(component.pageChange, 'emit')
    component.nextPage()
    expect(component.pageChange.emit).not.toHaveBeenCalled()
  })

  it('não deve emitir se estiver na primeira página e clicar em "Anterior"', () => {
    component.currentPage = 1
    fixture.detectChanges()

    spyOn(component.pageChange, 'emit')
    component.previousPage()
    expect(component.pageChange.emit).not.toHaveBeenCalled()
  })
})
