import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Info } from '../../models/rick-and-morty-api';

@Component({
  selector: 'paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  @Input() totalPages = 10
  @Input() currentPage = 1
  @Input() pagination: Info = { count: 0, pages: 0, next: '', prev: '' }

  @Output() pageChange = new EventEmitter<number>()

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  previousPage() {
    this.goToPage(this.currentPage - 1)
  }

  nextPage() {
    this.goToPage(this.currentPage + 1)
  }

}
