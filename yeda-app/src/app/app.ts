import { Component } from '@angular/core';
import { Home } from './home/home';
import { About } from './about/about';
import { Contact } from './contact/contact';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Home, About, Contact, Footer], 
  template: `
    <app-home></app-home>
    <app-about></app-about>
    <app-contact></app-contact>
    <app-footer></app-footer>
  `,
})
export class App {
  protected title = 'yeda-app';
}
