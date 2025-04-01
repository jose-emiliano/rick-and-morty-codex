import { Routes } from '@angular/router';
import { EpisodesComponent } from './episodes.component';
import { EpisodeComponent } from './pages/episode/episode.component';

export const routes: Routes = [
  { path: '', component: EpisodesComponent },
  { path: 'episode/:id', pathMatch: 'full', component: EpisodeComponent },
  { path: 'episode', pathMatch: 'full', redirectTo: 'home' }
];
