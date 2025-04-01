import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Character, Locality } from 'src/app/shared/models/rick-and-morty-api';
import { selectAllCharacterByIds } from 'src/app/stores/characters/characters.selectors';
import { CharactersState } from 'src/app/stores/characters/characters.state';

@Component({
  selector: 'locality-card',
  templateUrl: './locality-card.component.html',
  styleUrls: ['./locality-card.component.scss']
})
export class LocalityCardComponent implements OnInit {
  @Input() locality!: Locality
  public characters$!: Observable<Character[]>

  constructor(
    private charactersStore: Store<{ characters: CharactersState }>
  ) { }
  
  ngOnInit(): void {
      this.loadDependencies()
  }
  
  public loadDependencies() {
    const characterIds = [...this.locality.residents.map(m => m.id).slice(0, 5)]
    this.characters$ = this.charactersStore.select(selectAllCharacterByIds(characterIds))
      .pipe(
        map(characters => characters.slice(0, 5))
      )
  }
}
