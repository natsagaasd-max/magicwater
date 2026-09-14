"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  type CSSProperties,
  type PointerEvent,
} from "react";

const locations = ["Улаанбаатар", "Эрдэнэт", "Өвөрхангай", "Дорнод"];

export default function ServiceLocations() {
  const sectionRef = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.16 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !mapRef.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
    const rotateX = -((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    mapRef.current.style.setProperty("--map-rotate-x", `${rotateX.toFixed(2)}deg`);
    mapRef.current.style.setProperty("--map-rotate-y", `${rotateY.toFixed(2)}deg`);
  };

  const resetTilt = () => {
    mapRef.current?.style.setProperty("--map-rotate-x", "0deg");
    mapRef.current?.style.setProperty("--map-rotate-y", "0deg");
  };

  return (
    <section ref={sectionRef} id="locations" className="locations-section">
      <div className="locations-inner">
        <div className="locations-heading">
          <div>
            <p className="eyebrow light">ҮЙЛЧИЛГЭЭНИЙ БАЙРШИЛ</p>
            <h2>
              Бид танд
              <br />
              <span>илүү ойр.</span>
            </h2>
          </div>
          <p>
            Magic Water-ийн хүргэлт, суурилуулалтын үйлчилгээ дараах хот,
            аймгуудад хүрч байна.
          </p>
        </div>

        <div
          className="locations-map-stage"
          onPointerMove={handlePointerMove}
          onPointerLeave={resetTilt}
        >
          <div ref={mapRef} className="locations-map">
            <Image
              src="/images/mongolia-service-map.jpg"
              width={1536}
              height={1024}
              sizes="(max-width: 760px) 100vw, (max-width: 1500px) 90vw, 1400px"
              alt="Magic Water-ийн үйлчилгээ хүрч буй Улаанбаатар, Эрдэнэт, Өвөрхангай, Дорнодыг онцолсон Монгол Улсын газрын зураг"
            />
          </div>
        </div>

        <div className="locations-list" aria-label="Үйлчилгээний үндсэн байршлууд">
          {locations.map((location, index) => (
            <article key={location} style={{ "--location-index": index } as CSSProperties}>
              <span className="location-dot" aria-hidden="true" />
              <div>
                <h3>{location}</h3>
                <p>Хүргэлт · Суурилуулалт</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
