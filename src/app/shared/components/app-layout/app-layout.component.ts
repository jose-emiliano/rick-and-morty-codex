import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss']
})
export class AppLayoutComponent {
  public opened = false

  toggleMenu() {
    const isMobile = window.matchMedia('(max-width: 768px)').matches

    if (isMobile) {
      this.opened = !this.opened
    }
  }
}
