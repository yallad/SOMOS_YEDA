import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './footer/footer';
import { Navbar } from './navbar/navbar';
import { WhatsappFloat } from './shared/whatsapp-float/whatsapp-float';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Footer, Navbar, WhatsappFloat],
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
    <app-whatsapp-float></app-whatsapp-float>
  `,
})
export class App {
  protected title = 'yeda-app';
}
