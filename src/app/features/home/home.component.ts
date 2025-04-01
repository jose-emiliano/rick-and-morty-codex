import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, filter, mergeMap, Observable, of, take } from 'rxjs';
import { Character, Episode, Locality } from 'src/app/shared/models/rick-and-morty-api';
import { loadCharacters, loadCharactersByIds } from 'src/app/stores/characters/characters.actions';
import { selectAllCharacters } from 'src/app/stores/characters/characters.selectors';
import { CharactersState } from 'src/app/stores/characters/characters.state';
import { loadEpisodes } from 'src/app/stores/episodes/episodes.actions';
import { selectAllEpisodes } from 'src/app/stores/episodes/episodes.selectors';
import { EpisodesState } from 'src/app/stores/episodes/episodes.state';
import { loadLocations } from 'src/app/stores/locations/locations.actions';
import { selectAllLocations } from 'src/app/stores/locations/locations.selectors';
import { LocationsState } from 'src/app/stores/locations/locations.state';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public characters$!: Observable<Character[]>
  public episodes$!: Observable<Episode[]>
  public locations$!: Observable<Locality[]>

  constructor(
    private charactersStore: Store<{ characters: CharactersState }>,
    private episodesStore: Store<{ episodes: EpisodesState }>,
    private locationsStore: Store<{ locations: LocationsState }>
  ) { }

  ngOnInit(): void {
    this.charactersStore.dispatch(loadCharacters())
    this.episodesStore.dispatch(loadEpisodes())
    this.locationsStore.dispatch(loadLocations())
    this.loadDependencies()
  }

  private loadDependencies() {
    this.characters$ = this.charactersStore.select(selectAllCharacters).pipe(mergeMap(m => of(m.slice(0, 20))))
    this.episodes$ = this.episodesStore.select(selectAllEpisodes).pipe(mergeMap(m => of(m.slice(0, 20))))
    this.locations$ = this.locationsStore.select(selectAllLocations).pipe(mergeMap(m => of(m.slice(0, 20))))

    combineLatest([
      this.episodesStore.select(selectAllEpisodes).pipe(filter(f => f.length > 0)),
      this.locationsStore.select(selectAllLocations).pipe(filter(f => f.length > 0))]).pipe(
      take(1),
    ).subscribe(([episodes, locations]) => {
      const characterIds = [...new Set([
        ...episodes.map(m => m.characters.slice(0, 5).map(m => m.id)),
        ...locations.map(m => m.residents.slice(0, 5).map(m => m.id))
      ].flat())].map(m => Number(m))

      const chunks = this.chunkArray(characterIds, 30)

      for (const chunk of chunks) {
        this.charactersStore.dispatch(loadCharactersByIds({ ids: chunk }))
      }
    })
  }

  public chunkArray(arr: number[], size: number): number[][] {
    const result: number[][] = []
    for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size))
    return result
  }
}
