import { Routes } from '@angular/router';
import { CharactersComponent } from './characters.component';
import { CharacterComponent } from './pages/character/character.component';

export const routes: Routes = [
  { path: '', component: CharactersComponent },
  { path: 'character/:id', pathMatch: 'full', component: CharacterComponent },
  { path: 'character', pathMatch: 'full', redirectTo: 'home' }
];
