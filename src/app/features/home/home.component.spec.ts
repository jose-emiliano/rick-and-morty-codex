import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { selectAllCharacters } from 'src/app/stores/characters/characters.selectors';
import { selectAllEpisodes } from 'src/app/stores/episodes/episodes.selectors';
import { selectAllLocations } from 'src/app/stores/locations/locations.selectors';

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>
  let store: MockStore

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectAllCharacters, value: [] },
            { selector: selectAllEpisodes, value: [] },
            { selector: selectAllLocations, value: [] },
          ]
        })
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    store = TestBed.inject(MockStore)
    spyOn(store, 'dispatch').and.callThrough()
    fixture.detectChanges()
  })

  it('deve criar chunks corretamente', () => {
    const input = [1, 2, 3, 4, 5, 6, 7]
    const result = component.chunkArray(input, 3)
    expect(result).toEqual([[1, 2, 3], [4, 5, 6], [7]])
  })
})
