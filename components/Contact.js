"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { photos, site } from "@/lib/site";
import { useOverlays } from "./Overlays";

export default function Contact() {
  const root = useRef(null);
  const { notify } = useOverlays();
  const c = site.contacts;
  const p = photos.tram;

  // Фото медленно приближается, пока карточка держится на месте.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".contact__photo img",
          { scale: 1.15 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true },
          }
        );
      });
    },
    { scope: root }
  );

  const copy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      notify(`${label} скопирован`);
    } catch {
      notify(text);
    }
  };

  return (
    <section id="contact" className="contact" ref={root} data-section aria-labelledby="contact-title">
      <div className="contact__photo">
        <img src={p.src} width={p.w} height={p.h} alt={p.alt} loading="lazy" decoding="async" />
      </div>
      <div className="contact__card" data-reveal>
        <h2 id="contact-title" className="contact__title">
          Записаться
        </h2>
        <p className="contact__address">
          {c.address.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </p>
        <dl className="contact__hours">
          {c.hours.map(([d, t]) => (
            <div key={d}>
              <dt>{d}</dt>
              <dd className="tabular">{t}</dd>
            </div>
          ))}
        </dl>
        <div className="contact__lines">
          <div className="contact__line">
            <a className="link" href={c.phoneHref}>
              {c.phone}
            </a>
            <button className="text-btn contact__copy" onClick={() => copy(c.phone, "Номер")}>
              Копировать
            </button>
          </div>
          <div className="contact__line">
            <a className="link" href={`mailto:${c.email}`}>
              {c.email}
            </a>
          </div>
          <div className="contact__social">
            <a className="link" href={c.instagram.href} target="_blank" rel="noopener">
              Instagram
            </a>
            <a className="link" href={c.telegram.href} target="_blank" rel="noopener">
              Telegram
            </a>
            <a className="link" href={c.youtube.href} target="_blank" rel="noopener">
              YouTube
            </a>
          </div>
        </div>
        <a className="btn btn--wide btn--tall" href={c.bot.href} target="_blank" rel="noopener">
          Открыть Telegram-бота
        </a>
      </div>
    </section>
  );
}
