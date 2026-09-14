"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Droplets,
  Menu,
  X,
  Pause,
  Play,
  Truck,
  Wrench,
  Phone,
  Check,
  Plus,
} from "lucide-react";
import WaterScene from "@/components/water-scene";
import ServiceLocations from "@/components/service-locations";
import OrderDialog from "@/components/order-dialog";
import { categories, money, type Product } from "@/lib/catalog";
import { useDemoStore } from "@/lib/demo-store";
export default function Home() {
  const { products, addOrder } = useDemoStore();
  const [category, setCategory] = useState("Бүгд");
  const [selected, setSelected] = useState<Product | null>(null);
  const [menu, setMenu] = useState(false);
  const [paused, setPaused] = useState(false);
  const visible = products.filter((p) => p.visible);
  const aqua = visible.find((p) => p.id === "aqua4");
  const heater = visible.find((p) => p.id === "heater");
  const links = [
    ["Бидний тухай", "#about"],
    ["Aqua 4", "#aqua4"],
    ["Ус халаагч", "#heater"],
    ["Бүтээгдэхүүн", "#products"],
  ];
  return (
    <>
      <a className="skip-link" href="#main">
        Агуулга руу очих
      </a>
      <section className={`hero ${paused ? "is-paused" : ""}`} id="top">
        <header className="site-header">
          <Link href="/" className="brand" aria-label="Magic Water нүүр">
            <Image
              src="/images/imgOfficialLogoNavbar.png"
              width={62}
              height={62}
              alt="Magic Water лого"
            />
            <span>
              magic water<small>УС БҮРТ ИД ШИД</small>
            </span>
          </Link>
          <nav className="desktop-nav" aria-label="Үндсэн цэс">
            {links.map(([name, href]) => (
              <a href={href} key={href}>
                {name}
              </a>
            ))}
          </nav>
          <a className="header-contact" href="#contact">
            Холбоо барих <ArrowUpRight size={16} />
          </a>
          <button
            className="mobile-toggle"
            aria-label={menu ? "Цэс хаах" : "Цэс нээх"}
            aria-expanded={menu}
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </header>
        {menu && (
          <nav className="mobile-nav" aria-label="Утасны цэс">
            {[...links, ["Холбоо барих", "#contact"]].map(([name, href]) => (
              <a href={href} key={href} onClick={() => setMenu(false)}>
                {name}
                <ArrowUpRight size={18} />
              </a>
            ))}
          </nav>
        )}
        <WaterScene paused={paused} />
        <div className="hero-orbit" aria-hidden="true">
          <div className="orbit-inner" />
          <div className="orbit-shine" />
        </div>
        <div className="hero-content">
          <p className="eyebrow light">
            <span className="live-dot" /> ЦЭВЭР УС. ЧАНАРТАЙ АМЬДРАЛ.
          </p>
          <h1>
            Ус бүрт
            <br />
            <span>ид шид.</span>
          </h1>
          <p className="hero-description">
            Гэр бүлийн эрүүл мэнд, өдөр тутмын
            <br className="desktop-break" /> тав тухыг цэвэр уснаас эхлүүлье.
          </p>
          <a className="button white" href="#products">
            Бүтээгдэхүүн үзэх <ArrowUpRight size={19} />
          </a>
        </div>
        <div className="hero-bottom">
          <a href="#about" className="scroll-link">
            <span>
              <ArrowDown size={17} />
            </span>
            ДООШ ГҮЙЛГЭХ
          </a>
          <span className="hero-caption">ӨДӨР БҮР. ГЭР БҮЛ БҮРТ.</span>
          <button
            className="motion-button"
            onClick={() => setPaused(!paused)}
            aria-label={
              paused ? "Хөдөлгөөн тоглуулах" : "Хөдөлгөөн түр зогсоох"
            }
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
            <span>{paused ? "Тоглуулах" : "Түр зогсоох"}</span>
          </button>
        </div>
      </section>
      <main id="main">
        <section id="about" className="section about-section">
          <div>
            <p className="eyebrow">01 / БИДНИЙ ТУХАЙ</p>
            <h2>
              Сайн сайхан бүхэн
              <br />
              <span className="muted">цэвэр уснаас.</span>
            </h2>
          </div>
          <div className="about-copy">
            <p>
              Ус бол өдөр тутмын амьдралын хамгийн энгийн, хамгийн үнэ цэнтэй
              хэсэг.
            </p>
            <p>
              Magic Water нь БНСУ-д үйлдвэрлэсэн ус цэвэршүүлэгч, агшин зуурын
              халаагч, шүршүүрийн шүүлтүүрээр таны гэр бүлийн тав тухыг
              бүрдүүлнэ.
            </p>
            <a className="text-link" href="#products">
              Өөрт тохирох шийдлээ олоорой <ArrowUpRight size={19} />
            </a>
          </div>
        </section>
        <div className="benefit-strip">
          <div>
            <Truck size={23} />
            <span>
              Үнэгүй хүргэлт<small>Таны гэрийн үүдэнд</small>
            </span>
          </div>
          <div>
            <Wrench size={23} />
            <span>
              Үнэгүй суурилуулалт<small>Хэрэглэхэд бэлэн шийдэл</small>
            </span>
          </div>
          <div>
            <Droplets size={23} />
            <span>
              БНСУ-ын технологи<small>Өдөр тутмын цэвэр ус</small>
            </span>
          </div>
        </div>
        <ServiceLocations />
        {aqua && (
          <section id="aqua4" className="feature-section">
            <div className="feature-visual aqua-visual">
              <span className="visual-label">AQUA 4 / UF SYSTEM</span>
              <Image
                src={aqua.image}
                alt={aqua.name}
                fill
                sizes="(max-width: 760px) 100vw, 50vw"
                className="product-feature-image"
              />
              <span className="image-caption">
                <span className="live-dot" />
                ЦАХИЛГААНГҮЙ АЖИЛЛАНА
              </span>
            </div>
            <div className="feature-copy">
              <p className="eyebrow">02 / AQUA 4 ШАТЛАЛТ ШҮҮЛТҮҮР</p>
              <h2>
                Цэвэр ус.
                <br />
                <span className="muted">Цэвэр сонголт.</span>
              </h2>
              <p>{aqua.description}</p>
              <div className="feature-facts">
                <div>
                  <b>4</b>
                  <span>шатлалт шүүлтүүр</span>
                </div>
                <div>
                  <b>UF</b>
                  <span>цэвэршүүлэх систем</span>
                </div>
              </div>
              <div className="check-line">
                <Check size={17} /> Хүргэлт, суурилуулалт үнэгүй
              </div>
              <button className="button blue" onClick={() => setSelected(aqua)}>
                Захиалга өгөх <ArrowUpRight size={18} />
              </button>
            </div>
          </section>
        )}
        {heater && (
          <section id="heater" className="feature-section heater-section">
            <div className="feature-copy">
              <p className="eyebrow light">03 / АГШИН ЗУУРЫН ХАЛААГЧ</p>
              <h2>
                Халуун усаа
                <br />
                <span>хүлээхгүй.</span>
              </h2>
              <p>{heater.description}</p>
              <div
                className="color-options"
                aria-label="Гурван өнгөний сонголт"
              >
                <i />
                <i />
                <i />
                <span>3 өнгөний сонголт</span>
              </div>
              <button
                className="button white"
                onClick={() => setSelected(heater)}
              >
                Үнийн санал авах <ArrowUpRight size={18} />
              </button>
            </div>
            <div className="feature-visual heater-visual">
              <Image
                src={heater.image}
                alt={heater.name}
                fill
                sizes="(max-width: 760px) 100vw, 50vw"
                className="product-feature-image"
              />
              <span className="visual-label">INSTANT COMFORT.</span>
              <span className="image-caption">ТАНЫ ГЭРИЙН ШИНЭ ТАВ ТУХ</span>
            </div>
          </section>
        )}
        <section id="products" className="section catalog-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">04 / БҮТЭЭГДЭХҮҮН</p>
              <h2>
                Танд тохирох
                <br />
                <span className="muted">усны шийдэл.</span>
              </h2>
            </div>
            <p>
              Гал тогооноос угаалгын өрөө хүртэл.
              <br />
              Өдөр тутмын амьдралд тань зориулав.
            </p>
          </div>
          <div className="category-tabs" aria-label="Бүтээгдэхүүний ангилал">
            {categories.map((c) => (
              <button
                key={c}
                aria-pressed={category === c}
                className={category === c ? "active" : ""}
                onClick={() => setCategory(c)}
              >
                {c}
                {c === "Бүгд" && (
                  <span>{visible.length.toString().padStart(2, "0")}</span>
                )}
              </button>
            ))}
          </div>
          <div className="product-grid">
            {visible
              .filter((p) => category === "Бүгд" || p.category === category)
              .map((p, i) => (
                <article className="product-card" key={p.id}>
                  <button
                    className="product-image-button"
                    onClick={() => setSelected(p)}
                    aria-label={`${p.name} дэлгэрэнгүй, захиалах`}
                  >
                    <span className="product-number">0{i + 1}</span>
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 600px) 90vw, (max-width: 1000px) 45vw, 23vw"
                      className="product-card-image"
                    />
                    <span className="product-plus">
                      <Plus size={19} />
                    </span>
                  </button>
                  <p className="product-category">{p.category}</p>
                  <h3>{p.name}</h3>
                  <button
                    className="product-order"
                    onClick={() => setSelected(p)}
                  >
                    {money(p.price)}
                    <ArrowUpRight size={18} />
                  </button>
                </article>
              ))}
          </div>
          {visible.filter((p) => category === "Бүгд" || p.category === category)
            .length === 0 && (
            <p className="empty-state">
              Энэ ангилалд бүтээгдэхүүн одоогоор алга.
            </p>
          )}
          <div className="replacement-filters">
            <div>
              <Droplets size={25} />
              <span>
                Солих шүүлтүүрүүд<small>Aqua 4 системд зориулсан</small>
              </span>
            </div>
            <div>
              {[
                ["SEDIMENT", "30,000"],
                ["PRE CARBON", "33,000"],
                ["UF MEMBRANE", "35,000"],
                ["POST CARBON", "33,000"],
              ].map(([name, price]) => (
                <span key={name}>
                  {name}
                  <b>{price} ₮</b>
                </span>
              ))}
            </div>
            <a href="tel:95091085" aria-label="Солих шүүлтүүрийн талаар залгах">
              <ArrowUpRight />
            </a>
          </div>
        </section>
        <section className="section faq-section">
          <div>
            <p className="eyebrow">ТАНД ТУСАЛЪЯ</p>
            <h2>
              Түгээмэл
              <br />
              <span className="muted">асуултууд.</span>
            </h2>
          </div>
          <div className="faq-list">
            {[
              [
                "Хэрхэн захиалга өгөх вэ?",
                "Бүтээгдэхүүнээ сонгоод захиалгын мэдээллээ бөглөнө. Үндсэн үйлчилгээ нээгдсэний дараа бид утсаар холбогдож захиалгыг баталгаажуулна. Одоогоор сайт туршилтын горимд байна.",
              ],
              [
                "Хүргэлт, суурилуулалт төлбөртэй юу?",
                "Хүргэлт, суурилуулалт үнэгүй. Хаяг болон хүргэх хугацааг утсаар ярилцаж тохирно.",
              ],
              [
                "Aqua 4 цахилгаанаар ажилладаг уу?",
                "Aqua 4 нь цахилгаангүй ажилладаг, дөрвөн шатлалт UF шүүлтүүрийн системтэй.",
              ],
              [
                "Шүүлтүүр солих талаар хаанаас зөвлөгөө авах вэ?",
                "9509 1085 эсвэл 9040 2224 дугаарт холбогдон өөрийн загварт тохирох шүүлтүүр, солих хугацааны талаар зөвлөгөө аваарай.",
              ],
            ].map(([q, a]) => (
              <details key={q}>
                <summary>
                  {q}
                  <Plus size={20} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        <section id="contact" className="contact-section">
          <div>
            <p className="eyebrow light">ЦЭВЭР УСНААС ЭХЭЛЬЕ</p>
            <h2>
              Таны гэрт.
              <br />
              Таны төлөө.
            </h2>
          </div>
          <div className="contact-copy">
            <p>
              Танд тохирох бүтээгдэхүүнээ сонгоход
              <br />
              бид тусалъя.
            </p>
            <a href="tel:95091085">
              9509 1085 <ArrowUpRight />
            </a>
            <a href="tel:90402224">
              9040 2224 <ArrowUpRight />
            </a>
            <span>
              <Phone size={14} /> Утсаар зөвлөгөө авах
            </span>
          </div>
        </section>
      </main>
      <footer className="footer">
        <Link className="footer-brand" href="/">
          magic water<span>УС БҮРТ ИД ШИД</span>
        </Link>
        <p>© {new Date().getFullYear()} Magic Water</p>
        <Link href="/admin">
          Админ · Туршилт <ArrowRight size={15} />
        </Link>
        <a href="#top" aria-label="Дээш буцах">
          <ArrowUpRight size={21} />
        </a>
      </footer>
      {selected && (
        <OrderDialog
          product={selected}
          onClose={() => setSelected(null)}
          onSave={addOrder}
        />
      )}
    </>
  );
}
