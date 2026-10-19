import { photos, site } from "@/lib/site";

const credits = [...new Set(Object.values(photos).map((p) => p.credit))].join(", ");

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__what">
        {site.name} — фотограф, {site.cities}
      </p>
      <nav className="footer__links" aria-label="Соцсети">
        <a className="link" href={site.contacts.instagram.href} target="_blank" rel="noopener">
          Instagram
        </a>
        <a className="link" href={site.contacts.telegram.href} target="_blank" rel="noopener">
          Telegram
        </a>
        <a className="link" href={site.contacts.bot.href} target="_blank" rel="noopener">
          Бот для записи
        </a>
        <a className="link" href={site.contacts.phoneHref}>
          {site.contacts.phone}
        </a>
      </nav>
      <p className="footer__year">© {new Date().getFullYear()} {site.name}</p>
      <p className="footer__credits">Фото: {credits} (Unsplash)</p>
    </footer>
  );
}
