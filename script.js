document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.header-nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', function() {
      nav.classList.toggle('active'); // Toggle the 'active' class
      hamburger.classList.toggle('active');
    });
  }

  // Add Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});

let scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Function to handle the button's appearance based on scroll position
function updateScrollButtonVisibility() {
  const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

  if (scrollPosition > 250) {
    scrollToTopBtn.classList.add("show");
  } else {
    scrollToTopBtn.classList.remove("show");
  }
}

// Debounce function to limit the frequency of function execution (performance optimization)
function debounce(func, delay) {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  }
}

// Attach the debounced function to the scroll event
window.addEventListener('scroll', debounce(updateScrollButtonVisibility, 50));

// Function to scroll smoothly to the top (using easing function)
function scrollToTop() {
  const startingY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  const targetY = 0;
  const duration = 750; // Increased duration for a smoother scroll
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = timestamp - startTime;
    const percentage = Math.min(progress / duration, 1);

    // More pronounced ease-in-out cubic easing function
    const easedPercentage = percentage < 0.5 ? 4 * percentage * percentage * percentage : 1 - Math.pow(-2 * percentage + 2, 3) / 2;

    window.scrollTo(0, startingY + (targetY - startingY) * easedPercentage);

    if (progress < duration) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

// When the user clicks on the button, scroll smoothly to the top
scrollToTopBtn.addEventListener('click', scrollToTop);

