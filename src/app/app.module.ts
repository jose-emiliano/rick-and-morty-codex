import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EffectsModule } from '@ngrx/effects';
import { charactersReducer } from './stores/characters/characters.reducer';
import { CharactersEffects } from './stores/characters/characters.effects';
import { EpisodesEffects } from './stores/episodes/episodes.effects';
import { EpisodesReducer } from './stores/episodes/episodes.reducer';
import { LocationsEffects } from './stores/locations/locations.effects';
import { locationsReducer } from './stores/locations/locations.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
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
