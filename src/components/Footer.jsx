import React from 'react';
import { Link } from 'react-router-dom';
import siteConfig from '../siteConfig';
import { ArrowUp, ArrowUpRight, Phone, Mail, MapPin } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer({ onOpenBookCall, onOpenLegalModal }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={`container ${styles.footerContainer}`}>
        {/* Top Banner Row */}
        <div className={styles.topRow}>
          <div>
            <span className={styles.brandSubtitle}>{siteConfig.companyName} Presents</span>
            <h2 className={styles.brandTitle}>{siteConfig.projectName}</h2>
            <p className={styles.tagline}>{siteConfig.tagline}</p>
          </div>

          <div className={styles.topActions}>
            <button
              type="button"
              onClick={onOpenBookCall}
              className="btn-primary"
            >
              <span>Schedule Private Consultation</span>
              <ArrowUpRight size={16} />
            </button>

            <button
              type="button"
              onClick={scrollToTop}
              className={styles.scrollTopBtn}
              aria-label="Back to top"
            >
              <span>To top</span>
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Main Grid Columns */}
        <div className={styles.grid}>
          {/* Column 1: Sales Office & Location */}
          <div className={styles.col}>
            <h6 className={styles.colHeading}>Sales Gallery &amp; Enclave</h6>
            <p className={styles.address}>
              <MapPin size={16} className={styles.inlineIcon} />
              <span>{siteConfig.address}</span>
            </p>
            <p className={styles.hours}>
              <span>Office Hours: {siteConfig.officeHours}</span>
            </p>
            <p className={styles.rera}>
              <span>RERA Registration: {siteConfig.reraNumber}</span>
            </p>
          </div>

          {/* Column 2: Direct Contact */}
          <div className={styles.col}>
            <h6 className={styles.colHeading}>Direct Enquiries</h6>
            <div className={styles.linkList}>
              <a href={siteConfig.telLink} className={styles.contactLink}>
                <Phone size={15} />
                <span>{siteConfig.phone}</span>
              </a>
              <a href={siteConfig.mailLink} className={styles.contactLink}>
                <Mail size={15} />
                <span>{siteConfig.email}</span>
              </a>
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                <ArrowUpRight size={15} />
                <span>WhatsApp Private Desk</span>
              </a>
            </div>
          </div>

          {/* Column 3: Quick Navigation */}
          <div className={styles.col}>
            <h6 className={styles.colHeading}>Navigation</h6>
            <div className={styles.linkList}>
              <Link to="/" className={styles.textLink}>Project Overview</Link>
              <Link to="/apartments" className={styles.textLink}>All Residences</Link>
              <Link to="/apartments?type=ground-floor-basement" className={styles.textLink}>Ground Floor + Basement</Link>
              <Link to="/apartments?type=ground-floor" className={styles.textLink}>Ground Floor Garden</Link>
              <Link to="/apartments?type=penthouse-duplex" className={styles.textLink}>Penthouse Duplex</Link>
              <Link to="/contact" className={styles.textLink}>Location &amp; Visit</Link>
            </div>
          </div>

          {/* Column 4: Social Presence */}
          <div className={styles.col}>
            <h6 className={styles.colHeading}>Social Channels</h6>
            <div className={styles.socialGrid}>
              <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <span>Instagram</span>
                <ArrowUpRight size={14} />
              </a>
              <a href={siteConfig.facebook} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <span>Facebook</span>
                <ArrowUpRight size={14} />
              </a>
              <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <span>LinkedIn</span>
                <ArrowUpRight size={14} />
              </a>
              <a href={siteConfig.youtube} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <span>YouTube</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className={styles.bottomRow}>
          <div className={styles.disclaimerBox}>
            <p className={styles.disclaimerText}>
              Images are for illustration purposes only. Plans, dimensions, and specifications are subject to architectural refinement.
            </p>
          </div>

          <div className={styles.legalBox}>
            <span className={styles.copyright}>
              &copy; 2026 {siteConfig.companyName}. All rights reserved.
            </span>
            <div className={styles.legalLinks}>
              <button
                type="button"
                onClick={() => onOpenLegalModal('privacy')}
                className={styles.legalBtn}
              >
                Privacy Policy
              </button>
              <span className={styles.dot}>&middot;</span>
              <button
                type="button"
                onClick={() => onOpenLegalModal('terms')}
                className={styles.legalBtn}
              >
                Terms of Use
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
