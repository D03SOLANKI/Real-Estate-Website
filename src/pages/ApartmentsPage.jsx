import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { apartments, apartmentTypes } from '../data/apartmentsData';
import siteConfig from '../siteConfig';
import {
  Filter,
  ArrowRight,
  Maximize2,
  Bed,
  Layers,
  ArrowUpRight,
  Eye,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import styles from './ApartmentsPage.module.css';

export default function ApartmentsPage({ onOpenBookCall, onOpenFloorPlanModal }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeType = searchParams.get('type') || 'all';
  const [selectedBedrooms, setSelectedBedrooms] = useState('all');
  const [selectedBlock, setSelectedBlock] = useState('all');

  const handleTypeChange = (type) => {
    if (type === 'all') {
      searchParams.delete('type');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ type });
    }
  };

  const filteredApartments = useMemo(() => {
    return apartments.filter((apt) => {
      // Type filter
      if (activeType !== 'all' && apt.type !== activeType) return false;
      // Bedrooms filter
      if (selectedBedrooms !== 'all' && apt.bedrooms !== parseInt(selectedBedrooms, 10)) return false;
      // Block filter
      if (selectedBlock !== 'all' && apt.block !== selectedBlock) return false;
      return true;
    });
  }, [activeType, selectedBedrooms, selectedBlock]);

  return (
    <div className={styles.apartmentsPage}>
      {/* Page Header */}
      <section className={styles.headerSection}>
        <div className={`container ${styles.headerContainer}`}>
          <span className={styles.breadcrumb}>
            <Link to="/">Home</Link>
            <span className={styles.slash}>/</span>
            <span>Residences</span>
          </span>

          <h1 className={styles.pageTitle}>Select an Apartment</h1>
          <p className={styles.pageSubtitle}>
            A boutique collection of only 25 gated homes, designed for seclusion, natural illumination, and timeless Mediterranean comfort.
          </p>

          <div className={styles.conceptBadges}>
            <span className={styles.badgeItem}>
              <Sparkles size={14} />
              <span>Boutique Concept (25 Units)</span>
            </span>
            <span className={styles.badgeItem}>
              <Layers size={14} />
              <span>Crafted to Endure</span>
            </span>
            <span className={styles.badgeItem}>
              <CheckCircle size={14} />
              <span>Completion: {siteConfig.completionDate}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Filter Bar & Controls */}
      <section className={styles.filterSection}>
        <div className="container">
          {/* Main Typology Tabs */}
          <div className={styles.typeTabs} role="tablist" aria-label="Apartment Typologies">
            {apartmentTypes.map((tab) => (
              <button
                key={tab.type}
                role="tab"
                aria-selected={activeType === tab.type}
                onClick={() => handleTypeChange(tab.type)}
                className={`${styles.tabBtn} ${activeType === tab.type ? styles.tabActive : ''}`}
              >
                <span>{tab.label}</span>
                <span className={styles.tabCount}>({tab.count})</span>
              </button>
            ))}
          </div>

          {/* Secondary Filter Controls */}
          <div className={styles.secondaryFilters}>
            <div className={styles.filterItem}>
              <label htmlFor="bed-filter" className={styles.filterLabel}>Bedrooms:</label>
              <select
                id="bed-filter"
                value={selectedBedrooms}
                onChange={(e) => setSelectedBedrooms(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">All Configurations</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
              </select>
            </div>

            <div className={styles.filterItem}>
              <label htmlFor="block-filter" className={styles.filterLabel}>Building Block:</label>
              <select
                id="block-filter"
                value={selectedBlock}
                onChange={(e) => setSelectedBlock(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">All Enclave Blocks</option>
                <option value="Block B1">Block B1</option>
                <option value="Block B2">Block B2</option>
                <option value="Block B3">Block B3</option>
              </select>
            </div>

            <div className={styles.resultsCount}>
              <span>Showing <strong>{filteredApartments.length}</strong> of 25 residences</span>
            </div>
          </div>
        </div>
      </section>

      {/* Apartments Grid */}
      <section className={`section ${styles.gridSection}`}>
        <div className="container">
          {filteredApartments.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No residences match your selected criteria.</p>
              <button
                type="button"
                onClick={() => {
                  handleTypeChange('all');
                  setSelectedBedrooms('all');
                  setSelectedBlock('all');
                }}
                className="btn-outline"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className={styles.grid}>
              {filteredApartments.map((apt) => (
                <div key={apt.id} className={styles.unitCard}>
                  {/* Card Media Box */}
                  <div className={styles.unitMedia}>
                    <img
                      src={apt.heroImage}
                      alt={`${apt.number} ${apt.typeName}`}
                      className={styles.unitImg}
                      loading="lazy"
                      width="800"
                      height="500"
                    />

                    <div className={styles.mediaBadges}>
                      <span className={styles.numberBadge}>{apt.number}</span>
                      <span className={styles.blockBadge}>{apt.block}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onOpenFloorPlanModal(apt)}
                      className={styles.quickPlanBtn}
                      aria-label={`Preview architectural floor plan for ${apt.number}`}
                    >
                      <Layers size={14} />
                      <span>View Floor Plan</span>
                    </button>
                  </div>

                  {/* Card Details */}
                  <div className={styles.unitDetails}>
                    <div className={styles.unitHeader}>
                      <span className={styles.unitTypeName}>{apt.typeName}</span>
                      <span className={`${styles.statusPill} ${apt.status === 'Available' ? styles.statusAvailable : styles.statusReserved}`}>
                        {apt.status}
                      </span>
                    </div>

                    <h3 className={styles.unitNumberHeading}>
                      <Link to={`/apartments/${apt.id}`}>
                        {apt.number} &middot; {apt.floorName}
                      </Link>
                    </h3>

                    <div className={styles.specsRow}>
                      <div className={styles.specBox}>
                        <span className={styles.specVal}>{apt.bedrooms} Bed</span>
                        <span className={styles.specSub}>{apt.bathrooms} Baths</span>
                      </div>
                      <div className={styles.specDivider} />
                      <div className={styles.specBox}>
                        <span className={styles.specVal}>{apt.interiorArea} m²</span>
                        <span className={styles.specSub}>{apt.interiorAreaSqFt} sq.ft</span>
                      </div>
                      <div className={styles.specDivider} />
                      <div className={styles.specBox}>
                        <span className={styles.specVal}>+{apt.terraceArea} m²</span>
                        <span className={styles.specSub}>Terrace</span>
                      </div>
                    </div>

                    <div className={styles.unitActions}>
                      <Link
                        to={`/apartments/${apt.id}`}
                        className={styles.detailBtn}
                      >
                        <span>Specifications &amp; Layout</span>
                        <ArrowRight size={15} />
                      </Link>

                      <button
                        type="button"
                        onClick={() => onOpenBookCall(apt.type)}
                        className={styles.inquireBtn}
                        aria-label={`Inquire about ${apt.number}`}
                      >
                        <span>Enquire</span>
                        <ArrowUpRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Bottom Consultation Banner */}
      <section className={`section theme-plum ${styles.bottomBanner}`}>
        <div className={`container ${styles.bannerContainer}`}>
          <div>
            <span className={styles.bannerSub}>PERSONALIZED GUIDANCE</span>
            <h2 className={styles.bannerTitle}>Find the Residence Made for You</h2>
            <p className={styles.bannerDesc}>
              Our sales advisors are available for private consultations, digital walkthroughs, and bespoke financial structuring.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onOpenBookCall(activeType !== 'all' ? activeType : 'all')}
            className="btn-primary"
          >
            <span>Book a Private Call</span>
            <ArrowUpRight size={16} />
          </button>
        </div>
      </section>
    </div>
  );
}
