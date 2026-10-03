import React, { useState } from 'react';
import './Navbar.css';

function Navbar({ language, setLanguage }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'mr' : 'en');
    };

    return (
        <header className="header-container">
            {/* 1. Top Bar */}
            <div className="top-bar">
                <div className="top-left">
                    <span className="top-item">
                        <i className="email-icon">✉️</i> niramay.hospital@gmail.com
                    </span>
                    <span className="top-divider">/</span>
                    <span className="top-item">
                        <i className="phone-icon">📞</i> +91 8237571026 / +91 8767515230
                    </span>
                </div>
                <div className="top-right-socials">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">f</a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">in</a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">📷</a>
                    <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="social-icon">G</a>
                </div>
            </div>

            {/* 2. Main Navbar */}
            <nav className="navbar">
                <div className="nav-brand">
                    <a href="/" className="brand-link">
                        <img src="/logo.png" alt="Niramay Hospital Logo" className="brand-logo-img" />
                        <div className="brand-text-container">
                            <h2>{language === 'en' ? 'Niramay Hospital' : 'निरामय हॉस्पिटल'}</h2>
                        </div>
                    </a>
                </div>

                <div className={`nav-links ${isOpen ? 'active' : ''}`}>
                    {/* Mobile Menu madhe Desktop sarkha language toggle button */}
                    <div className="mobile-lang-container">
                        <button className="lang-toggle-btn mobile-lang-btn" onClick={toggleLanguage}>
                            🌐 {language === 'en' ? 'मराठी मध्ये पहा' : 'View in English'}
                        </button>
                    </div>

                    <a href="/" onClick={() => setIsOpen(false)}>
                        {language === 'en' ? 'HOME' : 'होम'}
                    </a>
                    <a href="/queue" onClick={() => setIsOpen(false)}>
                        {language === 'en' ? 'LIVE QUEUE' : 'लाईव्ह रांग'}
                    </a>
                    <a href="/history" onClick={() => setIsOpen(false)}>
                        {language === 'en' ? 'ABOUT US' : 'आमच्याबद्दल'}
                    </a>
                    <a href="/contact" onClick={() => setIsOpen(false)}>
                        {language === 'en' ? 'CONTACT US' : 'संपर्क करा'}
                    </a>

                    <div className="mobile-action-buttons">
                        <a href="/chat" className="nav-box-btn outline-box" onClick={() => setIsOpen(false)}>
                            {language === 'en' ? 'Chat With Us' : 'चॅट करा'}
                        </a>
                        <a href="/appointment" className="nav-box-btn filled-box" onClick={() => setIsOpen(false)}>
                            {language === 'en' ? 'Book An Appointment' : 'अपॉइंटमेंट बुक करा'}
                        </a>
                    </div>
                </div>

                {/* Right Side Action Boxes (Desktop) */}
                <div className="nav-right-actions">
                    <button className="lang-toggle-btn desktop-toggle" onClick={toggleLanguage}>
                        🌐 {language === 'en' ? 'मराठी' : 'English'}
                    </button>

                    <a href="/chat" className="nav-box-btn outline-box desktop-action-btn">
                        {language === 'en' ? 'Chat With Us' : 'चॅट करा'}
                    </a>

                    <a href="/appointment" className="nav-box-btn filled-box desktop-action-btn">
                        {language === 'en' ? 'Book An Appointment' : 'अपॉइंटमेंट बुक करा'}
                    </a>

                    <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
                        <span className={isOpen ? 'line1 open' : 'line1'}></span>
                        <span className={isOpen ? 'line2 open' : 'line2'}></span>
                        <span className={isOpen ? 'line3 open' : 'line3'}></span>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;