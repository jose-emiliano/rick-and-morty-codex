import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public inputSearch = new FormControl('')
  @Output() search = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

  public searchAction() {
    this.search.emit(this.inputSearch.value)
  }

  public clearAction() {
    this.inputSearch.setValue('')
    this.searchAction()
  }

}
