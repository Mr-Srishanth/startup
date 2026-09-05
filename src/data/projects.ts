export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  role: string;
  timeline: string;
  liveUrl: string;
  heroImage: string;
  challenge: string;
  gallery: string[];
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'quantum-tech',
    title: 'Quantum Tech',
    client: 'Quantum AI Inc.',
    category: 'SaaS Platform',
    role: 'Digital Architecture',
    timeline: '2026',
    liveUrl: '#',
    heroImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop',
    challenge: 'We were approached to completely shatter the industry standard for AI platforms. The goal was to architect a high-converting digital presence leveraging bleeding-edge WebGL.',
    gallery: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1000&auto=format&fit=crop'
    ]
  },
  {
    id: '2',
    slug: 'aura-studio',
    title: 'Aura Studio',
    client: 'Aura Fashion',
    category: 'E-Commerce',
    role: 'Immersive Commerce',
    timeline: '2025',
    liveUrl: '#',
    heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop',
    challenge: 'Redefining luxury fashion e-commerce by blending physical retail atmospheres with limitless digital physics.',
    gallery: [
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000&auto=format&fit=crop'
    ]
  },
  {
    id: '3',
    slug: 'nexus-fin',
    title: 'Nexus Fin',
    client: 'Nexus Capital',
    category: 'Fintech App',
    role: 'UX/UI & WebGL',
    timeline: '2026',
    liveUrl: '#',
    heroImage: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000&auto=format&fit=crop',
    challenge: 'Turning complex blockchain data into a beautiful, cinematic storytelling experience for institutional investors.',
    gallery: [
      'https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1640340434855-6084b1f4901c?q=80&w=1000&auto=format&fit=crop'
    ]
  },
  {
    id: '4',
    slug: 'nova-brand',
    title: 'Nova Brand',
    client: 'Nova Automotive',
    category: 'Identity',
    role: 'Brand & Motion',
    timeline: '2024',
    liveUrl: '#',
    heroImage: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2000&auto=format&fit=crop',
    challenge: 'A complete rebrand and digital launch for a next-generation electric vehicle manufacturer focusing on raw speed and silence.',
    gallery: [
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503376760356-0733aff23018?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=1000&auto=format&fit=crop'
    ]
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}
