import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import BrandHero from './components/BrandHero'
import CityGrid from './components/CityGrid'
import { CITY_DATA } from './data/cityData'
import OfficeInfo from './components/OfficeInfo'
import SearchBarOverlay from './components/SearchBarOverlay'
import FeaturedProperties from './components/FeaturedProperties'
import SearchResults from './components/SearchResults'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsConditions from './components/TermsConditions'
import HomeLoanCalculator from './components/HomeLoanCalculator'
import ReviewsSection from './components/ReviewsSection'
import FeedbackForm from './components/FeedbackForm'
import ProjectDetailPage from './components/project-detail/ProjectDetailPage'
import PropertyDetailPage from './components/property-detail/PropertyDetailPage'
import ProjectComparison from './components/ProjectComparison'
import PropertyComparison from './components/PropertyComparison'
import PostPropertyForm from './components/PostPropertyForm'
import ConsultationForm from './components/ConsultationForm'
import Chatbot from './components/Chatbot'
import AboutPage from './components/AboutPage'
import TalkToExpertForm from './components/TalkToExpertForm'
import MarketTrends from './components/MarketTrends'
import WishlistPanel from './components/WishlistPanel'
import NewsSection from './components/NewsSection'
import ContactPopup from './components/ContactPopup'
import PropertyMapView from './components/PropertyMapView'
import { Heart, MessageCircle, MapPin } from 'lucide-react'
import { ContactSection } from './components/Sections'
import SEO from './components/SEO'

import { PROPERTY_DATA } from './data/propertyData'
import { INDIVIDUAL_PROPERTIES } from './data/individualProperties'

const DEV_MODE = true; // Set to false to enable automated popups

function App() {
  // Views: 'HOME' | 'CITY' | 'RESULTS' | 'PROJECT' | 'PROPERTY'
  const [currentView, setCurrentView] = useState('HOME');
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showPostProperty, setShowPostProperty] = useState(false);
  const [comparisonProjects, setComparisonProjects] = useState([]);
  const [comparisonProperties, setComparisonProperties] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showPropertyComparison, setShowPropertyComparison] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [showExpertModal, setShowExpertModal] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [showMapView, setShowMapView] = useState(false);

  // Auto-show Contact Popup on landing (after 5 seconds)
  useEffect(() => {
    if (DEV_MODE) return;

    const timer = setTimeout(() => {
      // Only show if user is on HOME or CITY and haven't opened any detail yet
      if (['HOME', 'CITY'].includes(currentView)) {
        setShowContactPopup(true);
      }
    }, 15000); // Increased to 15s to be less intrusive
    return () => clearTimeout(timer);
  }, [currentView]);

  // Wishlist Handlers
  const handleToggleWishlist = (property) => {
    setWishlist(prev => {
      if (prev.find(p => p.id === property.id)) {
        return prev.filter(p => p.id !== property.id);
      }
      return [...prev, property];
    });
  };

  // Project Comparison Handlers
  const handleAddComparisonProject = (project) => {
    if (comparisonProjects.find(p => p.id === project.id)) return;
    setComparisonProjects(prev => [...prev, project]);
  };

  const handleRemoveFromComparison = (projectId) => {
    setComparisonProjects(prev => prev.filter(p => p.id !== projectId));
  };

  // Alias for ProjectComparison component prop
  const handleAddToComparison = handleAddComparisonProject;

  // Property Comparison Handlers
  const handleAddToPropertyComparison = (property) => {
    // If it's a simple property object (from PROPERTY_DATA), find the rich version
    const richProperty = INDIVIDUAL_PROPERTIES.find(p => p.id === property.id || p.id === `prop-${property.id}`);
    const propertyToCompare = richProperty || property;

    setComparisonProperties(prev => {
      if (prev.find(p => p.id === propertyToCompare.id)) return prev;
      return [...prev, propertyToCompare];
    });
  };

  const handleRemoveFromPropertyComparison = (propertyId) => {
    setComparisonProperties(prev => prev.filter(p => p.id !== propertyId));
  };

  const [properties, setProperties] = useState(PROPERTY_DATA);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');

  // Scroll Animation Observer
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, [currentView]); // Re-run when view changes

  // 1. Initial State (Home): Handled by default.

  // 2. Select City -> Go to City View
  const handleSelectCity = (city) => {
    setSelectedCity(city);
    setCurrentView('CITY');

    // Filter properties for "Active Projects" in that city
    const cityProps = PROPERTY_DATA.filter(p => p.location.includes(city));
    setProperties(cityProps);

    window.scrollTo(0, 0);
  };

  // Project Selection
  const handleSelectProject = (projectId) => {
    setSelectedProject(projectId);
    setCurrentView('PROJECT');
    window.scrollTo(0, 0);
  };

  const handleSelectProperty = (propertyId) => {
    setSelectedProperty(propertyId);
    setCurrentView('PROPERTY');
    window.scrollTo(0, 0);
  };

  // 3. Search -> Go to Results View
  const handleSearch = (searchTerm) => {
    setCurrentView('RESULTS');
    setCurrentSearchTerm(searchTerm);

    if (!searchTerm) {
      setProperties(PROPERTY_DATA);
      return;
    }
    const lowerTerm = searchTerm.toLowerCase();
    const filtered = PROPERTY_DATA.filter(p =>
      p.location.toLowerCase().includes(lowerTerm) ||
      p.title.toLowerCase().includes(lowerTerm)
    );
    setProperties(filtered);
    window.scrollTo(0, 0);
  };

  // Reset to Home
  const handleLogoClick = () => {
    setCurrentView('HOME');
    setSelectedCity(null);
    setProperties(PROPERTY_DATA);
    setCurrentSearchTerm('');
    window.scrollTo(0, 0);
  }

  // Explore button on BrandHero
  const handleExplore = () => {
    document.getElementById('cities').scrollIntoView({ behavior: 'smooth' });
  };

  const handlePrivacyPolicy = () => {
    setCurrentView('PRIVACY');
    window.scrollTo(0, 0);
  };

  const handleTerms = () => {
    setCurrentView('TERMS');
    window.scrollTo(0, 0);
  };

  const handleCalculator = () => {
    setCurrentView('CALCULATOR');
    window.scrollTo(0, 0);
  };

  const handleAboutClick = () => {
    setCurrentView('ABOUT');
    window.scrollTo(0, 0);
  };

  return (
    <>
      <SEO view={currentView} city={selectedCity} />
      <Header
        onLogoClick={handleLogoClick}
        selectedCity={selectedCity}
        onSelectCity={handleSelectCity}
        onPostProperty={() => setShowPostProperty(true)}
        onBookConsultation={() => setShowConsultationModal(true)}
        onAboutClick={handleAboutClick}
      />
      <main>
        {/* VIEW 1: HOME LANDING */}
        {currentView === 'HOME' && (
          <>
            <BrandHero onExplore={handleExplore} />
            <SearchBarOverlay onSearch={handleSearch} />
            <CityGrid onSelectCity={handleSelectCity} />

            {/* TEST: Project Detail Demo Button */}
            <div style={{ padding: '3rem 0', textAlign: 'center', backgroundColor: '#FEF3C7' }}>
              <h3 style={{ marginBottom: '1rem', color: '#92400E' }}>🎯 Demo: Project Detail Page</h3>
              <button
                onClick={() => handleSelectProject('proj-001')}
                style={{
                  padding: '1rem 2rem',
                  backgroundColor: 'var(--color-primary)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                View "Bharat Heights" Project
              </button>
              <button
                onClick={() => handleSelectProperty('prop-101')}
                style={{
                  padding: '1rem 2rem',
                  backgroundColor: 'var(--color-accent)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                View "Corner House" Individual Property
              </button>
            </div>

            <ReviewsSection onLeaveFeedback={() => setShowFeedbackModal(true)} />
            <OfficeInfo />
            <MarketTrends />
            <NewsSection />
            <ContactSection />
          </>
        )}

        {/* VIEW 2: CITY HUB */}
        {currentView === 'CITY' && (
          <>
            <Hero
              onSearch={handleSearch}
              city={selectedCity}
              videos={CITY_DATA.find(c => c.name === selectedCity)?.videos}
              image={CITY_DATA.find(c => c.name === selectedCity)?.image}
            />

            {/* City Showcase Section */}
            {(() => {
              const city = CITY_DATA.find(c => c.name === selectedCity);
              if (!city) return null;
              return (
                <section style={{ padding: '6rem 0', backgroundColor: '#F8FAFC' }}>
                  <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                    <div style={{ position: 'relative' }}>
                      <div style={{
                        position: 'absolute',
                        top: '-20px',
                        left: '-20px',
                        width: '100px',
                        height: '100px',
                        backgroundColor: 'var(--color-primary-light)',
                        borderRadius: '20px',
                        zIndex: 0,
                        opacity: 0.3
                      }}></div>
                      <img
                        src={city.image}
                        alt={city.name}
                        style={{
                          width: '100%',
                          height: '500px',
                          objectFit: 'cover',
                          borderRadius: '24px',
                          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
                          position: 'relative',
                          zIndex: 1
                        }}
                      />
                      <div style={{
                        position: 'absolute',
                        bottom: '30px',
                        right: '-20px',
                        backgroundColor: 'white',
                        padding: '1.5rem 2rem',
                        borderRadius: '16px',
                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                        zIndex: 2
                      }}>
                        <div style={{ color: 'var(--color-primary)', fontWeight: 800, fontSize: '1.5rem' }}>100+</div>
                        <div style={{ color: '#64748B', fontSize: '0.875rem' }}>Active Projects</div>
                      </div>
                    </div>
                    <div>
                      <span style={{
                        color: 'var(--color-primary)',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fontSize: '0.875rem',
                        marginBottom: '1rem',
                        display: 'block'
                      }}>Premium Destination</span>
                      <h2 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '2rem', color: '#0F172A', lineHeight: 1.2 }}>
                        Experience the Essence of <span style={{ color: 'var(--color-primary)' }}>{city.name}</span>
                      </h2>
                      <p style={{ fontSize: '1.125rem', color: '#475569', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                        {city.description}. Discover a curated selection of properties that reflect the unique spirit and lifestyle of this vibrant city. From modern urban apartments to luxury villas, find your perfect home in the heart of {city.name}.
                      </p>
                      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#334155', fontWeight: 600 }}>
                          <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--color-accent)', borderRadius: '50%' }}></div>
                          Prime Locations
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#334155', fontWeight: 600 }}>
                          <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--color-accent)', borderRadius: '50%' }}></div>
                          Verified Listings
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#334155', fontWeight: 600 }}>
                          <div style={{ width: '8px', height: '8px', backgroundColor: 'var(--color-accent)', borderRadius: '50%' }}></div>
                          Expert Guidance
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              );
            })()}

            {(() => {
              const cityProperties = PROPERTY_DATA.filter(p => p.location === selectedCity);
              return (
                <>
                  <FeaturedProperties
                    properties={cityProperties.map(p => ({
                      ...p,
                      onCompare: handleAddToPropertyComparison,
                      onWishlist: handleToggleWishlist,
                      isWishlisted: wishlist.some(w => w.id === p.id)
                    }))}
                    onPropertySelect={handleSelectProperty}
                  />
                  <div style={{ padding: '2rem 0', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                    <h3 style={{ fontSize: '1.5rem', color: 'var(--color-text-muted)' }}>
                      Showing Active Projects in <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>{selectedCity}</span>
                    </h3>
                    <button
                      onClick={() => setShowMapView(true)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: 'var(--radius-full)',
                        fontWeight: 600,
                        cursor: 'pointer',
                        boxShadow: 'var(--shadow-md)'
                      }}
                    >
                      <MapPin size={20} /> View on Map
                    </button>
                  </div>
                </>
              );
            })()}
            <NewsSection city={selectedCity} />
          </>
        )}

        {/* VIEW 3: SEARCH RESULTS */}
        {currentView === 'RESULTS' && (
          <SearchResults
            properties={PROPERTY_DATA.filter(p =>
              p.title.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
              p.location.toLowerCase().includes(currentSearchTerm.toLowerCase())
            ).map(p => ({
              ...p,
              onCompare: handleAddToPropertyComparison,
              onWishlist: handleToggleWishlist,
              isWishlisted: wishlist.some(w => w.id === p.id)
            }))}
            searchTerm={currentSearchTerm}
            onPropertySelect={handleSelectProperty}
          />
        )}

        {/* VIEW 4: PROJECT DETAIL */}
        {currentView === 'PROJECT' && (
          <ProjectDetailPage
            projectId={selectedProject}
            onBookConsultation={() => setShowConsultationModal(true)}
            onAddToCompare={handleAddToComparison}
          />
        )}

        {/* VIEW 5: PROPERTY DETAIL */}
        {currentView === 'PROPERTY' && (
          <PropertyDetailPage
            propertyId={selectedProperty}
            onAddToCompare={handleAddToPropertyComparison}
            onBookConsultation={() => setShowConsultationModal(true)}
          />
        )}

        {/* VIEW 5: PRIVACY POLICY */}
        {currentView === 'PRIVACY' && (
          <PrivacyPolicy />
        )}

        {/* VIEW 5: TERMS */}
        {currentView === 'TERMS' && (
          <TermsConditions />
        )}

        {/* VIEW 6: CALCULATOR */}
        {currentView === 'CALCULATOR' && (
          <HomeLoanCalculator />
        )}

        {/* VIEW 7: ABOUT PAGE */}
        {currentView === 'ABOUT' && (
          <AboutPage
            onBookConsultation={() => setShowConsultationModal(true)}
            onTalkToExpert={() => setShowExpertModal(true)}
          />
        )}
      </main >
      <Footer
        onPrivacyClick={handlePrivacyPolicy}
        onTermsClick={handleTerms}
        onCalculatorClick={handleCalculator}
        onAboutClick={handleAboutClick}
      />

      {/* Floating Property Comparison Toggle */}
      {
        comparisonProperties.length > 0 && !showPropertyComparison && (
          <button
            onClick={() => setShowPropertyComparison(true)}
            style={{
              position: 'fixed',
              bottom: '160px',
              right: '2rem',
              zIndex: 1500,
              padding: '1rem 2rem',
              backgroundColor: 'var(--color-primary)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            🔍 Properties ({comparisonProperties.length})
          </button>
        )
      }

      {
        showComparison && (
          <ProjectComparison
            projects={comparisonProjects}
            onClose={() => setShowComparison(false)}
            onRemoveProject={handleRemoveFromComparison}
            onAddProject={handleAddToComparison}
          />
        )
      }

      {
        showPropertyComparison && (
          <PropertyComparison
            properties={comparisonProperties}
            onClose={() => setShowPropertyComparison(false)}
            onRemoveProperty={handleRemoveFromPropertyComparison}
            onAddProperty={handleAddToPropertyComparison}
          />
        )
      }

      {/* Floating Project Comparison Toggle */}
      {
        comparisonProjects.length > 0 && !showComparison && (
          <button
            onClick={() => setShowComparison(true)}
            style={{
              position: 'fixed',
              bottom: '90px',
              right: '2rem',
              padding: '1rem 2rem',
              backgroundColor: 'var(--color-accent)',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
              zIndex: 1500,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'transform 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'translateY(-4px)'}
            onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
          >
            🏙️ Projects ({comparisonProjects.length})
          </button>
        )
      }

      {
        showPostProperty && (
          <PostPropertyForm onClose={() => setShowPostProperty(false)} />
        )
      }

      {
        showFeedbackModal && (
          <FeedbackForm onClose={() => setShowFeedbackModal(false)} />
        )
      }

      {
        showConsultationModal && (
          <ConsultationForm onClose={() => setShowConsultationModal(false)} />
        )
      }

      {
        showExpertModal && (
          <TalkToExpertForm onClose={() => setShowExpertModal(false)} />
        )
      }

      {/* Floating Wishlist Toggle */}
      <button
        onClick={() => setShowWishlist(true)}
        style={{
          position: 'fixed',
          bottom: '230px',
          right: '2rem',
          zIndex: 1500,
          width: '56px',
          height: '56px',
          backgroundColor: 'white',
          color: 'var(--color-accent)',
          border: 'none',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-xl)',
          cursor: 'pointer',
          transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1) rotate(10deg)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1) rotate(0)'}
      >
        <Heart size={28} fill={wishlist.length > 0 ? 'var(--color-accent)' : 'none'} />
        {wishlist.length > 0 && (
          <span style={{
            position: 'absolute',
            top: '-5px',
            right: '-5px',
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            borderRadius: '50%',
            width: '24px',
            height: '24px',
            fontSize: '0.75rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid white'
          }}>
            {wishlist.length}
          </span>
        )}
      </button>

      <WishlistPanel
        isOpen={showWishlist}
        onClose={() => setShowWishlist(false)}
        items={wishlist}
        onRemove={(id) => setWishlist(prev => prev.filter(p => p.id !== id))}
      />

      <ContactPopup
        isOpen={showContactPopup}
        onClose={() => setShowContactPopup(false)}
      />

      {
        showMapView && (
          <PropertyMapView
            properties={
              currentView === 'CITY'
                ? PROPERTY_DATA.filter(p => p.location === selectedCity)
                : PROPERTY_DATA
            }
            onPropertySelect={(id) => { setShowMapView(false); handleSelectProperty(id); }}
            onClose={() => setShowMapView(false)}
          />
        )
      }

      {/* Floating Contact Trigger */}
      <button
        onClick={() => setShowContactPopup(true)}
        style={{
          position: 'fixed',
          bottom: '160px',
          right: '2rem',
          zIndex: 1500,
          width: '56px',
          height: '56px',
          backgroundColor: 'var(--color-primary)',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-xl)',
          cursor: 'pointer',
          transition: 'transform 0.3s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <MessageCircle size={28} />
      </button>

      {/* AI Chatbot */}
      <Chatbot />
    </>
  )
}

export default App
