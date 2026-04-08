"use client";

import React from "react";
import {
  FiInstagram,
  FiFacebook,
  FiYoutube,
  FiMessageCircle
} from "react-icons/fi";
import { SiTiktok, SiTelegram, SiSpotify } from "react-icons/si";

const Footer = () => {
  return (
    <footer
      id="contact"
      className="overflow-hidden relative z-10 flex flex-col items-center bg-[var(--color-bg-primary)] border-t border-[var(--color-border)]"
      role="contentinfo"
      aria-label="Footer"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-between lg:items-start px-6 py-20 gap-16 lg:gap-10">

        {/* Contact Info - Вирівнювання: центр на мобільних, ліво на десктопі */}
        <div className="flex flex-col items-center lg:items-start gap-6 w-full lg:flex-1 text-center lg:text-left">
          <h2 className="font-base text-[var(--color-accent-primary)] tracking-wider capitalize text-3xl 2xl:text-4xl">
            Contact Us
          </h2>
          <address className="not-italic space-y-2 text-[var(--color-text-secondary)]">
            <p className="font-alt hover:text-[var(--color-text-primary)] transition-colors">
              <a href="tel:+14165550198">+1 416-555-0198</a>
            </p>
            <p className="font-alt hover:text-[var(--color-text-primary)] transition-colors">
              <a href="mailto:contact@b.com">contact@b.com</a>
            </p>
            <p className="font-alt">159 King St, Toronto, ON M5V 1M1, Canada</p>
          </address>

          <div className="rounded-lg overflow-hidden border border-[var(--color-border)] grayscale hover:grayscale-0 transition-all duration-500 shadow-lg w-full max-w-sm h-[180px]">
            <iframe
              title="Restaurant location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2887.2638541315535!2d-79.3892416!3d43.6473663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b34d109f07ab7%3A0x79669573f0868f9a!2s159%20King%20St%20W%2C%20Toronto%2C%20ON%20M5V%203M4!5e0!3m2!1sen!2sca!4v1712490000000!5m2!1sen!2sca"
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>

        {/* Logo & Socials - Центральна частина */}
        <div className="flex flex-col items-center gap-6 w-full lg:flex-1 order-first lg:order-none">
          <div className="w-48 md:w-56">
            <img
              src="https://placehold.co/200x100?text=VOR+STUDIO"
              alt="VOR Studio"
              className="w-full h-auto"
            />
          </div>

          <p className="font-alt text-[var(--color-text-secondary)] italic max-w-xs text-center pb-4">
            "The secret of success is to treat every guest as if they were a member of your own family"
          </p>

          {/* Social Icons Grid */}
          <div className="flex flex-wrap gap-5 justify-center text-4xl text-[var(--color-text-primary)]">
            <a href="#" aria-label="Instagram" className="hover:text-[var(--color-accent-primary)] transition-colors"><FiInstagram /></a>
            <a href="#" aria-label="TikTok" className="hover:text-[var(--color-accent-primary)] transition-colors"><SiTiktok /></a>
            <a href="#" aria-label="Telegram" className="hover:text-[var(--color-accent-primary)] transition-colors"><SiTelegram /></a>
            <a href="#" aria-label="YouTube" className="hover:text-[var(--color-accent-primary)] transition-colors"><FiYoutube /></a>
            <a href="#" aria-label="Spotify" className="hover:text-[var(--color-accent-primary)] transition-colors"><SiSpotify /></a>
            <a href="#" aria-label="Facebook" className="hover:text-[var(--color-accent-primary)] transition-colors"><FiFacebook /></a>
            <a href="#" aria-label="Messages" className="hover:text-[var(--color-accent-primary)] transition-colors"><FiMessageCircle /></a>
          </div>
        </div>

        {/* Working Hours - Вирівнювання: центр на мобільних, право на десктопі */}
        <div className="flex flex-col items-center lg:items-end gap-6 w-full lg:flex-1 text-center lg:text-right">
          <h2 className="font-base text-[var(--color-accent-primary)] tracking-wider capitalize text-3xl 2xl:text-4xl">
            Working Hours
          </h2>

          <div className="space-y-6 text-[var(--color-text-secondary)]">
            <div className="flex flex-col gap-1">
              <p className="font-alt text-[var(--color-text-primary)] font-bold">Monday – Friday</p>
              <p className="font-alt">08:00 am – 12:00 am</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-alt text-[var(--color-text-primary)] font-bold">Saturday – Sunday</p>
              <p className="font-alt">10:00 am – 12:00 am</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-[var(--color-border)] py-8 text-center">
        <p className="font-alt text-[var(--color-text-secondary)]/50 text-sm">
          © {new Date().getFullYear()} Biliak Dining. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;