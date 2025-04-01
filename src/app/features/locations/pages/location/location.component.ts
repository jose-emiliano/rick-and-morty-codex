import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Locality } from 'src/app/shared/models/rick-and-morty-api';
import { loadLocationsByIds } from 'src/app/stores/locations/locations.actions';
import { selectAllLocationById } from 'src/app/stores/locations/locations.selectors';
import { LocationsState } from 'src/app/stores/locations/locations.state';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  private localityId!: number
  public locality$!: Observable<Locality | undefined>

  constructor(
    private locationsStore: Store<{ locations: LocationsState }>,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.localityId = Number(this.route.snapshot.paramMap.get('id'))
    this.locationsStore.dispatch(loadLocationsByIds({ ids: [this.localityId] }))
    this.loadDependencies()
  }

  private loadDependencies() {
    this.locality$ = this.locationsStore.select(selectAllLocationById(this.localityId))
  }
}
