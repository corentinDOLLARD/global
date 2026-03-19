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
  material?: string;
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
    id: "fashion",
    name: "Haute Couture",
    description: "Collections exclusives des plus grandes maisons",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=80",
    productCount: 124,
  },
  {
    id: "jewelry",
    name: "Joaillerie",
    description: "Pièces d'exception en or et pierres précieuses",
    image: "https://images.unsplash.com/photo-1515562141589-67f0d569b6b2?w=600&q=80",
    productCount: 67,
  },
  {
    id: "accessories",
    name: "Accessoires",
    description: "Maroquinerie, lunettes et montres de luxe",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80",
    productCount: 93,
  },
  {
    id: "beauty",
    name: "Beauté",
    description: "Soins et parfums des maisons de prestige",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80",
    productCount: 81,
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Manteau Cachemire Double Face",
    description:
      "Manteau d'exception en cachemire double face italien. Coupe oversize élégante avec coutures invisibles et doublure en soie. Chaque pièce est numérotée et accompagnée de son certificat d'authenticité. Un investissement mode intemporel.",
    price: 2490.0,
    originalPrice: 3200.0,
    category: "fashion",
    images: [
      "https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?w=800&q=80",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 847,
    badge: "Pièce signature",
    colors: ["#1C1917", "#F5F5DC", "#8B6914"],
    sizes: ["XS", "S", "M", "L", "XL"],
    inStock: true,
    material: "100% Cachemire",
  },
  {
    id: "2",
    name: "Montre Automatique Tourbillon",
    description:
      "Montre automatique à tourbillon avec boîtier en or rose 18 carats et cadran en nacre. Mouvement manufacture avec 72 heures de réserve de marche. Bracelet en alligator cousu main. Édition limitée à 500 exemplaires.",
    price: 8750.0,
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=800&q=80",
    ],
    rating: 5.0,
    reviewCount: 312,
    badge: "Édition limitée",
    colors: ["#B76E79", "#C0C0C0", "#1C1917"],
    inStock: true,
    material: "Or rose 18K",
  },
  {
    id: "3",
    name: "Sac Sellier en Cuir Tressé",
    description:
      "Sac à main en cuir de veau tressé à la main par nos artisans. Fermoir en palladium poli, doublure en chèvre velours. Chaque sac nécessite 18 heures de travail artisanal. Livré dans son écrin d'origine.",
    price: 4200.0,
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80",
    ],
    rating: 4.8,
    reviewCount: 523,
    badge: "Artisanat",
    colors: ["#1C1917", "#8B6914", "#8B0000"],
    inStock: true,
    material: "Cuir de veau pleine fleur",
  },
  {
    id: "4",
    name: "Collier Rivière de Diamants",
    description:
      "Collier rivière serti de 42 diamants taille brillant (total 8.5 carats, couleur D-F, pureté VVS1). Monture en platine 950 avec fermoir de sécurité invisible. Certificat GIA inclus.",
    price: 24500.0,
    category: "jewelry",
    images: [
      "https://images.unsplash.com/photo-1515562141589-67f0d569b6b2?w=800&q=80",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=800&q=80",
    ],
    rating: 5.0,
    reviewCount: 89,
    badge: "Haute Joaillerie",
    inStock: true,
    material: "Platine 950 & Diamants",
  },
  {
    id: "5",
    name: "Sneakers Cuir Nappa Artisanales",
    description:
      "Sneakers en cuir nappa italien avec semelle en gomme naturelle. Coutures sellier réalisées à la main, finitions dorées et semelle intérieure en cuir d'agneau. Fabriquées dans notre atelier de Florence.",
    price: 690.0,
    originalPrice: 890.0,
    category: "fashion",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
    ],
    rating: 4.7,
    reviewCount: 1256,
    badge: "Best-seller",
    colors: ["#FFFFFF", "#1C1917", "#8B6914"],
    sizes: ["37", "38", "39", "40", "41", "42", "43", "44", "45"],
    inStock: true,
    material: "Cuir Nappa Italien",
  },
  {
    id: "6",
    name: "Parfum Oud Royal - 100ml",
    description:
      "Eau de parfum intense aux notes de oud du Laos, rose de Damas et ambre gris. Flacon en cristal taillé à la main avec bouchon en zamac plaqué or. Un sillage envoûtant et une tenue exceptionnelle de 12h+.",
    price: 395.0,
    category: "beauty",
    images: [
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&q=80",
      "https://images.unsplash.com/photo-1594035910387-fbd1f9b3d58a?w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 2341,
    badge: "Iconique",
    inStock: true,
    material: "Cristal & Or",
  },
  {
    id: "7",
    name: "Lunettes de Soleil Titane",
    description:
      "Monture en titane japonais ultra-léger (15g) avec verres polarisés en cristal minéral. Branches ornées d'inserts en ébène de Macassar. Protection UV400 catégorie 3. Étui en cuir Saffiano inclus.",
    price: 580.0,
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80",
    ],
    rating: 4.6,
    reviewCount: 978,
    colors: ["#1C1917", "#8B6914", "#C0C0C0"],
    inStock: true,
    material: "Titane Japonais",
  },
  {
    id: "8",
    name: "Robe de Soirée Mousseline",
    description:
      "Robe longue en mousseline de soie avec broderies cristal Swarovski réalisées à la main. Dos nu plongeant et traîne fluide. Doublée en crêpe de Chine. Sur-mesure disponible.",
    price: 3800.0,
    category: "fashion",
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=80",
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
    ],
    rating: 5.0,
    reviewCount: 234,
    badge: "Sur-mesure",
    colors: ["#1C1917", "#FDF5E6", "#8B0000"],
    sizes: ["34", "36", "38", "40", "42"],
    inStock: true,
    material: "Soie & Cristaux Swarovski",
  },
  {
    id: "9",
    name: "Bracelet Manchette Or Ciselé",
    description:
      "Bracelet manchette en or jaune 18 carats ciselé à la main avec motifs floraux. Serti de 28 saphirs bleus et 14 diamants. Pièce unique signée par notre maître artisan joaillier.",
    price: 12800.0,
    category: "jewelry",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80",
      "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 56,
    badge: "Pièce unique",
    inStock: true,
    material: "Or 18K, Saphirs & Diamants",
  },
  {
    id: "10",
    name: "Sérum Éclat Absolu - 30ml",
    description:
      "Sérum concentré à l'acide hyaluronique fragmenté, poudre de diamant et extrait de truffe blanche. Formule brevetée pour un teint lumineux et un effet liftant immédiat. Flacon airless en verre opaque.",
    price: 285.0,
    originalPrice: 340.0,
    category: "beauty",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
      "https://images.unsplash.com/photo-1570194065650-d99fb4b38b17?w=800&q=80",
    ],
    rating: 4.8,
    reviewCount: 3457,
    badge: "-16%",
    inStock: true,
    material: "Verre Opaque",
  },
  {
    id: "11",
    name: "Costume Trois Pièces Sur-Mesure",
    description:
      "Costume trois pièces en laine Super 180's Loro Piana. Coupe napolitaine avec épaules naturelles, boutonnière fleur et doublure en cupro Bemberg. Deux essayages inclus avec notre maître tailleur.",
    price: 3200.0,
    category: "fashion",
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 412,
    badge: "Bespoke",
    colors: ["#1C1917", "#292524", "#44403C"],
    sizes: ["46", "48", "50", "52", "54", "56"],
    inStock: true,
    material: "Laine Super 180's",
  },
  {
    id: "12",
    name: "Bougie Parfumée Cuir & Ambre",
    description:
      "Bougie en cire d'abeille naturelle aux notes de cuir de Russie, ambre et bois de gaïac. Mèche en coton tressé pour une combustion propre. Pot en porcelaine de Limoges peint à la main. Durée : 80h.",
    price: 175.0,
    category: "beauty",
    images: [
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=80",
      "https://images.unsplash.com/photo-1602607688066-6d2be2e7e6c7?w=800&q=80",
    ],
    rating: 4.7,
    reviewCount: 1893,
    inStock: true,
    material: "Porcelaine de Limoges",
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
