import React, { useState } from 'react';
import siteConfig from '../siteConfig';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowUpRight,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Navigation,
  Compass
} from 'lucide-react';
import styles from './ContactPage.module.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
    agreedToPrivacy: true
  });

  const [formStatus, setFormStatus] = useState('idle'); // idle | submitting | submitted
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (formData.phone.replace(/\D/g, '').length < 8) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.agreedToPrivacy) {
      errs.agreedToPrivacy = 'Please accept the privacy terms';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('submitted');
    }, 600);
  };

  return (
    <div className={styles.contactPage}>
      {/* Header Banner */}
      <section className={styles.headerSection}>
        <div className={`container ${styles.headerContainer}`}>
          <span className={styles.categoryLabel}>GET IN TOUCH</span>
          <h1 className={styles.pageTitle}>Contact &amp; Private Gallery</h1>
          <p className={styles.pageSubtitle}>
            Our private client advisory team is at your disposal for confidential appointments, floor plan reviews, and enclave site visits.
          </p>
        </div>
      </section>

      {/* Main Grid: Info + Contact Form */}
      <section className={`section ${styles.mainSection}`}>
        <div className="container">
          <div className={styles.contentGrid}>
            {/* Left: Contact Cards */}
            <div className={styles.infoCol}>
              <div className={styles.infoCard}>
                <span className={styles.cardHeaderSmall}>SALES GALLERY</span>
                <h3 className={styles.cardHeading}>Aurelia Residence Sales Office</h3>
                <p className={styles.cardAddress}>
                  <MapPin size={18} className={styles.pinIcon} />
                  <span>{siteConfig.address}</span>
                </p>
                <div className={styles.hoursBox}>
                  <Clock size={16} className={styles.pinIcon} />
                  <span>{siteConfig.officeHours}</span>
                </div>
              </div>

              <div className={styles.contactMethods}>
                <a href={siteConfig.telLink} className={styles.methodCard}>
                  <div className={styles.methodIconBox}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className={styles.methodLabel}>Direct Telephone</span>
                    <strong className={styles.methodValue}>{siteConfig.phone}</strong>
                  </div>
                  <ArrowUpRight size={16} className={styles.arrowIcon} />
                </a>

                <a href={siteConfig.mailLink} className={styles.methodCard}>
                  <div className={styles.methodIconBox}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className={styles.methodLabel}>Email Advisory</span>
                    <strong className={styles.methodValue}>{siteConfig.email}</strong>
                  </div>
                  <ArrowUpRight size={16} className={styles.arrowIcon} />
                </a>

                <a
                  href={siteConfig.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.methodCard}
                >
                  <div className={styles.methodIconBox}>
                    <MessageSquare size={20} />
                  </div>
                  <div>
                    <span className={styles.methodLabel}>WhatsApp Concierge</span>
                    <strong className={styles.methodValue}>Instant Private Chat</strong>
                  </div>
                  <ArrowUpRight size={16} className={styles.arrowIcon} />
                </a>
              </div>

              {/* RERA and Legal Notice */}
              <div className={styles.reraNoticeCard}>
                <strong>Statutory Compliance:</strong>
                <p>Gujarat RERA Registration: <code>{siteConfig.reraNumber}</code></p>
                <p>Developer: {siteConfig.companyName}</p>
              </div>
            </div>

            {/* Right: Direct Message Form */}
            <div className={styles.formCol}>
              <div className={styles.formWrapper}>
                {formStatus === 'submitted' ? (
                  <div className={styles.successState}>
                    <div className={styles.successIcon}>
                      <CheckCircle size={44} />
                    </div>
                    <h3 className={styles.successTitle}>Inquiry Registered</h3>
                    <p className={styles.successText}>
                      Thank you, <strong>{formData.name}</strong>. Your message regarding {siteConfig.projectName} has been recorded.
                    </p>

                    {/* Honest notice as required by Section 7 */}
                    <div className={styles.endpointAlert}>
                      <AlertCircle size={18} className={styles.alertIcon} />
                      <div>
                        <strong>Form Endpoint Status:</strong>
                        <p>
                          No external submission service is connected yet (as configured in <code>src/siteConfig.js</code>). Connect Formspree or EmailJS when ready for production delivery.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setFormStatus('idle');
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          subject: 'General Inquiry',
                          message: '',
                          agreedToPrivacy: true
                        });
                      }}
                      className="btn-outline"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className={styles.formTitle}>Send a Private Message</h3>
                    <p className={styles.formSubtitle}>
                      Fill in the details below and an Aurelia client advisor will reply promptly.
                    </p>

                    <form onSubmit={handleSubmit} noValidate className={styles.contactForm}>
                      <div className={styles.field}>
                        <label htmlFor="contact-name" className={styles.label}>Full Name *</label>
                        <input
                          id="contact-name"
                          type="text"
                          placeholder="Your complete name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                        />
                        {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
                      </div>

                      <div className={styles.formRow}>
                        <div className={styles.field}>
                          <label htmlFor="contact-email" className={styles.label}>Email Address *</label>
                          <input
                            id="contact-email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                          />
                          {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
                        </div>

                        <div className={styles.field}>
                          <label htmlFor="contact-phone" className={styles.label}>Telephone *</label>
                          <input
                            id="contact-phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                          />
                          {errors.phone && <span className={styles.errorMsg}>{errors.phone}</span>}
                        </div>
                      </div>

                      <div className={styles.field}>
                        <label htmlFor="contact-subject" className={styles.label}>Area of Interest</label>
                        <select
                          id="contact-subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className={styles.select}
                        >
                          <option value="General Inquiry">General Residence Inquiry</option>
                          <option value="Ground Floor + Basement">Ground Floor + Basement (132 – 134 m²)</option>
                          <option value="Ground Floor Garden">Ground Floor Garden (75 – 105 m²)</option>
                          <option value="Penthouse Duplex">Penthouse Duplex + Rooftop Solarium (135 – 140 m²)</option>
                          <option value="Site Viewing">Private Enclave Site Viewing</option>
                        </select>
                      </div>

                      <div className={styles.field}>
                        <label htmlFor="contact-message" className={styles.label}>Message</label>
                        <textarea
                          id="contact-message"
                          rows={4}
                          placeholder="Please let us know how we can assist you..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className={styles.textarea}
                        />
                      </div>

                      <div className={styles.consentGroup}>
                        <input
                          id="contact-privacy"
                          type="checkbox"
                          checked={formData.agreedToPrivacy}
                          onChange={(e) => setFormData({ ...formData, agreedToPrivacy: e.target.checked })}
                          className={styles.checkbox}
                        />
                        <label htmlFor="contact-privacy" className={styles.consentLabel}>
                          I agree to {siteConfig.companyName} processing my data in accordance with the Privacy Policy.
                        </label>
                      </div>
                      {errors.agreedToPrivacy && <span className={styles.errorMsg}>{errors.agreedToPrivacy}</span>}

                      <button
                        type="submit"
                        disabled={formStatus === 'submitting'}
                        className={`btn-primary ${styles.submitBtn}`}
                      >
                        <span>{formStatus === 'submitting' ? 'Transmitting Request...' : 'Submit Inquiry'}</span>
                        <ArrowUpRight size={16} />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Visualizer Section */}
      <section className={`section ${styles.mapSection}`}>
        <div className="container">
          <div className={styles.mapHeader}>
            <span className={styles.categoryLabel}>ENCLAVE LOCATION</span>
            <h2 className={styles.mapTitle}>How to Find Us</h2>
            <p className={styles.mapSubtitle}>
              Situated at 24 Skyline Avenue, Ahmedabad, with rapid connections to international transport hubs and financial avenues.
            </p>
          </div>

          <div className={styles.mapGraphicWrapper}>
            <svg
              className={styles.mapSvg}
              viewBox="0 0 1000 500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <style>
                  {`
                    .map-bg { fill: #17233b; }
                    .map-grid { stroke: rgba(243, 243, 236, 0.06); stroke-width: 1; }
                    .map-road-major { stroke: rgba(181, 206, 219, 0.35); stroke-width: 6; fill: none; stroke-linecap: round; }
                    .map-road-minor { stroke: rgba(243, 243, 236, 0.12); stroke-width: 2.5; fill: none; }
                    .map-water { fill: #1f3150; }
                    .map-park { fill: #1c2c42; }
                    .map-text { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 11px; fill: rgba(243, 243, 236, 0.6); letter-spacing: 0.05em; }
                    .map-pin-pulse { fill: #340c24; animation: pulsePin 2s infinite; opacity: 0.6; }
                  `}
                </style>
              </defs>

              {/* Dark luxury background */}
              <rect width="1000" height="500" className="map-bg" />

              {/* Grid lines */}
              <line x1="0" y1="100" x2="1000" y2="100" className="map-grid" />
              <line x1="0" y1="250" x2="1000" y2="250" className="map-grid" />
              <line x1="0" y1="400" x2="1000" y2="400" className="map-grid" />
              <line x1="200" y1="0" x2="200" y2="500" className="map-grid" />
              <line x1="500" y1="0" x2="500" y2="500" className="map-grid" />
              <line x1="800" y1="0" x2="800" y2="500" className="map-grid" />

              {/* Sabarmati Riverfront / Water Feature representation */}
              <path d="M 120,0 Q 180,200 130,500 L 80,500 Q 130,200 70,0 Z" className="map-water" />
              <text x="110" y="280" className="map-text" transform="rotate(-75 110 280)">River Promenade</text>

              {/* Landscaped Greenery Enclave */}
              <rect x="420" y="160" width="240" height="180" rx="20" className="map-park" />
              <text x="540" y="195" text-anchor="middle" className="map-text">Skyline Botanical Enclave</text>

              {/* Road network */}
              <path d="M 0,220 L 1000,220" className="map-road-major" />
              <text x="820" y="208" className="map-text">Skyline Avenue Arterial</text>

              <path d="M 500,0 L 500,500" className="map-road-major" />
              <text x="515" y="60" className="map-text">Airport &amp; Business Expressway</text>

              <path d="M 280,0 L 280,500" className="map-road-minor" />
              <path d="M 720,0 L 720,500" className="map-road-minor" />
              <path d="M 0,360 L 1000,360" className="map-road-minor" />
              <path d="M 0,90 L 1000,90" className="map-road-minor" />

              {/* Landmarks */}
              <circle cx="820" cy="110" r="6" fill="#b5cedb" />
              <text x="835" y="114" className="map-text">Golf Club (10 min)</text>

              <circle cx="280" cy="90" r="6" fill="#b5cedb" />
              <text x="295" y="94" className="map-text">International Airport (20 min)</text>

              <circle cx="720" cy="380" r="6" fill="#b5cedb" />
              <text x="735" y="384" className="map-text">SG Highway Tech Corridor</text>

              {/* AURELIA RESIDENCE HERO PIN */}
              <g transform="translate(500, 220)">
                <circle cx="0" cy="0" r="30" fill="#340c24" opacity="0.25" />
                <circle cx="0" cy="0" r="18" fill="#340c24" />
                <circle cx="0" cy="0" r="6" fill="#ffffff" />
                
                {/* Callout box */}
                <g transform="translate(0, -55)">
                  <rect x="-110" y="-35" width="220" height="42" rx="8" fill="#ffffff" stroke="#340c24" stroke-width="2" />
                  <text x="0" y="-18" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="700" fill="#17233b">
                    AURELIA RESIDENCE
                  </text>
                  <text x="0" y="-4" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="500" fill="rgba(23,35,59,0.7)">
                    24 Skyline Avenue, Ahmedabad
                  </text>
                  <polygon points="0,7 -8,-1 8,-1" fill="#ffffff" stroke="#340c24" stroke-width="1" />
                </g>
              </g>

              {/* Compass */}
              <g transform="translate(940, 60)">
                <circle cx="0" cy="0" r="20" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" />
                <polygon points="0,-16 4,0 -4,0" fill="#f8bbcb" />
                <polygon points="0,16 3,0 -3,0" fill="#b5cedb" opacity="0.5" />
                <text x="0" y="-18" text-anchor="middle" font-family="'Plus Jakarta Sans', sans-serif" font-size="9" font-weight="700" fill="#ffffff">N</text>
              </g>
            </svg>

            <div className={styles.mapDirectionsPrompt}>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <Navigation size={15} />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
