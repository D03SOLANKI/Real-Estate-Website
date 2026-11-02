import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ApartmentsPage from './pages/ApartmentsPage';
import ApartmentDetailPage from './pages/ApartmentDetailPage';
import ContactPage from './pages/ContactPage';
import BookCallModal from './components/BookCallModal';
import LightboxModal from './components/LightboxModal';
import FloorPlanModal from './components/FloorPlanModal';
import LegalModal from './components/LegalModal';

export default function App() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Initialize Lenis smooth scroll (luxury inertia)
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Modal States
  const [bookCallState, setBookCallState] = useState({ isOpen: false, defaultType: 'all' });
  const [lightboxState, setLightboxState] = useState({ isOpen: false, images: [], currentIndex: 0 });
  const [floorPlanState, setFloorPlanState] = useState({ isOpen: false, apartment: null });
  const [legalState, setLegalState] = useState({ isOpen: false, type: 'privacy' });

  const handleOpenBookCall = (type = 'all') => {
    setBookCallState({ isOpen: true, defaultType: type });
  };

  const handleCloseBookCall = () => {
    setBookCallState({ isOpen: false, defaultType: 'all' });
  };

  const handleOpenLightbox = (images, index = 0) => {
    setLightboxState({ isOpen: true, images, currentIndex: index });
  };

  const handleCloseLightbox = () => {
    setLightboxState({ isOpen: false, images: [], currentIndex: 0 });
  };

  const handleNavigateLightbox = (newIndex) => {
    setLightboxState(prev => ({ ...prev, currentIndex: newIndex }));
  };

  const handleOpenFloorPlan = (apartment) => {
    setFloorPlanState({ isOpen: true, apartment });
  };

  const handleCloseFloorPlan = () => {
    setFloorPlanState({ isOpen: false, apartment: null });
  };

  const handleOpenLegal = (type = 'privacy') => {
    setLegalState({ isOpen: true, type });
  };

  const handleCloseLegal = () => {
    setLegalState({ isOpen: false, type: 'privacy' });
  };

  return (
    <div className="app-root">
      {/* Header with Navigation and Mobile Menu */}
      <Header onOpenBookCall={() => handleOpenBookCall('all')} />

      {/* Main Routed Page Content */}
      <main id="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onOpenBookCall={handleOpenBookCall}
                onOpenLightbox={handleOpenLightbox}
              />
            }
          />
          <Route
            path="/apartments"
            element={
              <ApartmentsPage
                onOpenBookCall={handleOpenBookCall}
                onOpenFloorPlanModal={handleOpenFloorPlan}
              />
            }
          />
          <Route
            path="/apartments/:id"
            element={
              <ApartmentDetailPage
                onOpenBookCall={handleOpenBookCall}
                onOpenLightbox={handleOpenLightbox}
                onOpenFloorPlanModal={handleOpenFloorPlan}
              />
            }
          />
          <Route
            path="/contact"
            element={<ContactPage />}
          />
          <Route
            path="*"
            element={
              <HomePage
                onOpenBookCall={handleOpenBookCall}
                onOpenLightbox={handleOpenLightbox}
              />
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer
        onOpenBookCall={() => handleOpenBookCall('all')}
        onOpenLegalModal={handleOpenLegal}
      />

      {/* Global Interactive Modals */}
      <BookCallModal
        isOpen={bookCallState.isOpen}
        defaultType={bookCallState.defaultType}
        onClose={handleCloseBookCall}
      />

      <LightboxModal
        isOpen={lightboxState.isOpen}
        images={lightboxState.images}
        currentIndex={lightboxState.currentIndex}
        onClose={handleCloseLightbox}
        onNavigate={handleNavigateLightbox}
      />

      <FloorPlanModal
        isOpen={floorPlanState.isOpen}
        apartment={floorPlanState.apartment}
        onClose={handleCloseFloorPlan}
        onOpenBookCall={handleOpenBookCall}
      />

      <LegalModal
        isOpen={legalState.isOpen}
        type={legalState.type}
        onClose={handleCloseLegal}
      />
    </div>
  );
}
