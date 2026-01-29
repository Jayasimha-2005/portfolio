# Portfolio Template

A modern, professional portfolio website template with dark theme and purple accent. Perfect for developers, designers, and freelancers to showcase their work.

## ✨ Features

- 🎨 **Modern Design**: Clean, professional layout inspired by top developer portfolios
- 🌙 **Dark Theme**: Easy on the eyes with customizable purple accent color
- 📱 **Fully Responsive**: Perfect on mobile, tablet, and desktop
- ♿ **Accessible**: WCAG compliant with keyboard navigation and screen reader support
- 🚀 **Performance**: Fast loading with CSS-only animations
- 🎯 **SEO Ready**: Semantic HTML5 structure
- ⚡ **No Dependencies**: Pure HTML, CSS, and vanilla JavaScript

## 🎯 Sections

1. **Hero** - Eye-catching introduction with status badges and profile photo
2. **About** - Professional bio with core competencies and contact info
3. **Skills** - Technical skills organized by category
4. **Projects** - Showcase your work with featured projects
5. **Achievements** - Highlight awards, hackathons, and recognitions
6. **Contact** - Easy-to-use contact form

## 🚀 Quick Start

### 1. Clone or Download

```bash
git clone https://github.com/YOUR-USERNAME/portfolio.git
cd portfolio
```

Or download as ZIP and extract.

### 2. Customize Your Information

#### Update Personal Details (index.html)

**Hero Section:**
- Change name in `<h1 class="hero-name">`
- Update roles in typing animation (lines 76-80)
- Modify status badges ("Open to Work", "Freelancer")
- Edit description paragraph
- Update button links (Resume, Contact)

**About Section:**
- Replace headline and paragraphs
- Update core competencies
- Change location, education, email
- Update "Open to Opportunities" status
- Modify social links (GitHub, LinkedIn, Email, Phone)

**Skills Section:**
- Edit skill categories and lists
- Add/remove technologies as needed

**Projects Section:**
- Replace project cards with your own
- Update titles, descriptions, tech stacks
- Change GitHub and Live links
- Mark featured projects with `class="project-card featured"`

**Achievements Section:**
- Add your awards, hackathon wins, recognitions
- Change emoji icons as desired
- Update titles and descriptions

**Contact Section:**
- Form submits to `mailto:` by default
- Update email address in form action
- Or integrate with backend API (FormSpree, Netlify Forms, etc.)

#### Add Your Profile Photo

Replace `assets/images/JayaPic.jpeg` with your photo:

**Option 1 - Using PowerShell Script:**
```powershell
cd scripts
.\add-image.ps1 -Source 'C:\path\to\your\photo.jpg'
```

**Option 2 - Manual:**
- Copy your photo to `assets/images/`
- Rename to `JayaPic.jpeg` or update HTML reference
- Recommended size: 1200×1200px (square)

#### Update Resume

- Replace `assets/Jayasimha_Padigeri_Resume.pdf` with your resume
- Keep filename or update in navbar link

### 3. Customize Colors

Change the purple accent color in `css/style.css`:

```css
:root {
  --color-accent: #7c5cff;      /* Your primary color */
  --color-accent-600: #5a3cff;  /* Darker variant */
}
```

Popular alternatives:
- **Blue**: `#3b82f6` / `#2563eb`
- **Green**: `#10b981` / `#059669`
- **Orange**: `#f59e0b` / `#d97706`
- **Pink**: `#ec4899` / `#db2777`

### 4. Test Locally

Simply open `index.html` in your browser. No build process required!

### 5. Deploy

**GitHub Pages:**
```bash
# Enable GitHub Pages in repository settings
# Choose main branch / root folder
# Your site will be live at: https://YOUR-USERNAME.github.io/portfolio
```

**Vercel:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Netlify:**
- Drag & drop the portfolio folder to netlify.com/drop
- Or connect GitHub repository for automatic deployments

## 📁 Project Structure

```
portfolio/
├── index.html              # Main HTML file
├── README.md               # This file
├── assets/
│   ├── icons/              # Icon files
│   ├── images/
│   │   └── JayaPic.jpeg    # Your profile photo
│   └── Jayasimha_Padigeri_Resume.pdf  # Your resume
├── css/
│   └── style.css           # All styles
├── js/
│   └── main.js             # JavaScript functionality
└── scripts/
    └── add-image.ps1       # Helper script for images
```

## 🎨 Customization Guide

### Typography

```css
/* In style.css */
body {
  font-size: 16px;       /* Base font size */
  line-height: 1.6;      /* Base line height */
}

.hero-name {
  font-size: 4rem;       /* Hero heading */
}

.section-title {
  font-size: 3rem;       /* Section headings */
}
```

### Spacing

```css
/* Section vertical spacing */
.section {
  padding: 120px 0;      /* Desktop */
}

@media (max-width: 900px) {
  .section {
    padding: 80px 0;     /* Tablet */
  }
}

@media (max-width: 700px) {
  .section {
    padding: 60px 0;     /* Mobile */
  }
}
```

### Buttons

Four button variants available:

```html
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-outline">Outline</button>
<button class="btn btn-ghost">Ghost</button>
```

### Status Badges

```html
<span class="status-badge badge-success">✓ Available</span>
<span class="status-badge badge-primary">Freelancer</span>
```

## 🔧 Advanced Features

### Contact Form Integration

#### FormSpree (Recommended)
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <!-- Your form fields -->
</form>
```

#### Netlify Forms
```html
<form name="contact" method="POST" data-netlify="true">
  <!-- Your form fields -->
</form>
```

### Add Project Images

1. Add images to `assets/images/projects/`
2. Update project cards with image tags
3. Style images in CSS

### Analytics Integration

Add Google Analytics or your preferred analytics tool in the `<head>` section.

### SEO Optimization

Add meta tags for better search engine visibility and social sharing.

## ♿ Accessibility Features

- ✅ Semantic HTML5 structure
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Focus states visible
- ✅ Screen reader friendly
- ✅ Color contrast WCAG AA compliant
- ✅ Alt text on all images
- ✅ Proper heading hierarchy

## 📱 Responsive Breakpoints

```css
1400px+   /* Extra large screens */
1200px+   /* Large desktops */
900px     /* Tablets */
700px     /* Mobile */
```

## 🎯 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Opera (latest)

## 📊 Performance Tips

1. **Optimize Images**: Compress images before uploading
2. **Lazy Loading**: Add `loading="lazy"` to images
3. **Minify CSS/JS**: Use build tools for production
4. **Enable Caching**: Configure server caching headers
5. **Use CDN**: Host assets on CDN for faster delivery

## 🐛 Troubleshooting

### Typing Animation Not Working
- Check browser console for JavaScript errors
- Ensure `main.js` is loaded before `</body>`
- Verify element IDs match in HTML and JS

### Navigation Not Highlighting
- Ensure section IDs match navbar hrefs exactly
- Check scroll-margin-top is set on sections

### Mobile Menu Not Opening
- Check hamburger button click handler
- Verify element IDs

### Form Not Submitting
- Update `mailto:` email address
- Or integrate with FormSpree/Netlify Forms

## 📄 License

MIT License - feel free to use this template for your personal or commercial projects!

## 🙏 Acknowledgments

- Design inspired by top developer portfolios
- Color palette: Dark theme with purple accent (#7c5cff)

---

**Made with ❤️ by developers, for developers**

⭐ Star this repo if you found it helpful!

---

**Version**: 2.0.0  
**Last Updated**: January 2026  
**Status**: ✅ Production Ready
