# Aurelia Residence - Implementation Checklist

## REA Reference Site Analysis (Completed)
- [x] Step 5A Setup: Verified REA MCP tools and `rea` CLI v6.7.0.
- [x] Step 5A Browser Availability: Confirmed Google Chrome (`C:\Program Files\Google\Chrome\Application\chrome.exe`) and Edge.
- [x] Step 5A Browser Capture: Captured reference site (`https://www.era-residence.com/`) at Desktop (1440px), Tablet (768px), and Mobile (375px).
- [x] Step 5A Internal Pages: Captured `/apartments`, `/contact`, and `/apartments/011` at Desktop and Mobile.
- [x] Step 5A Artifacts Stored: Saved raw output JSON, extracted DOM, a11y trees, screenshots, and CSS tokens to `rea-output/`.
- [x] Extracted Design System:
  - Palette: `#f3f3ec` (Alabaster stone), `#17233b` (Midnight navy), `#340c24` (Velvet plum), `#b5cedb` (Powder sky), `#f8bbcb` (Blush bloom).
  - Typography: Serif display headers (Cormorant Garamond), geometric extended sans-serif body (Plus Jakarta Sans).
  - Breakpoints: Desktop (1440px / 1200px), Tablet (991px / 768px), Mobile (479px / 360px).

## Phase 1: Architecture & Core Pages (Completed)
- [x] Project scaffolding: Vite 6 + React 18, React Router v6, modular CSS with CSS variables.
- [x] Centralized Config: `src/siteConfig.js` exporting exact values for `projectName`, `companyName`, `tagline`, `address`, `phone`, `email`, `website`, `instagram`, `facebook`, `youtube`, `linkedin`, `whatsapp`, `formEndpoint`.
- [x] Navigation & Header:
  - [x] Wordmark logo "AURELIA RESIDENCE"
  - [x] Desktop navigation (`Select an Apartment`, `Book a call`, `Contact`)
  - [x] Fullscreen overlay menu with keyboard accessibility (ESC, focus trap)
  - [x] Mobile navigation bar and toggle button
- [x] Home Page (`/`):
  - [x] Hero Section: Panoramic facade with Day/Night toggle, interactive hotspot architectural pins ("Crafted to Endure", "Light & Flow", "Your Private Sanctuary"), rotating badge CTA.
  - [x] Project Overview / Concept Section: Boutique community concept, 25 residences, walking paths and private atmosphere.
  - [x] Real-Life Location Section: Prime connectivity to city hubs in Ahmedabad.
  - [x] Residence Types Showcase: 3 unit archetypes (Ground floor + basement, Ground floor garden, Penthouse duplex) with specs and explore CTAs.
  - [x] Amenities Section: Saltwater pool, sauna & wellness shower, lush landscaped gardens, EV parking, private clubhouse.
  - [x] Specifications & Finishes Section: Underfloor heating, climate automation, smart lock access, motorized shutters, high-end fixtures.
  - [x] Architecture & Design Section: Modernist aesthetic, natural materials, bespoke living spaces.
  - [x] Developer & Timeline Section: Aurelia Living Spaces, RERA registration placeholder, license & completion timeline (Q4 2026).
  - [x] Skyline Views CTA Section: High-impact banner with consultation trigger.
- [x] Apartments Catalog Page (`/apartments`):
  - [x] Type filters: All (25), Ground Floor + Basement, Ground Floor Garden, Penthouse Duplex.
  - [x] Bedroom & Block filters (2-Bed, 3-Bed, Block B1/B2/B3).
  - [x] Residence cards grid: image, floor, bedroom count, interior area (m² & sq.ft), terrace area, price/status placeholder.
  - [x] Direct link to unit detail / floor plan view.
- [x] Apartment Unit Detail View (`/apartments/:id`):
  - [x] Unit header with number, block, floor, bedroom & terrace stats.
  - [x] Interactive Floor Plan viewer with SVG architectural layout and level tabs.
  - [x] Unit photo gallery with thumbnail selector and fullscreen lightbox trigger.
  - [x] Specifications & included premium finishes.
  - [x] Direct booking / inquiry trigger for this specific residence.
- [x] Contact Page (`/contact`):
  - [x] Direct contact cards (Sales office, phone, email, WhatsApp, hours placeholder).
  - [x] Interactive location map section with custom dark luxury map styling.
  - [x] Consultation / Call Request Form with client-side validation.
- [x] Consultation / "Book a call" Modal / Drawer:
  - [x] Global accessibility from header CTA, sticky bar, or section buttons.
  - [x] Honest status feedback: "Form not connected yet - connect formEndpoint in siteConfig.js".
- [x] Footer:
  - [x] Wordmark, tagline, sales office address, phone link, email link, WhatsApp link, social media links.
  - [x] "Images are for illustration purposes only" disclaimer.
  - [x] Privacy Policy & Terms of Use modal.
  - [x] Smooth "Back to top" button.

## Phase 2: Interactions, Animations & Media (Completed)
- [x] Day / Night facade interactive switcher on Hero.
- [x] Interactive pins on Hero facade revealing architectural features.
- [x] Rotating circular badge CTA ("SELECT RESIDENCE • AURELIA • 25 UNITS").
- [x] Lightbox Gallery with keyboard controls (Arrow keys, ESC, image counter, close button).
- [x] Floor Plan interactive viewer / tabs with switchable levels (Ground level, Lower level / Basement, Upper level / Solarium).
- [x] Smooth scrolling integration using Lenis with reduced-motion support.
- [x] High-Resolution Asset Curation:
  - [x] Sharp, color-graded, warm Mediterranean / modern luxury photography (>= 2400px for heroes, >= 1600px for cards).
  - [x] Preloaded LCP hero image and responsive layout.
  - [x] Curated `CREDITS.md` with source URLs, photographers, and licenses.

## Phase 3: Performance, SEO & Polish (Completed)
- [x] SEO Metadata: Meta tags, Open Graph, Twitter Cards, canonical URL derived from `siteConfig.js`.
- [x] Structured Data: Schema.org `RealEstateListing` & `Organization` JSON-LD.
- [x] Accessibility (WCAG 2.1 AA): Visible focus rings, ARIA labels, semantic elements, reduced motion media query support.
- [x] Responsive Verification: Verified at 360px, 768px, 1024px, 1440px with no horizontal overflow.
- [x] Zero Identity Leak verification: Case-insensitive check across 38 files for original reference names/links returned 0 matches.
- [x] Production build (`npm run build`) passed with zero errors.
- [x] Lighthouse Desktop Scores verified:
  - Performance: **92** ($\ge$ 85)
  - Accessibility: **94** ($\ge$ 90)
  - Best Practices: **100**
  - SEO: **92** ($\ge$ 90)
