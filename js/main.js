// main.js
// Minimal, purposeful JavaScript for navbar toggle, smooth scrolling, and reveal-on-scroll

document.addEventListener('DOMContentLoaded', function(){
  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-navigation');
  if(navToggle && nav){
    navToggle.addEventListener('click', function(){
      const expanded = this.getAttribute('aria-expanded') === 'true' || false;
      const isOpen = !expanded;
      this.setAttribute('aria-expanded', isOpen);
      nav.classList.toggle('open', isOpen);

      // show/hide nav list (CSS handles layout when .open is present)
      const navList = nav.querySelector('.nav-list');
      if(navList){
        navList.style.display = isOpen ? 'flex' : 'none';
      }

      // toggle page lock and overlay for drawer experience
      document.body.classList.toggle('nav-open', isOpen);
      if(isOpen){
        // create overlay if not present
        let overlay = document.querySelector('.nav-overlay');
        if(!overlay){
          overlay = document.createElement('div');
          overlay.className = 'nav-overlay';
          document.body.appendChild(overlay);
          // allow click on overlay to close nav
          overlay.addEventListener('click', () => {
            navToggle.setAttribute('aria-expanded', 'false');
            nav.classList.remove('open');
            if(navList) navList.style.display = 'none';
            document.body.classList.remove('nav-open');
            overlay.classList.remove('visible');
            setTimeout(() => overlay.remove(), 260);
          });
        }
        // animate overlay visible
        requestAnimationFrame(() => overlay.classList.add('visible'));
      } else {
        const overlay = document.querySelector('.nav-overlay');
        if(overlay){
          overlay.classList.remove('visible');
          setTimeout(() => overlay.remove(), 260);
        }
      }
    });
  }

  // Close nav with Escape key when open
  document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape'){
      const overlay = document.querySelector('.nav-overlay');
      if(nav.classList.contains('open')){
        nav.classList.remove('open');
        const navList = nav.querySelector('.nav-list');
        if(navList) navList.style.display = 'none';
        document.body.classList.remove('nav-open');
        if(overlay){ overlay.classList.remove('visible'); setTimeout(() => overlay.remove(), 260); }
        const navToggleBtn = document.querySelector('.nav-toggle');
        if(navToggleBtn) navToggleBtn.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      const href = this.getAttribute('href');
      if(href.length > 1){
        e.preventDefault();
        const target = document.querySelector(href);
        if(target){
          target.scrollIntoView({behavior:'smooth',block:'start'});
          // close mobile nav after click
          if(window.innerWidth <= 900){
            const navList = document.querySelector('#primary-navigation .nav-list');
            if(navList) navList.style.display = 'none';
            if(navToggle) navToggle.setAttribute('aria-expanded', 'false');
          }
        }
      }
    });
  });

  // Reveal on scroll (IntersectionObserver)
  const reveals = document.querySelectorAll('.hero, .hero-content, .section, .project-card, .skill-category, .about-grid > div');
  if('IntersectionObserver' in window){
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, {threshold: 0.12});

    reveals.forEach(r => r.classList.add('reveal'));
    reveals.forEach(r => obs.observe(r));
  } else {
    // fallback: make elements visible
    reveals.forEach(r => r.classList.add('visible'));
  }

  /* Typing effect (rotating job titles) */
  (function typingEffect(){
    const el = document.getElementById('typed');
    if(!el) return;
    const words = [
      'Full-Stack MERN Developer',
      'Flutter Developer',
      'React Native Developer',
      'AI/ML Enthusiast',
        'Open Source Contributor'
    ];
    let part = 0; let partIndex = 0; let intervalVal;

    function type(){
      const text = words[part].substring(0, partIndex + 1);
      el.textContent = text;
      partIndex++;
      if(text === words[part]){
        clearInterval(intervalVal);
        setTimeout(() => { intervalVal = setInterval(deleteText, 50); }, 900);
      }
    }

    function deleteText(){
      const text = words[part].substring(0, partIndex - 1);
      el.textContent = text;
      partIndex--;
      if(text === ''){
        clearInterval(intervalVal);
        part = (part + 1) % words.length;
        partIndex = 0;
        setTimeout(() => { intervalVal = setInterval(type, 100); }, 200);
      }
    }

    intervalVal = setInterval(type, 100);
  })();

  /* Active nav highlighting on scroll */
  (function navHighlight(){
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');
    if(!sections.length || !navLinks.length) return;

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const link = document.querySelector('.nav-list a[href="#' + id + '"]');
        if(entry.isIntersecting){
          navLinks.forEach(a => a.classList.remove('active'));
          if(link) link.classList.add('active');
        }
      });
    }, {threshold: 0.5});

    sections.forEach(s => io.observe(s));
  })();

  /* Back to top button */
  (function backToTop(){
    const btn = document.getElementById('backToTop');
    if(!btn) return;
    const showAt = 500; // px
    window.addEventListener('scroll', () => {
      if(window.scrollY > showAt) btn.style.display = 'block';
      else btn.style.display = 'none';
    }, {passive:true});
    btn.addEventListener('click', () => window.scrollTo({top:0,behavior:'smooth'}));
  })();

  /* Sticky header scrolled visual state */
  (function headerScrolled(){
    const header = document.querySelector('.site-header');
    if(!header) return;
    const onScroll = () => {
      if(window.scrollY > 16) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, {passive:true});
    // initialize
    onScroll();
  })();

  /* When header is fixed we must set a CSS variable with its height so content isn't hidden.
     This keeps the header fully 'stickable' across the page and makes anchor links land correctly. */
  (function headerOffset(){
    const header = document.querySelector('.site-header');
    if(!header) return;
    function updateOffset(){
      // compute visible height including borders
      const h = header.getBoundingClientRect().height;
      document.documentElement.style.setProperty('--header-offset', h + 'px');
    }
    // update on load and when window resizes or fonts load
    updateOffset();
    window.addEventListener('resize', updateOffset);
    // watch for potential layout changes (e.g., font load, nav changes)
    const ro = new ResizeObserver(updateOffset);
    ro.observe(header);
  })();

  /* Projects - Handle Live button clicks for projects without live links */
  (function projectsLiveButtons(){
    const liveButtons = document.querySelectorAll('[data-scroll-to-projects]');
    liveButtons.forEach(btn => {
      btn.addEventListener('click', function(e){
        e.preventDefault();
        const projectsSection = document.getElementById('projects');
        if(projectsSection){
          projectsSection.scrollIntoView({behavior:'smooth', block:'start'});
        }
      });
    });
  })();

  /* Achievements Carousel */
  (function achievementsCarousel(){
    const track = document.getElementById('achievementsTrack');
    const prevBtn = document.getElementById('achievementsPrev');
    const nextBtn = document.getElementById('achievementsNext');
    const dotsContainer = document.getElementById('achievementsDots');
    
    if(!track || !prevBtn || !nextBtn || !dotsContainer) return;
    
    const cards = Array.from(track.children);
    const totalCards = cards.length;
    let currentIndex = 0;
    let cardsPerView = 3;
    
    // Determine cards per view based on screen size
    function updateCardsPerView(){
      const width = window.innerWidth;
      if(width <= 700){
        cardsPerView = 1;
      } else if(width <= 900){
        cardsPerView = 2;
      } else {
        cardsPerView = 3;
      }
    }
    
    // Calculate total pages
    function getTotalPages(){
      return Math.ceil(totalCards / cardsPerView);
    }
    
    // Create pagination dots
    function createDots(){
      dotsContainer.innerHTML = '';
      const totalPages = getTotalPages();
      for(let i = 0; i < totalPages; i++){
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-label', `Go to achievement page ${i + 1}`);
        dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        if(i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToPage(i));
        dotsContainer.appendChild(dot);
      }
    }
    
    // Update carousel position
    function updateCarousel(animate = true){
      const cardWidth = cards[0].offsetWidth;
      const gap = 24;
      const offset = currentIndex * (cardWidth + gap);
      
      if(!animate){
        track.style.transition = 'none';
      }
      track.style.transform = `translateX(-${offset}px)`;
      
      if(!animate){
        requestAnimationFrame(() => {
          track.style.transition = '';
        });
      }
      
      updateControls();
    }
    
    // Update button states and dots
    function updateControls(){
      const totalPages = getTotalPages();
      const currentPage = Math.floor(currentIndex / cardsPerView);
      
      // Update buttons
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= totalCards - cardsPerView;
      
      // Update dots
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentPage);
        dot.setAttribute('aria-selected', index === currentPage ? 'true' : 'false');
      });
    }
    
    // Navigate to specific page
    function goToPage(pageIndex){
      currentIndex = pageIndex * cardsPerView;
      if(currentIndex > totalCards - cardsPerView){
        currentIndex = totalCards - cardsPerView;
      }
      if(currentIndex < 0) currentIndex = 0;
      updateCarousel();
    }
    
    // Previous button handler
    prevBtn.addEventListener('click', () => {
      if(currentIndex > 0){
        currentIndex -= 1;
        if(currentIndex < 0) currentIndex = 0;
        updateCarousel();
      }
    });
    
    // Next button handler
    nextBtn.addEventListener('click', () => {
      if(currentIndex < totalCards - cardsPerView){
        currentIndex += 1;
        if(currentIndex > totalCards - cardsPerView){
          currentIndex = totalCards - cardsPerView;
        }
        updateCarousel();
      }
    });
    
    // Keyboard navigation
    track.addEventListener('keydown', (e) => {
      if(e.key === 'ArrowLeft'){
        e.preventDefault();
        prevBtn.click();
      } else if(e.key === 'ArrowRight'){
        e.preventDefault();
        nextBtn.click();
      }
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, {passive: true});
    
    function handleSwipe(){
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;
      
      if(Math.abs(diff) > swipeThreshold){
        if(diff > 0){
          // Swipe left - next
          nextBtn.click();
        } else {
          // Swipe right - previous
          prevBtn.click();
        }
      }
    }
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const oldCardsPerView = cardsPerView;
        updateCardsPerView();
        
        if(oldCardsPerView !== cardsPerView){
          currentIndex = 0;
          createDots();
          updateCarousel(false);
        } else {
          updateCarousel(false);
        }
      }, 250);
    });
    
    // Initialize
    updateCardsPerView();
    createDots();
    updateCarousel(false);
  })();

  // Contact form submission handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      // Validate all required fields
      if (!name || !email || !message) {
        alert('Please fill in all required fields.');
        return;
      }
      
      // Validate email format
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      // Construct mailto URL
      const subject = encodeURIComponent(`Contact from ${name}`);
      const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
      const mailtoLink = `mailto:jayasimhapadigeri8639@gmail.com?subject=${subject}&body=${body}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Optional: Reset form after submission
      setTimeout(() => {
        contactForm.reset();
      }, 500);
    });
  }
});
