import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import siteConfig from '../siteConfig';
import { apartmentTypes } from '../data/apartmentsData';
import {
  ArrowRight,
  ArrowUpRight,
  Sun,
  Moon,
  Sparkles,
  Shield,
  Compass,
  CheckCircle2,
  Maximize2,
  Calendar,
  Layers,
  MapPin,
  ChevronRight
} from 'lucide-react';
import styles from './HomePage.module.css';

export default function HomePage({ onOpenBookCall, onOpenLightbox }) {
  // Day / Night Hero Mode State
  const [heroMode, setHeroMode] = useState('day'); // 'day' | 'night'

  // Active Hotspot Pin State
  const [activePin, setActivePin] = useState(null);

  // Gallery items for lightbox
  const heroGallery = [
    { src: '/assets/images/hero-day.jpg', alt: 'Aurelia Residence Day Facade', caption: 'Aurelia Residence — Exterior Facade bathed in morning light' },
    { src: '/assets/images/hero-night.jpg', alt: 'Aurelia Residence Night Facade', caption: 'Aurelia Residence — Dusk illumination and private terraces' },
    { src: '/assets/images/architecture-exterior.jpg', alt: 'Contemporary Architecture', caption: 'Bespoke contemporary architectural lines and natural stone' },
    { src: '/assets/images/amenity-pool.jpg', alt: 'Saltwater Swimming Pool', caption: 'Saltwater infinity pool and tranquil loungers' },
    { src: '/assets/images/interior-living.jpg', alt: 'Grand Living Hall', caption: 'Expansive open-plan living room with seamless terrace access' },
    { src: '/assets/images/terrace-solarium.jpg', alt: 'Rooftop Solarium', caption: 'Private rooftop solarium with 360° panoramic views' }
  ];

  return (
    <div className={styles.home}>
      {/* ======================================================== */}
      {/* SECTION 1: HERO WITH DAY/NIGHT SWITCHER & ARCHITECTURAL PINS */}
      {/* ======================================================== */}
      <section className={styles.heroSection} id="hero">
        {/* Background Image Layers with crossfade */}
        <div className={styles.heroMediaContainer}>
          <img
            src="/assets/images/hero-day.jpg"
            alt={`${siteConfig.projectName} Day View`}
            className={`${styles.heroBg} ${heroMode === 'day' ? styles.active : ''}`}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width="1920"
            height="1080"
          />
          <img
            src="/assets/images/hero-night.jpg"
            alt={`${siteConfig.projectName} Night View`}
            className={`${styles.heroBg} ${heroMode === 'night' ? styles.active : ''}`}
            loading="lazy"
            decoding="async"
            width="1920"
            height="1080"
          />
          <div className={styles.heroGradientOverlay} />
        </div>

        {/* Interactive Architectural Hotspot Pins */}
        <div className={styles.pinsLayer} aria-label="Architectural Highlights">
          {/* Pin 1: Crafted to Endure */}
          <div
            className={`${styles.pin} ${activePin === 'pin1' ? styles.pinActive : ''}`}
            style={{ top: '62.5%', left: '57.5%' }}
          >
            <button
              type="button"
              className={styles.pinBtn}
              onClick={() => setActivePin(activePin === 'pin1' ? null : 'pin1')}
              aria-label="Highlight: Crafted to Endure"
            >
              <span className={styles.pinPulse} />
              <span className={styles.pinCore} />
            </button>
            <div className={styles.pinTooltip}>
              <span className={styles.pinTitle}>Crafted to Endure</span>
              <p className={styles.pinDesc}>Artisanal natural stone facades and triple-layer acoustic insulation.</p>
            </div>
          </div>

          {/* Pin 2: Light & Flow */}
          <div
            className={`${styles.pin} ${activePin === 'pin2' ? styles.pinActive : ''}`}
            style={{ top: '58.3%', left: '26.9%' }}
          >
            <button
              type="button"
              className={styles.pinBtn}
              onClick={() => setActivePin(activePin === 'pin2' ? null : 'pin2')}
              aria-label="Highlight: Light and Flow"
            >
              <span className={styles.pinPulse} />
              <span className={styles.pinCore} />
            </button>
            <div className={styles.pinTooltip}>
              <span className={styles.pinTitle}>Light &amp; Flow</span>
              <p className={styles.pinDesc}>Floor-to-ceiling panoramic sliding glass with seamless outdoor integration.</p>
            </div>
          </div>

          {/* Pin 3: Your Private Sanctuary */}
          <div
            className={`${styles.pin} ${activePin === 'pin3' ? styles.pinActive : ''}`}
            style={{ top: '73.2%', left: '76.6%' }}
          >
            <button
              type="button"
              onClick={() => setActivePin(activePin === 'pin3' ? null : 'pin3')}
              className={styles.pinBtn}
              aria-label="Highlight: Your Private Sanctuary"
            >
              <span className={styles.pinPulse} />
              <span className={styles.pinCore} />
            </button>
            <div className={styles.pinTooltip}>
              <span className={styles.pinTitle}>Your Private Sanctuary</span>
              <p className={styles.pinDesc}>Individual entrance verandas and private rooftop solariums.</p>
            </div>
          </div>
        </div>

        {/* Hero Foreground Content */}
        <div className={`container ${styles.heroContainer}`}>
          {/* Top Hero Controls: Day / Night Switcher */}
          <div className={styles.heroControls}>
            <div className={styles.dayNightSwitcher} role="group" aria-label="View Mode">
              <button
                type="button"
                onClick={() => setHeroMode('day')}
                className={`${styles.switchBtn} ${heroMode === 'day' ? styles.switchActive : ''}`}
                aria-pressed={heroMode === 'day'}
              >
                <Sun size={14} />
                <span>by day</span>
              </button>
              <button
                type="button"
                onClick={() => setHeroMode('night')}
                className={`${styles.switchBtn} ${heroMode === 'night' ? styles.switchActive : ''}`}
                aria-pressed={heroMode === 'night'}
              >
                <Moon size={14} />
                <span>by night</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => onOpenLightbox(heroGallery, heroMode === 'day' ? 0 : 1)}
              className={styles.lightboxTrigger}
              aria-label="View full resolution photograph"
            >
              <Maximize2 size={14} />
              <span>Full Resolution</span>
            </button>
          </div>

          {/* Main Hero Title */}
          <div className={styles.heroMain}>
            <span className={styles.heroPretitle}>AHMEDABAD, GUJARAT, INDIA</span>
            <h1 className={styles.heroTitle}>
              A place <br />
              <span className={styles.italicScript}>to return</span> to
            </h1>
            <p className={styles.heroLead}>
              A boutique gated enclave of only 25 residences, designed around privacy, wellbeing and timeless architectural comfort.
            </p>
          </div>

          {/* Bottom Hero Bar with Rotating Badge CTA & Stats */}
          <div className={styles.heroBottom}>
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <span className={styles.statNum}>25</span>
                <span className={styles.statLabel}>Boutique Residences</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statItem}>
                <span className={styles.statNum}>3</span>
                <span className={styles.statLabel}>Distinct Typologies</span>
              </div>
              <div className={styles.statDivider} />
              <div className={styles.statItem}>
                <span className={styles.statNum}>Q4 2026</span>
                <span className={styles.statLabel}>Completion Target</span>
              </div>
            </div>

            {/* Rotating Circular Badge CTA */}
            <Link
              to="/apartments"
              className="rotating-badge"
              aria-label="Explore available residences catalog"
            >
              <svg className="circle-text" viewBox="0 0 100 100">
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text fill="currentColor" fontSize="8.5" fontWeight="600" letterSpacing="0.16em">
                  <textPath href="#circlePath" startOffset="0%">
                    SELECT RESIDENCE • AURELIA • 25 UNITS •
                  </textPath>
                </text>
              </svg>
              <div className="badge-icon">
                <ArrowRight size={20} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 2: ARCHITECTURAL TRANSITION RIBBON */}
      {/* ======================================================== */}
      <section className={styles.ribbonSection}>
        <div className={`container ${styles.ribbonContainer}`}>
          <div className={styles.ribbonText}>
            <span>A place to live</span>
            <span className={styles.ribbonDot}>&middot;</span>
            <span className={styles.ribbonItalic}>to return year after year</span>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 3: CONCEPT & ATMOSPHERE (3 CARDS) */}
      {/* ======================================================== */}
      <section className={`section ${styles.conceptSection}`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionSubtitle}>PHILOSOPHY &amp; DESIGN</span>
            <h2 className={styles.sectionTitle}>Designed as a community, not a complex</h2>
            <p className={styles.sectionDesc}>
              Drawing on timeless Mediterranean architectural traditions and warm regional stone, {siteConfig.projectName} balances clean modernist lines with lush natural surroundings.
            </p>
          </div>

          <div className={styles.conceptGrid}>
            {/* Card 1: Real-Life Location */}
            <div className={styles.conceptCard}>
              <div
                className={styles.cardImageWrapper}
                onClick={() => onOpenLightbox(heroGallery, 2)}
                role="button"
                tabIndex={0}
                aria-label="View architecture exterior photo"
              >
                <img
                  src="/assets/images/architecture-exterior.jpg"
                  alt="Contemporary facade"
                  className={styles.cardImg}
                  loading="lazy"
                  width="1200"
                  height="800"
                />
                <div className={styles.zoomPill}>
                  <Maximize2 size={13} />
                  <span>Zoom</span>
                </div>
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardIndex}>01</span>
                <h3 className={styles.cardTitle}>Real-Life Location</h3>
                <p className={styles.cardText}>
                  Nestled in the tranquil enclave of 24 Skyline Avenue, Ahmedabad, enjoying seamless arterial access to premier business centers, fine dining, and prestigious clubs while offering an oasis of calm.
                </p>
              </div>
            </div>

            {/* Card 2: Built to Stay */}
            <div className={styles.conceptCard}>
              <div
                className={styles.cardImageWrapper}
                onClick={() => onOpenLightbox(heroGallery, 4)}
                role="button"
                tabIndex={0}
                aria-label="View grand living room photo"
              >
                <img
                  src="/assets/images/interior-living.jpg"
                  alt="Grand interior living room"
                  className={styles.cardImg}
                  loading="lazy"
                  width="1200"
                  height="800"
                />
                <div className={styles.zoomPill}>
                  <Maximize2 size={13} />
                  <span>Zoom</span>
                </div>
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardIndex}>02</span>
                <h3 className={styles.cardTitle}>Built to Stay</h3>
                <p className={styles.cardText}>
                  Constructed with enduring thermal performance, underfloor heating throughout, acoustic insulation, and solid masonry that ages gracefully across generations.
                </p>
              </div>
            </div>

            {/* Card 3: Boutique Concept */}
            <div className={styles.conceptCard}>
              <div
                className={styles.cardImageWrapper}
                onClick={() => onOpenLightbox(heroGallery, 3)}
                role="button"
                tabIndex={0}
                aria-label="View saltwater pool photo"
              >
                <img
                  src="/assets/images/amenity-pool.jpg"
                  alt="Saltwater pool & gardens"
                  className={styles.cardImg}
                  loading="lazy"
                  width="1200"
                  height="800"
                />
                <div className={styles.zoomPill}>
                  <Maximize2 size={13} />
                  <span>Zoom</span>
                </div>
              </div>
              <div className={styles.cardContent}>
                <span className={styles.cardIndex}>03</span>
                <h3 className={styles.cardTitle}>Boutique Concept</h3>
                <p className={styles.cardText}>
                  Limited to only 25 residences. Each home is treated with individual character, generous outdoor terraces, and private elevator lobbies that foster peaceful intimacy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 4: WALKING PATHS STATEMENT BANNER */}
      {/* ======================================================== */}
      <section className={styles.statementSection}>
        <div className={`container ${styles.statementContainer}`}>
          <blockquote className={styles.statementQuote}>
            &ldquo;Instead of corridors, landscaped walking paths connect the apartments — making {siteConfig.projectName} feel closer to a group of private villas than a standard apartment complex.&rdquo;
          </blockquote>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 5: RESIDENCE TYPOLOGIES SHOWCASE */}
      {/* ======================================================== */}
      <section className={`section ${styles.residencesSection}`}>
        <div className="container">
          <div className={styles.residencesHeader}>
            <div>
              <span className={styles.sectionSubtitle}>CURATED LIVING</span>
              <h2 className={styles.sectionTitle}>Three Architectural Archetypes</h2>
            </div>
            <Link to="/apartments" className="btn-outline">
              <span>View All 25 Residences</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className={styles.typesGrid}>
            {/* Type 1: Ground Floor + Basement */}
            <div className={styles.typeCard}>
              <div className={styles.typeMedia}>
                <img
                  src="/assets/images/amenity-garden.jpg"
                  alt="Ground floor terrace and garden"
                  className={styles.typeImg}
                  loading="lazy"
                />
                <span className={styles.typeBadge}>6 Residences Available</span>
              </div>
              <div className={styles.typeContent}>
                <h3 className={styles.typeTitle}>Ground Floor + Basement</h3>
                <div className={styles.typeSpecs}>
                  <span>3 Bedrooms</span>
                  <span className={styles.specDot}>&middot;</span>
                  <span>132 — 134 m² Interior</span>
                  <span className={styles.specDot}>&middot;</span>
                  <span>+ 44 m² Terrace</span>
                </div>
                <p className={styles.typeDesc}>
                  Features a dedicated multi-purpose lower level (46 m²) perfect for a private cinema, wine cellar, or home wellness studio, coupled with direct ground-level garden terraces.
                </p>
                <div className={styles.typeFooter}>
                  <Link
                    to="/apartments?type=ground-floor-basement"
                    className={styles.exploreLink}
                  >
                    <span>Explore Ground + Basement</span>
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Type 2: Ground Floor Garden */}
            <div className={styles.typeCard}>
              <div className={styles.typeMedia}>
                <img
                  src="/assets/images/interior-living.jpg"
                  alt="Ground floor garden residence"
                  className={styles.typeImg}
                  loading="lazy"
                />
                <span className={styles.typeBadge}>9 Residences Available</span>
              </div>
              <div className={styles.typeContent}>
                <h3 className={styles.typeTitle}>Ground Floor Garden</h3>
                <div className={styles.typeSpecs}>
                  <span>2 — 3 Bedrooms</span>
                  <span className={styles.specDot}>&middot;</span>
                  <span>75 — 105 m² Interior</span>
                  <span className={styles.specDot}>&middot;</span>
                  <span>+ 29 m² Garden Terrace</span>
                </div>
                <p className={styles.typeDesc}>
                  Single-level living opening directly onto your private terrace and communal botanical grounds, blending airiness with grounded ease.
                </p>
                <div className={styles.typeFooter}>
                  <Link
                    to="/apartments?type=ground-floor"
                    className={styles.exploreLink}
                  >
                    <span>Explore Garden Residences</span>
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Type 3: Penthouse Duplex */}
            <div className={styles.typeCard}>
              <div className={styles.typeMedia}>
                <img
                  src="/assets/images/terrace-solarium.jpg"
                  alt="Penthouse rooftop solarium"
                  className={styles.typeImg}
                  loading="lazy"
                />
                <span className={styles.typeBadge}>10 Residences Available</span>
              </div>
              <div className={styles.typeContent}>
                <h3 className={styles.typeTitle}>Penthouse Duplex</h3>
                <div className={styles.typeSpecs}>
                  <span>3 Bedrooms</span>
                  <span className={styles.specDot}>&middot;</span>
                  <span>135 — 140 m² Interior</span>
                  <span className={styles.specDot}>&middot;</span>
                  <span>+ 151 m² Rooftop Solarium</span>
                </div>
                <p className={styles.typeDesc}>
                  Two grand levels crowned by a private rooftop solarium with pre-installation for heated jacuzzi and outdoor summer kitchen, enjoying unobstructed skyline sunsets.
                </p>
                <div className={styles.typeFooter}>
                  <Link
                    to="/apartments?type=penthouse-duplex"
                    className={styles.exploreLink}
                  >
                    <span>Explore Penthouses</span>
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 6: SIGNATURE AMENITIES (VELVET PLUM ACCENT) */}
      {/* ======================================================== */}
      <section className={`section theme-plum ${styles.amenitiesSection}`}>
        <div className="container">
          <div className={styles.sectionHeaderLight}>
            <span className={styles.sectionSubtitleLight}>EXCLUSIVE PRIVILEGES</span>
            <h2 className={styles.sectionTitleLight}>A Haven Designed for Wellbeing</h2>
            <p className={styles.sectionDescLight}>
              Created exclusively for residents and their guests, the curated facilities at {siteConfig.projectName} foster an effortless, serene rhythm.
            </p>
          </div>

          <div className={styles.amenitiesGrid}>
            <div className={styles.amenityCard}>
              <img
                src="/assets/images/amenity-pool.jpg"
                alt="Saltwater swimming pool"
                className={styles.amenityImg}
                loading="lazy"
              />
              <div className={styles.amenityInfo}>
                <h3 className={styles.amenityTitle}>Saltwater Swimming Pool</h3>
                <p className={styles.amenityDesc}>
                  Heated saltwater infinity pool accompanied by shaded teak cabanas and children's splash pool.
                </p>
              </div>
            </div>

            <div className={styles.amenityCard}>
              <img
                src="/assets/images/amenity-spa-gym.jpg"
                alt="Serene wellness spa and gym"
                className={styles.amenityImg}
                loading="lazy"
              />
              <div className={styles.amenityInfo}>
                <h3 className={styles.amenityTitle}>Spa &amp; Movement Studio</h3>
                <p className={styles.amenityDesc}>
                  Finish Finnish sauna, thermal steam room, sensation shower, and modern Technogym equipment.
                </p>
              </div>
            </div>

            <div className={styles.amenityCard}>
              <img
                src="/assets/images/amenity-lounge.jpg"
                alt="Residents lounge"
                className={styles.amenityImg}
                loading="lazy"
              />
              <div className={styles.amenityInfo}>
                <h3 className={styles.amenityTitle}>Private Club Lounge</h3>
                <p className={styles.amenityDesc}>
                  A quiet sanctuary for reading, private client meetings, or intimate neighborhood gatherings.
                </p>
              </div>
            </div>

            <div className={styles.amenityCard}>
              <img
                src="/assets/images/amenity-parking.jpg"
                alt="Secure parking with EV stations"
                className={styles.amenityImg}
                loading="lazy"
              />
              <div className={styles.amenityInfo}>
                <h3 className={styles.amenityTitle}>Underground EV Parking</h3>
                <p className={styles.amenityDesc}>
                  Subterranean parking bay with individual pre-installed electric vehicle fast chargers and storage rooms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 7: HIGH-SPEC FINISHES & SPECIFICATIONS */}
      {/* ======================================================== */}
      <section className={`section ${styles.specsSection}`}>
        <div className="container">
          <div className={styles.specsContainer}>
            <div className={styles.specsLeft}>
              <span className={styles.sectionSubtitle}>CRAFT &amp; ENGINEERING</span>
              <h2 className={styles.sectionTitle}>
                The space to <span className={styles.italicScript}>live in</span>
              </h2>
              <p className={styles.specsIntro}>
                Every material and mechanism was specified to create residences that feel intuitive, elegant, and effortless from the very first day.
              </p>

              <div className={styles.specsList}>
                <div className={styles.specRow}>
                  <CheckCircle2 size={18} className={styles.specCheck} />
                  <div>
                    <strong>Underfloor Heating Throughout:</strong>
                    <p>Zoned hydronic heating providing uniform warmth with energy-efficient heat pump technology.</p>
                  </div>
                </div>

                <div className={styles.specRow}>
                  <CheckCircle2 size={18} className={styles.specCheck} />
                  <div>
                    <strong>Intelligent Home Automation:</strong>
                    <p>Schneider Electric DLIFE tactile switches with app and voice climate control.</p>
                  </div>
                </div>

                <div className={styles.specRow}>
                  <CheckCircle2 size={18} className={styles.specCheck} />
                  <div>
                    <strong>Smart Keyless Access:</strong>
                    <p>Encrypted biometrics and key-fob access for personal privacy and security.</p>
                  </div>
                </div>

                <div className={styles.specRow}>
                  <CheckCircle2 size={18} className={styles.specCheck} />
                  <div>
                    <strong>Motorized Aluminum Shutters:</strong>
                    <p>Adjustable solar louvers regulating natural sunlight and interior temperature.</p>
                  </div>
                </div>

                <div className={styles.specRow}>
                  <CheckCircle2 size={18} className={styles.specCheck} />
                  <div>
                    <strong>Bespoke Upgrades:</strong>
                    <p>Optional private rooftop jacuzzi installation, dedicated EV chargers, and photovoltaic solar panels.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.specsRight}>
              <div className={styles.specImgBox}>
                <img
                  src="/assets/images/interior-kitchen.jpg"
                  alt="Minimalist designer kitchen"
                  className={styles.specMainImg}
                  loading="lazy"
                />
              </div>
              <div className={styles.specSubImgBox}>
                <img
                  src="/assets/images/interior-bathroom.jpg"
                  alt="Stone bathroom vanity"
                  className={styles.specSubImg}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 8: LOCATION & CONNECTIVITY */}
      {/* ======================================================== */}
      <section className={`section ${styles.locationSection}`}>
        <div className="container">
          <div className={styles.locationGrid}>
            <div className={styles.locationInfo}>
              <span className={styles.sectionSubtitle}>PRIME LOCATION</span>
              <h2 className={styles.sectionTitle}>24 Skyline Avenue, Ahmedabad</h2>
              <p className={styles.locationText}>
                Surrounded by verdant tree-lined avenues, premier golf links, and prestigious civic institutions. A location conceived not around hurried transit, but around returning home.
              </p>

              <div className={styles.distancesList}>
                <div className={styles.distanceItem}>
                  <span className={styles.distanceTime}>10 mins</span>
                  <span className={styles.distanceDest}>SG Highway Financial &amp; Tech Hub</span>
                </div>
                <div className={styles.distanceItem}>
                  <span className={styles.distanceTime}>15 mins</span>
                  <span className={styles.distanceDest}>Premier International Schools &amp; Universities</span>
                </div>
                <div className={styles.distanceItem}>
                  <span className={styles.distanceTime}>20 mins</span>
                  <span className={styles.distanceDest}>Sardar Vallabhbhai Patel International Airport</span>
                </div>
                <div className={styles.distanceItem}>
                  <span className={styles.distanceTime}>5 mins</span>
                  <span className={styles.distanceDest}>Exclusive Sports Clubs &amp; Wellness Enclaves</span>
                </div>
              </div>

              <Link to="/contact" className="btn-primary">
                <span>View Enclave Map &amp; Directions</span>
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className={styles.locationMedia}>
              <img
                src="/assets/images/location-neighborhood.jpg"
                alt="Neighborhood surroundings"
                className={styles.locationImg}
                loading="lazy"
              />
              <div className={styles.locationCardOverlay}>
                <MapPin size={20} className={styles.mapPinIcon} />
                <div>
                  <strong>{siteConfig.projectName}</strong>
                  <p>{siteConfig.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 9: HIGH-IMPACT SKYLINE CTA */}
      {/* ======================================================== */}
      <section className={`section theme-dark ${styles.ctaSection}`}>
        <div className={styles.ctaBackground}>
          <img
            src="/assets/images/terrace-solarium.jpg"
            alt="Skyline panorama"
            className={styles.ctaBgImg}
            loading="lazy"
          />
          <div className={styles.ctaDarkOverlay} />
        </div>

        <div className={`container ${styles.ctaContainer}`}>
          <span className={styles.sectionSubtitleLight}>UNPARALLELED VISTAS</span>
          <h2 className={styles.ctaTitle}>
            Perfect skyline views <br />
            <span className={styles.italicScript}>from rooftop</span> terraces
          </h2>
          <p className={styles.ctaLead}>
            A short conversation is enough to understand which residence fits your lifestyle — whether it is a private garden home, an expansive duplex, or a rooftop sky retreat.
          </p>

          <div className={styles.ctaActions}>
            <button
              type="button"
              onClick={onOpenBookCall}
              className="btn-primary"
            >
              <span>Book a Private Call</span>
              <ArrowUpRight size={16} />
            </button>

            <Link to="/apartments" className="btn-outline">
              <span>Browse Catalog (25 Units)</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
