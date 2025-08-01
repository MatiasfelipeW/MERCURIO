document.addEventListener('DOMContentLoaded', function() {
  // Seleccionar elementos del carrusel
  const carouselInner = document.querySelector('.carousel-inner');
  const carouselItems = document.querySelectorAll('.carousel-item');
  const prevButton = document.querySelector('.carousel-control.prev');
  const nextButton = document.querySelector('.carousel-control.next');
  
  // Configuración del carrusel
  let currentIndex = 0;
  const totalItems = carouselItems.length;
  const itemWidth = 100; // Porcentaje del ancho del item
  
  // Función para mover el carrusel
  function moveCarousel() {
    carouselInner.style.transform = `translateX(-${currentIndex * itemWidth}%)`;
  }
  
  // Evento para botón anterior
  prevButton.addEventListener('click', function() {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalItems - 1;
    moveCarousel();
  });
  
  // Evento para botón siguiente
  nextButton.addEventListener('click', function() {
    currentIndex = (currentIndex < totalItems - 1) ? currentIndex + 1 : 0;
    moveCarousel();
  });
  
  // Auto-avance del carrusel (opcional)
  let carouselInterval = setInterval(function() {
    currentIndex = (currentIndex < totalItems - 1) ? currentIndex + 1 : 0;
    moveCarousel();
  }, 5000); // Cambia cada 5 segundos
  
  // Pausar auto-avance al interactuar
  carouselInner.addEventListener('mouseenter', function() {
    clearInterval(carouselInterval);
  });
  
  carouselInner.addEventListener('mouseleave', function() {
    carouselInterval = setInterval(function() {
      currentIndex = (currentIndex < totalItems - 1) ? currentIndex + 1 : 0;
      moveCarousel();
    }, 5000);
  });
  
  // Inicializar carrusel
  moveCarousel();
});