import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, Subject, takeUntil } from 'rxjs';
import { Character, Episode, Locality } from 'src/app/shared/models/rick-and-morty-api';
import { loadCharactersByIds } from 'src/app/stores/characters/characters.actions';
import { selectAllCharacterById } from 'src/app/stores/characters/characters.selectors';
import { CharactersState } from 'src/app/stores/characters/characters.state';
import { loadEpisodesByIds } from 'src/app/stores/episodes/episodes.actions';
import { selectAllEpisodes } from 'src/app/stores/episodes/episodes.selectors';
import { EpisodesState } from 'src/app/stores/episodes/episodes.state';
import { loadLocationsByIds } from 'src/app/stores/locations/locations.actions';
import { selectAllLocations } from 'src/app/stores/locations/locations.selectors';
import { LocationsState } from 'src/app/stores/locations/locations.state';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit, OnDestroy {
  public episodes$!: Observable<Episode[]>
  public locations$!: Observable<Locality[]>
  public character: Character | undefined

  private characterId!: number
  private unsubscribe$ = new Subject<void>()

  constructor(
    private charactersStore: Store<{ characters: CharactersState }>,
    private episodesStore: Store<{ episodes: EpisodesState }>,
    private locationsStore: Store<{ locations: LocationsState }>,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.characterId = Number(this.route.snapshot.paramMap.get('id'))
    this.charactersStore.dispatch(loadCharactersByIds({ ids: [this.characterId] }))
    this.loadDependencies()
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  private loadDependencies() {
    this.charactersStore.select(selectAllCharacterById(this.characterId))
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(character => {
        this.episodesStore.dispatch(loadEpisodesByIds({ ids: character?.episode.map(m => m.id) || [] }))
        this.locationsStore.dispatch(loadLocationsByIds({ ids: character?.location.id ? [character?.location.id] : [] }))
        this.episodes$ = this.episodesStore.select(selectAllEpisodes).pipe(map(f => f.filter(m => character?.episode.map(m => m.id).includes(m.id))))
        this.locations$ = this.locationsStore.select(selectAllLocations).pipe(map(f => f.filter(m => character?.location.id === m.id)))
        this.character = character
      })
  }
}
