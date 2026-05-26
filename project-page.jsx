/* global React, window */
// Project detail page — one route per project, deep-linkable via #/p/<slug>
const { useEffect, useRef } = React;
const { PROJECTS } = window.PORTFOLIO_DATA;
const { Reveal, Foot } = window.Portfolio;

function ArrowUR({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 10.5 L10.5 3.5" />
      <path d="M5 3.5 L10.5 3.5 L10.5 9" />
    </svg>
  );
}
function ArrowL({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3.5 L4 7 L9 10.5" />
      <path d="M4 7 L13 7" />
    </svg>
  );
}

function PPMiniNav() {
  return (
    <header className="nav is-scrolled">
      <div className="wrap nav-inner">
        <a href="#/" className="brand">
          <span className="brand-dot" />
          <span>Nico Armando Bertone</span>
          <small>— Brand designer & DA</small>
        </a>
        <a href="#/" className="pp-back" aria-label="Retour au portfolio">
          <ArrowL size={14} />
          <span>Tous les projets</span>
        </a>
      </div>
    </header>
  );
}

function PPHeader({ project, index, total }) {
  return (
    <section className="wrap pp-header">
      <Reveal className="pp-meta-bar">
        <span><b>{String(index + 1).padStart(2, "0")}</b> · {String(total).padStart(2, "0")}</span>
        <span>{project.year}</span>
        <span>{project.tag}</span>
        <span>{project.client}</span>
      </Reveal>
      <Reveal as="h1" className="pp-title" delay={80}>
        {project.title}
      </Reveal>
      <div className="pp-intro">
        <Reveal className="pp-lede" delay={140}>
          {project.desc}
        </Reveal>
        <Reveal as="dl" className="pp-aside" delay={200}>
          <dt>Client</dt><dd>{project.client}</dd>
          <dt>Année</dt><dd>{project.year}</dd>
          <dt>Rôle</dt><dd>{project.role}</dd>
          <dt>Équipe</dt><dd>{project.team}</dd>
          <dt>Périmètre</dt>
          <dd>
            <ul>
              {project.scope.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </dd>
        </Reveal>
      </div>
    </section>
  );
}

function PPCover({ project }) {
  const wrap = useRef(null);
  const img = useRef(null);
  useEffect(() => {
    if (!wrap.current || !img.current) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = wrap.current.getBoundingClientRect();
        const vh = window.innerHeight;
        const center = r.top + r.height / 2 - vh / 2;
        const range = vh + r.height;
        const p = Math.max(-1, Math.min(1, (center / range) * 2));
        img.current.style.setProperty("--parallax-y", `${p * -50}px`);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <section className="wrap pp-cover-wrap">
      <Reveal>
        <div className="pp-cover" ref={wrap}>
          <img ref={img} src={project.image} alt={project.title} />
        </div>
      </Reveal>
    </section>
  );
}

function PPBody({ project }) {
  return (
    <section className="wrap section pp-body">
      <div className="pp-body-row">
        <Reveal className="section-num">01 — Contexte</Reveal>
        <Reveal as="p" className="pp-body-text" delay={80}>
          {project.context}
        </Reveal>
      </div>
      <div className="pp-body-row">
        <Reveal className="section-num">02 — Approche</Reveal>
        <Reveal as="p" className="pp-body-text" delay={80}>
          {project.approach}
        </Reveal>
      </div>
    </section>
  );
}

function PPGallery({ project }) {
  const gallery = project.gallery || [];
  if (gallery.length === 0) return null;
  const images = [project.image, ...gallery];
  return (
    <section className="wrap section pp-gallery">
      <div className="section-head">
        <Reveal className="section-num">03 — Visuels</Reveal>
        <Reveal as="h2" className="section-title" delay={80}>
          Plus de visuels.
        </Reveal>
      </div>
      <div className="pp-gal">
        <Reveal className="pp-gal-cell pp-gal-cell--lg">
          <img src={images[0]} alt="" />
        </Reveal>
        {images.slice(1).map((src, i) => (
          <Reveal key={src} className="pp-gal-cell" delay={(i + 1) * 60}>
            <img src={src} alt="" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function PPOutcomes({ project, num = "04" }) {
  return (
    <section className="wrap section pp-outcomes">
      <div className="section-head">
        <Reveal className="section-num">{num} — Résultats</Reveal>
        <Reveal as="h2" className="section-title" delay={80}>
          Ce qui a bougé.
        </Reveal>
      </div>
      <div className="pp-outs">
        {project.outcomes.map((o, i) => (
          <Reveal key={i} className="pp-out" delay={i * 80}>
            <div className="pp-out-val">{o.value}</div>
            <div className="pp-out-lbl">{o.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function PPNext({ next }) {
  return (
    <section className="wrap section pp-next">
      <a href={`#/p/${next.slug}`} className="pp-next-link">
        <div className="pp-next-meta">
          <span className="section-num">Projet suivant</span>
        </div>
        <h2 className="pp-next-title">
          <span>{next.title}</span>
          <span className="pp-next-arrow"><ArrowUR size={28} /></span>
        </h2>
        <div className="pp-next-cover">
          <img src={next.image} alt={next.title} loading="lazy" />
        </div>
      </a>
    </section>
  );
}

function PPNotFound() {
  return (
    <main className="pp">
      <PPMiniNav />
      <section className="wrap section">
        <h1 className="display">Projet introuvable.</h1>
        <p className="hero-lede" style={{ marginTop: 16 }}>
          La page que vous cherchez n'existe pas. <a href="#/" style={{ borderBottom: "1px solid currentColor" }}>Retour au portfolio</a>.
        </p>
      </section>
    </main>
  );
}

function ProjectPage({ slug }) {
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  if (idx < 0) return <PPNotFound />;
  const project = PROJECTS[idx];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const hasGallery = project.gallery && project.gallery.length > 0;

  return (
    <main className="pp">
      <PPMiniNav />
      <PPHeader project={project} index={idx} total={PROJECTS.length} />
      <PPCover project={project} />
      <PPBody project={project} />
      {hasGallery && <PPGallery project={project} />}
      <PPOutcomes project={project} num={hasGallery ? "04" : "03"} />
      <PPNext next={next} />
      <Foot />
    </main>
  );
}

window.ProjectPage = ProjectPage;
