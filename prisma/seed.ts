import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.resolve(__dirname, "dev.db");

const libsql = createClient({ url: `file:${dbPath}` });
const adapter = new PrismaLibSql(libsql);
const prisma = new PrismaClient({ adapter });

const products = [
  { id: "1", name: "Casque Audio Sans Fil Pro", description: "Casque audio premium avec réduction de bruit active, son spatial 3D et autonomie de 40h. Design en aluminium brossé avec coussinets en cuir véritable.", price: 349.99, originalPrice: 449.99, category: "electronics", images: JSON.stringify(["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80","https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80","https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&q=80"]), rating: 4.8, reviewCount: 2847, badge: "Best-seller", colors: JSON.stringify(["#1a1a1a","#c0c0c0","#1e3a5f"]), inStock: true },
  { id: "2", name: "Montre Connectée Ultra", description: "Montre connectée nouvelle génération avec écran AMOLED Always-On, suivi santé avancé.", price: 599.0, category: "electronics", images: JSON.stringify(["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80","https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=800&q=80"]), rating: 4.6, reviewCount: 1523, badge: "Nouveau", colors: JSON.stringify(["#1a1a1a","#f5f5dc","#8b4513"]), sizes: JSON.stringify(["40mm","44mm","48mm"]), inStock: true },
  { id: "3", name: "Sneakers Édition Limitée", description: "Sneakers en cuir pleine fleur avec semelle en mousse responsive. Design minimaliste.", price: 289.0, originalPrice: 350.0, category: "fashion", images: JSON.stringify(["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80","https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80","https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80"]), rating: 4.9, reviewCount: 967, badge: "Édition limitée", colors: JSON.stringify(["#ff4444","#ffffff","#1a1a1a"]), sizes: JSON.stringify(["38","39","40","41","42","43","44","45"]), inStock: true },
  { id: "4", name: "Lampe Design Articulée", description: "Lampe de bureau articulée en laiton massif avec variateur tactile. Éclairage LED haute fidélité.", price: 195.0, category: "home", images: JSON.stringify(["https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=800&q=80","https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&q=80"]), rating: 4.7, reviewCount: 412, colors: JSON.stringify(["#d4a853","#1a1a1a","#c0c0c0"]), inStock: true },
  { id: "5", name: "Sac à Dos Urbain Tech", description: "Sac à dos waterproof en tissu technique recyclé avec compartiment laptop 16 pouces.", price: 159.0, originalPrice: 199.0, category: "fashion", images: JSON.stringify(["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80","https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80"]), rating: 4.5, reviewCount: 738, badge: "-20%", colors: JSON.stringify(["#1a1a1a","#2d5a27","#3d3d6b"]), inStock: true },
  { id: "6", name: "Enceinte Portable Premium", description: "Enceinte Bluetooth portable avec son omnidirectionnel 360 degrés et 24h d'autonomie.", price: 249.99, category: "electronics", images: JSON.stringify(["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80","https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800&q=80"]), rating: 4.4, reviewCount: 2103, colors: JSON.stringify(["#1a1a1a","#e8e0d0","#cc5500"]), inStock: true },
  { id: "7", name: "Veste Technique All-Weather", description: "Veste technique 3 couches avec membrane imperméable et respirante.", price: 320.0, category: "sport", images: JSON.stringify(["https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80","https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80"]), rating: 4.7, reviewCount: 531, badge: "Éco-responsable", colors: JSON.stringify(["#2d5a27","#1a1a1a","#1e3a5f"]), sizes: JSON.stringify(["S","M","L","XL","XXL"]), inStock: true },
  { id: "8", name: "Fauteuil Lounge Scandinave", description: "Fauteuil lounge design scandinave des années 50. Structure en chêne massif.", price: 890.0, originalPrice: 1100.0, category: "home", images: JSON.stringify(["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80","https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80"]), rating: 4.9, reviewCount: 284, badge: "Coup de cœur", colors: JSON.stringify(["#d4c5a9","#8b8b8b","#2d5a27"]), inStock: true },
  { id: "9", name: "Lunettes de Soleil Polarisées", description: "Lunettes en titane ultra-léger avec verres polarisés Carl Zeiss. Protection UV400.", price: 225.0, category: "fashion", images: JSON.stringify(["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80","https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80"]), rating: 4.6, reviewCount: 1892, colors: JSON.stringify(["#1a1a1a","#8b4513","#d4a853"]), inStock: true },
  { id: "10", name: "Tapis de Yoga Premium", description: "Tapis de yoga professionnel en caoutchouc naturel avec surface en microfibre.", price: 89.0, category: "sport", images: JSON.stringify(["https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80","https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&q=80"]), rating: 4.8, reviewCount: 3241, colors: JSON.stringify(["#2d5a27","#6b3fa0","#1a1a1a"]), inStock: true },
  { id: "11", name: "Clavier Mécanique Wireless", description: "Clavier mécanique sans fil avec switches tactiles silencieux et rétroéclairage RGB.", price: 179.0, category: "electronics", images: JSON.stringify(["https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80","https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80"]), rating: 4.7, reviewCount: 1654, colors: JSON.stringify(["#1a1a1a","#ffffff"]), inStock: true },
  { id: "12", name: "Bougie Parfumée Artisanale", description: "Bougie parfumée en cire de soja naturelle. Notes de bois de santal, vanille et ambre.", price: 45.0, category: "home", images: JSON.stringify(["https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=80","https://images.unsplash.com/photo-1602607688066-6d2be2e2d7a0?w=800&q=80"]), rating: 4.5, reviewCount: 892, inStock: true },
];

async function main() {
  console.log("Seeding database...");
  await prisma.user.upsert({ where: { email: "demo@prenypreny.com" }, update: {}, create: { id: "demo-user", email: "demo@prenypreny.com", firstName: "Jean", lastName: "Dupont" } });
  for (const p of products) { await prisma.product.upsert({ where: { id: p.id }, update: p, create: p }); }
  console.log(`Seeded ${products.length} products and 1 demo user`);
}

main().then(() => prisma.$disconnect()).catch((e) => { console.error(e); prisma.$disconnect(); process.exit(1); });
