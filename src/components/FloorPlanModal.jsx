import React, { useEffect, useState } from 'react';
import { X, Maximize2, Download, Check, Compass, Layers } from 'lucide-react';
import siteConfig from '../siteConfig';
import styles from './FloorPlanModal.module.css';

export default function FloorPlanModal({ isOpen, apartment, onClose, onOpenBookCall }) {
  const [activeLevel, setActiveLevel] = useState('main'); // 'main' | 'secondary'

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setActiveLevel('main');
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen || !apartment) return null;

  const hasTwoLevels = apartment.type === 'ground-floor-basement' || apartment.type === 'penthouse-duplex';

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="plan-dialog-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.card}>
        {/* Modal Header */}
        <div className={styles.header}>
          <div>
            <span className={styles.subTitle}>ARCHITECTURAL DRAWINGS &middot; {apartment.block}</span>
            <h2 id="plan-dialog-title" className={styles.title}>
              {apartment.number} — {apartment.typeName}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className={styles.closeBtn}
            aria-label="Close floor plan viewer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Level Selector Tabs if multi-level */}
        {hasTwoLevels && (
          <div className={styles.levelTabs}>
            <button
              type="button"
              onClick={() => setActiveLevel('main')}
              className={`${styles.levelTab} ${activeLevel === 'main' ? styles.levelTabActive : ''}`}
            >
              <Layers size={14} />
              <span>
                {apartment.type === 'ground-floor-basement' ? 'Ground Living Level' : 'Main Residence Floor'}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveLevel('secondary')}
              className={`${styles.levelTab} ${activeLevel === 'secondary' ? styles.levelTabActive : ''}`}
            >
              <Layers size={14} />
              <span>
                {apartment.type === 'ground-floor-basement' ? 'Lower Leisure Level (46 m²)' : 'Private Rooftop Solarium (151 m²)'}
              </span>
            </button>
          </div>
        )}

        {/* Plan SVG Canvas Container */}
        <div className={styles.svgViewer}>
          <img
            src={apartment.planSvg}
            alt={`Architectural schematic layout for ${apartment.number}`}
            className={styles.planImage}
          />
        </div>

        {/* Specs and Dimensions Bar */}
        <div className={styles.footerBar}>
          <div className={styles.specsSummary}>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Interior Built:</span>
              <span className={styles.specValue}>{apartment.interiorArea} m² ({apartment.interiorAreaSqFt} sq.ft)</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Terrace / Outdoor:</span>
              <span className={styles.specValue}>{apartment.terraceArea} m² ({apartment.terraceAreaSqFt} sq.ft)</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Bedrooms / Baths:</span>
              <span className={styles.specValue}>{apartment.bedrooms} Bed &middot; {apartment.bathrooms} Bath</span>
            </div>
            <div className={styles.specItem}>
              <span className={styles.specLabel}>Orientation:</span>
              <span className={styles.specValue}>South-West (Optimal Sunlight)</span>
            </div>
          </div>

          <div className={styles.actionButtons}>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenBookCall(apartment.type);
              }}
              className="btn-primary"
            >
              <span>Inquire About {apartment.number}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
