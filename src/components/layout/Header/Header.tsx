"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const navigateToHome = () => {
    router.push('/');
  };

  const scrollToProducts = () => {
    const element = document.getElementById('products-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className="ann">ПРИВІТАЛЬНИЙ БОНУС: БЕЗКОШТОВНА ДОСТАВКА ВІД 250 ЄВРО</div>
      
      <header>
        <div className="htop">
          <button className="logo" onClick={navigateToHome}>
            VOR<span>WEAR</span>
          </button>
          <button className="burger" onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="hright">
            <button className="lang-btn">UA</button>
            <button className="cart-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <span className="cart-count">0</span>
            </button>
          </div>
        </div>
        <nav>
          <div className="nav-inner">
            <button className="sale" onClick={navigateToHome}>Special Offers</button>
            <button onClick={navigateToHome}>НОВИНКИ</button>
            <button onClick={navigateToHome}>БАЗА</button>
            <button onClick={navigateToHome}>BESTSELLERS</button>
            <button onClick={navigateToHome}>Limited Edition</button>
            <button onClick={navigateToHome}>Колаборації</button>
            <button onClick={navigateToHome}>Street Culture</button>
            <button onClick={navigateToHome}>Пальта та куртки</button>
            <button onClick={navigateToHome}>Трикотаж</button>
            <button onClick={navigateToHome}>Штани</button>
            <button onClick={navigateToHome}>Худі</button>
            <button onClick={navigateToHome}>Світшоти</button>
            <button onClick={navigateToHome}>Longsleeves</button>
            <button onClick={navigateToHome}>T-shirts</button>
            <button onClick={navigateToHome}>Головні убори</button>
            <button onClick={navigateToHome}>Accessories</button>
          </div>
        </nav>
      </header>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <button className="mobile-close" onClick={closeMobileMenu}>✕</button>
        <button className="sale" onClick={() => { navigateToHome(); closeMobileMenu(); }}>Sale %</button>
        <button onClick={() => { navigateToHome(); closeMobileMenu(); }}>Худі</button>
        <button onClick={() => { navigateToHome(); closeMobileMenu(); }}>Футболки</button>
        <button onClick={() => { navigateToHome(); closeMobileMenu(); }}>Лонгсліви</button>
        <button onClick={() => { navigateToHome(); closeMobileMenu(); }}>Світшоти</button>
        <button onClick={() => { navigateToHome(); closeMobileMenu(); }}>Аксесуари</button>
        <button onClick={() => { navigateToHome(); closeMobileMenu(); }}>Трикотаж</button>
        <button onClick={() => { navigateToHome(); closeMobileMenu(); }}>Нижній одяг</button>
        <button onClick={() => { navigateToHome(); closeMobileMenu(); }}>Куртки</button>
        <button onClick={() => { navigateToHome(); closeMobileMenu(); }}>Класика</button>
        <button onClick={() => { navigateToHome(); closeMobileMenu(); }}>Популярне</button>
      </div>
    </>
  );
};

export default Header;