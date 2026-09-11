"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import EditorDialog from "@/components/editor-dialog";
import {
  ArrowLeft,
  ArrowUpRight,
  Package,
  ShoppingBag,
  Plus,
  Search,
  X,
  Check,
  ImagePlus,
} from "lucide-react";
import { useDemoStore } from "@/lib/demo-store";
import { categories, money, statuses, type Product } from "@/lib/catalog";
export default function Admin() {
  const { products, orders, ready, saveProducts, saveOrders } = useDemoStore();
  const [tab, setTab] = useState("orders");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("Бүгд");
  const [editing, setEditing] = useState<Product | null>(null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const filtered = orders.filter(
    (o) =>
      (status === "Бүгд" || o.status === status) &&
      `${o.name} ${o.phone} ${o.productName}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  function persistProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    if (!editing.name.trim() || !editing.description.trim()) {
      setError("Нэр, тайлбараа оруулна уу.");
      return;
    }
    try {
      saveProducts(
        products.some((p) => p.id === editing.id)
          ? products.map((p) => (p.id === editing.id ? editing : p))
          : [...products, editing],
      );
      setEditing(null);
      setNotice("Бүтээгдэхүүн хадгалагдлаа.");
      setError("");
    } catch {
      setError("Хадгалах зай хүрэлцэхгүй байна. Жижиг зураг сонгоно уу.");
    }
  }
  async function upload(file?: File) {
    if (!file || !editing) return;
    if (
      !["image/png", "image/jpeg", "image/webp"].includes(file.type) ||
      file.size > 2 * 1024 * 1024
    ) {
      setError("PNG, JPG эсвэл WebP зураг сонгоно уу. Дээд хэмжээ 2 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setEditing((p) => (p ? { ...p, image: String(reader.result) } : p));
      setError("");
    };
    reader.onerror = () => setError("Зургийг уншиж чадсангүй.");
    reader.readAsDataURL(file);
  }
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link className="footer-brand" href="/">
          magic water<span>УДИРДЛАГЫН ХЭСЭГ</span>
        </Link>
        <nav aria-label="Админ цэс">
          <button
            className={tab === "orders" ? "active" : ""}
            onClick={() => {
              setTab("orders");
              setNotice("");
            }}
          >
            <ShoppingBag size={19} />
            Захиалгууд<span>{orders.length}</span>
          </button>
          <button
            className={tab === "products" ? "active" : ""}
            onClick={() => {
              setTab("products");
              setNotice("");
            }}
          >
            <Package size={19} />
            Бүтээгдэхүүн<span>{products.length}</span>
          </button>
        </nav>
        <Link className="back-site" href="/">
          <ArrowLeft size={16} /> Сайт руу буцах
        </Link>
      </aside>
      <main className="admin-main">
        <div className="admin-top">
          <span>MAGIC WATER / УДИРДЛАГА</span>
          <Link href="/">
            Сайт харах <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="admin-notice">
          <span className="live-dot" />
          <p>
            <b>Туршилтын горим</b> · Нэвтрэлт, Supabase холбогдоогүй. Өгөгдөл
            зөвхөн энэ браузерт хадгалагдана. Бодит хэрэглэгчийн мэдээлэл бүү
            оруулаарай.
          </p>
        </div>
        <div className="admin-heading">
          <div>
            <p className="eyebrow">ТАНЫ АЖЛЫН ТАЛБАР</p>
            <h1>{tab === "orders" ? "Захиалгууд" : "Бүтээгдэхүүн"}</h1>
            <p>
              {tab === "orders"
                ? "Захиалгаа хянаж, төлөвийг нь шинэчлээрэй."
                : "Зураг, үнэ, тайлбар болон харагдах байдлыг удирдана."}
            </p>
          </div>
          {tab === "products" && (
            <button
              className="button blue"
              onClick={() => {
                setError("");
                setEditing({
                  id: crypto.randomUUID(),
                  name: "",
                  category: categories[1],
                  description: "",
                  image: "/images/imgAqua4OfficialProductImage.png",
                  price: null,
                  visible: true,
                });
              }}
            >
              <Plus size={18} />
              Бүтээгдэхүүн нэмэх
            </button>
          )}
        </div>
        {notice && (
          <p className="saved-notice" role="status">
            <Check size={18} />
            {notice}
          </p>
        )}
        {tab === "orders" ? (
          <>
            <div className="stat-grid">
              {[
                ["Нийт захиалга", orders.length],
                [
                  "Шинэ захиалга",
                  orders.filter((o) => o.status === "Шинэ").length,
                ],
                [
                  "Баталгаажсан",
                  orders.filter((o) => o.status === "Баталгаажсан").length,
                ],
                [
                  "Хүргэгдсэн",
                  orders.filter((o) => o.status === "Хүргэгдсэн").length,
                ],
              ].map(([label, value]) => (
                <div key={label}>
                  <span>{label}</span>
                  <b>{value.toString().padStart(2, "0")}</b>
                </div>
              ))}
            </div>
            <div className="admin-filters">
              <label className="search-input">
                <Search size={18} />
                <input
                  aria-label="Захиалга хайх"
                  placeholder="Нэр, утас, бүтээгдэхүүнээр хайх"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </label>
              <select
                aria-label="Захиалгын төлөвөөр шүүх"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {["Бүгд", ...statuses].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
            <div className="order-list">
              {!ready ? (
                <p className="empty-state">Уншиж байна…</p>
              ) : filtered.length === 0 ? (
                <div className="admin-empty">
                  <ShoppingBag size={38} />
                  <h2>
                    {orders.length
                      ? "Захиалга олдсонгүй"
                      : "Одоогоор захиалга алга"}
                  </h2>
                  <p>
                    {orders.length
                      ? "Хайлтын үг эсвэл төлөвийн шүүлтүүрээ өөрчлөөрэй."
                      : "Сайт дээр туршилтын захиалга өгөхөд энд харагдана."}
                  </p>
                  <Link className="text-link" href="/#products">
                    Бүтээгдэхүүн үзэх <ArrowUpRight size={17} />
                  </Link>
                </div>
              ) : (
                filtered.map((o) => (
                  <article className="admin-order" key={o.id}>
                    <div className="order-heading">
                      <span>#{o.id.slice(0, 8).toUpperCase()}</span>
                      <time>
                        {new Date(o.createdAt).toLocaleString("mn-MN")}
                      </time>
                      <select
                        aria-label={`${o.name} захиалгын төлөв`}
                        value={o.status}
                        onChange={(e) => {
                          try {
                            saveOrders(
                              orders.map((item) =>
                                item.id === o.id
                                  ? {
                                      ...item,
                                      status: e.target.value as typeof o.status,
                                    }
                                  : item,
                              ),
                            );
                            setNotice("Захиалгын төлөв шинэчлэгдлээ.");
                          } catch {
                            setNotice(
                              "Хадгалж чадсангүй. Браузерын хадгалах зайг шалгана уу.",
                            );
                          }
                        }}
                      >
                        {statuses.map((s) => (
                          <option key={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div className="order-details">
                      <div>
                        <small>БҮТЭЭГДЭХҮҮН</small>
                        <h3>{o.productName}</h3>
                        <p>{o.quantity} ширхэг</p>
                      </div>
                      <div>
                        <small>ЗАХИАЛАГЧ</small>
                        <h3>{o.name}</h3>
                        <p>{o.phone}</p>
                      </div>
                      <div>
                        <small>ХҮРГЭЛТИЙН ХАЯГ</small>
                        <p>{o.address}</p>
                        {o.note && <p className="muted">{o.note}</p>}
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </>
        ) : (
          <div className="admin-products">
            {products.map((p) => (
              <article key={p.id}>
                <div className="admin-product-image">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="240px"
                    className="object-contain"
                    unoptimized={p.image.startsWith("data:")}
                  />
                </div>
                <span
                  className={`visibility-badge ${p.visible ? "" : "hidden-badge"}`}
                >
                  {p.visible ? "Идэвхтэй" : "Нуусан"}
                </span>
                <h2>{p.name}</h2>
                <p>{p.description}</p>
                <b>{money(p.price)}</b>
                <button
                  className="button outline"
                  onClick={() => {
                    setEditing({ ...p });
                    setError("");
                  }}
                >
                  Засах <ArrowUpRight size={17} />
                </button>
              </article>
            ))}
          </div>
        )}
      </main>
      {editing && (
        <EditorDialog onClose={() => setEditing(null)}>
          <section className="product-editor">
            <button
              className="close-button"
              onClick={() => setEditing(null)}
              aria-label="Засвар хаах"
            >
              <X />
            </button>
            <p className="eyebrow">БҮТЭЭГДЭХҮҮНИЙ МЭДЭЭЛЭЛ</p>
            <h2>
              {products.some((p) => p.id === editing.id)
                ? "Бүтээгдэхүүн засах"
                : "Шинэ бүтээгдэхүүн"}
            </h2>
            <form className="order-form" onSubmit={persistProduct}>
              <label>
                Бүтээгдэхүүний нэр
                <input
                  autoFocus
                  required
                  maxLength={120}
                  value={editing.name}
                  onChange={(e) =>
                    setEditing({ ...editing, name: e.target.value })
                  }
                />
              </label>
              <label>
                Ангилал
                <select
                  value={editing.category}
                  onChange={(e) =>
                    setEditing({ ...editing, category: e.target.value })
                  }
                >
                  {categories.slice(1).map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label>
                Үнэ (₮)
                <input
                  type="number"
                  min={0}
                  max={100000000}
                  step={1}
                  value={editing.price ?? ""}
                  placeholder="Хоосон бол үнийн санал авна"
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      price:
                        e.target.value === "" ? null : Number(e.target.value),
                    })
                  }
                />
              </label>
              <label>
                Тайлбар
                <textarea
                  required
                  rows={3}
                  maxLength={1000}
                  value={editing.description}
                  onChange={(e) =>
                    setEditing({ ...editing, description: e.target.value })
                  }
                />
              </label>
              <label className="image-upload">
                <ImagePlus size={18} />
                Бүтээгдэхүүний зураг (PNG, JPG, WebP · 2 MB)
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={(e) => void upload(e.target.files?.[0])}
                />
                <Image
                  src={editing.image}
                  width={110}
                  height={110}
                  alt="Сонгосон зураг"
                  className="object-contain"
                  unoptimized={editing.image.startsWith("data:")}
                />
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={editing.visible}
                  onChange={(e) =>
                    setEditing({ ...editing, visible: e.target.checked })
                  }
                />
                Сайт дээр харуулах
              </label>
              {error && (
                <p role="alert" className="form-error">
                  {error}
                </p>
              )}
              <button className="button blue" type="submit">
                Хадгалах <Check size={18} />
              </button>
            </form>
          </section>
        </EditorDialog>
      )}
    </div>
  );
}
