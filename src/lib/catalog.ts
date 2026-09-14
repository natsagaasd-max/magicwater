export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  price: number | null;
  visible: boolean;
};
export const categories = [
  "Бүгд",
  "Ус цэвэршүүлэгч",
  "Ус халаагч",
  "Шүршүүрийн шүүлтүүр",
  "Багц",
];
export type Package = {
  id: string;
  name: string;
  price: number;
  description: string;
  items: string[];
  badge?: string;
  label?: string;
  gift?: string;
  featured?: boolean;
  productIds?: string[];
};
export const packages: Package[] = [
  {
    id: "comfort",
    name: "COMFORT",
    price: 630000,
    badge: "БЭЛЭГТЭЙ",
    description: "Гэр ахуйн усны иж бүрэн шийдэл",
    items: ["Ус шүүгч", "Жижиг цорго", "Агшин зуурын ус халаагч"],
    gift: "Шүршүүрийн шүүлтүүр 1ш",
    featured: true,
    productIds: ["aqua4", "heater"],
  },
  {
    id: "shower",
    name: "SHOWER",
    price: 65000,
    description: "Шүршүүрийн шүүлтүүрийн 1 жилийн хэрэглээ",
    items: ["Vitamin filter 1ш", "Энгийн filter 2ш"],
    productIds: ["vitamin", "clzero"],
  },
  {
    id: "aqua4-alkaline",
    name: "AQUA 4 ALKALINE",
    price: 210000,
    label: "ALKALINE",
    description: "Aqua 4 + Alkaline нэмэлт шүүлтүүр",
    items: [
      "Aqua 4 — 150,000₮",
      "Alkaline нэмэлт шүүлтүүр — 60,000₮",
    ],
    productIds: ["aqua4"],
  },
];
export const replacementFilters = [
  { id: "sediment", position: "1-р шүүлтүүр", technicalName: "SEDIMENT", price: 30000 },
  { id: "pre-carbon", position: "2-р шүүлтүүр", technicalName: "PRE CARBON", price: 33000 },
  { id: "uf-membrane", position: "3-р шүүлтүүр", technicalName: "UF MEMBRANE", price: 35000 },
  { id: "post-carbon", position: "4-р шүүлтүүр", technicalName: "POST CARBON", price: 33000 },
] as const;
export const initialProducts: Product[] = [
  {
    id: "aqua4",
    name: "Aqua 4 шатлалт шүүлтүүр",
    category: "Ус цэвэршүүлэгч",
    description:
      "БНСУ-д үйлдвэрлэсэн 4 шатлалт UF систем. Цахилгаангүй ажиллаж, хэрэгтэй эрдсийг усанд үлдээнэ.",
    image: "/images/imgAqua4OfficialProductImage.png",
    price: null,
    visible: true,
  },
  {
    id: "heater",
    name: "Агшин зуурын ус халаагч",
    category: "Ус халаагч",
    description:
      "Хэрэгтэй мөч бүрт хүссэн температураар халуун усаа шууд аваарай. Гурван өнгөний сонголттой.",
    image: "/images/imgHeaterProductBlue.png",
    price: null,
    visible: true,
  },
  {
    id: "vitamin",
    name: "Витаминтай шүршүүрийн шүүлтүүр",
    category: "Шүршүүрийн шүүлтүүр",
    description: "Өдөр тутмын шүршүүрт тань зориулсан витаминтай шүүлтүүр.",
    image: "/images/imgProductPlaceholder.png",
    price: null,
    visible: true,
  },
  {
    id: "clzero",
    name: "CLZERO энгийн шүүлтүүр",
    category: "Шүршүүрийн шүүлтүүр",
    description:
      "Шүршүүрийн усанд зориулсан шүүлтүүр. Тохирох загвараа биднээс лавлаарай.",
    image: "/images/imgProductPlaceholder1.png",
    price: null,
    visible: true,
  },
];
export const statuses = [
  "Шинэ",
  "Баталгаажсан",
  "Хүргэгдсэн",
  "Цуцалсан",
] as const;
export type Order = {
  id: string;
  productId: string;
  productName: string;
  name: string;
  phone: string;
  address: string;
  quantity: number;
  note: string;
  status: (typeof statuses)[number];
  createdAt: string;
  orderType?: "new_order" | "filter_replacement";
  items?: OrderItem[];
  subtotal?: number;
  total?: number;
};
export type OrderItem = {
  id: string;
  name: string;
  type: "product" | "package" | "filter";
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};
export const money = (price: number | null) =>
  price === null
    ? "Үнийн санал авах"
    : `${new Intl.NumberFormat("mn-MN").format(price)} ₮`;
