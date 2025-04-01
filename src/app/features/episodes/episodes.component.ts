import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, tap } from 'rxjs';
import { RickAndMortyApiService } from 'src/app/core/services/rick-and-morty-api.service';
import { Episode } from 'src/app/shared/models/rick-and-morty-api';
import { loadCharactersByIds } from 'src/app/stores/characters/characters.actions';
import { CharactersState } from 'src/app/stores/characters/characters.state';
import { convertEpisodeResponseIntoEpisode } from 'src/app/stores/episodes/episodes.reducer';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.scss']
})
export class EpisodesComponent implements OnInit {
  public name = ''
  public items$!: Observable<Episode[]>
  public currentPage = 1;
  public totalPages = 1

  constructor(
    private api: RickAndMortyApiService,
    private charactersStore: Store<{ characters: CharactersState }>
  ) { }

  ngOnInit(): void {
    this.loadDependencies()
  }

  public loadDependencies() {
    this.items$ = this.api.getEpisodes({ page: this.currentPage, name: this.name })
      .pipe(
        map(res => {
          this.totalPages = res.info.pages
          return res.results.map(m => convertEpisodeResponseIntoEpisode(m))
        }),
        tap(res => {
          const chunks = this.chunkArray([...new Set(res.map(m => m.characters.reverse().slice(0, 5).map(m => m.id)).flat())], 30)
          
          for (const chunk of chunks) {
            this.charactersStore.dispatch(loadCharactersByIds({ ids: chunk }))
          }
        })
      )
      
  }

  public chunkArray(arr: number[], size: number): number[][] {
    const result: number[][] = []
    for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size))
    return result
  }

  public searcCharacters(search: string) {
    this.name = search
    this.currentPage = 1
    this.loadDependencies()
  }

  public pageChange(newPage: number) {
    this.currentPage = newPage
    this.loadDependencies()
  }
}
