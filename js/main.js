// main.js
// Minimal, purposeful JavaScript for navbar toggle, smooth scrolling, and reveal-on-scroll

document.addEventListener('DOMContentLoaded', function(){
  // set current year in footer
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

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
});
