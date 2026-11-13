export interface ProjectData {
  id: string
  title: string
  subtitle: string
  url: string
  displayUrl: string
  category: string
  metrics: { label: string; value: string; color: string }[]
  tags: string[]
  description: string
  heroBadge: string
  heroTitle: string
  heroSubtitle: string
}

export const PROJECTS_DATA: ProjectData[] = [
  {
    id: 'paradise',
    title: 'Paradise Public School',
    subtitle: 'Institutional Admissions Platform & Educational Portal',
    url: 'https://paradisepublicschool.com',
    displayUrl: 'paradisepublicschool.com',
    category: 'CBSE INSTITUTIONAL PLATFORM // ESTD. 1994',
    heroBadge: 'Admissions Open: Nursery to Class 8 (Session 2026-27)',
    heroTitle: 'Nurturing Tomorrow’s Leaders Through Foundational Eminence',
    heroSubtitle:
      '32+ Years of Academic Rigor, Atal Tinkering Jr. Innovation Labs, World-Class Sports Turf, and Deeply Rooted Indian Values.',
    description:
      'Engineered from the ground up by Dhurav. Combines localized Google 3-Pack SEO dominance, high-converting digital admission funnels, automated fee collection, and cross-platform mobile apps for 1,200+ students.',
    tags: ['LOCAL SEO #1', 'META ADS CBO', 'ADMISSIONS ERP', 'CORE WEB VITALS 100'],
    metrics: [
      { label: 'Admissions Surge', value: '+340%', color: '#00f0ff' },
      { label: 'Google 3-Pack', value: '#1 Rank', color: '#10b981' },
      { label: 'Core Web Vitals', value: '100/100', color: '#a855f7' },
      { label: 'Page Load Speed', value: '0.4s', color: '#38bdf8' },
    ],
  },
  {
    id: 'virgovisor',
    title: 'Virgo Visor',
    subtitle: 'Premium Optical Helmet Visor D2C E-Commerce & ROAS Acquisition Engine',
    url: 'https://virgovisor.com',
    displayUrl: 'virgovisor.com',
    category: 'D2C E-COMMERCE & AUTOMATION // VISHNU ENTERPRISES',
    heroBadge: 'Optical-Grade Polycarbonate Helmet Visors (Pan-India D2C)',
    heroTitle: 'Hard-Coat Scratch Resistant Helmet Visors & D2C E-Commerce',
    heroSubtitle:
      'Engineered for Vega, Steelbird, Studds, LS2, and MT helmet models with UV400 protection, online UPI/COD checkout, and automated shipping workflows.',
    description:
      'Architected end-to-end e-commerce store infrastructure and multi-channel paid acquisition engine for virgovisor.com. Delivered +480% revenue expansion, automated inventory synchronization, frictionless single-page checkout, and targeted Meta Ads capturing motorcycle enthusiasts across India.',
    tags: ['PAN-INDIA D2C', 'META ADS CBO', 'HIGH-SPEED CHECKOUT', 'ROAS 5.1X'],
    metrics: [
      { label: 'Revenue Growth', value: '+480%', color: '#00f0ff' },
      { label: 'Blended ROAS', value: '5.1x', color: '#10b981' },
      { label: 'Conversion Rate', value: '4.8%', color: '#a855f7' },
      { label: 'Dispatch SLA', value: '<24h', color: '#f59e0b' },
    ],
  },
  {
    id: 'nexus',
    title: 'Nexus Performance Ad Suite',
    subtitle: 'Full-Funnel Paid Acquisition & Meta Ads Architecture',
    url: 'https://github.com/dhurav07122010-hue/Portfolio',
    displayUrl: 'nexus.growth-funnel.internal',
    category: 'PAID USER ACQUISITION // PERFORMANCE MARKETING',
    heroBadge: 'Performance Growth Engine // Meta Advantage+ & Google Ads',
    heroTitle: 'Algorithmic ROAS Maximization & Server-Side Conversions',
    heroSubtitle:
      'Automated Campaign Budget Optimization (CBO), creative fatigue rotation, and zero-drop-off lead capture architecture.',
    description:
      'Engineered full-funnel paid acquisition architecture utilizing Meta Advantage+ Campaigns, dynamic creative testing, and server-side Conversions API (CAPI) to eliminate signal loss.',
    tags: ['META ADS MANAGER', 'GOOGLE SEARCH', 'SERVER-SIDE CAPI', '4.2X ROAS'],
    metrics: [
      { label: 'Campaign ROAS', value: '4.2x', color: '#a855f7' },
      { label: 'Cost Per Lead', value: '-58%', color: '#10b981' },
      { label: 'Attribution Accuracy', value: '99.4%', color: '#00f0ff' },
      { label: 'Monthly Inquiries', value: '850+', color: '#f59e0b' },
    ],
  },
  {
    id: 'cyberpulse',
    title: 'CyberPulse SEO Engine',
    subtitle: 'Programmatic Local Search Dominance & Entity Schema',
    url: 'https://github.com/dhurav07122010-hue/Portfolio',
    displayUrl: 'cyberpulse.organic-seo.internal',
    category: 'ORGANIC SEARCH & LOCAL 3-PACK // IICS RESEARCH',
    heroBadge: 'Local 3-Pack Google Maps Dominance Framework',
    heroTitle: 'High-Intent Search Capture & Automated Schema Graphs',
    heroSubtitle:
      'Entity-based SEO, JSON-LD structured schemas, localized geo-coordinates, and zero-click Google featured snippets.',
    description:
      'Automated organic ranking system developed during Dhurav’s training at IICS Yamuna Vihar. Focuses on local search signals, automated citation syndication, and high-converting landing pages.',
    tags: ['GOOGLE 3-PACK', 'JSON-LD SCHEMA', 'SEMRUSH AUDITING', 'ENTITY SEO'],
    metrics: [
      { label: 'Organic Impressions', value: '+280%', color: '#10b981' },
      { label: 'Map Pack Actions', value: '+410%', color: '#00f0ff' },
      { label: 'Keywords Top 3', value: '45+', color: '#a855f7' },
      { label: 'Zero-Click Snippets', value: '18', color: '#f59e0b' },
    ],
  },
]
