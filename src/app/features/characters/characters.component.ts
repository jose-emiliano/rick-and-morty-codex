import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RickAndMortyApiService } from 'src/app/core/services/rick-and-morty-api.service';
import { Character } from 'src/app/shared/models/rick-and-morty-api';
import { convertCharacterResponseIntoCharacter } from 'src/app/stores/characters/characters.reducer';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit {
  public name = ''
  public items$!: Observable<Character[]>
  public currentPage = 1;
  public totalPages = 1

  constructor(
    private api: RickAndMortyApiService
  ) { }

  ngOnInit(): void {
    this.loadDependencies()
  }

  public loadDependencies() {
    this.items$ = this.api.getCharacters({ page: this.currentPage, name: this.name })
      .pipe(map(res => {
        this.totalPages = res.info.pages
        return res.results.map(m => convertCharacterResponseIntoCharacter(m))
      }))
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
