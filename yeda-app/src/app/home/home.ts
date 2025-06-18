window.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel") as HTMLElement;
  const track = carousel.querySelector(".carousel-track") as HTMLElement;
  const cards = Array.from(track.children) as HTMLElement[];
  const prevBtn = carousel.querySelector(".carousel-button-left") as HTMLElement;
  const nextBtn = carousel.querySelector(".carousel-button-right") as HTMLElement;
  const indicatorsContainer = carousel.querySelector(".carousel-indicators") as HTMLElement;

  let currentIndex = 0;
  let autoScrollInterval: number | null = null;

  const updateCarousel = () => {
    const cardWidth = cards[0].getBoundingClientRect().width;
    const visibleCards = window.innerWidth >= 1024 ? 2 : 1;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    // Marcar indicador activo
    const allIndicators = Array.from(indicatorsContainer.children);
    allIndicators.forEach((indicator, i) => {
      (indicator as HTMLElement).classList.toggle("active", i === currentIndex);
    });

    // Ocultar botones si no hay más tarjetas (solo escritorio)
    if (window.innerWidth >= 1024) {
      prevBtn.style.display = currentIndex === 0 ? "none" : "block";
      nextBtn.style.display = currentIndex >= cards.length - visibleCards ? "none" : "block";
    }
  };

  const createIndicators = () => {
    indicatorsContainer.innerHTML = "";
    cards.forEach((_, i) => {
      const indicator = document.createElement("span");
      indicator.classList.add("carousel-indicator");
      if (i === 0) indicator.classList.add("active");
      indicator.addEventListener("click", () => {
        currentIndex = i;
        updateCarousel();
      });
      indicatorsContainer.appendChild(indicator);
    });
  };

  const moveToNext = () => {
    const maxIndex = window.innerWidth >= 1024 ? cards.length - 2 : cards.length - 1;
    if (currentIndex < maxIndex) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateCarousel();
  };

  const moveToPrev = () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateCarousel();
    }
  };

  const setupCarousel = () => {
    const cardWidth = cards[0].getBoundingClientRect().width;
    track.style.width = `${cardWidth * cards.length}px`;

    createIndicators();
    updateCarousel();

    // Control automático en móvil/tablet
    if (window.innerWidth < 1024) {
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
      autoScrollInterval = window.setInterval(moveToNext, 4000);
    } else {
      prevBtn.addEventListener("click", moveToPrev);
      nextBtn.addEventListener("click", moveToNext);
      if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
      }
    }
  };

  window.addEventListener("resize", () => {
    setupCarousel();
  });

  setupCarousel();
});
