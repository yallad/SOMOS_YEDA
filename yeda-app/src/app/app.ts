import { Component } from '@angular/core';
import { Home } from './home/home';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Home], 
  template: `<app-home></app-home>`, 
})
export class App {
  protected title = 'yeda-app';
}
