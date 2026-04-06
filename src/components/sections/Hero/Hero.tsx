"use client";

import React from 'react';

const Hero = () => {
  const scrollToProducts = () => {
    const element = document.getElementById('products-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="hero-bg"></div>
      <div className="hero-grid"></div>
      <div className="hero-content">
        <p className="hero-tag">Естетика сезону 2026</p>
        <h1 className="hero-title">VOR<br/><em>STUDIO</em></h1>
        <p className="hero-sub">Ексклюзивний онлайн-шоп — Спроектовано в Україні</p>
        <button className="hero-cta" onClick={scrollToProducts}>
          ПЕРЕГЛЯНУТИ КАТАЛОГ
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default Hero;