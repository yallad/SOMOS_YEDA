import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {
  currentSlide = 0;

  services = [
    {
      title: 'Desarrollo Web',
      description: 'Creamos sitios web personalizados y optimizados para tu negocio.',
      image: '../../assets/CarruselDS1.png'
    },
    {
      title: 'Aplicaciones Móviles',
      description: 'Desarrollamos aplicaciones móviles intuitivas y funcionales para iOS y Android.',
      image: '../../assets/CarruselApp2.png'
    },
    {
      title: 'Software a la medida',
      description: 'Desarrollamos soluciones de software personalizadas para optimizar tus procesos empresariales.',
      image: '../../assets/Carruselsoft3.png'
    },
    {
      title: 'Diseño',
      description: 'Creamos diseños atractivos y funcionales que reflejan la identidad de tu marca.',
      image: '../../assets/Carruseldise4.png'
    },
    {
      title: 'Consultoría',
      description: 'Ofrecemos asesoramiento experto para ayudarte a tomar decisiones informadas sobre tus proyectos tecnológicos.',
      image: '../../assets/Carruselconsu5.png'
    }
  ];

  techLogos = [
    '../../assets/angular.png',
    '../../assets/typescript.webp',
    '../../assets/Python.png',
    '../../assets/javascript.webp',
    '../../assets/java.png',
    '../../assets/HTML5.png',
    '../../assets/nodejs.png',
    '../../assets/microsoft.png',
    '../../assets/CSS3.png',
    '../../assets/angular.png',
    '../../assets/typescript.webp',
    '../../assets/Python.png',
    '../../assets/javascript.webp',
    '../../assets/java.png',
    '../../assets/HTML5.png',
    '../../assets/nodejs.png',
    '../../assets/microsoft.png',
    '../../assets/CSS3.png'
  ];

  get totalSlides(): number {
    return this.services.length;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}
