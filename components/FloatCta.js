"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";

// Плавающая кнопка на телефоне уходит, когда на экране уже есть контакты с той же кнопкой.
export default function FloatCta() {
  const [away, setAway] = useState(false);

  useEffect(() => {
    const targets = [document.querySelector("#contact"), document.querySelector(".footer")].filter(Boolean);
    const visible = new Set();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setAway(visible.size > 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <a
      className={`float-cta ${away ? "is-away" : ""}`}
      href={site.contacts.bot.href}
      target="_blank"
      rel="noopener"
      tabIndex={away ? -1 : undefined}
    >
      Записаться
    </a>
  );
}
