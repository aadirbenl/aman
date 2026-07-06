document.addEventListener('DOMContentLoaded', () => {

  // --- MOBILE MENU TOGGLE ---
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      // Toggle burger icon visual if needed (optional SVG rotation done in CSS or simple change)
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // --- HEADER SCROLL EFFECT ---
  const header = document.getElementById('header');
  const handleScrollHeader = () => {
    if (window.scrollY > 50) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };
  window.addEventListener('scroll', handleScrollHeader);
  handleScrollHeader(); // Run initially

  // --- ACTIVE NAVBAR LINKS ON SCROLL ---
  const sections = document.querySelectorAll('section[id]');
  const scrollActive = () => {
    const scrollY = window.scrollY;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120; // offset for sticky header
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

      if (activeLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          activeLink.classList.add('active');
        } else {
          activeLink.classList.remove('active');
        }
      }
    });
  };
  window.addEventListener('scroll', scrollActive);
  scrollActive(); // Run initially

  // --- REVEAL ON SCROLL ANIMATION ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Stop observing once revealed
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // --- CONTACT FORM SUBMISSION ---
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      // Visual feedback for sending
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending Message...';

      // Simulate API submit delay
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        
        // Show success status
        formStatus.textContent = 'Thank you! Your message has been sent successfully. (Simulated)';
        formStatus.className = 'form-status success';
        
        // Reset form
        contactForm.reset();

        // Mute message status after a few seconds
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 5000);
      }, 1500);
    });
  }

});
