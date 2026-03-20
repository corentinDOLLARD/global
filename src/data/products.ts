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
  {
    id: "electronics",
    name: "Électronique",
    description: "Les dernières innovations tech premium",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&q=80",
    productCount: 42,
  },
  {
    id: "home",
    name: "Maison & Design",
    description: "Design intérieur et objets d'exception",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    productCount: 64,
  },
  {
    id: "sport",
    name: "Sport & Lifestyle",
    description: "Équipement haute performance et bien-être",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80",
    productCount: 35,
  },
];

export const products: Product[] = [
  // === HAUTE COUTURE ===
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
  // === JOAILLERIE ===
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
  // === ACCESSOIRES ===
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
    id: "15",
    name: "Sac à Dos Urbain Tech",
    description:
      "Sac à dos waterproof en tissu technique recyclé avec compartiment laptop 16\", port USB-C intégré, et système anti-vol. Bretelles ergonomiques avec mousse à mémoire de forme. L'alliance du luxe et de la technologie.",
    price: 159.0,
    originalPrice: 199.0,
    category: "accessories",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80",
    ],
    rating: 4.5,
    reviewCount: 738,
    badge: "-20%",
    colors: ["#1C1917", "#2d5a27", "#3d3d6b"],
    inStock: true,
    material: "Tissu technique recyclé",
  },
  // === BEAUTÉ ===
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
  // === ÉLECTRONIQUE ===
  {
    id: "13",
    name: "Casque Audio Sans Fil Pro",
    description:
      "Casque audio premium avec réduction de bruit active, son spatial 3D et autonomie de 40h. Design en aluminium brossé avec coussinets en cuir véritable. Compatible avec tous vos appareils via Bluetooth 5.3.",
    price: 349.99,
    originalPrice: 449.99,
    category: "electronics",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80",
    ],
    rating: 4.8,
    reviewCount: 2847,
    badge: "Best-seller",
    colors: ["#1C1917", "#C0C0C0", "#1e3a5f"],
    inStock: true,
    material: "Aluminium brossé & Cuir",
  },
  {
    id: "14",
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
    colors: ["#1C1917", "#F5F5DC", "#8B4513"],
    sizes: ["40mm", "44mm", "48mm"],
    inStock: true,
    material: "Titane & Verre saphir",
  },
  {
    id: "16",
    name: "Enceinte Portable Premium",
    description:
      "Enceinte Bluetooth portable avec son omnidirectionnel 360°, basses profondes et 24h d'autonomie. Étanche IP67, parfaite pour toutes vos aventures. Appairage multi-room disponible.",
    price: 249.99,
    category: "electronics",
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80",
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800&q=80",
    ],
    rating: 4.4,
    reviewCount: 2103,
    colors: ["#1C1917", "#e8e0d0", "#cc5500"],
    inStock: true,
    material: "Aluminium anodisé",
  },
  {
    id: "21",
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
    colors: ["#1C1917", "#FFFFFF"],
    inStock: true,
    material: "Aluminium CNC",
  },
  // === MAISON & DESIGN ===
  {
    id: "17",
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
    colors: ["#d4a853", "#1C1917", "#C0C0C0"],
    inStock: true,
    material: "Laiton massif",
  },
  {
    id: "18",
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
    material: "Chêne massif & Tissu bouclé",
  },
  {
    id: "22",
    name: "Bougie Artisanale Santal",
    description:
      "Bougie parfumée coulée à la main en cire de soja naturelle. Notes de bois de santal, vanille et ambre. Mèche en coton tressé pour une combustion propre. Durée : 60h.",
    price: 45.0,
    category: "home",
    images: [
      "https://images.unsplash.com/photo-1602607688066-6d2be2e7e6c7?w=800&q=80",
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=80",
    ],
    rating: 4.5,
    reviewCount: 892,
    inStock: true,
    material: "Cire de soja naturelle",
  },
  // === SPORT & LIFESTYLE ===
  {
    id: "19",
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
    colors: ["#2d5a27", "#1C1917", "#1e3a5f"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    inStock: true,
    material: "Gore-Tex Pro",
  },
  {
    id: "20",
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
    colors: ["#2d5a27", "#6b3fa0", "#1C1917"],
    inStock: true,
    material: "Caoutchouc naturel",
  },
  {
    id: "23",
    name: "Sneakers Édition Limitée",
    description:
      "Sneakers en cuir pleine fleur avec semelle en mousse responsive. Design minimaliste inspiré de l'architecture contemporaine. Fabriquées en Italie avec des matériaux durables.",
    price: 289.0,
    originalPrice: 350.0,
    category: "sport",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80",
    ],
    rating: 4.9,
    reviewCount: 967,
    badge: "Édition limitée",
    colors: ["#ff4444", "#FFFFFF", "#1C1917"],
    sizes: ["38", "39", "40", "41", "42", "43", "44", "45"],
    inStock: true,
    material: "Cuir pleine fleur",
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
