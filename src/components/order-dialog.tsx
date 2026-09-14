"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, Check, Minus, Plus, RefreshCw, ShoppingBag, Trash2, X } from "lucide-react";
import { money, packages, replacementFilters, type Order, type OrderItem, type Product } from "@/lib/catalog";

type OrderType = "new_order" | "filter_replacement";
type Step = "type" | "selection" | "customer" | "success";
type SelectableItem = OrderItem & { description: string; image?: string; productIds?: string[] };
const formatPrice = (price: number) => (price ? money(price) : "Үнийн санал");

function OrderTypeStep({ onSelect }: { onSelect: (type: OrderType) => void }) {
  const choices = [
    { type: "new_order" as const, title: "Шинэ захиалга", description: "Шинэ бүтээгдэхүүн болон багц захиалах", icon: ShoppingBag },
    { type: "filter_replacement" as const, title: "Шүүлтүүр солиулах", description: "Ашиглаж байгаа төхөөрөмжийн шүүлтүүр солиулах", icon: RefreshCw },
  ];
  return <div className="order-type-step">
    <p className="eyebrow">MAGIC WATER / ЗАХИАЛГА</p>
    <h2>Та ямар үйлчилгээ авах вэ?</h2>
    <div className="order-type-grid">{choices.map(({ type, title, description, icon: Icon }) => (
      <button key={type} className="order-type-card" onClick={() => onSelect(type)}>
        <Icon size={24} aria-hidden="true" /><span><b>{title}</b><small>{description}</small></span><ArrowUpRight size={19} aria-hidden="true" />
      </button>
    ))}</div>
  </div>;
}

function OrderSummary({ selected, onQuantity, onRemove, onContinue, compact = false }: {
  selected: SelectableItem[]; onQuantity: (id: string, change: number) => void; onRemove: (id: string) => void; onContinue?: () => void; compact?: boolean;
}) {
  const count = selected.reduce((sum, item) => sum + item.quantity, 0);
  const total = selected.reduce((sum, item) => sum + item.totalPrice, 0);
  return <aside className={`order-summary${compact ? " compact" : ""}`} aria-live="polite">
    <h3>Таны сонголт</h3>
    {selected.length === 0 ? <p className="order-summary-empty">Сонгосон бүтээгдэхүүн алга.</p> : (
      <div className="order-summary-items">{selected.map((item) => (
        <div className="order-summary-item" key={`${item.type}-${item.id}`}>
          <div><b>{item.name}</b><small>{formatPrice(item.unitPrice)}</small></div>
          <div className="quantity-control" aria-label={`${item.name} тоо ширхэг`}>
            <button onClick={() => onQuantity(`${item.type}:${item.id}`, -1)} aria-label="Нэгээр хасах"><Minus size={13} /></button>
            <span>{item.quantity}</span>
            <button onClick={() => onQuantity(`${item.type}:${item.id}`, 1)} aria-label="Нэгээр нэмэх"><Plus size={13} /></button>
          </div>
          <button className="summary-remove" onClick={() => onRemove(`${item.type}:${item.id}`)} aria-label={`${item.name} устгах`}><Trash2 size={15} /></button>
        </div>
      ))}</div>
    )}
    <div className="order-summary-total"><span>Нийт бүтээгдэхүүн <b>{count}</b></span><span>Нийт дүн <b>{money(total)}</b></span></div>
    {onContinue && <button className="button blue" disabled={!selected.length} onClick={onContinue}>Үргэлжлүүлэх <ArrowUpRight size={18} /></button>}
  </aside>;
}

function SelectionCard({ item, selected, awareness, onToggle }: { item: SelectableItem; selected: boolean; awareness?: string; onToggle: () => void }) {
  return <article className={`selection-card${selected ? " selected" : ""}`}>
    {item.image && <div className="selection-image"><Image src={item.image} alt="" fill sizes="(max-width: 760px) 80vw, 220px" /></div>}
    <div className="selection-card-copy">
      <span>{item.type === "package" ? "БАГЦ" : item.type === "filter" ? item.description : "БҮТЭЭГДЭХҮҮН"}</span>
      <h3>{item.name}</h3>
      {item.type !== "filter" && <p>{item.description}</p>}
      {awareness && <small className="duplicate-awareness">{awareness}</small>}
      <div><b>{formatPrice(item.unitPrice)}</b><button aria-pressed={selected} onClick={onToggle}>{selected ? <><Check size={15} /> Сонгогдсон</> : <><Plus size={15} /> Нэмэх</>}</button></div>
    </div>
  </article>;
}

export default function OrderDialog({ product, products, onClose, onSave }: { product: Product; products: Product[]; onClose: () => void; onSave: (order: Order) => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState<Step>("type");
  const [orderType, setOrderType] = useState<OrderType | null>(null);
  const [selected, setSelected] = useState<Record<string, SelectableItem>>({});
  const [error, setError] = useState("");

  const productItems = useMemo<SelectableItem[]>(() => [
    ...products.map((item) => ({ id: item.id, name: item.name, type: "product" as const, quantity: 1, unitPrice: item.price ?? 0, totalPrice: item.price ?? 0, description: item.description, image: item.image })),
    ...packages.map((item) => ({ id: item.id, name: item.name, type: "package" as const, quantity: 1, unitPrice: item.price, totalPrice: item.price, description: item.description, productIds: item.productIds })),
  ], [products]);
  const filterItems = useMemo<SelectableItem[]>(() => replacementFilters.map((item) => ({ id: item.id, name: item.position, type: "filter" as const, quantity: 1, unitPrice: item.price, totalPrice: item.price, description: item.technicalName })), []);

  useEffect(() => {
    const currentDialog = dialog.current;
    const active = document.activeElement as HTMLElement | null;
    currentDialog?.showModal();
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = oldOverflow; currentDialog?.close(); active?.focus(); };
  }, []);

  const selectedItems = Object.values(selected);
  function chooseOrderType(type: OrderType) {
    setOrderType(type);
    if (type === "new_order") {
      const seed = product.category === "Багц"
        ? productItems.find((item) => item.type === "package" && `package-${item.id}` === product.id)
        : productItems.find((item) => item.type === "product" && item.id === product.id);
      setSelected(seed ? { [`${seed.type}:${seed.id}`]: seed } : {});
    } else setSelected({});
    setStep("selection");
  }
  function toggleItem(item: SelectableItem) {
    const key = `${item.type}:${item.id}`;
    setSelected((current) => { if (!current[key]) return { ...current, [key]: item }; const next = { ...current }; delete next[key]; return next; });
  }
  function changeQuantity(key: string, change: number) {
    setSelected((current) => { const item = current[key]; if (!item) return current; const quantity = Math.max(1, Math.min(99, item.quantity + change)); return { ...current, [key]: { ...item, quantity, totalPrice: item.unitPrice * quantity } }; });
  }
  function removeItem(key: string) { setSelected((current) => { const next = { ...current }; delete next[key]; return next; }); }
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!orderType || !selectedItems.length) return;
    const form = new FormData(event.currentTarget);
    const phone = String(form.get("phone")).replace(/[\s-]/g, "");
    const name = String(form.get("name")).trim();
    const address = String(form.get("address")).trim();
    if (!/^\d{8}$/.test(phone)) { setError("Утасны дугаараа 8 оронтой оруулна уу."); return; }
    if (!name || !address) { setError("Нэр, хүргэлтийн хаягаа бүрэн оруулна уу."); return; }
    const items = selectedItems.map(({ description, image, productIds, ...item }) => item);
    const total = items.reduce((sum, item) => sum + item.totalPrice, 0);
    try {
      onSave({ id: crypto.randomUUID(), productId: items[0].id, productName: items.map((item) => item.name).join(", "), name, phone, address, quantity: items.reduce((sum, item) => sum + item.quantity, 0), note: String(form.get("note")).trim(), status: "Шинэ", createdAt: new Date().toISOString(), orderType, items, subtotal: total, total });
      setStep("success");
    } catch { setError("Захиалгыг хадгалж чадсангүй. Дахин оролдоно уу."); }
  }

  const selectedPackages = selectedItems.filter((item) => item.type === "package");
  const availableItems = orderType === "filter_replacement" ? filterItems : productItems;
  const allFiltersSelected = filterItems.every((item) => selected[`filter:${item.id}`]);

  return <dialog ref={dialog} className="order-dialog order-flow-dialog" onCancel={onClose}>
    <button className="close-button" onClick={onClose} aria-label="Хаах"><X size={22} /></button>
    {step === "type" && <OrderTypeStep onSelect={chooseOrderType} />}
    {step === "selection" && orderType && <>
      <button className="order-back" onClick={() => setStep("type")}><ArrowLeft size={16} /> Буцах</button>
      <div className="selection-heading"><p className="eyebrow">{orderType === "new_order" ? "ШИНЭ ЗАХИАЛГА" : "ШҮҮЛТҮҮР СОЛИУЛАХ"}</p><h2>{orderType === "new_order" ? "Бүтээгдэхүүнээ сонгоно уу." : "Шүүлтүүрээ сонгоно уу."}</h2>
        {orderType === "filter_replacement" && <button className="select-all" onClick={() => allFiltersSelected ? setSelected({}) : setSelected(Object.fromEntries(filterItems.map((item) => [`filter:${item.id}`, item])))}>{allFiltersSelected ? "Бүгдийг цуцлах" : "Бүгдийг сонгох"}</button>}
      </div>
      <div className="selection-layout"><div className="selection-grid">{availableItems.map((item) => {
        const packageNames = item.type === "product" ? selectedPackages.filter((pkg) => pkg.productIds?.includes(item.id)).map((pkg) => pkg.name) : [];
        return <SelectionCard key={`${item.type}-${item.id}`} item={item} selected={Boolean(selected[`${item.type}:${item.id}`])} awareness={packageNames.length ? `${packageNames.join(", ")} багцад багтсан` : undefined} onToggle={() => toggleItem(item)} />;
      })}</div><OrderSummary selected={selectedItems} onQuantity={changeQuantity} onRemove={removeItem} onContinue={() => setStep("customer")} /></div>
    </>}
    {step === "customer" && <><button className="order-back" onClick={() => setStep("selection")}><ArrowLeft size={16} /> Буцах</button><div className="customer-step"><div><p className="eyebrow">ЗАХИАЛГЫН МЭДЭЭЛЭЛ</p><h2>Хүргэлтийн мэдээллээ оруулна уу.</h2><OrderSummary compact selected={selectedItems} onQuantity={changeQuantity} onRemove={removeItem} /></div><form onSubmit={submit} className="order-form">
      <label>Таны нэр<input name="name" required maxLength={80} autoComplete="name" placeholder="Нэрээ оруулна уу" /></label>
      <label>Утасны дугаар<input name="phone" required type="tel" inputMode="tel" maxLength={12} placeholder="8 оронтой дугаар" autoComplete="tel" /></label>
      <label>Хүргэлтийн хаяг<textarea name="address" required maxLength={500} placeholder="Дүүрэг, хороо, байр, тоот" autoComplete="street-address" rows={3} /></label>
      <label>Нэмэлт тайлбар <span>(заавал биш)</span><textarea name="note" maxLength={500} rows={3} /></label>
      {error && <p role="alert" className="form-error">{error}</p>}<button className="button blue w-full" type="submit">Захиалга хадгалах <ArrowUpRight size={18} /></button>
    </form></div></>}
    {step === "success" && <div className="success-content"><span className="success-icon"><Check /></span><p className="eyebrow">ТУРШИЛТ АМЖИЛТТАЙ</p><h2>Захиалга хадгалагдлаа.</h2><p>Захиалгын мэдээлэл зөвхөн энэ браузерт хадгалагдсан.</p><button className="button blue" onClick={onClose}>Үргэлжлүүлэн үзэх <ArrowUpRight size={18} /></button></div>}
  </dialog>;
}
