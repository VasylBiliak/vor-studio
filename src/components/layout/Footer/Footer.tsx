"use client";

import React from "react";
import {
  FiInstagram,
  FiFacebook,
  FiYoutube,
  FiMessageCircle
} from "react-icons/fi";
import { SiTiktok, SiTelegram, SiSpotify } from "react-icons/si";
import { useTranslation } from "@/hooks/useTranslation";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer
      id="contact"
      className="overflow-hidden relative z-10 flex flex-col items-center bg-[var(--color-bg-primary)] border-t border-[var(--color-border)]"
      role="contentinfo"
      aria-label={t("footer")}
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-between lg:items-start px-6 py-20 gap-16 lg:gap-10">
        <div className="flex flex-col items-center lg:items-start gap-6 w-full lg:flex-1 text-center lg:text-left">
          <h2 className="font-base text-[var(--color-accent-primary)] tracking-wider capitalize text-3xl 2xl:text-4xl">
            {t("contact_us")}
          </h2>
          <address className="not-italic space-y-2 text-[var(--color-text-secondary)]">
            <p className="font-alt hover:text-[var(--color-text-primary)] transition-colors">
              <a href={`tel:${t("contact_phone")}`}>+{t("contact_phone")}</a>
            </p>
            <p className="font-alt hover:text-[var(--color-text-primary)] transition-colors">
              <a href={`mailto:${t("contact_email")}`}>{t("contact_email")}</a>
            </p>
            <p className="font-alt">{t("text_address")}</p>
          </address>

          <div className="rounded-lg overflow-hidden border border-[var(--color-border)] grayscale hover:grayscale-0 transition-all duration-500 shadow-lg w-full max-w-sm h-[180px]">
            <iframe
              title={t("text_address")}
              src={t("map_embed_url")}
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 w-full lg:flex-1 order-first lg:order-none">
          <div className="w-48 md:w-56">
            <img
              src={t("logo_img_url")}
              alt="VOR Studio"
              className="w-full h-auto"
            />
          </div>

          <p className="font-alt text-[var(--color-text-secondary)] italic max-w-xs text-center pb-4">
            {t("footer_tagline")}
          </p>

          {/* Social Icons Grid */}
          <div className="flex flex-wrap gap-5 justify-center text-4xl text-[var(--color-text-primary)]">
            <a href="#" aria-label={t("social_instagram")} className="hover:text-[var(--color-accent-primary)] transition-colors"><FiInstagram /></a>
            <a href="#" aria-label={t("social_tiktok")} className="hover:text-[var(--color-accent-primary)] transition-colors"><SiTiktok /></a>
            <a href="#" aria-label={t("social_telegram")} className="hover:text-[var(--color-accent-primary)] transition-colors"><SiTelegram /></a>
            <a href="#" aria-label={t("social_youtube")} className="hover:text-[var(--color-accent-primary)] transition-colors"><FiYoutube /></a>
            <a href="#" aria-label={t("social_spotify")} className="hover:text-[var(--color-accent-primary)] transition-colors"><SiSpotify /></a>
            <a href="#" aria-label={t("social_facebook")} className="hover:text-[var(--color-accent-primary)] transition-colors"><FiFacebook /></a>
            <a href="#" aria-label={t("social_messages")} className="hover:text-[var(--color-accent-primary)] transition-colors"><FiMessageCircle /></a>
          </div>
        </div>

        <div className="flex flex-col items-center lg:items-end gap-6 w-full lg:flex-1 text-center lg:text-right">
          <h2 className="font-base text-[var(--color-accent-primary)] tracking-wider capitalize text-3xl 2xl:text-4xl">
            {t("working_hours")}
          </h2>

          <div className="space-y-6 text-[var(--color-text-secondary)]">
            <div className="flex flex-col gap-1">
              <p className="font-alt text-[var(--color-text-primary)] font-bold">{t("monday_friday")}</p>
              <p className="font-alt">{t("weekday_hours")}</p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-alt text-[var(--color-text-primary)] font-bold">{t("saturday_sunday")}</p>
              <p className="font-alt">{t("weekend_hours")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-[var(--color-border)] py-8 text-center">
        <p className="font-alt text-[var(--color-text-secondary)]/50 text-sm">
          © {new Date().getFullYear()} {t("all_rights_reserved")}
        </p>
      </div>
    </footer>
  );
};

export default Footer;