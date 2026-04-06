"use client";

import React from "react";
import { useRouter } from 'next/navigation';

const Footer = () => {
  const router = useRouter();

  const navigateToHome = () => {
    router.push('/');
  };

  return (
    <footer>
      <div className="foot-grid">
        <div>
          <div className="foot-logo">VOR<span>WEAR</span></div>
          <p className="foot-desc">Концептуальний бренд одягу. Ми створюємо речі для людей, які обирають якість та самовираження.</p>
          <div className="foot-social">
            <a className="soc-btn" href="#" target="_blank">INSTA</a>
            <a className="soc-btn" href="#" target="_blank">VIBE</a>
            <a className="soc-btn" href="#" target="_blank">NEWS</a>
          </div>
        </div>
        <div className="foot-col">
          <h4>Навігація</h4>
          <button onClick={navigateToHome}>Знижки</button>
          <button onClick={navigateToHome}>Верх</button>
          <button onClick={navigateToHome}>Футболки</button>
          <button onClick={navigateToHome}>Штани</button>
          <button onClick={navigateToHome}>Аксесуари</button>
        </div>
        <div className="foot-col">
          <h4>Підтримка</h4>
          <button>Зворотній зв'язок</button>
          <button>Умови користування</button>
          <button>Доставка</button>
          <button>Гарантія повернення</button>
        </div>
      </div>
      <div className="foot-bottom">
        <span className="foot-copy">VOR CONCEPT © 2026</span>
        <div className="pay-icons">
          <span className="pay-icon">SECURE PAY</span>
          <span className="pay-icon">CARD</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;