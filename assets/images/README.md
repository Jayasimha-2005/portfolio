This folder contains images used by the portfolio site.

To add your headshot so it appears on the homepage, place the image file in this folder. The project references `assets/images/JayaPic.jpeg` by default now, but you can also use `headshot.jpg` if you prefer.

Examples:

  `assets/images/JayaPic.jpeg`
  `assets/images/headshot.jpg`

You can use the helper script from the project root to copy a local file into this folder (PowerShell):

  cd scripts
  .\add-image.ps1 -Source 'C:\path\to\your\photo.jpg'

Or copy manually to `assets/images/JayaPic.jpeg` (or `headshot.jpg`).

Recommended image size: 1200×1200 or similar square crop. The CSS will scale and crop via `object-fit: cover`.
