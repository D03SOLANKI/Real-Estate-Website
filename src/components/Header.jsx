import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import siteConfig from '../siteConfig';
import { Menu, X, ArrowUpRight, Phone, MessageSquare } from 'lucide-react';
import styles from './Header.module.css';

export default function Header({ onOpenBookCall }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Handle ESC key to close menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}
        role="banner"
      >
        <div className={`container ${styles.headerContainer}`}>
          {/* Logo / Brand Wordmark */}
          <Link
            to="/"
            className={styles.brandLink}
            aria-label={`${siteConfig.projectName} Home`}
          >
            <span className="brand-wordmark">
              <span className="brand-dot" aria-hidden="true" />
              {siteConfig.projectName.toUpperCase()}
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className={styles.desktopNav} aria-label="Main Navigation">
            <Link
              to="/apartments"
              className={`${styles.navLink} ${
                location.pathname === '/apartments' ? styles.active : ''
              }`}
            >
              <span>Select an Apartment</span>
            </Link>

            <button
              type="button"
              onClick={onOpenBookCall}
              className={styles.navLink}
              aria-haspopup="dialog"
            >
              <span>Book a call</span>
            </button>

            <Link
              to="/contact"
              className={`${styles.navLink} ${
                location.pathname === '/contact' ? styles.active : ''
              }`}
            >
              <span>Contact</span>
            </Link>
          </nav>

          {/* Quick Contact & Menu Toggle */}
          <div className={styles.headerRight}>
            <a
              href={siteConfig.telLink}
              className={styles.phoneLink}
              aria-label={`Call ${siteConfig.phone}`}
            >
              <Phone size={14} className={styles.phoneIcon} />
              <span>{siteConfig.phone}</span>
            </a>

            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={styles.menuToggle}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <span className={styles.menuLabel}>
                {isMenuOpen ? 'Close' : 'Menu'}
              </span>
              <div className={styles.menuIconBox}>
                {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Overlay Modal Menu */}
      <div
        className={`${styles.menuOverlay} ${isMenuOpen ? styles.open : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site Navigation"
      >
        <div className={styles.menuBackdrop} onClick={() => setIsMenuOpen(false)} />
        <div className={styles.menuContent}>
          <div className={styles.menuHeader}>
            <span className="brand-wordmark">
              <span className="brand-dot" />
              {siteConfig.projectName.toUpperCase()}
            </span>
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              className={styles.closeBtn}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <div className={styles.menuBody}>
            <div className={styles.menuColMain}>
              <span className={styles.menuSectionLabel}>EXPLORE</span>
              <nav className={styles.overlayNav}>
                <Link to="/" className={styles.overlayLink}>
                  <span className={styles.overlayNum}>01</span>
                  <span className={styles.overlayText}>Home</span>
                </Link>
                <Link to="/apartments" className={styles.overlayLink}>
                  <span className={styles.overlayNum}>02</span>
                  <span className={styles.overlayText}>Residences</span>
                </Link>
                <Link to="/apartments?type=ground-floor-basement" className={styles.overlaySubLink}>
                  Ground Floor + Basement
                </Link>
                <Link to="/apartments?type=ground-floor" className={styles.overlaySubLink}>
                  Ground Floor Garden
                </Link>
                <Link to="/apartments?type=penthouse-duplex" className={styles.overlaySubLink}>
                  Penthouse Duplex
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenBookCall();
                  }}
                  className={styles.overlayLinkBtn}
                >
                  <span className={styles.overlayNum}>03</span>
                  <span className={styles.overlayText}>Book a Call</span>
                </button>
                <Link to="/contact" className={styles.overlayLink}>
                  <span className={styles.overlayNum}>04</span>
                  <span className={styles.overlayText}>Contact</span>
                </Link>
              </nav>
            </div>

            <div className={styles.menuColContact}>
              <span className={styles.menuSectionLabel}>SALES OFFICE</span>
              <p className={styles.menuAddress}>{siteConfig.address}</p>
              
              <div className={styles.menuContactLinks}>
                <a href={siteConfig.telLink} className={styles.menuContactItem}>
                  <Phone size={14} />
                  <span>{siteConfig.phone}</span>
                </a>
                <a href={siteConfig.mailLink} className={styles.menuContactItem}>
                  <MessageSquare size={14} />
                  <span>{siteConfig.email}</span>
                </a>
                <a
                  href={siteConfig.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.menuContactItem}
                >
                  <ArrowUpRight size={14} />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>

              <div className={styles.menuSocials}>
                <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  Instagram
                </a>
                <a href={siteConfig.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  Facebook
                </a>
                <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  LinkedIn
                </a>
                <a href={siteConfig.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
