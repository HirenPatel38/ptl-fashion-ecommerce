import type { CommunityPost, CommunityUser } from "./types";

export const communityUsers: CommunityUser[] = [
  { id: "u1", name: "Marcus Chen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80", handle: "@marcuschen" },
  { id: "u2", name: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80", handle: "@alexrivera" },
  { id: "u3", name: "James Thornton", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80", handle: "@jamest" },
  { id: "u4", name: "Daniel Park", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80", handle: "@danielpark" },
  { id: "u5", name: "Kai Nakamura", avatar: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=100&q=80", handle: "@kainakamura" },
];

export const communityPosts: CommunityPost[] = [
  {
    id: "p1",
    author: communityUsers[0],
    title: "Layering the Waxed Field Jacket for Autumn",
    body: "Just picked up the Waxed Field Jacket and the texture is incredible. I paired it with the Merino Crew Neck underneath and the Tailored Wool Trousers. The olive-and-charcoal combo hits different in person. This jacket already has that broken-in character after just a few wears.",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    ],
    tags: ["jackets", "layering", "autumn"],
    createdAt: "2026-08-28T14:30:00Z",
    likes: 47,
    liked: false,
    comments: [
      {
        id: "c1",
        author: communityUsers[1],
        body: "That olive-and-charcoal pairing is clean. Have you tried it with the Selvedge Straight Leg? The indigo adds a nice contrast.",
        createdAt: "2026-08-28T16:10:00Z",
        likes: 12,
      },
      {
        id: "c2",
        author: communityUsers[2],
        body: "The waxed cotton on this jacket is next level. I've had mine for a month and it's already developing a great patina.",
        createdAt: "2026-08-29T09:00:00Z",
        likes: 8,
      },
    ],
  },
  {
    id: "p2",
    author: communityUsers[1],
    title: "Selvedge Denim: Three Months In",
    body: "Three months of daily wear on the Selvedge Straight Leg and the fade pattern is finally showing. The whiskers at the hips and honeycombs behind the knees are coming in beautifully. This is what raw denim is supposed to look like — completely unique to how I move.",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&q=80",
    ],
    tags: ["jeans", "selvedge", "fade-update"],
    createdAt: "2026-08-25T11:20:00Z",
    likes: 83,
    liked: true,
    comments: [
      {
        id: "c3",
        author: communityUsers[3],
        body: "This is exactly why raw denim is worth the wait. Those fades are textbook. How often are you washing them?",
        createdAt: "2026-08-25T13:45:00Z",
        likes: 19,
      },
    ],
  },
  {
    id: "p3",
    author: communityUsers[3],
    title: "Minimal Summer: The Linen Camp Collar in Sand",
    body: "When it's 35 degrees outside, this linen camp collar in Sand is the only thing I want to wear. The washed texture gives it a relaxed feel without looking sloppy. Tucked into the Pleated Chinos with the Leather Belt — that's the whole outfit. Less is more.",
    images: [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80",
    ],
    tags: ["shirts", "linen", "summer"],
    createdAt: "2026-08-20T08:15:00Z",
    likes: 56,
    liked: false,
    comments: [
      {
        id: "c4",
        author: communityUsers[4],
        body: "The sand colorway is perfect. Does it run true to size or should I size up for that relaxed look?",
        createdAt: "2026-08-20T10:30:00Z",
        likes: 7,
      },
      {
        id: "c5",
        author: communityUsers[3],
        body: "I'd say true to size if you want a clean fit, one up for extra airflow. The linen relaxes naturally after a few wears.",
        createdAt: "2026-08-20T11:15:00Z",
        likes: 14,
      },
    ],
  },
  {
    id: "p4",
    author: communityUsers[2],
    title: "Bomber Jacket: Evening Out Essential",
    body: "Wore the Bomber Jacket to a dinner last weekend. The matte nylon catches light in a way that photographs incredibly well. Slim enough to layer over a shirt without adding bulk. The rib-knit details at the cuffs and hem give it that classic silhouette. Easily my most-worn piece this season.",
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
    ],
    tags: ["jackets", "evening", "bomber"],
    createdAt: "2026-08-18T19:00:00Z",
    likes: 34,
    liked: false,
    comments: [],
  },
  {
    id: "p5",
    author: communityUsers[4],
    title: "Accessory Rotation: Suede Chelsea Boots",
    body: "The Suede Chelsea Boots in Tan have become my go-to. The Goodyear welt means I'll have these for years. I rotate them between the Tailored Wool Trousers for work and the Selvedge jeans on weekends. The suede takes on a beautiful depth of color over time.",
    images: [
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80",
    ],
    tags: ["accessories", "boots", "suede"],
    createdAt: "2026-08-15T12:00:00Z",
    likes: 62,
    liked: true,
    comments: [
      {
        id: "c6",
        author: communityUsers[0],
        body: "The Goodyear welt alone makes these worth it. Most brands at this price point use glued soles. Respect to PTL for getting that right.",
        createdAt: "2026-08-15T14:30:00Z",
        likes: 22,
      },
      {
        id: "c7",
        author: communityUsers[1],
        body: "How do they hold up in wet weather? Suede always makes me nervous when it rains.",
        createdAt: "2026-08-16T08:00:00Z",
        likes: 5,
      },
    ],
  },
];

export function getPostById(id: string): CommunityPost | undefined {
  return communityPosts.find((p) => p.id === id);
}

export function searchPosts(query: string): CommunityPost[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return communityPosts.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.body.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)) ||
      p.author.name.toLowerCase().includes(q)
  );
}
