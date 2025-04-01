import { Routes } from '@angular/router';
import { LocationsComponent } from './locations.component';
import { LocationComponent } from './pages/location/location.component';

export const routes: Routes = [
  { path: '', component: LocationsComponent },
  { path: 'location/:id', pathMatch: 'full', component: LocationComponent },
  { path: 'location', pathMatch: 'full', redirectTo: 'home' }
];
