import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './features/home/home.module';
import { CharactersModule } from './features/characters/characters.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { charactersReducer } from './stores/characters/characters.reducer';
import { CharactersEffects } from './stores/characters/characters.effects';
import { EpisodesEffects } from './stores/episodes/episodes.effects';
import { EpisodesReducer } from './stores/episodes/episodes.reducer';
import { LocationsEffects } from './stores/locations/locations.effects';
import { locationsReducer } from './stores/locations/locations.reducer';
import { EpisodesModule } from './features/episodes/episodes.module';
import { LocationsModule } from './features/locations/locations.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    SharedModule,
    HomeModule,
    CharactersModule,
    EpisodesModule,
    LocationsModule,
    EffectsModule.forRoot([CharactersEffects, EpisodesEffects, LocationsEffects]),
    StoreModule.forRoot({
      characters: charactersReducer,
      episodes: EpisodesReducer,
      locations: locationsReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
