# Portfolio Code Structure Reference

## CSS Class Naming Convention

### Layout Classes
- `.container` - Max-width wrapper with responsive padding
- `.section` - Standard section with 80px vertical padding and scroll-margin-top
- `.section-title` - Centered, large (2.5rem) section heading
- `.section-subtitle` - Muted, centered description text below title

### Header & Navigation
- `.site-header` - Fixed header with backdrop blur
- `.site-header.scrolled` - Enhanced shadow when scrolled
- `.header-inner` - Flex container for brand and nav
- `.brand` - Logo/name text (Jayasimha with purple accent)
- `.nav` - Navigation wrapper with rounded background
- `.nav-list` - Horizontal flex list of links
- `.nav-link` - Individual nav link with hover states
- `.nav-link.active` - Currently active section (purple background)
- `.nav-link-resume` - Special purple button style for Resume
- `.nav-toggle` - Mobile hamburger menu button
- `.hamburger` - Hamburger icon with before/after pseudo-elements

### Hero Section
- `.hero` - Main hero section with top padding
- `.hero-inner` - Grid layout (1.2fr 0.8fr)
- `.hero-content` - Left column with text content
- `.hero-eyebrow` - Small text above title (muted color)
- `.hero-title` - Large gradient heading
- `.hero-typing` - Typing animation container (purple accent)
- `.typing` - Animated text with border-right cursor
- `.hero-desc` - Description paragraph below title
- `.hero-cta` - Flex container for action buttons
- `.hero-visual` - Right column with profile image

### About Section
- `.about-grid` - Two-column grid (1.5fr 1fr)
- `.about-content` - Main text content area (max-width 640px)
- `.about-meta` - Sidebar with metadata (sticky positioning)

### Skills Section
- `.skills-grid` - Three-column grid (equal-height cards)
- `.skill-category` - Individual skill card (flexbox, height 100%)
- `.skill-list` - Unordered list of skills
- Hover: Lifts up 4px, purple border, shadow

### Projects Section
- `.projects-grid` - Responsive grid (auto-fit, minmax 320px)
- `.project-card` - Individual project card (flexbox, height 100%)
- `.project-card.featured` - Featured project (full-width, gradient bg)
- `.project-title` - Project heading
- `.project-desc` - Project description
- `.badges` - Flex container for technology badges
- `.badge` - Individual technology tag (purple background)
- `.card-actions` - Footer with links (border-top separator)

### Achievements Section
- `.achievements-list` - Flex column with gap (max-width 800px)
- `.achievement-item` - Individual achievement card with icon
- `.achievement-icon` - Large emoji icon (2rem)
- `.achievement-content` - Text content wrapper
- `.achievement-title` - Achievement heading (1.125rem)
- `.achievement-desc` - Achievement description (muted)

### Contact Section
- `.contact-wrapper` - Form container (max-width 700px)
- `.contact-form` - Form element with surface background
- `.form-grid` - Two-column grid for inputs
- `.form-group` - Individual input wrapper (flex column)
- `.form-group-full` - Full-width form group (span 2 columns)
- `.required` - Required field indicator (purple asterisk)
- `.form-actions` - Submit button container (flex-end)

### Buttons
- `.btn` - Base button style with transitions
- `.btn-primary` - Purple gradient button with shadow
- `.btn-ghost` - Transparent button with purple border
- `.btn-sm` - Smaller button variant
- Hover: Lifts up 4px with enhanced shadow

### Utility Classes
- `.back-to-top` - Fixed bottom-right scroll-to-top button
- `.divider` - Horizontal rule separator
- `.connect-row` - Flex container for social links
- `.connect-label` - "Connect with me:" label
- `.social-links` - Horizontal list of social icons
- `.social-item` - Individual social link wrapper
- `.social-icon` - SVG icon within social link
- `.status-badges` - Container for status badges (if needed)
- `.status-badge` - Individual badge (primary, success variants)
- `.sr-only` - Screen-reader-only text (accessibility)

### Footer
- `.site-footer` - Footer with top border
- `.footer-inner` - Flex container for content
- `.footer-nav` - Navigation links in footer

## Color Variables

```css
--color-bg: #0b0f13          /* Main background */
--color-surface: #0f1720     /* Card backgrounds */
--color-muted: #9aa6b2       /* Secondary text */
--color-text: #e6eef3        /* Primary text */
--color-accent: #7c5cff      /* Purple accent (PRESERVE) */
--color-accent-600: #5a3cff  /* Darker purple */
--font-heading: 'Inter'      /* Heading font */
--radius: 12px               /* Border radius */
--header-offset: 96px        /* Header height for scroll offset */
```

## Responsive Breakpoints

```css
/* Large screens */
@media (min-width: 1400px) { /* Extra padding, larger gaps */ }
@media (min-width: 1200px) { /* Increased container padding */ }

/* Tablet and below */
@media (max-width: 900px) {
  /* Mobile nav overlay */
  /* Single column grids */
  /* Stacked hero layout */
  /* Reduced font sizes */
}

/* Small mobile */
@media (max-width: 700px) {
  /* Further reduced spacing */
  /* Smaller typography */
  /* Adjusted button sizes */
}
```

## JavaScript Functions

### Mobile Navigation
- `mobileNav()` - Handles hamburger menu toggle
- Creates overlay when nav is open
- Closes on overlay click or Escape key
- Closes when nav link is clicked

### Smooth Scrolling
- `smoothScroll()` - Intercepts anchor link clicks
- Smooth scrolls to section with offset
- Updates URL without page jump

### Typing Animation
- `typingEffect()` - Rotates through job titles
- Types character by character
- Pauses at end before erasing
- Cycles: Frontend → Fullstack → Developer → Engineer → Designer

### Active Navigation
- `activeNav()` - Uses IntersectionObserver
- Threshold: 0.5 (50% of section visible)
- Adds/removes `.active` class on nav links
- Highlights current section in view

### Scroll Effects
- `backToTop()` - Shows button after 500px scroll
- `stickyHeader()` - Adds `.scrolled` class after 16px
- `calculateHeaderOffset()` - Updates CSS variable dynamically

### Utilities
- `updateYear()` - Sets current year in footer
- `revealOnScroll()` - IntersectionObserver for reveal animations

## Section IDs (Must Match Navbar)

1. `#home` - Hero section
2. `#about` - About Me section
3. `#skills` - Technical Skills section
4. `#projects` - Featured Projects section
5. `#achievements` - Achievements & Recognition section
6. `#contact` - Contact Form section
7. External: `assets/Jayasimha_Padigeri_Resume.pdf` (Resume)

## Accessibility Features

### Semantic HTML
- `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- Proper heading hierarchy (h1 → h2 → h3)
- `<label>` elements for all form inputs

### ARIA Attributes
- `aria-label="Primary Navigation"` on nav
- `aria-label="Contact Form"` on form
- `aria-labelledby` on skill category articles
- `aria-required="true"` on required inputs
- `aria-label="required"` on asterisks
- `aria-hidden="true"` on decorative icons
- `role="list"` on achievements

### Keyboard Navigation
- All interactive elements focusable with Tab
- Focus states visible with outline
- Escape key closes mobile nav
- Enter activates links and buttons

### Screen Readers
- Descriptive link text (no "click here")
- Alt text on images (profile photo)
- `.sr-only` class for hidden labels
- Proper form field associations

## Quick Customization Guide

### Change Purple Accent Color
```css
/* In style.css */
--color-accent: #7c5cff;      /* Change hex value */
--color-accent-600: #5a3cff;  /* Adjust darker variant */
```

### Update Personal Information
```html
<!-- In index.html, About section -->
<li><strong>Location:</strong> <span>Your City, State</span></li>
<li><strong>Education:</strong> <span>Your Degree</span></li>
<li><strong>Email:</strong> <span>your.email@example.com</span></li>
```

### Modify Section Spacing
```css
/* In style.css */
.section {
  padding: 80px 0;  /* Change vertical padding */
}
```

### Adjust Typography
```css
/* In style.css */
body {
  font-size: 16px;  /* Base font size */
  line-height: 1.6; /* Base line height */
}

.section-title {
  font-size: 2.5rem;  /* Section headings */
}
```

### Change Mobile Breakpoint
```css
/* In style.css */
@media (max-width: 900px) {  /* Adjust px value */
  /* Mobile styles */
}
```

## Performance Tips

1. **Lazy load images**: Add `loading="lazy"` to `<img>` tags
2. **Minify CSS/JS**: Use build tools before production
3. **Optimize images**: Compress JPEGs, use WebP format
4. **Add caching headers**: Configure server caching
5. **Use CDN**: Host assets on CDN for faster delivery
6. **Reduce font weights**: Only load needed font variations
7. **Defer non-critical JS**: Use `defer` or `async` attributes
8. **Critical CSS**: Inline above-the-fold CSS
9. **Remove unused CSS**: Use PurgeCSS or similar
10. **Enable compression**: Gzip or Brotli on server

## SEO Checklist

- [x] Semantic HTML5 structure
- [x] Proper heading hierarchy (h1 → h2 → h3)
- [x] Descriptive page title
- [ ] Meta description (add in `<head>`)
- [ ] Open Graph tags for social sharing
- [ ] Twitter Card tags
- [ ] Favicon set
- [ ] Sitemap.xml
- [ ] Robots.txt
- [ ] Schema.org markup (Person, Organization)
- [ ] Alt text on all images
- [ ] Fast page load speed (<3s)
- [ ] Mobile-friendly (responsive design)
- [ ] HTTPS enabled

## Deployment Checklist

- [ ] Update all personal information (name, email, phone, location)
- [ ] Replace placeholder links (GitHub, LinkedIn, etc.)
- [ ] Add real project information and links
- [ ] Upload actual profile photo (`assets/images/JayaPic.jpeg`)
- [ ] Test all internal links
- [ ] Test all external links (open in new tab)
- [ ] Verify Resume PDF is accessible
- [ ] Test contact form submission
- [ ] Validate HTML (W3C validator)
- [ ] Validate CSS (W3C CSS validator)
- [ ] Check JavaScript console for errors
- [ ] Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on multiple devices (desktop, tablet, mobile)
- [ ] Test keyboard navigation
- [ ] Test screen reader compatibility
- [ ] Run Lighthouse audit (aim for 90+ scores)
- [ ] Check color contrast ratios (WCAG AA)
- [ ] Optimize images (compress, resize)
- [ ] Minify CSS and JavaScript
- [ ] Set up analytics (Google Analytics, Plausible, etc.)
- [ ] Configure custom domain (if applicable)
- [ ] Set up SSL certificate
- [ ] Create 404 error page
- [ ] Add privacy policy and terms (if collecting data)
- [ ] Submit to search engines

---

**Last Updated**: December 2024
**Version**: 2.0.0
**Maintainer**: Jayasimha Padigeri
