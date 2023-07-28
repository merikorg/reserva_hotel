import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-button-up',
  templateUrl: './button-up.component.html',
  styleUrls: ['./button-up.component.css']
})
export class ButtonUpComponent {
  showScrollTop = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollTop = window.pageYOffset > 300; 
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
