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
];
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
    image: "/images/imgImage2.png",
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
};
export const money = (price: number | null) =>
  price === null
    ? "Үнийн санал авах"
    : `${new Intl.NumberFormat("mn-MN").format(price)} ₮`;
