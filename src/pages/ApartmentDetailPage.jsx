import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { apartments } from '../data/apartmentsData';
import siteConfig from '../siteConfig';
import {
  ArrowLeft,
  ArrowRight,
  Maximize2,
  Phone,
  ArrowUpRight,
  CheckCircle,
  Layers,
  MapPin,
  Calendar,
  ShieldCheck,
  Zap,
  Home,
  Check
} from 'lucide-react';
import styles from './ApartmentDetailPage.module.css';

export default function ApartmentDetailPage({ onOpenBookCall, onOpenLightbox, onOpenFloorPlanModal }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const apartment = apartments.find((a) => a.id === id) || apartments[0];
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Gallery images formatted for lightbox
  const galleryItems = (apartment.gallery || [apartment.heroImage]).map((src) => ({
    src,
    alt: `${apartment.number} - ${apartment.typeName}`,
    caption: `${apartment.number} · ${apartment.typeName} (${apartment.block})`
  }));

  // Similar units from same category
  const similarUnits = apartments
    .filter((a) => a.id !== apartment.id && a.type === apartment.type)
    .slice(0, 3);

  return (
    <div className={styles.detailPage}>
      {/* Top Breadcrumb & Back bar */}
      <section className={styles.topBar}>
        <div className={`container ${styles.topBarContainer}`}>
          <Link to="/apartments" className={styles.backLink}>
            <ArrowLeft size={16} />
            <span>Back to All Residences</span>
          </Link>

          <span className={styles.topMeta}>
            {apartment.block} &middot; {apartment.floorName}
          </span>
        </div>
      </section>

      {/* Main Residence Hero Section */}
      <section className={`section ${styles.heroSection}`}>
        <div className="container">
          <div className={styles.heroGrid}>
            {/* Left: Gallery & Floor Plan */}
            <div className={styles.mediaCol}>
              <div
                className={styles.mainImageWrapper}
                onClick={() => onOpenLightbox(galleryItems, activeImgIndex)}
                role="button"
                tabIndex={0}
                aria-label="Open image in full resolution lightbox"
              >
                <img
                  src={galleryItems[activeImgIndex]?.src || apartment.heroImage}
                  alt={apartment.number}
                  className={styles.mainImage}
                  width="1200"
                  height="750"
                />
                <button
                  type="button"
                  className={styles.lightboxPill}
                  aria-label="Enlarge photograph"
                >
                  <Maximize2 size={14} />
                  <span>View Fullscreen</span>
                </button>
              </div>

              {/* Thumbnails */}
              {galleryItems.length > 1 && (
                <div className={styles.thumbnails}>
                  {galleryItems.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImgIndex(idx)}
                      className={`${styles.thumbBtn} ${activeImgIndex === idx ? styles.thumbActive : ''}`}
                      aria-label={`View photo ${idx + 1}`}
                    >
                      <img src={item.src} alt="" className={styles.thumbImg} />
                    </button>
                  ))}
                </div>
              )}

              {/* Vector Floor Plan Callout Card */}
              <div className={styles.planCard}>
                <div className={styles.planCardHeader}>
                  <div>
                    <span className={styles.planSub}>ARCHITECTURAL DRAWING</span>
                    <h3 className={styles.planTitle}>Floor Plan &amp; Spatial Layout</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpenFloorPlanModal(apartment)}
                    className="btn-outline"
                  >
                    <Maximize2 size={14} />
                    <span>Enlarge Plan</span>
                  </button>
                </div>

                <div
                  className={styles.planSvgContainer}
                  onClick={() => onOpenFloorPlanModal(apartment)}
                >
                  <img
                    src={apartment.planSvg}
                    alt={`Architectural floor plan for ${apartment.number}`}
                    className={styles.planSvgImg}
                  />
                </div>
              </div>
            </div>

            {/* Right: Sticky Details & Inquire Card */}
            <div className={styles.infoCol}>
              <div className={styles.stickyCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.badgeRow}>
                    <span className={styles.typeBadge}>{apartment.typeName}</span>
                    <span className={`${styles.statusBadge} ${apartment.status === 'Available' ? styles.statusAvail : styles.statusRes}`}>
                      {apartment.status}
                    </span>
                  </div>

                  <h1 className={styles.unitTitle}>{apartment.number}</h1>
                  <p className={styles.blockFloor}>
                    {apartment.block} &middot; {apartment.floorName} &middot; Completion: {apartment.completion}
                  </p>
                </div>

                {/* Key Metrics Grid */}
                <div className={styles.metricsGrid}>
                  <div className={styles.metricItem}>
                    <span className={styles.metricVal}>{apartment.bedrooms}</span>
                    <span className={styles.metricLabel}>Bedrooms</span>
                  </div>
                  <div className={styles.metricItem}>
                    <span className={styles.metricVal}>{apartment.bathrooms}</span>
                    <span className={styles.metricLabel}>Bathrooms</span>
                  </div>
                  <div className={styles.metricItem}>
                    <span className={styles.metricVal}>{apartment.interiorArea} m²</span>
                    <span className={styles.metricLabel}>Interior ({apartment.interiorAreaSqFt} sq.ft)</span>
                  </div>
                  <div className={styles.metricItem}>
                    <span className={styles.metricVal}>{apartment.terraceArea} m²</span>
                    <span className={styles.metricLabel}>Terrace Area</span>
                  </div>
                  {apartment.gardenArea && (
                    <div className={styles.metricItem}>
                      <span className={styles.metricVal}>{apartment.gardenArea} m²</span>
                      <span className={styles.metricLabel}>Private Garden</span>
                    </div>
                  )}
                  {apartment.type === 'penthouse-duplex' && (
                    <div className={styles.metricItem}>
                      <span className={styles.metricVal}>151 m²</span>
                      <span className={styles.metricLabel}>Rooftop Solarium</span>
                    </div>
                  )}
                </div>

                {/* Price Placeholder */}
                <div className={styles.priceRow}>
                  <span className={styles.priceLabel}>Price:</span>
                  <span className={styles.priceVal}>{apartment.price}</span>
                </div>

                {/* Action CTAs */}
                <div className={styles.cardActions}>
                  <button
                    type="button"
                    onClick={() => onOpenBookCall(apartment.type)}
                    className={`btn-primary ${styles.primaryActionBtn}`}
                  >
                    <span>Schedule Private Viewing</span>
                    <ArrowUpRight size={16} />
                  </button>

                  <div className={styles.directButtons}>
                    <a href={siteConfig.telLink} className="btn-outline">
                      <Phone size={14} />
                      <span>{siteConfig.phone}</span>
                    </a>
                    <a
                      href={siteConfig.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline"
                    >
                      <ArrowUpRight size={14} />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Specifications List */}
                <div className={styles.specsListSection}>
                  <h4 className={styles.specsHeading}>Included Premium Finishes</h4>
                  <ul className={styles.featuresList}>
                    {apartment.features.map((feat, idx) => (
                      <li key={idx} className={styles.featureItem}>
                        <Check size={15} className={styles.featureIcon} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Residences Section */}
      {similarUnits.length > 0 && (
        <section className={`section ${styles.similarSection}`}>
          <div className="container">
            <div className={styles.similarHeader}>
              <span className={styles.sectionSubtitle}>EXPLORE ALTERNATIVES</span>
              <h2 className={styles.similarTitle}>Similar Residences in {apartment.typeName}</h2>
            </div>

            <div className={styles.similarGrid}>
              {similarUnits.map((sim) => (
                <Link
                  key={sim.id}
                  to={`/apartments/${sim.id}`}
                  className={styles.simCard}
                >
                  <div className={styles.simMedia}>
                    <img src={sim.heroImage} alt={sim.number} className={styles.simImg} />
                    <span className={styles.simBadge}>{sim.number}</span>
                  </div>
                  <div className={styles.simContent}>
                    <h4 className={styles.simName}>{sim.number} &middot; {sim.block}</h4>
                    <p className={styles.simSpecs}>
                      {sim.bedrooms} Bed &middot; {sim.interiorArea} m² &middot; +{sim.terraceArea} m² Terrace
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
