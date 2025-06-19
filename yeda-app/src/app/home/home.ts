import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements AfterViewInit {
  currentSlide = 0;
  slides = [
    { id: 1, content: 'Slide 1' },
    { id: 2, content: 'Slide 2' },
    { id: 3, content: 'Slide 3' }
  ];

  @ViewChild('carousel', { static: false }) carouselRef!: ElementRef;

  ngAfterViewInit() {
    this.setupCarousel();
    window.addEventListener('resize', () => this.setupCarousel());
  }

  get totalSlides(): number {
    return this.slides.length;
  }

  setupCarousel() {
    const carousel = this.carouselRef.nativeElement as HTMLElement;
    const track = carousel.querySelector('.carousel-track') as HTMLElement;
    const cards = Array.from(track.children) as HTMLElement[];
    const prevBtn = carousel.querySelector('.carousel-button-left') as HTMLElement;
    const nextBtn = carousel.querySelector('.carousel-button-right') as HTMLElement;
    const indicatorsContainer = carousel.querySelector('.carousel-indicators') as HTMLElement;

    let currentIndex = 0;
    let autoScrollInterval: number | null = null;

    const updateCarousel = () => {
      const cardWidth = cards[0].getBoundingClientRect().width;
      const visibleCards = window.innerWidth >= 1024 ? 2 : 1;
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

      const allIndicators = Array.from(indicatorsContainer.children);
      allIndicators.forEach((indicator, i) => {
        (indicator as HTMLElement).classList.toggle('active', i === currentIndex);
      });

      if (window.innerWidth >= 1024) {
        prevBtn.style.display = currentIndex === 0 ? 'none' : 'block';
        nextBtn.style.display = currentIndex >= cards.length - visibleCards ? 'none' : 'block';
      }
    };

    const createIndicators = () => {
      indicatorsContainer.innerHTML = '';
      cards.forEach((_, i) => {
        const indicator = document.createElement('span');
        indicator.classList.add('carousel-indicator');
        if (i === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => {
          currentIndex = i;
          updateCarousel();
        });
        indicatorsContainer.appendChild(indicator);
      });
    };

    const moveToNext = () => {
      const maxIndex = window.innerWidth >= 1024 ? cards.length - 2 : cards.length - 1;
      currentIndex = (currentIndex < maxIndex) ? currentIndex + 1 : 0;
      updateCarousel();
    };

    const moveToPrev = () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
      }
    };

    const cardWidth = cards[0].getBoundingClientRect().width;
    track.style.width = `${cardWidth * cards.length}px`;

    createIndicators();
    updateCarousel();

    if (window.innerWidth < 1024) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
      autoScrollInterval = window.setInterval(moveToNext, 4000);
    } else {
      prevBtn.addEventListener('click', moveToPrev);
      nextBtn.addEventListener('click', moveToNext);
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
      }
    }
  }
}

  
