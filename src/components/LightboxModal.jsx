import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './LightboxModal.module.css';

export default function LightboxModal({ isOpen, images = [], currentIndex = 0, onClose, onNavigate }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % images.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  if (!isOpen || images.length === 0) return null;

  const currentImg = images[currentIndex];
  const imgSrc = typeof currentImg === 'string' ? currentImg : currentImg.src;
  const imgAlt = typeof currentImg === 'string' ? 'Aurelia Residence gallery image' : currentImg.alt || 'Aurelia Residence preview';
  const imgCaption = typeof currentImg === 'object' ? currentImg.caption : null;

  return (
    <div
      className={styles.backdrop}
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        onClick={onClose}
        className={styles.closeBtn}
        aria-label="Close lightbox"
      >
        <X size={24} />
      </button>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
            className={`${styles.navBtn} ${styles.prevBtn}`}
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            type="button"
            onClick={() => onNavigate((currentIndex + 1) % images.length)}
            className={`${styles.navBtn} ${styles.nextBtn}`}
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>
        </>
      )}

      <div className={styles.imageWrapper}>
        <img
          src={imgSrc}
          alt={imgAlt}
          className={styles.image}
        />
        <div className={styles.metaBar}>
          <span className={styles.counter}>
            {currentIndex + 1} / {images.length}
          </span>
          {imgCaption && <span className={styles.caption}>{imgCaption}</span>}
          <span className={styles.illustrationNotice}>Images are for illustration purposes only</span>
        </div>
      </div>
    </div>
  );
}
