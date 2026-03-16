export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  rating: number;
  reviewCount: number;
  badge?: string;
  colors?: string[];
  sizes?: string[];
  inStock: boolean;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
}

export const categories: Category[] = [
  {
    id: "electronics",
    name: "Électronique",
    description: "Les dernières innovations tech",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&q=80",
    productCount: 42,
  },
  {
    id: "fashion",
    name: "Mode",
    description: "Tendances et style contemporain",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=80",
    productCount: 86,
  },
  {
    id: "home",
    name: "Maison",
    description: "Design intérieur moderne",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    productCount: 64,
  },
  {
    id: "sport",
    name: "Sport",
    description: "Équipement haute performance",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80",
    productCount: 35,
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Casque Audio Sans Fil Pro",
    description:
      "Casque audio premium avec réduction de bruit active, son spatial 3D et autonomie de 40h. Design en aluminium brossé avec coussinets en cuir véritable. Compatible avec tous vos appareils via Bluetooth 5.3.",
    price: 349.99,
    originalPrice: 449.99,
    category: "electronics",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&q=80",
    ],
    rating: 4.8,
    reviewCount: 2847,
    badge: "Best-seller",
    colors: ["#1a1a1a", "#c0c0c0", "#1e3a5f"],
    inStock: true,
  },
  {
    id: "2",
    name: "Montre Connectée Ultra",
    description:
      "Montre connectée nouvelle génération avec écran AMOLED Always-On, suivi santé avancé (ECG, SpO2, température), GPS multi-bandes et 14 jours d'autonomie. Résistante à l'eau 5ATM.",
    price: 599.0,
    category: "electronics",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80",
      "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=800&q=80",
    ],
    rating: 4.6,
    reviewCount: 1523,
    badge: "Nouveau",
    colors: ["#1a1a1a", "#f5f5dc", "#8b4513"],
    sizes: ["40mm", "44mm", "48mm"],
    inStock: true,
  },
  {
    id: "3",
    name: "Sneakers Édition Limitée",
    description:
      "Sneakers en cuir pleine fleur avec semelle en mousse responsive. Design minimaliste inspiré de l'architecture contemporaine. Fabriquées en Italie avec des matériaux durables.",
    price: 289.0,
    originalPrice: 350.0,
    category: "fashion",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 967,
    badge: "Édition limitée",
    colors: ["#ff4444", "#ffffff", "#1a1a1a"],
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
    inStock: true,
  },
  {
    id: "4",
    name: "Lampe Design Articulée",
    description:
      "Lampe de bureau articulée en laiton massif avec variateur tactile. Éclairage LED haute fidélité (CRI 98+) avec température de couleur ajustable. Un objet de design qui sublime votre espace de travail.",
    price: 195.0,
    category: "home",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=800&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80",
    ],
    rating: 4.7,
    reviewCount: 412,
    colors: ["#d4a853", "#1a1a1a", "#c0c0c0"],
    inStock: true,
  },
  {
    id: "5",
    name: "Sac à Dos Urbain Tech",
    description:
      "Sac à dos waterproof en tissu technique recyclé avec compartiment laptop 16\", port USB-C intégré, et système anti-vol. Bretelles ergonomiques avec mousse à mémoire de forme.",
    price: 159.0,
    originalPrice: 199.0,
    category: "fashion",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80",
    ],
    rating: 4.5,
    reviewCount: 738,
    badge: "-20%",
    colors: ["#1a1a1a", "#2d5a27", "#3d3d6b"],
    inStock: true,
  },
  {
    id: "6",
    name: "Enceinte Portable Premium",
    description:
      "Enceinte Bluetooth portable avec son omnidirectionnel 360°, basses profondes et 24h d'autonomie. Étanche IP67, parfaite pour toutes vos aventures. Appairage multi-room.",
    price: 249.99,
    category: "electronics",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800&q=80",
    ],
    rating: 4.4,
    reviewCount: 2103,
    colors: ["#1a1a1a", "#e8e0d0", "#cc5500"],
    inStock: true,
  },
  {
    id: "7",
    name: "Veste Technique All-Weather",
    description:
      "Veste technique 3 couches avec membrane imperméable et respirante. Coutures thermo-soudées, capuche ajustable et poches zippées étanches. Idéale pour le trail et la randonnée.",
    price: 320.0,
    category: "sport",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80",
    ],
    rating: 4.7,
    reviewCount: 531,
    badge: "Éco-responsable",
    colors: ["#2d5a27", "#1a1a1a", "#1e3a5f"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
  },
  {
    id: "8",
    name: "Fauteuil Lounge Scandinave",
    description:
      "Fauteuil lounge inspiré du design scandinave des années 50. Structure en chêne massif, assise en mousse haute densité et revêtement en tissu bouclé. Un classique intemporel pour votre salon.",
    price: 890.0,
    originalPrice: 1100.0,
    category: "home",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 284,
    badge: "Coup de cœur",
    colors: ["#d4c5a9", "#8b8b8b", "#2d5a27"],
    inStock: true,
  },
  {
    id: "9",
    name: "Lunettes de Soleil Polarisées",
    description:
      "Lunettes de soleil en titane ultra-léger avec verres polarisés Carl Zeiss. Protection UV400, traitement anti-reflet et hydrophobe. Livrées avec étui rigide en cuir.",
    price: 225.0,
    category: "fashion",
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
    ],
    rating: 4.6,
    reviewCount: 1892,
    colors: ["#1a1a1a", "#8b4513", "#d4a853"],
    inStock: true,
  },
  {
    id: "10",
    name: "Tapis de Yoga Premium",
    description:
      "Tapis de yoga professionnel en caoutchouc naturel avec surface en microfibre. Excellente adhérence, amorti optimal de 5mm et marquages d'alignement intégrés. Anti-dérapant même en hot yoga.",
    price: 89.0,
    category: "sport",
    images: [
      "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80",
    ],
    rating: 4.8,
    reviewCount: 3241,
    colors: ["#2d5a27", "#6b3fa0", "#1a1a1a"],
    inStock: true,
  },
  {
    id: "11",
    name: "Clavier Mécanique Wireless",
    description:
      "Clavier mécanique sans fil avec switches tactiles silencieux, rétroéclairage RGB par touche et châssis en aluminium CNC. Triple connexion : Bluetooth, 2.4GHz et USB-C. Autonomie 200h.",
    price: 179.0,
    category: "electronics",
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80",
    ],
    rating: 4.7,
    reviewCount: 1654,
    colors: ["#1a1a1a", "#ffffff"],
    inStock: true,
  },
  {
    id: "12",
    name: "Bougie Parfumée Artisanale",
    description:
      "Bougie parfumée coulée à la main en cire de soja naturelle. Notes de bois de santal, vanille et ambre. Mèche en coton tressé pour une combustion propre. Durée : 60h.",
    price: 45.0,
    category: "home",
    images: [
      "https://images.unsplash.com/photo-1602607688066-6d2be2e tried?w=800&q=80",
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=80",
    ],
    rating: 4.5,
    reviewCount: 892,
    inStock: true,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.badge);
}
