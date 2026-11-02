import React, { useState, useEffect, useRef } from 'react';
import siteConfig from '../siteConfig';
import { X, CheckCircle, AlertCircle, Phone, ArrowUpRight } from 'lucide-react';
import styles from './BookCallModal.module.css';

export default function BookCallModal({ isOpen, onClose, defaultType }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    residenceType: defaultType || 'all',
    message: '',
    agreedToPrivacy: true
  });

  const [status, setStatus] = useState('idle'); // idle | submitting | submitted
  const [errors, setErrors] = useState({});
  const modalRef = useRef(null);

  useEffect(() => {
    if (defaultType) {
      setFormData(prev => ({ ...prev, residenceType: defaultType }));
    }
  }, [defaultType]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Trap focus & lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setStatus('idle');
      setErrors({});
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Contact telephone is required';
    } else if (formData.phone.replace(/\D/g, '').length < 8) {
      errs.phone = 'Please enter a valid phone number';
    }
    if (!formData.agreedToPrivacy) {
      errs.agreedToPrivacy = 'You must agree to the privacy terms';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');

    setTimeout(() => {
      setStatus('submitted');
    }, 600);
  };

  return (
    <div
      className={styles.modalBackdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="book-call-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={styles.modalCard} ref={modalRef}>
        <button
          type="button"
          onClick={onClose}
          className={styles.closeBtn}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {status === 'submitted' ? (
          <div className={styles.successState}>
            <div className={styles.successIcon}>
              <CheckCircle size={48} className={styles.checkIcon} />
            </div>
            <h3 className={styles.successTitle}>Inquiry Logged</h3>
            <p className={styles.successMessage}>
              Thank you, <strong>{formData.name}</strong>. Your consultation request for <strong>{siteConfig.projectName}</strong> has been received by the sales desk.
            </p>
            
            {/* Honest Endpoint Notice required by spec */}
            <div className={styles.endpointNotice}>
              <AlertCircle size={18} className={styles.noticeIcon} />
              <div>
                <strong>Form Integration Status:</strong>
                <p>
                  Form endpoint is not connected yet (as configured in <code>siteConfig.js</code>). Connect a live service (e.g. Formspree or EmailJS) to dispatch live notifications.
                </p>
              </div>
            </div>

            <div className={styles.directContactPrompt}>
              <p>For immediate private assistance, you may reach our sales team directly:</p>
              <div className={styles.directButtons}>
                <a href={siteConfig.telLink} className="btn-primary">
                  <Phone size={15} />
                  <span>Call {siteConfig.phone}</span>
                </a>
                <a
                  href={siteConfig.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  <ArrowUpRight size={15} />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className={styles.doneBtn}
            >
              Close Window
            </button>
          </div>
        ) : (
          <div className={styles.formContent}>
            <div className={styles.modalHeader}>
              <span className={styles.modalCategory}>EXCLUSIVE CONSULTATION</span>
              <h3 id="book-call-title" className={styles.modalTitle}>
                Book a Private Call
              </h3>
              <p className={styles.modalSubtitle}>
                Leave your details and a dedicated private client advisor from {siteConfig.companyName} will contact you within 24 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className={styles.form}>
              <div className={styles.inputGroup}>
                <label htmlFor="modal-name" className={styles.label}>
                  Your Name *
                </label>
                <input
                  id="modal-name"
                  type="text"
                  placeholder="e.g. Alexander Wright"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                />
                {errors.name && <span className={styles.errorText}>{errors.name}</span>}
              </div>

              <div className={styles.twoCol}>
                <div className={styles.inputGroup}>
                  <label htmlFor="modal-email" className={styles.label}>
                    Email Address *
                  </label>
                  <input
                    id="modal-email"
                    type="email"
                    placeholder="alexander@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  />
                  {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="modal-phone" className={styles.label}>
                    Phone Number *
                  </label>
                  <input
                    id="modal-phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                  />
                  {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="modal-residence" className={styles.label}>
                  Residence Type of Interest
                </label>
                <select
                  id="modal-residence"
                  value={formData.residenceType}
                  onChange={(e) => setFormData({ ...formData, residenceType: e.target.value })}
                  className={styles.select}
                >
                  <option value="all">Any / General Inquiry (25 Boutique Residences)</option>
                  <option value="ground-floor-basement">Ground Floor + Basement (132 – 134 m²)</option>
                  <option value="ground-floor">Ground Floor Garden (75 – 105 m²)</option>
                  <option value="penthouse-duplex">Penthouse Duplex + Rooftop Solarium (135 – 140 m²)</option>
                </select>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="modal-message" className={styles.label}>
                  Message or Specific Requests (Optional)
                </label>
                <textarea
                  id="modal-message"
                  rows={3}
                  placeholder="Tell us about your requirements or preferred time to connect..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={styles.textarea}
                />
              </div>

              <div className={styles.checkboxGroup}>
                <input
                  id="modal-privacy"
                  type="checkbox"
                  checked={formData.agreedToPrivacy}
                  onChange={(e) => setFormData({ ...formData, agreedToPrivacy: e.target.checked })}
                  className={styles.checkbox}
                />
                <label htmlFor="modal-privacy" className={styles.checkboxLabel}>
                  I consent to {siteConfig.companyName} contacting me regarding property information and private viewing appointments.
                </label>
              </div>
              {errors.agreedToPrivacy && (
                <span className={styles.errorText}>{errors.agreedToPrivacy}</span>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className={`btn-primary ${styles.submitBtn}`}
              >
                <span>{status === 'submitting' ? 'Submitting Details...' : 'Request Private Callback'}</span>
                <ArrowUpRight size={16} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
