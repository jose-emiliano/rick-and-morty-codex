import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'characters',
    loadChildren: () => import('./features/characters/characters.module').then(m => m.CharactersModule)
  },
  {
    path: 'episodes',
    loadChildren: () => import('./features/episodes/episodes.module').then(m => m.EpisodesModule)
  },
  {
    path: 'locations',
    loadChildren: () => import('./features/locations/locations.module').then(m => m.LocationsModule)
  }
];
