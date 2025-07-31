document.addEventListener('DOMContentLoaded', function() {
  // Efecto smooth scroll para enlaces internos
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Animación de contador para estadísticas (puedes personalizar)
  const stats = document.querySelectorAll('.stat-number');
  if(stats.length > 0) {
    stats.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      const count = +stat.innerText;
      const increment = target / 100;
      
      if(count < target) {
        stat.innerText = Math.ceil(count + increment);
        setTimeout(updateCount, 1);
      } else {
        stat.innerText = target;
      }
      
      function updateCount() {
        const count = +stat.innerText;
        if(count < target) {
          stat.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 1);
        } else {
          stat.innerText = target;
        }
      }
    });
  }

  // Tooltips para elementos con data-bs-toggle
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Mostrar/ocultar secciones adicionales
  const toggleButtons = document.querySelectorAll('.toggle-content');
  toggleButtons.forEach(button => {
    button.addEventListener('click', function() {
      const target = document.querySelector(this.getAttribute('data-target'));
      target.classList.toggle('d-none');
      this.textContent = target.classList.contains('d-none') ? 
        this.getAttribute('data-show-text') : 
        this.getAttribute('data-hide-text');
    });
  });
});

// WhatsApp button animation
const whatsappBtn = document.querySelector('.btn-success');
if(whatsappBtn) {
  whatsappBtn.addEventListener('mouseenter', function() {
    this.innerHTML = '📲 ¡Contáctame ahora!';
  });
  
  whatsappBtn.addEventListener('mouseleave', function() {
    this.innerHTML = '📲 ¡Contáctame por WhatsApp!';
  });
}