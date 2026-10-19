import { steps } from "@/lib/site";
import Photo from "./Photo";

export default function Process() {
  return (
    <section className="process" aria-labelledby="process-title">
      <h2 id="process-title" className="head process__title" data-section>
        <span data-reveal="lines">Как проходит съёмка</span>
      </h2>
      <ol className="process__list">
        {steps.map((s, i) => (
          <li key={s.when} className={`process__step process__step--${i + 1}`} data-section>
            <Photo name={s.photo} className="process__photo" />
            <p className="process__text" data-reveal>
              <strong>{s.when}</strong> {s.text}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
