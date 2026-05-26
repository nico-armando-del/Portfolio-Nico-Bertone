/* global React, ReactDOM, window, useTweaks, TweaksPanel, TweakSection, TweakRadio, TweakColor, TweakToggle */
const { useEffect, useState } = React;
const { Nav, Hero, Showcase, About, Work, Capabilities, Process, Contact, Foot } = window.Portfolio;
const ProjectPage = window.ProjectPage;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "dark": false,
  "accent": "#C2693C",
  "density": "regular",
  "layout": "editorial",
  "showNums": true
}/*EDITMODE-END*/;

// Map accent hex → matching ink (darker, used for primary CTA hover) via oklch tweak.
// Each accent ships with a slightly darker companion so hovers stay legible.
const ACCENT_PRESETS = {
  "#C2693C": "#7E3F1E", // terre cuite (default)
  "#365C8C": "#1F3A5C", // bleu encre
  "#5C7A4F": "#33522A", // vert sauge
  "#0F0F0F": "#000000", // mono / noir pur
};

function parseRoute() {
  const h = window.location.hash || "";
  const m = h.match(/^#\/p\/([^/?#]+)/);
  if (m) return { type: "project", slug: decodeURIComponent(m[1]) };
  // Non-route hashes like #about, #work — keep on home, expose anchor.
  const anchor = h.startsWith("#") && !h.startsWith("#/") ? h.slice(1) : "";
  return { type: "home", anchor };
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = useState(parseRoute);

  useEffect(() => {
    let prev = parseRoute();
    const onHash = () => {
      const next = parseRoute();
      setRoute(next);

      if (next.type === "project") {
        window.scrollTo({ top: 0 });
      } else if (next.type === "home") {
        if (prev.type === "project") {
          // coming back from a project page
          if (next.anchor) {
            setTimeout(() => {
              const el = document.getElementById(next.anchor);
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              else window.scrollTo({ top: 0 });
            }, 80);
          } else {
            window.scrollTo({ top: 0 });
          }
        } else if (next.anchor && next.anchor !== prev.anchor) {
          // home → home with new section anchor
          const el = document.getElementById(next.anchor);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
      prev = next;
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Apply theme + density + accent to <html>
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = t.dark ? "dark" : "light";
    root.dataset.density = t.density;
    root.dataset.layout = t.layout;
    root.dataset.shownums = String(!!t.showNums);
    root.style.setProperty("--accent", t.accent);
    root.style.setProperty("--accent-ink", ACCENT_PRESETS[t.accent] || t.accent);
  }, [t.dark, t.density, t.layout, t.showNums, t.accent]);

  const toggleTheme = () => setTweak("dark", !t.dark);

  const isProject = route.type === "project";

  return (
    <React.Fragment>
      {isProject ? (
        <ProjectPage slug={route.slug} />
      ) : (
        <React.Fragment>
          <Nav dark={t.dark} onToggleTheme={toggleTheme} />
          <main>
            <Hero />
            <Showcase />
            <About />
            <Work layout={t.layout} />
            <Capabilities />
            <Process />
            <Contact />
          </main>
          <Foot />
        </React.Fragment>
      )}

      <TweaksPanel>
        <TweakSection label="Thème" />
        <TweakToggle label="Mode sombre" value={t.dark}
          onChange={(v) => setTweak("dark", v)} />
        <TweakColor label="Accent" value={t.accent}
          options={["#C2693C", "#365C8C", "#5C7A4F", "#0F0F0F"]}
          onChange={(v) => setTweak("accent", v)} />

        <TweakSection label="Mise en page" />
        <TweakRadio label="Densité" value={t.density}
          options={["compact", "regular", "comfy"]}
          onChange={(v) => setTweak("density", v)} />
        <TweakRadio label="Projets" value={t.layout}
          options={["editorial", "bento", "grid", "list"]}
          onChange={(v) => setTweak("layout", v)} />
        <TweakToggle label="Numéros de section" value={t.showNums}
          onChange={(v) => setTweak("showNums", v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
