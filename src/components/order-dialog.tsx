"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, X } from "lucide-react";
import type { Product, Order } from "@/lib/catalog";
export default function OrderDialog({
  product,
  onClose,
  onSave,
}: {
  product: Product;
  onClose: () => void;
  onSave: (order: Order) => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const d = dialog.current;
    const active = document.activeElement as HTMLElement | null;
    d?.showModal();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
      d?.close();
      active?.focus();
    };
  }, []);
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const phone = String(f.get("phone")).replace(/[\s-]/g, "");
    const name = String(f.get("name")).trim();
    const address = String(f.get("address")).trim();
    if (!/^\d{8}$/.test(phone)) {
      setError("Утасны дугаараа 8 оронтой оруулна уу.");
      return;
    }
    if (!name || !address) {
      setError("Нэр, хүргэлтийн хаягаа бүрэн оруулна уу.");
      return;
    }
    try {
      onSave({
        id: crypto.randomUUID(),
        productId: product.id,
        productName: product.name,
        name,
        phone,
        address,
        quantity: Number(f.get("quantity")),
        note: String(f.get("note")).trim(),
        status: "Шинэ",
        createdAt: new Date().toISOString(),
      });
      setSuccess(true);
    } catch {
      setError(
        "Браузерт хадгалах боломжгүй байна. Хадгалах зай болон тохиргоогоо шалгана уу.",
      );
    }
  }
  return (
    <dialog
      ref={dialog}
      className="order-dialog"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button className="close-button" onClick={onClose} aria-label="Хаах">
        <X size={22} />
      </button>
      {success ? (
        <div className="success-content">
          <span className="success-icon">
            <Check />
          </span>
          <p className="eyebrow">ТУРШИЛТ АМЖИЛТТАЙ</p>
          <h2>Захиалга хадгалагдлаа.</h2>
          <p>
            Энэ бол туршилтын захиалга. Зөвхөн энэ браузерт хадгалагдсан бөгөөд
            байгууллагад илгээгдээгүй.
          </p>
          <button className="button blue" onClick={onClose}>
            Үргэлжлүүлэн үзэх <ArrowUpRight size={18} />
          </button>
        </div>
      ) : (
        <>
          <p className="eyebrow">MAGIC WATER / ЗАХИАЛГА</p>
          <h2>
            Цэвэр ус руу
            <br />
            нэг алхам.
          </h2>
          <p className="selected-product">{product.name}</p>
          <div className="demo-note">
            Туршилтын горим · Бодит мэдээлэл бүү оруулаарай. Захиалга зөвхөн энэ
            браузерт хадгалагдана.
          </div>
          <form onSubmit={submit} className="order-form">
            <label>
              Таны нэр
              <input
                name="name"
                required
                maxLength={80}
                autoComplete="name"
                placeholder="Нэрээ оруулна уу"
              />
            </label>
            <div className="form-row">
              <label>
                Утасны дугаар
                <input
                  name="phone"
                  required
                  type="tel"
                  inputMode="tel"
                  maxLength={12}
                  placeholder="8 оронтой дугаар"
                  autoComplete="tel"
                />
              </label>
              <label>
                Тоо ширхэг
                <input
                  name="quantity"
                  required
                  type="number"
                  min={1}
                  max={99}
                  defaultValue={1}
                />
              </label>
            </div>
            <label>
              Хүргэлтийн хаяг
              <textarea
                name="address"
                required
                maxLength={500}
                placeholder="Дүүрэг, хороо, байр, тоот"
                autoComplete="street-address"
                rows={2}
              />
            </label>
            <label>
              Нэмэлт тайлбар <span>(заавал биш)</span>
              <textarea name="note" maxLength={500} rows={2} />
            </label>
            {error && (
              <p role="alert" className="form-error">
                {error}
              </p>
            )}
            <button className="button blue w-full" type="submit">
              Туршилтын захиалга хадгалах <ArrowUpRight size={18} />
            </button>
            <p className="form-footnote">
              Үндсэн хувилбарт бид утсаар холбогдож захиалгыг баталгаажуулна.
            </p>
          </form>
        </>
      )}
    </dialog>
  );
}
