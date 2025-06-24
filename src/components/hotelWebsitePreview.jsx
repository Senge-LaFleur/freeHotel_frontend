import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function HotelWebsitePreview({
  fields = {},
  bgType = 'color',
  bgImage = '',
  bgBrightness = 1,
  buttonHoverBg = '#ffe066',
  buttonHoverText = '#0b3e66',
  navbarPadding = 24,
  heroPadding = 32,
  aboutTitle = 'THE PERFECT GETAWAY',
  aboutParagraph = 'Create Lasting Memories with Your Loved Ones, Your Family Paradise Found.',
  aboutImage = null,
  aboutBgColor = '#e9f0f7',
  aboutPadding = 32,
  aboutLayout = 'left',
  amenities = [],
  amenitiesBgColor = '#e9f0f7',
  amenitiesPadding = 32,
  roomFilters = { type: 'Standard', price: 'under99', beds: '1' },
  roomFilterOptions = { type: ['Standard', 'Deluxe', 'VIP'], price: ['under99', '99-199', '199-299'], beds: ['1', '2'] },
  rooms = [],
  roomsBgColor = '#fff',
  roomsPadding = 32,
  footerLogo = '',
  footerName = 'LOGO TEXT HERE',
  footerSlogan = 'SLOGAN HERE',
  footerLinks = ['Home', 'About', 'Contact'],
  footerContacts = [
    { type: 'email', value: 'info@hotel.com' },
    { type: 'phone', value: '+1234567890' }
  ],
  footerSocials = [
    { icon: 'fa-facebook-f', name: 'Facebook', handle: 'hotel' },
    { icon: 'fa-instagram', name: 'Instagram', handle: '@hotel' }
  ],
  footerBgColor = '#222',
  footerPadding = 32,
  previewMode = 'desktop',
}) {
  const [isBtnHovered, setIsBtnHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const aboutSectionRef = useRef(null);
  const amenitiesSectionRef = useRef(null);
  const roomsSectionRef = useRef(null);

  return (
    <div className={`editor-preview-main`}>
      <div className="preview-mode-toggle" style={{ display: 'none' }} />
      <div className={`editor-preview-wrapper ${previewMode}`}>
        <div
          className="editor-preview"
          style={{
            ...(bgType === 'color' ? { background: fields.bgColor } : { position: 'relative', background: 'transparent' }),
            position: 'relative',
          }}
        >
          {bgType === 'image' && (
            <div
              className="editor-bg-image"
              style={{
                backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                filter: `brightness(${bgBrightness})`,
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                position: 'absolute',
              }}
            />
          )}
          {/* Previewed Navbar */}
          {previewMode === 'mobile' ? (
            <div
              className="preview-navbar mobile"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                padding: `${navbarPadding}px`,
                background: 'none',
                color: fields.textColor,
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                fontWeight: 600,
                fontSize: '1.1rem',
              }}
            >
              <div className="editor-logo" style={{ color: fields.textColor, fontSize: '1.1rem', display: 'flex', flexDirection: 'column', gap: 0 }}>
                <span className="logo-text" style={{ fontSize: '1.4rem', fontWeight: 700 }}>{fields.logo || 'LOGO TEXT HERE'}</span>
                <span className="logo-slogan" style={{ fontSize: '0.9rem', fontWeight: 400 }}>{fields.slogan || 'SLOGAN HERE'}</span>
              </div>
              <button
                className="mobile-menu-btn"
                style={{ background: 'none', border: 'none', color: fields.textColor, fontSize: '1.7rem', cursor: 'pointer' }}
                onClick={() => setMobileMenuOpen((open) => !open)}
              >
                <FontAwesomeIcon icon={["fas", mobileMenuOpen ? "fa-times" : "fa-bars"]} />
              </button>
              {mobileMenuOpen && (
                <div className="editor-nav-links-mobile" style={{
                  position: 'absolute',
                  top: '70%',
                  left: 0,
                  width: '100%',
                  background: 'rgba(0,0,0,0.9)',
                  color: '#fff',
                  borderRadius: '0 0 10px 10px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                  minWidth: '120px',
                  zIndex: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  padding: '0.5rem 1.2rem',
                }}>
                  <span style={{ margin: '0.5rem 0', cursor: 'pointer' }}>Home</span>
                  <span style={{ margin: '0.5rem 0', cursor: 'pointer' }} onClick={() => roomsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>Book Now</span>
                </div>
              )}
            </div>
          ) : (
            <div
              className="preview-navbar"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '100px',
                padding: `${navbarPadding}px`,
                background: 'none',
                color: fields.textColor,
                zIndex: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                fontWeight: 600,
                fontSize: '1.1rem',
              }}
            >
              <div className="editor-logo" style={{ color: fields.textColor }}>
                <span className="logo-text">{fields.logo || 'LOGO TEXT HERE'}</span>
                <span className="logo-slogan">{fields.slogan || 'SLOGAN HERE'}</span>
              </div>
              <div className="editor-nav-links">
                <span>Home</span>
                <span onClick={() => roomsSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })} style={{ cursor: 'pointer' }}>Book Now</span>
              </div>
            </div>
          )}
          <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column' }}>
            {previewMode === 'mobile' ? <div style={{ height: '56px' }} /> : <div style={{ height: '60px' }} />}
            {/* Hero Section */}
            <section
              className="hero-section-preview"
              style={{
                minHeight: previewMode === 'mobile' ? '320px' : '400px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: previewMode === 'mobile' ? '18px' : '32px',
                width: '100%',
                padding: previewMode === 'mobile' ? '0 1rem' : undefined,
              }}
            >
              <div className="editor-content" style={{ width: '100%' }}>
                <h1 style={{ color: fields.textColor, fontSize: previewMode === 'mobile' ? '2rem' : undefined }}>{fields.title}</h1>
                <p style={{ color: fields.textColor, fontSize: previewMode === 'mobile' ? '1.1rem' : undefined }}>{fields.subtitle}</p>
                <button
                  className="editor-btn"
                  style={{
                    background: isBtnHovered ? buttonHoverBg : fields.buttonColor,
                    color: isBtnHovered ? buttonHoverText : fields.buttonTextColor,
                    width: previewMode === 'mobile' ? '100%' : undefined,
                    maxWidth: previewMode === 'mobile' ? '320px' : undefined,
                    fontSize: previewMode === 'mobile' ? '1.1rem' : undefined,
                  }}
                  onMouseEnter={() => setIsBtnHovered(true)}
                  onMouseLeave={() => setIsBtnHovered(false)}
                >
                  {fields.button}
                </button>
              </div>
            </section>
            {/* About Section Preview */}
            <section
              ref={aboutSectionRef}
              className="about-section-preview"
              style={{
                background: aboutBgColor,
                padding: `${aboutPadding}px 2rem`,
                display: 'flex',
                flexDirection: aboutLayout === 'center' ? 'column' : 'row',
                alignItems: 'center',
                justifyContent: aboutLayout === 'center' ? 'center' : 'space-between',
                textAlign: aboutLayout === 'center' ? 'center' : aboutLayout === 'left' ? 'left' : 'right',
                gap: '2rem',
              }}
            >
              {(aboutLayout === 'left' || aboutLayout === 'center') && (
                <div style={{ flex: 1, order: aboutLayout === 'right' ? 2 : 1 }}>
                  <h2 style={{ fontSize: '2.5rem', fontWeight: 500, marginBottom: '1rem', letterSpacing: '2px' }}>{aboutTitle}</h2>
                  <p style={{ fontSize: '1.2rem', color: '#1a3a5a', marginBottom: '1rem' }}>{aboutParagraph}</p>
                </div>
              )}
              {aboutImage && (
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', order: aboutLayout === 'right' ? 1 : 2 }}>
                  <img src={aboutImage} alt="About" style={{ maxWidth: '320px', maxHeight: '180px', borderRadius: '12px', objectFit: 'cover', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }} />
                </div>
              )}
              {aboutLayout === 'right' && (
                <div style={{ flex: 1, order: 2 }}>
                  <h2 style={{ fontSize: '2.5rem', fontWeight: 500, marginBottom: '1rem', letterSpacing: '2px' }}>{aboutTitle}</h2>
                  <p style={{ fontSize: '1.2rem', color: '#1a3a5a', marginBottom: '1rem' }}>{aboutParagraph}</p>
                </div>
              )}
            </section>
            {/* Amenities Section Preview */}
            <section
              ref={amenitiesSectionRef}
              className="amenities-section-preview"
              style={{
                background: amenitiesBgColor,
                padding: `${amenitiesPadding}px 2rem`,
                marginTop: '0',
              }}
            >
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '2.5rem',
              }}>
                {amenities.map((a, idx) => (
                  <div key={idx} style={{ minWidth: 180, maxWidth: 240, textAlign: 'center', flex: 1 }}>
                    <div style={{ fontSize: '2.5rem', color: '#1a3a5a', marginBottom: '0.7rem' }}>
                      <FontAwesomeIcon icon={["fas", a.icon]} />
                    </div>
                    <div style={{ fontSize: '1.2rem', fontWeight: 500, color: '#1a3a5a', marginBottom: '0.5rem' }}>{a.title}</div>
                    <div style={{ fontSize: '1rem', color: '#1a3a5a', opacity: 0.85 }}>{a.desc}</div>
                  </div>
                ))}
              </div>
            </section>
            {/* Rooms Section Preview */}
            <section
              ref={roomsSectionRef}
              className="rooms-section-preview"
              style={{
                background: roomsBgColor,
                padding: `${roomsPadding}px 2rem`,
                marginTop: '0',
              }}
            >
              {/* Filtering form */}
              <form
                className="room-filter-form"
                style={{
                  display: 'flex',
                  gap: '1.2rem',
                  justifyContent: 'center',
                  marginBottom: '2rem',
                  flexWrap: 'wrap',
                  background: '#fff',
                  borderRadius: 16,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                  padding: '1.1rem 1.5rem',
                  alignItems: 'center',
                  minWidth: 220,
                  maxWidth: 520,
                  marginLeft: 'auto',
                  marginRight: 'auto',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <FontAwesomeIcon icon={["fas", "fa-bed"]} style={{ color: 'var(--blue)', fontSize: '1.1rem' }} />
                  <select
                    value={roomFilters.type}
                    onChange={() => { }}
                    style={{
                      border: '1px solid #e0e6ed',
                      borderRadius: 8,
                      padding: '0.4rem 1.1rem',
                      fontSize: '1rem',
                      background: '#f7fafd',
                      color: '#222',
                      outline: 'none',
                      minWidth: 90,
                    }}
                    disabled
                  >
                    {roomFilterOptions.type.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <FontAwesomeIcon icon={["fas", "fa-dollar-sign"]} style={{ color: 'var(--blue)', fontSize: '1.1rem' }} />
                  <select
                    value={roomFilters.price}
                    onChange={() => { }}
                    style={{
                      border: '1px solid #e0e6ed',
                      borderRadius: 8,
                      padding: '0.4rem 1.1rem',
                      fontSize: '1rem',
                      background: '#f7fafd',
                      color: '#222',
                      outline: 'none',
                      minWidth: 110,
                    }}
                    disabled
                  >
                    <option value="under99">Under $99</option>
                    <option value="99-199">$99 - $199</option>
                    <option value="199-299">$199 - $299</option>
                  </select>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <FontAwesomeIcon icon={["fas", "fa-users"]} style={{ color: 'var(--blue)', fontSize: '1.1rem' }} />
                  <select
                    value={roomFilters.beds}
                    onChange={() => { }}
                    style={{
                      border: '1px solid #e0e6ed',
                      borderRadius: 8,
                      padding: '0.4rem 1.1rem',
                      fontSize: '1rem',
                      background: '#f7fafd',
                      color: '#222',
                      outline: 'none',
                      minWidth: 80,
                    }}
                    disabled
                  >
                    {roomFilterOptions.beds.map(opt => <option key={opt} value={opt}>{opt} bed{opt !== '1' ? 's' : ''}</option>)}
                  </select>
                </div>
              </form>
              {/* Room grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', alignItems: 'center', justifyContent: 'center', overflowX: 'auto', padding: '0 1rem' }}>
                {rooms.map((r, idx) => (
                  <div key={idx} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', width: 240, height: 340, padding: 16, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {r.image ? <img src={r.image} alt={r.name} style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }} /> : <div style={{ width: '100%', height: 120, background: '#eee', borderRadius: 8, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb' }}>No Image</div>}
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 4 }}>{r.name}</div>
                    <div style={{ fontSize: '0.98rem', color: '#444', marginBottom: 8 }}>{r.desc}</div>
                    <div style={{ fontWeight: 600, color: 'var(--blue)', marginBottom: 8 }}>${r.price} <span style={{ fontWeight: 400, color: '#888' }}>/ night</span></div>
                    <button className="editor-btn" style={{ width: '100%' }}>Book Now</button>
                  </div>
                ))}
              </div>
            </section>
            {/* Footer Section Preview */}
            <footer
              className="footer-section-preview"
              style={{
                background: footerBgColor,
                color: '#fff',
                padding: `${footerPadding}px 2rem`,
                marginTop: '0',
                width: '100%',
              }}
            >
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '2rem', maxWidth: 1200, margin: '0 auto', padding: '0 1rem' }}>
                <div style={{ flex: 1, minWidth: 180 }}>
                  <div style={{ fontWeight: 700, fontSize: '1.3rem', marginBottom: 4 }}>{footerLogo || <FontAwesomeIcon icon={["fas", "fa-hotel"]} />}</div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 4 }}>{footerName}</div>
                  <div style={{ fontSize: '0.98rem', opacity: 0.8 }}>{footerSlogan}</div>
                </div>
                <div style={{ flex: 1, minWidth: 180 }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>Quick Links</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {footerLinks.map((l, i) => <li key={i} style={{ marginBottom: 4 }}><a href="#" style={{ color: '#fff', textDecoration: 'none', opacity: 0.9 }}>{l}</a></li>)}
                  </ul>
                </div>
                <div style={{ flex: 1, minWidth: 180 }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: 8 }}>Contact</div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    {footerContacts.map((c, i) => <li key={i} style={{ marginBottom: 4 }}>{c.type === 'email' ? <FontAwesomeIcon icon={["fas", "fa-envelope"]} /> : <FontAwesomeIcon icon={["fas", "fa-phone"]} />} <span style={{ opacity: 0.9 }}>{c.value}</span></li>)}
                  </ul>
                  <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                    {footerSocials.map((s, i) => <a key={i} href="#" style={{ color: '#fff', fontSize: '1.2rem', opacity: 0.9 }} title={s.name}><FontAwesomeIcon icon={["fab", s.icon.replace('fa-', '')]} /> <span style={{ fontSize: '0.95rem', marginLeft: 4 }}>{s.handle}</span></a>)}
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

