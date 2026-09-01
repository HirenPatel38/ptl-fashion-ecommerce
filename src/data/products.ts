import type { Product, Category } from "./types";

export const categories: { key: Category; label: string; image: string; description: string }[] = [
  {
    key: "shirts",
    label: "Shirts",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
    description: "Refined shirting for every occasion",
  },
  {
    key: "t-shirts",
    label: "T-Shirts",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    description: "Essential tees, elevated",
  },
  {
    key: "jackets",
    label: "Jackets",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    description: "Outerwear that commands attention",
  },
  {
    key: "trousers",
    label: "Trousers",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
    description: "Tailored and relaxed fits",
  },
  {
    key: "jeans",
    label: "Jeans",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
    description: "Premium denim, modern cuts",
  },
  {
    key: "accessories",
    label: "Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    description: "The finishing details",
  },
];

export const products: Product[] = [
  {
    id: "1",
    name: "Structured Oxford Shirt",
    slug: "structured-oxford-shirt",
    category: "shirts",
    price: 185,
    description: "A meticulously crafted oxford shirt with a modern slim silhouette. Premium Egyptian cotton delivers a soft hand feel while the structured collar holds its shape throughout the day.",
    details: [
      "100% Egyptian cotton",
      "Slim fit, structured collar",
      "Mother-of-pearl buttons",
      "Machine washable at 30°C",
      "Made in Portugal",
    ],
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
    ],
    colors: ["White", "Navy", "Sage"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
  },
  {
    id: "2",
    name: "Merino Crew Neck",
    slug: "merino-crew-neck",
    category: "t-shirts",
    price: 120,
    description: "Extra-fine merino wool knitted into a clean crew neck silhouette. Temperature-regulating, odor-resistant, and impossibly soft against the skin.",
    details: [
      "100% extra-fine merino wool",
      "Regular fit",
      "Ribbed collar, cuffs, and hem",
      "Hand wash recommended",
      "Made in Italy",
    ],
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
    ],
    colors: ["Black", "Charcoal", "Ivory"],
    sizes: ["S", "M", "L", "XL"],
    isNew: false,
    isFeatured: true,
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
  },
  {
    id: "3",
    name: "Waxed Field Jacket",
    slug: "waxed-field-jacket",
    category: "jackets",
    price: 420,
    originalPrice: 560,
    description: "Heritage-inspired field jacket rendered in British waxed cotton. Four front pockets, corduroy collar lining, and a weatherproof finish that develops character over time.",
    details: [
      "British waxed cotton shell",
      "Corduroy collar lining",
      "Four front patch pockets",
      "Cotton tartan lining",
      "Water-resistant finish",
    ],
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    ],
    colors: ["Olive", "Navy"],
    sizes: ["M", "L", "XL"],
    isNew: false,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 67,
    inStock: true,
  },
  {
    id: "4",
    name: "Tailored Wool Trousers",
    slug: "tailored-wool-trousers",
    category: "trousers",
    price: 245,
    description: "Precision-cut trousers in Italian wool with a tapered leg and clean front. The ideal bridge between formal and casual, equally at home with a blazer or a knit.",
    details: [
      "Italian virgin wool",
      "Tapered fit, flat front",
      "Concealed hook-and-bar closure",
      "Dry clean only",
      "Made in Italy",
    ],
    images: [
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
    ],
    colors: ["Charcoal", "Camel", "Black"],
    sizes: ["30", "32", "34", "36"],
    isNew: true,
    isFeatured: false,
    rating: 4.7,
    reviewCount: 53,
    inStock: true,
  },
  {
    id: "5",
    name: "Selvedge Straight Leg",
    slug: "selvedge-straight-leg",
    category: "jeans",
    price: 210,
    description: "Japanese selvedge denim with a clean straight-leg cut. Raw and unwashed, these jeans age uniquely to the wearer, developing a patina that tells your story.",
    details: [
      "14oz Japanese selvedge denim",
      "Straight leg, mid rise",
      "Raw unwashed finish",
      "Selvedge coin pocket detail",
      "Made in Japan",
    ],
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80",
    ],
    colors: ["Indigo", "Black"],
    sizes: ["30", "32", "34", "36"],
    isNew: false,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 142,
    inStock: true,
  },
  {
    id: "6",
    name: "Full-Grain Leather Belt",
    slug: "full-grain-leather-belt",
    category: "accessories",
    price: 95,
    description: "Vegetable-tanned full-grain leather with a brushed stainless steel buckle. A wardrobe essential that only gets better with age.",
    details: [
      "Full-grain vegetable-tanned leather",
      "Brushed stainless steel buckle",
      "Width: 3.2cm",
      "Available in 80, 90, 100cm",
      "Made in England",
    ],
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80",
    ],
    colors: ["Black", "Brown"],
    sizes: ["80", "90", "100"],
    isNew: false,
    isFeatured: true,
    rating: 4.5,
    reviewCount: 201,
    inStock: true,
  },
  {
    id: "7",
    name: "Linen Camp Collar Shirt",
    slug: "linen-camp-collar-shirt",
    category: "shirts",
    price: 165,
    description: "Relaxed camp collar shirt in washed European linen. Breathable, textured, and effortlessly stylish for warmer months.",
    details: [
      "100% European linen",
      "Relaxed fit, camp collar",
      "Washed for softness",
      "Machine washable",
      "Made in Portugal",
    ],
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
    ],
    colors: ["Sand", "Slate", "Olive"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    isFeatured: false,
    rating: 4.4,
    reviewCount: 38,
    inStock: true,
  },
  {
    id: "8",
    name: "Bomber Jacket",
    slug: "bomber-jacket",
    category: "jackets",
    price: 380,
    description: "A streamlined bomber in matte nylon with quilted satin lining. Clean lines, minimal hardware, and a fit that flatters without restriction.",
    details: [
      "Matte nylon shell",
      "Quilted satin lining",
      "Rib-knit collar, cuffs, and hem",
      "YKK zippers",
      "Made in Italy",
    ],
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
    ],
    colors: ["Black", "Olive"],
    sizes: ["S", "M", "L", "XL"],
    isNew: false,
    isFeatured: false,
    rating: 4.7,
    reviewCount: 95,
    inStock: true,
  },
  {
    id: "9",
    name: "Heavyweight Pocket Tee",
    slug: "heavyweight-pocket-tee",
    category: "t-shirts",
    price: 65,
    description: "A 240gsm heavyweight cotton tee with a single chest pocket. Built to last, pre-shrunk, and cut for a clean drape.",
    details: [
      "100% heavyweight cotton, 240gsm",
      "Regular fit",
      "Single chest pocket",
      "Pre-shrunk",
      "Made in Portugal",
    ],
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
    ],
    colors: ["White", "Black", "Heather Grey"],
    sizes: ["S", "M", "L", "XL"],
    isNew: false,
    isFeatured: false,
    rating: 4.6,
    reviewCount: 178,
    inStock: true,
  },
  {
    id: "10",
    name: "Pleated Chinos",
    slug: "pleated-chinos",
    category: "trousers",
    price: 175,
    description: "Classic pleated chinos in brushed cotton twill. A relaxed seat tapers to a clean hem, delivering timeless style with modern proportions.",
    details: [
      "Brushed cotton twill",
      "Pleated front, tapered leg",
      "Zip fly with button closure",
      "Machine washable",
      "Made in Portugal",
    ],
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80",
    ],
    colors: ["Khaki", "Navy", "Olive"],
    sizes: ["30", "32", "34", "36"],
    isNew: false,
    isFeatured: false,
    rating: 4.5,
    reviewCount: 62,
    inStock: true,
  },
  {
    id: "11",
    name: "Slim Tapered Jeans",
    slug: "slim-tapered-jeans",
    category: "jeans",
    price: 190,
    description: "Japanese stretch denim with a slim tapered fit. Comfort meets precision in a silhouette that works from the office to the weekend.",
    details: [
      "98% cotton, 2% elastane",
      "Slim tapered fit",
      "Mid-indigo wash",
      "Button fly",
      "Made in Japan",
    ],
    images: [
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&q=80",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
    ],
    colors: ["Indigo", "Washed Black"],
    sizes: ["30", "32", "34", "36"],
    isNew: true,
    isFeatured: false,
    rating: 4.7,
    reviewCount: 87,
    inStock: true,
  },
  {
    id: "12",
    name: "Suede Chelsea Boots",
    slug: "suede-chelsea-boots",
    category: "accessories",
    price: 340,
    description: "Italian suede Chelsea boots on a Goodyear-welted sole. The elastic side panels and pull tab make for a seamless entry, while the sole is resoleable for years of wear.",
    details: [
      "Italian suede upper",
      "Goodyear-welted construction",
      "Leather sole with rubber heel",
      "Elastic side panels",
      "Made in Italy",
    ],
    images: [
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
    ],
    colors: ["Tan", "Dark Brown"],
    sizes: ["7", "8", "9", "10", "11"],
    isNew: false,
    isFeatured: false,
    rating: 4.9,
    reviewCount: 45,
    inStock: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.isNew);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.isFeatured);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.colors.some((c) => c.toLowerCase().includes(q))
  );
}
