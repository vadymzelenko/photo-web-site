"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { site, sheet, services } from "@/lib/site";
import Photo from "./Photo";
import { useOverlays } from "./Overlays";

const frames = sheet.flatMap((run) => run.frames.map((name, i) => ({ name, title: i === 0 ? run.title : null })));
const allNames = frames.map((f) => f.name);

export default function Hero() {
  const { openLightbox } = useOverlays();
  const sheetRef = useRef(null);

  // Колонки контактного листа плывут с разной скоростью — лист «дышит» при прокрутке.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        gsap.utils.toArray(".sheet__cell", sheetRef.current).forEach((cell, i) => {
          const speed = [0, -60, -20, -90, -35, -70, -10][i % 7];
          gsap.to(cell, {
            y: speed,
            ease: "none",
            scrollTrigger: { trigger: sheetRef.current, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
      });
    },
    { scope: sheetRef }
  );

  return (
    <section id="top" className="hero" data-section data-start="top bottom">
      <div className="hero__band">
        <p className="hero__avail" data-reveal>
          {site.availability}
        </p>
        <ul className="hero__list" data-reveal="rows" aria-label="Съёмки">
          {services.slice(0, 6).map((s) => (
            <li key={s.id}>{s.name}</li>
          ))}
        </ul>
        <ul className="hero__list hero__list--places" data-reveal="rows" aria-label="Где">
          <li>Киев</li>
          <li>Днепр</li>
          <li>Студия</li>
          <li>Город и природа</li>
          <li>Выезд по Украине</li>
        </ul>
        <div className="hero__links" data-reveal="rows">
          <a className="link" href={site.contacts.instagram.href} target="_blank" rel="noopener">
            Instagram
          </a>
          <a className="link" href={site.contacts.telegram.href} target="_blank" rel="noopener">
            Telegram
          </a>
          <a className="link" href={site.contacts.phoneHref}>
            {site.contacts.phone}
          </a>
        </div>
      </div>

      <div className="hero__head">
        <h1 className="display" data-reveal="lines">
          Фотограф в Киеве и&nbsp;Днепре
        </h1>
        <div className="hero__lead">
          <p className="lead" data-reveal>
            Портреты, love story, семьи и свадьбы. Снимаю спокойно, без дежурных поз — кадры проявляются сами.
          </p>
          <a className="btn" href={site.contacts.bot.href} target="_blank" rel="noopener" data-reveal>
            Записаться в Telegram-боте
          </a>
        </div>
      </div>

      <div className="sheet" ref={sheetRef} aria-label="Контактный лист: избранные кадры">
        {frames.map((f, i) => (
          <div className="sheet__cell" key={f.name}>
            <p className="sheet__title">{f.title || " "}</p>
            <button className="sheet__frame" onClick={() => openLightbox(allNames, i)}>
              <Photo name={f.name} priority={i < 7} sizes="(min-width: 768px) 14vw, 50vw" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
