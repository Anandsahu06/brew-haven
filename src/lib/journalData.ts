export interface JournalArticle {
  id: string;
  title: string;
  subtitle: string;
  excerpt: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  readTime: string;
  date: string;
  image: string;
  category: string;
  tags: string[];
  extractionParameters: {
    origin: string;
    altitude: string;
    grindSize: string;
    waterTemp: string;
    ratio: string;
    bloomTime: string;
  };
  content: {
    heading: string;
    paragraphs: string[];
    quote?: string;
  }[];
}

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'b1',
    title: 'The Science of High-Altitude Extraction',
    subtitle: 'Why 2,200m volcanic soil slows cherry maturation for extraordinary floral clarity.',
    excerpt: 'Exploring how cold mountain nights in Chikmagalur and Yirgacheffe slow coffee cherry sugar development, yielding dense cell walls and intense bergamot aromatics.',
    author: 'Elena Vance',
    authorRole: 'Head of Quality Control & Sourcing',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    readTime: '6 min read',
    date: 'Oct 28, 2025',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    category: 'Roasting Science',
    tags: ['High Altitude', 'Chikmagalur', 'Volcanic Soil', 'Extraction Science'],
    extractionParameters: {
      origin: 'Chikmagalur Baba Budangiri Estate',
      altitude: '1,900m ASL',
      grindSize: 'Medium-Fine (650 Microns)',
      waterTemp: '92.5°C (198.5°F)',
      ratio: '1:16.5 (15g Coffee : 247.5g Water)',
      bloomTime: '45 seconds (45g water pour)',
    },
    content: [
      {
        heading: 'Elevation & Cellular Density',
        paragraphs: [
          'High altitude is the single most influential terroir variable in specialty coffee. At elevations exceeding 1,800 meters above sea level, ambient temperatures drop significantly during mountain nights. This thermal contrast slows the respiration rate of the coffee shrub, extending the maturation phase of the cherry by up to three additional months.',
          'During this extended maturation cycle, complex sucrose chains accumulate inside the seed rather than being consumed for rapid vegetative growth. The resulting bean exhibits exceptionally dense cellular architecture—yielding high concentrations of chlorogenic acids, phosphoric acidity, and volatile bergamot terpenes.',
        ],
        quote: 'Extended maturation in high-altitude volcanic soil develops dense cellular structures that preserve floral aromatics through precision drum roasting.',
      },
      {
        heading: 'Unlocking Floral Aromatics via Precision Bloom',
        paragraphs: [
          'When brewing dense high-altitude Arabicas, standard extraction profiles often under-extract the interior core of the grounds. To overcome high bean density, the initial bloom phase must dissolve trapped carbon dioxide while gently hydrating sucrose compounds.',
          'We recommend a 45-second bloom using water heated to exactly 92.5°C. Water at this precise temperature destabilizes organic acid bonds without scorching delicate floral esters like linalool and geraniol.',
        ],
      },
    ],
  },
  {
    id: 'b2',
    title: 'Chemex vs. V60: Precision Bloom Math',
    subtitle: 'Comparing paper filter micron density, fluid dynamics, and heat retention.',
    excerpt: 'A fluid dynamics breakdown comparing double-bonded Chemex paper filter density against V60 spiral rib flow velocity during manual pour-over extraction.',
    author: 'Marcus Sterling',
    authorRole: 'Master Roaster & Fluid Dynamics Specialist',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    readTime: '8 min read',
    date: 'Nov 12, 2025',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
    category: 'Brew Techniques',
    tags: ['V60', 'Chemex', 'Flow Rate', 'Pour-Over'],
    extractionParameters: {
      origin: 'Coorg Highland Geisha Reserve',
      altitude: '1,750m ASL',
      grindSize: 'Medium (750 Microns)',
      waterTemp: '94.0°C (201.2°F)',
      ratio: '1:15 (20g Coffee : 300g Water)',
      bloomTime: '40 seconds (50g water pour)',
    },
    content: [
      {
        heading: 'Filter Micron Density & Lipid Trapping',
        paragraphs: [
          'The fundamental difference between the Chemex and the Hario V60 lies in filter paper porosity and wall friction. Chemex proprietary paper filters are 20% to 30% heavier than standard paper filters, creating a dense barrier that traps diterpenes (caFestol and kahweol) and insoluble micro-fines.',
          'This produces a glass-like clarity with zero sediment, emphasizing bright citrus acidity and tea-like tea body. Conversely, the V60 spiral interior ribs allow air escape and accelerated side flow, preserving natural coffee oils for a silky, rounded mouthfeel.',
        ],
        quote: 'Chemex filtration produces pristine tea-like body, while V60 spiral ribs maximize turbulent flow for complex berry brightness.',
      },
      {
        heading: 'Thermal Loss Dynamics & Pour Speed',
        paragraphs: [
          'Because Chemex borosilicate glass has higher thermal mass than ceramic V60 drippers, pre-heating the vessel with 200ml of boiling water is non-negotiable. Without pre-heating, slurry temperatures plunge by up to 4°C during the first pulse pour, resulting in sour under-extraction.',
        ],
      },
    ],
  },
  {
    id: 'b3',
    title: 'Japanese Ice Towers: 24-Hour Cold Drip',
    subtitle: 'Extracting volatile aromatics while leaving bitter tannic acids untouched.',
    excerpt: 'Exploring how drop-by-drop ice water extraction at 1 drop per 1.5 seconds dissolves aromatic esters without extracting bitter caffeic and tannic acids.',
    author: 'Sophia Chen',
    authorRole: 'Cold Extraction Lead & Flavor Chemist',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    readTime: '5 min read',
    date: 'Dec 04, 2025',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1200&q=80',
    category: 'Craft Methods',
    tags: ['Cold Drip', 'Araku Valley', 'Ice Tower', 'Zero Bitterness'],
    extractionParameters: {
      origin: 'Araku Valley Micro-Lot, AP',
      altitude: '1,600m ASL',
      grindSize: 'Coarse (900 Microns)',
      waterTemp: '2.0°C (35.6°F Ice Slurry)',
      ratio: '1:12 (100g Coffee : 1200ml Water)',
      bloomTime: 'Slow Drip 1 drop / 1.5 sec (24 Hours)',
    },
    content: [
      {
        heading: 'Solubility at Near-Freezing Temperatures',
        paragraphs: [
          'Traditional hot coffee brewing relies on thermal energy to dissolve coffee solubles within 3 to 4 minutes. However, heat also extracts quinic acid and bitter tannins toward the end of the brew cycle. Japanese Kyoto-style cold drip towers replace thermal energy with kinetic time energy.',
          'By passing ice water drop-by-drop through a compressed column of organic Araku Valley grounds over 24 hours, lipid-bound aromatic esters dissolve smoothly into the distillate while heavy bitter tannic acids remain insoluble in cold water.',
        ],
        quote: '24-hour slow drip extraction transforms single-origin beans into a velvety, liqueur-like elixir with zero bitterness and natural chocolate sweetness.',
      },
      {
        heading: 'Aging & Flavor Oxidation',
        paragraphs: [
          'Unlike immersion cold brew which undergoes rapid oxidation in open vats, Kyoto slow drip distillate is collected sealed drop-by-drop. When refrigerated for 48 hours post-extraction, natural ferment esters develop a rich bourbon vanilla and dark plum complexity.',
        ],
      },
    ],
  },
];
