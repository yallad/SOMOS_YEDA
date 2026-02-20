import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar {
  @ViewChild('navListRef', { static: false }) navListRef!: ElementRef;

  toggleMenu() {
    const navList = this.navListRef?.nativeElement;
    navList?.classList.toggle('show');
  }

  closeMenu() {
    
    if (window.innerWidth <= 768) {
      const navList = this.navListRef?.nativeElement;
      navList?.classList.remove('show');
    }
  }
}
