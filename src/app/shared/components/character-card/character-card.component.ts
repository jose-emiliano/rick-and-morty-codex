import { Component, Input } from '@angular/core';
import { Character } from 'src/app/shared/models/rick-and-morty-api';

@Component({
  selector: 'character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent {
  @Input() character!: Character
}
