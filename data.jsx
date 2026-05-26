/* global window */
// Data — projets Nico Armando Bertone, brand designer & DA.

const PROJECTS = [
  {
    id: 1,
    slug: "write-or-die",
    title: "Write or Die",
    tag: "Brand",
    year: "2025",
    role: "Direction artistique + Identité",
    desc: "App d'écriture créative. Identité fougueuse, campagne d'affichage, signalétique — un mot d'ordre : ne pas attendre l'inspiration.",
    tags: ["Identité", "Campagne", "App"],
    image: "assets/projects/write-or-die.png",
    gallery: [
      "assets/projects/write-or-die-banner.png",
      "assets/projects/write-or-die-billboard.png",
      "assets/projects/write-or-die-splash.png",
      "assets/projects/write-or-die-handphone.png",
    ],
    span: { col: 4, row: 2 },
    client: "Write or Die",
    scope: ["Identité visuelle", "Logo & display type", "Campagne lancement", "Signalétique"],
    team: "Fondateur · Designer (moi)",
    context:
      "Write or Die est une app d'écriture pour ceux qui ne peuvent pas s'arrêter. Le défi : construire une marque qui pousse à écrire — pas une appli sage, une présence.",
    approach:
      "Un monogramme calligraphique qui vibre, un display serif qui hurle, une palette noir/braise. Campagne d'affichage urbaine, splash sombre, présence physique. La marque doit sentir l'urgence créative.",
    outcomes: [
      { value: "1 identité", label: "logo + display + campagne" },
      { value: "5 supports", label: "écran · papier · signalétique" },
      { value: "Coming soon", label: "lancement contrôlé" },
    ],
  },
  {
    id: 2,
    slug: "societe-generale",
    title: "Société Générale",
    tag: "Fintech",
    year: "2024",
    role: "Designer brand & produit",
    desc: "Refonte de l'écran d'accueil bancaire. Hiérarchie remise au clair, voix plus calme, geste de marque réinscrit dans le produit.",
    tags: ["App", "Fintech", "Brand-in-product"],
    image: "assets/projects/societe-generale.jpg",
    span: { col: 2, row: 2 },
    client: "Société Générale",
    scope: ["Écran d'accueil", "Voix de marque", "Design system mobile"],
    team: "Équipe SG · 3 designers",
    context:
      "L'app SG cumule des années d'ajouts. L'accueil mélange soldes, suggestions, raccourcis — du bruit là où l'utilisateur cherche des repères en quelques secondes.",
    approach:
      "On part de la tâche dominante — vérifier un solde, virer un montant — pour tout réordonner autour. Carte de solde claire, raccourcis primaires, assistant à sa place, CTA dans la zone du pouce.",
    outcomes: [
      { value: "-31 %", label: "temps moyen pour virer" },
      { value: "+18 %", label: "satisfaction accueil" },
      { value: "12", label: "écrans refondus" },
    ],
  },
  {
    id: 3,
    slug: "bertone-agency",
    title: "Bertone Agency",
    tag: "Brand",
    year: "2024",
    role: "Fondateur · Direction artistique",
    desc: "Identité du studio. Logo trèfle, type Geist condensé, photographie narrative — une posture revendiquée, pas un compromis.",
    tags: ["Identité", "Studio", "Direction"],
    image: "assets/projects/bertone-agency.jpg",
    gallery: ["assets/projects/bertone-agency-mobile.jpg"],
    span: { col: 4, row: 2 },
    client: "Bertone Agency",
    scope: ["Identité", "Logo & typographie", "Site flagship", "Direction artistique"],
    team: "Solo",
    context:
      "Bertone Agency, mon studio. Je voulais une marque qui défende une position — stratégie, design, performance — et deux modes d'engagement très clairs.",
    approach:
      "Logo trèfle simplifié, Geist condensé en majuscules, photographie narrative IA en clair-obscur. Identité dense en intention, dépouillée en surface.",
    outcomes: [
      { value: "1 identité", label: "logo + type + voix" },
      { value: "Solo", label: "design + build" },
      { value: "2 modèles", label: "d'engagement clarifiés" },
    ],
  },
  {
    id: 4,
    slug: "brule-jour",
    title: "Brûle-Jour",
    tag: "Brand",
    year: "2023",
    role: "Direction artistique",
    desc: "Maison de bougies Made in France. Serif éditorial XL, clair-obscur, palette ivoire-noir-vert profond — un rituel mis en bouteille.",
    tags: ["Identité", "Packaging", "E-commerce"],
    image: "assets/projects/brule-jour.jpg",
    span: { col: 2, row: 2 },
    client: "Brûle-Jour",
    scope: ["Identité", "Packaging", "E-commerce"],
    team: "Fondatrice · Designer (moi)",
    context:
      "Brûle-Jour fabrique des bougies parfumées en France. Marché saturé — différenciation par le rituel et la matière. L'identité devait parler de calme.",
    approach:
      "Serif éditorial en grande échelle, photographie en clair-obscur, palette ivoire-noir-vert profond. Packaging minimal, fiche produit centrée sur l'odeur et le rituel.",
    outcomes: [
      { value: "Direction complète", label: "identité + packaging + site" },
      { value: "4 fragrances", label: "lancées en gamme" },
      { value: "Made in FR", label: "de bout en bout" },
    ],
  },
  {
    id: 5,
    slug: "sable",
    title: "Sable",
    tag: "Brand",
    year: "2024",
    role: "Direction artistique + Produit",
    desc: "App d'épargne automatisée. Direction sombre, gold, serif éditorial — la fintech qui parle bas, et avec confiance.",
    tags: ["Identité", "App", "Fintech"],
    image: "assets/projects/sable.jpg",
    span: { col: 3, row: 2 },
    client: "Sable",
    scope: ["Identité", "App mobile", "Direction artistique"],
    team: "Fondateur · Designer (moi)",
    context:
      "Sable propose une épargne en pilote automatique — l'app prélève de petits montants selon vos habitudes. Le ton devait rassurer : épargner sans y penser, en confiance.",
    approach:
      "Direction sombre, gold doux, serif éditorial. Onboarding 5 étapes pour calibrer le rythme. Estimation de gain visible dès la première étape pour ancrer la promesse.",
    outcomes: [
      { value: "5 étapes", label: "onboarding total" },
      { value: "+47 %", label: "complétion vs benchmark" },
      { value: "200 € / mois", label: "épargne médiane" },
    ],
  },
  {
    id: 6,
    slug: "n-dance-center",
    title: "N' Dance Center",
    tag: "Brand",
    year: "2023",
    role: "Direction artistique + Web",
    desc: "Association de danse en banlieue parisienne. Direction sombre cinéma, photographie de cours, accents jaune fluo — une marque qui bouge.",
    tags: ["Identité", "Site web", "Photo direction"],
    image: "assets/projects/n-dance-center.jpg",
    span: { col: 3, row: 2 },
    client: "N' Dance Center",
    scope: ["Direction artistique", "Site vitrine", "Identité"],
    team: "Présidente · Designer (moi)",
    context:
      "Association de danse à Noisy-le-Grand depuis 2017. Modern jazz, dancehall, hip-hop, street dance — un public jeune, exigeant sur le niveau et l'esthétique.",
    approach:
      "Direction sombre cinéma, photographie de cours forte, accents jaune fluo en rupture. Hiérarchie claire : présentation, planning, inscription. Mobile-first.",
    outcomes: [
      { value: "+62 %", label: "inscriptions en ligne" },
      { value: "8 styles", label: "présentés au public" },
      { value: "1 site", label: "qui ressemble à la marque" },
    ],
  },
  {
    id: 7,
    slug: "packler",
    title: "Packler",
    tag: "Brand",
    year: "2024",
    role: "Lead brand + produit",
    desc: "Marketplace de déménagement. Brand bleu électrique, ton direct, app + comms — du 0 à 1 jusqu'à la mise en marché.",
    tags: ["Identité", "App", "0→1"],
    image: "assets/projects/packler.jpg",
    span: { col: 3, row: 2 },
    client: "Packler",
    scope: ["Identité", "App mobile", "Brand + Produit"],
    team: "PM · 2 devs · Designer (moi)",
    context:
      "Packler crée une marketplace entre particuliers et déménageurs. Transformer un acte stressant en parcours fluide, du devis à la signature.",
    approach:
      "Deux modes d'entrée : Packler Now (urgence) et Déménagement (planifié). Identité directe, bleu vif, illustration produit. Scan IA pour estimer le volume, devis instantané.",
    outcomes: [
      { value: "0 → 1", label: "lancement marché" },
      { value: "8 k +", label: "devis / mois" },
      { value: "92 %", label: "complétion devis" },
    ],
  },
  {
    id: 8,
    slug: "homy-expert",
    title: "Homy Expert",
    tag: "Brand",
    year: "2023",
    role: "Identité + App",
    desc: "Expertise immobilière à distance. Identité hexagonale, splash bleu profond, app + plateforme — de l'identité au parcours expert.",
    tags: ["Identité", "App", "Immobilier"],
    image: "assets/projects/homy-expert.jpg",
    span: { col: 3, row: 2 },
    client: "Homy Expert",
    scope: ["Identité", "App client", "Plateforme expert"],
    team: "PM · Dev · Designer (moi)",
    context:
      "Homy Expert connecte propriétaires et experts certifiés pour l'expertise immobilière à distance. App + plateforme web pour les experts terrain.",
    approach:
      "Identité hexagonale qui rappelle l'expertise (les facettes), splash sombre à dégradé bleu profond. App client épurée, plateforme expert dense pour la productivité.",
    outcomes: [
      { value: "2 produits", label: "client + expert" },
      { value: "Splash → Capture", label: "parcours complet" },
      { value: "Identité + système", label: "livrés" },
    ],
  },
];

const CATEGORIES = ["Tout", "Identité", "App", "Site web", "Direction", "0→1"];

const CAPABILITIES = [
  {
    num: "01",
    title: "Identité de marque",
    desc: "Construire une marque qui tient — logo, type, voix, palette. Un parti pris, pas un compromis.",
    items: ["Logo & monogramme", "Système typographique", "Palette & matière", "Voix de marque"],
  },
  {
    num: "02",
    title: "Direction artistique",
    desc: "Le geste qui porte la marque. Photographie, mise en scène, rythme, choix qu'on défend.",
    items: ["Photographie", "Mise en scène", "Référentiel visuel", "Style guide"],
  },
  {
    num: "03",
    title: "Brand system",
    desc: "Les fondations qui font tenir l'ensemble — tokens, composants, gouvernance, déclinaisons.",
    items: ["Tokens & thèmes", "Composants", "Documentation", "Adoption"],
  },
  {
    num: "04",
    title: "Print & digital",
    desc: "Une marque vit sur les supports qu'on touche autant que sur ceux qu'on tape. Papier, écran, signalétique.",
    items: ["Papeterie & édition", "Site flagship", "Campagne", "Signalétique"],
  },
];

const PROCESS = [
  {
    num: "01",
    title: "Cadrer",
    body: "On part du problème, pas de la solution. On clarifie l'audience, la position, les contraintes — et ce qu'on défend.",
    deliv: ["Brief", "Vocabulaire", "Critères de succès"],
  },
  {
    num: "02",
    title: "Comprendre",
    body: "Audit, références, terrain. Assez de matière pour décider, jamais plus. La recherche sert le rythme de la marque.",
    deliv: ["Audit visuel", "Références", "Mood"],
  },
  {
    num: "03",
    title: "Designer",
    body: "Logo, type, palette, déclinaisons. On itère vite, on cherche le geste juste — celui qui sera reconnaissable de loin.",
    deliv: ["Identité", "Déclinaisons", "Prototypes"],
  },
  {
    num: "04",
    title: "Livrer",
    body: "Brand guidelines précises, fichiers source, accompagnement jusqu'au lancement. On garde la marque vivante.",
    deliv: ["Brand book", "Fichiers source", "Lancement"],
  },
];

window.PORTFOLIO_DATA = { PROJECTS, CATEGORIES, CAPABILITIES, PROCESS };
