import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { RouterModule } from '@angular/router';
import { AppLayoutFooterComponent } from './components/app-layout-footer/app-layout-footer.component';
import { CharacterCardComponent } from './components/character-card/character-card.component';
import { EpisodeCardComponent } from './components/episode-card/episode-card.component';
import { LocalityCardComponent } from './components/locality-card/locality-card.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SearchComponent } from './components/search/search.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppLayoutComponent,
    AppLayoutFooterComponent,
    CharacterCardComponent,
    EpisodeCardComponent,
    LocalityCardComponent,
    PaginatorComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    AppLayoutComponent,
    AppLayoutFooterComponent,
    CharacterCardComponent,
    EpisodeCardComponent,
    LocalityCardComponent,
    PaginatorComponent,
    SearchComponent
  ]
})
export class SharedModule { }
