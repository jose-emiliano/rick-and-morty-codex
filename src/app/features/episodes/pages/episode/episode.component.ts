import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Episode } from 'src/app/shared/models/rick-and-morty-api';
import { loadEpisodesByIds } from 'src/app/stores/episodes/episodes.actions';
import { selectAllEpisodeById } from 'src/app/stores/episodes/episodes.selectors';
import { EpisodesState } from 'src/app/stores/episodes/episodes.state';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.scss']
})
export class EpisodeComponent implements OnInit {
  private episodeId!: number
  public episode$!: Observable<Episode | undefined>

  constructor(
    private episodesStore: Store<{ characters: EpisodesState }>,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.episodeId = Number(this.route.snapshot.paramMap.get('id'))
    this.episodesStore.dispatch(loadEpisodesByIds({ ids: [this.episodeId] }))
    this.loadDependencies()
  }

  private loadDependencies() {
    this.episode$ = this.episodesStore.select(selectAllEpisodeById(this.episodeId))
  }
}
