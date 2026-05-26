/* global React, ReactDOM, window */
const { useState, useEffect, useRef, useMemo } = React;
const { PROJECTS, CATEGORIES, CAPABILITIES, PROCESS } = window.PORTFOLIO_DATA;

// ── Reveal on scroll ────────────────────────────────────────────────
function Reveal({ children, delay = 0, as: As = "div", className = "", ...rest }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current || seen) return;
    // If already in viewport on mount (initial paint, prerender, throttled IO),
    // reveal synchronously — don't wait for IntersectionObserver.
    const r = ref.current.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (r.top < vh && r.bottom > 0) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSeen(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [seen]);
  return (
    <As
      ref={ref}
      className={`reveal ${seen ? "is-in" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms`, ...(rest.style || {}) }}
      {...rest}
    >
      {children}
    </As>
  );
}

// ── Icons (minimal stroke) ──────────────────────────────────────────
function ArrowUR({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 10.5 L10.5 3.5" />
      <path d="M5 3.5 L10.5 3.5 L10.5 9" />
    </svg>
  );
}
function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 8.5A5 5 0 0 1 5.5 2 5 5 0 1 0 12 8.5Z" />
    </svg>
  );
}
function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="7" cy="7" r="2.6" />
      <path d="M7 1V2.5M7 11.5V13M1 7H2.5M11.5 7H13M2.6 2.6l1 1M10.4 10.4l1 1M2.6 11.4l1-1M10.4 3.6l1-1" />
    </svg>
  );
}

// ── Nav ─────────────────────────────────────────────────────────────
function Nav({ dark, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className="wrap nav-inner">
        <a href="#top" className="brand">
          <span className="brand-dot" />
          <span>Nico Armando Bertone</span>
          <small>— Brand designer & DA</small>
        </a>
        <nav className="nav-links">
          <a href="#work" className="nav-link">Work</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#capabilities" className="nav-link">Capabilities</a>
          <a href="#process" className="nav-link">Process</a>
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={dark ? "Activer le thème clair" : "Activer le thème sombre"}
            title={dark ? "Thème clair" : "Thème sombre"}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
          <a href="#contact" className="nav-cta">
            <i />
            Disponible
          </a>
        </div>
      </div>
    </header>
  );
}

// ── Hero ────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="hero wrap" id="top">
      <Reveal className="hero-meta">
        <span className="available"><i />Disponible dès maintenant</span>
        <span>Paris — remote</span>
        <span>Brand designer & DA</span>
        <span>fr / en</span>
      </Reveal>
      <Reveal as="h1" className="display" delay={80}>
        Pour les <em>marques</em><br/>
        qui se reconnaissent<br/>
        <span className="accent">de loin.</span>
      </Reveal>
      <div className="hero-foot">
        <Reveal className="hero-lede" delay={160}>
          Brand designer indépendant — identité, direction artistique, systèmes de marque. Du logo à la signalétique, de l'écran au papier, je travaille avec des équipes qui veulent un parti pris.
        </Reveal>
        <Reveal className="hero-stats" delay={220}>
          <div><b>4</b>années d'expérience</div>
          <div><b>40+</b>identités livrées</div>
          <div><b>12</b>marques accompagnées</div>
          <div><b>5</b>industries coverées</div>
        </Reveal>
        <Reveal className="cta-cluster" delay={280}>
          <a href="#work" className="btn btn--primary">
            Voir les projets
            <span className="btn-arrow"><ArrowUR /></span>
          </a>
          <a href="#contact" className="btn">
            Me contacter
            <span className="btn-arrow"><ArrowUR /></span>
          </a>
        </Reveal>
      </div>
      <Reveal className="img-marquee" delay={360}>
        <div className="img-marquee-track">
          {[...PROJECTS, ...PROJECTS].map((p, i) => (
            <a key={`m-${i}`} className="img-marquee-item" href={`#/p/${p.slug}`}>
              <div className="frame"><img src={p.image} alt={p.title} loading="lazy" /></div>
              <div className="lbl"><b>{p.title}</b><span>{p.year}</span></div>
            </a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

// ── Featured Showcase (full-bleed parallax) ───────────────────────────────
function Showcase() {
  const featured = PROJECTS[0]; // Société Générale
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
        // progress: -1 (above) to 1 (below)
        const center = r.top + r.height / 2 - vh / 2;
        const range = vh + r.height;
        const p = Math.max(-1, Math.min(1, (center / range) * 2));
        img.current.style.setProperty("--parallax-y", `${p * -40}px`);
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
    <section className="section wrap showcase" id="showcase">
      <div className="showcase-head">
        <Reveal className="label">F··01 — Showcase</Reveal>
        <Reveal>Étude de cas mise en avant</Reveal>
      </div>
      <Reveal>
        <div className="showcase-frame" ref={wrap}>
          <img ref={img} src={featured.image} alt={featured.title} />
        </div>
      </Reveal>
      <div className="showcase-meta">
        <Reveal as="h2" className="showcase-title" delay={80}>
          {featured.title} <em>— identité lancement</em>
        </Reveal>
        <Reveal className="showcase-desc" delay={140}>
          <span><b>Rôle</b> {featured.role}</span>
          <span><b>Année</b> {featured.year}</span>
          <span><b>Tag</b> {featured.tag}</span>
          <a href={`#/p/${featured.slug}`} className="showcase-cta">
            Voir le projet
            <span className="btn-arrow"><ArrowUR /></span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

// ── Editorial Index (cursor-follow list) ───────────────────────────────
function CursorPreview({ preview }) {
  const ref = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => { target.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", onMove);
    let raf = 0;
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.18;
      pos.current.y += (target.current.y - pos.current.y) * 0.18;
      if (ref.current) {
        ref.current.style.transform =
          `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%) scale(${preview ? 1 : 0.85}) rotate(${preview ? 0 : -3}deg)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [preview]);
  return (
    <div ref={ref} className={`cursor-preview ${preview ? "is-on" : ""}`}>
      {preview && <img src={preview.image} alt="" />}
    </div>
  );
}

function EditorialIndex({ projects }) {
  const [preview, setPreview] = useState(null);
  return (
    <React.Fragment>
      <div className="idx">
        {projects.map((p, i) => (
          <a
            key={p.id}
            href={`#/p/${p.slug}`}
            className="idx-row"
            onMouseEnter={() => setPreview(p)}
            onMouseLeave={() => setPreview(null)}
            onFocus={() => setPreview(p)}
            onBlur={() => setPreview(null)}
          >
            <span className="idx-num">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="idx-title">{p.title}</h3>
            <div className="idx-tags">
              {p.tags.map((t) => <span key={t}>{t}</span>)}
            </div>
            <span className="idx-year">{p.year}</span>
            <span className="idx-arrow"><ArrowUR size={18} /></span>
          </a>
        ))}
      </div>
      <CursorPreview preview={preview} />
    </React.Fragment>
  );
}

// ── About ───────────────────────────────────────────────────────────
function About() {
  return (
    <section className="section wrap" id="about">
      <div className="section-head">
        <Reveal className="section-num">02 — À propos</Reveal>
        <Reveal as="h2" className="section-title" delay={80}>
          Un designer qui pense marque, livre vite, et reste accroché au geste juste.
        </Reveal>
      </div>
      <div className="about">
        <Reveal as="dl" className="about-side">
          <dt>Basé à</dt><dd>Paris, FR</dd>
          <dt>Expérience</dt><dd>2022 → aujourd'hui</dd>
          <dt>Modèle</dt><dd>Freelance · Lead missions</dd>
          <dt>Industries</dt><dd>Brand · Fintech · Retail · Santé · Culture</dd>
          <dt>Stack</dt><dd>Identité · Direction · Print · Digital</dd>
        </Reveal>
        <Reveal className="about-body" delay={120}>
          <p>
            Brand designer depuis quatre ans, je construis des identités qui durent — du logo au site, de la signalétique à l'écran. J'aime les marques qui défendent une position.
          </p>
          <p className="muted">
            Ma conviction : une marque tient quand son geste se reconnaît de loin. Type, couleur, photographie, voix — tout doit dire la même chose. Je travaille avec les équipes produit comme avec les fondateurs ; je code-aware mes choix, je respecte les contraintes.
          </p>
          <p className="muted">
            Avant le freelance, j'ai été lead design dans une scale-up SaaS et designer senior dans un studio. Aujourd'hui, je choisis mes missions à la mission.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// ── Work ────────────────────────────────────────────────────────────
function ProjectCard({ p, layout }) {
  return (
    <a
      href={`#/p/${p.slug}`}
      className="card"
      style={
        layout === "bento"
          ? { gridColumn: `span ${p.span.col}`, gridRow: `span ${p.span.row}` }
          : undefined
      }
    >
      <div className="card-media">
        <span className="card-tag">{p.tag}</span>
        <span className="card-arrow"><ArrowUR /></span>
        {p.image
          ? <img src={p.image} alt={p.title} loading="lazy" />
          : <span className="placeholder">{p.media || "Cover"}</span>}
      </div>
      <div className="card-body">
        <div className="card-title">
          <span>{p.title}</span>
          <span className="year">{p.year}</span>
        </div>
        <div className="card-desc">{p.desc}</div>
        <div className="card-meta">
          {p.tags.map((t) => (
            <span className="tag" key={t}>{t}</span>
          ))}
        </div>
        <div className="list-year">{p.year}</div>
        <div className="list-arrow"><ArrowUR /></div>
      </div>
    </a>
  );
}

function Work({ layout }) {
  const [filter, setFilter] = useState("Tout");
  const filtered = useMemo(() => {
    if (filter === "Tout") return PROJECTS;
    return PROJECTS.filter((p) => p.tag.toLowerCase() === filter.toLowerCase()
      || p.tags.some((t) => t.toLowerCase() === filter.toLowerCase()));
  }, [filter]);
  return (
    <section className="section wrap" id="work">
      <div className="section-head">
        <Reveal className="section-num">03 — Selected work</Reveal>
        <div>
          <Reveal as="h2" className="section-title">
            Huit marques, choisies pour leur clarté.
          </Reveal>
          <Reveal className="work-filters" delay={120} style={{ marginTop: 24 }}>
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={`work-filter ${filter === c ? "is-active" : ""}`}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </Reveal>
        </div>
      </div>
      <Reveal className="work-grid">
        {filtered.map((p) => (
          <ProjectCard key={p.id} p={p} layout={layout} />
        ))}
      </Reveal>
      <EditorialIndex projects={filtered} />
    </section>
  );
}

// ── Capabilities ────────────────────────────────────────────────────
function Capabilities() {
  return (
    <section className="section wrap" id="capabilities">
      <div className="section-head">
        <Reveal className="section-num">04 — Capabilities</Reveal>
        <Reveal as="h2" className="section-title" delay={80}>
          Quatre disciplines, un seul langage : le produit.
        </Reveal>
      </div>
      <div className="caps">
        {CAPABILITIES.map((c, i) => (
          <Reveal key={c.num} className="cap" delay={i * 80}>
            <div className="cap-num">{c.num}</div>
            <h3 className="cap-title">{c.title}</h3>
            <p className="cap-desc">{c.desc}</p>
            <ul className="cap-items">
              {c.items.map((it) => <li key={it}>{it}</li>)}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── Process ─────────────────────────────────────────────────────────
function Process() {
  return (
    <section className="section wrap" id="process">
      <div className="section-head">
        <Reveal className="section-num">05 — Process</Reveal>
        <Reveal as="h2" className="section-title" delay={80}>
          Quatre étapes, pas une de plus.
        </Reveal>
      </div>
      <div className="process">
        {PROCESS.map((s, i) => (
          <Reveal key={s.num} className="step" delay={i * 60}>
            <div className="step-num">{s.num}</div>
            <h3 className="step-title">{s.title}</h3>
            <div className="step-body">
              <p>{s.body}</p>
              <div className="deliv">
                {s.deliv.map((d) => <span className="tag" key={d}>{d}</span>)}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ── Contact ─────────────────────────────────────────────────────────
function Contact() {
  return (
    <section className="section wrap contact" id="contact">
      <div className="section-head">
        <Reveal className="section-num">06 — Contact</Reveal>
        <Reveal as="h2" className="section-title" delay={80}>
          On en parle ?
        </Reveal>
      </div>
      <Reveal as="p" className="contact-display">
        Disponible pour de nouvelles missions <em style={{ fontStyle: "normal", color: "var(--mute)" }}>dès maintenant</em>.<br />
        Écrivez-moi : <a href="mailto:nico-armando@bertone.agency">nico-armando@bertone.agency</a>
      </Reveal>
      <div className="contact-grid">
        <Reveal className="contact-block">
          <span className="label">Email</span>
          <span className="value"><a href="mailto:nico-armando@bertone.agency">nico-armando@bertone.agency</a></span>
        </Reveal>
        <Reveal className="contact-block" delay={80}>
          <span className="label">Téléphone</span>
          <span className="value"><a href="tel:+33645049227">+33 6 45 04 92 27</a></span>
        </Reveal>
        <Reveal className="contact-block" delay={160}>
          <span className="label">Social</span>
          <span className="value">
            <a href="https://www.linkedin.com/in/nico-bertone-0037271b8/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </span>
        </Reveal>
        <Reveal className="contact-block" delay={240}>
          <span className="label">Basé à</span>
          <span className="value">Paris, France</span>
        </Reveal>
      </div>
    </section>
  );
}

// ── Footer ──────────────────────────────────────────────────────────
function Foot() {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Paris" })
  );
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Paris" }));
    }, 30000);
    return () => clearInterval(id);
  }, []);
  return (
    <footer className="wrap foot">
      <span>© Nico Armando Bertone — 2026</span>
      <span className="clock"><i />Paris · {time}</span>
      <span>Designed & built avec soin</span>
    </footer>
  );
}

window.Portfolio = { Nav, Hero, Showcase, About, Work, Capabilities, Process, Contact, Foot, Reveal };
