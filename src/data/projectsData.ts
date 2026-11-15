export interface ProjectData {
  id: string
  title: string
  subtitle: string
  url: string
  displayUrl: string
  category: string
  heroBadge: string
  heroTitle: string
  heroSubtitle: string
  description: string
  tags: string[]
  metrics: { label: string; value: string; color: string }[]
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
      { label: 'Google 3-Pack', value: '#1 Rank', color: '#00f0ff' },
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
      { label: 'Blended ROAS', value: '5.1x', color: '#a855f7' },
      { label: 'Conversion Rate', value: '4.8%', color: '#00f0ff' },
      { label: 'Dispatch SLA', value: '<24h', color: '#f59e0b' },
    ],
  },
]
