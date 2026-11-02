import React, { useEffect } from 'react';
import siteConfig from '../siteConfig';
import { X } from 'lucide-react';
import styles from './LegalModal.module.css';

export default function LegalModal({ isOpen, type, onClose }) {
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
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.card}>
        <div className={styles.header}>
          <h3 id="legal-modal-title" className={styles.title}>
            {type === 'privacy' ? 'Privacy Policy' : 'Terms of Use'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className={styles.closeBtn}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        <div className={styles.body}>
          {type === 'privacy' ? (
            <>
              <p className={styles.lead}>
                This Privacy Policy sets out how {siteConfig.companyName} collects, uses, and safeguards information provided by visitors and clients of <strong>{siteConfig.projectName}</strong>.
              </p>

              <h4>1. Information We Collect</h4>
              <p>
                When inquiring about {siteConfig.projectName}, you may provide personal details including your name, email address, telephone number, and residential preferences.
              </p>

              <h4>2. Use of Information</h4>
              <p>
                We use collected information solely to respond to consultation requests, coordinate private viewing sessions, share project updates, and fulfill legal requirements under applicable real estate regulations.
              </p>

              <h4>3. Data Security</h4>
              <p>
                We employ standard industry administrative and technical measures to safeguard your personal data from unauthorized access or disclosure.
              </p>

              <h4>4. Contact</h4>
              <p>
                For questions regarding this policy or your personal data, contact us at <a href={siteConfig.mailLink}>{siteConfig.email}</a> or call <a href={siteConfig.telLink}>{siteConfig.phone}</a>.
              </p>
            </>
          ) : (
            <>
              <p className={styles.lead}>
                Terms and Conditions governing the use of the <strong>{siteConfig.projectName}</strong> official website, published by {siteConfig.companyName}.
              </p>

              <h4>1. Illustrative Nature of Materials</h4>
              <p>
                All photographs, architectural renders, floor plans, specifications, unit areas, and virtual tours presented on this website are for conceptual and illustrative purposes only. They do not constitute an offer, contract, or binding warranty.
              </p>

              <h4>2. Intellectual Property</h4>
              <p>
                All text, graphics, vector plans, visual layouts, and brand assets of {siteConfig.projectName} are the proprietary intellectual property of {siteConfig.companyName}.
              </p>

              <h4>3. Project Modifications</h4>
              <p>
                The developer reserves the right to make modifications, substitutions, and adjustments to architectural finishes, layouts, and amenities in compliance with municipal building codes and RERA statutory requirements ({siteConfig.reraNumber}).
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
