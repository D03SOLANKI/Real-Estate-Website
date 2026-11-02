# Aurelia Residence — Luxury Real Estate Web Application

A complete, responsive real estate website built in **React + Vite**, following the layout, section hierarchy, typography style, spacing, animations, and interactions of the reference architecture under the new **Aurelia Residence** brand identity.

---

## Brand Identity & Centralized Configuration
All identity parameters are strictly centralized in [`src/siteConfig.js`](file:///c:/DemoRealEstateWebsite/src/siteConfig.js):
- **Project Name:** Aurelia Residence
- **Developer:** Aurelia Living Spaces
- **Tagline:** Modern Living, Timeless Comfort
- **Address:** 24 Skyline Avenue, Ahmedabad, Gujarat, India
- **Phone:** `+91 98765 43210`
- **Email:** `hello@aurelialiving.example`
- **Website:** `https://aurelialiving.example`
- **WhatsApp:** `+919876543210` (`https://wa.me/919876543210`)
- **Socials:** Instagram, Facebook, YouTube, LinkedIn

---

## Tech Stack & Architecture
- **Framework:** React 18 + Vite 6
- **Routing:** React Router v6 (dynamic residence unit routing, catalog filtering, location view)
- **Styling:** Modern modular CSS with CSS Custom Properties (Design Tokens extracted from reference)
- **Smooth Inertial Scrolling:** Lenis with `prefers-reduced-motion` compliance
- **Vector Architectural Schematics:** Custom in-house SVGs for all 3 residential archetypes
- **Zero Secrets / API Keys:** Fully client-side with honest backend connection states

---

## Getting Started

### 1. Installation
```bash
npm install
```

### 2. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the development build.

### 3. Production Build & Preview
```bash
npm run build
npm run preview
```
The production bundle will be served at [http://localhost:4173](http://localhost:4173).

---

## Quality & Verification
- **Lighthouse Desktop (Production Build):**
  - **Performance:** **92**
  - **Accessibility:** **94**
  - **Best Practices:** **100**
  - **SEO:** **92**
- **Zero Identity Leaks:** Automated regex audit verified 0 matches for legacy reference brand terms.
- **Responsive Layout:** Tested at 360px, 768px, 1024px, and 1440px with zero horizontal overflow.
- **Asset Attribution:** Documented in [`CREDITS.md`](file:///c:/DemoRealEstateWebsite/CREDITS.md).
- **QA Report:** Detailed in [`QA_REPORT.md`](file:///c:/DemoRealEstateWebsite/QA_REPORT.md).
