"use client";

import { ArrowUpRight, Check, Gift } from "lucide-react";
import type { CSSProperties } from "react";
import { packages, type Package } from "@/lib/catalog";

function PackageCard({
  packageData,
  onOrder,
  index,
}: {
  packageData: Package;
  onOrder: (packageData: Package) => void;
  index: number;
}) {
  return (
    <article
      className={`package-card${packageData.featured ? " featured" : ""}`}
      style={{ "--package-index": index } as CSSProperties}
    >
      <div className="package-card-top">
        {packageData.badge ? (
          <span className="package-badge">{packageData.badge}</span>
        ) : (
          <span className="package-label">{packageData.label ?? "MAGIC WATER"}</span>
        )}
        <h3>{packageData.name}</h3>
        <p>{packageData.description}</p>
      </div>
      <ul className="package-items">
        {packageData.items.map((item) => (
          <li key={item}>
            <Check size={15} aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      {packageData.gift && (
        <div className="package-gift">
          <Gift size={17} aria-hidden="true" />
          <span>
            <small>БЭЛЭГ</small>
            {packageData.gift}
          </span>
        </div>
      )}
      <div className="package-card-bottom">
        <p className="package-price">
          {new Intl.NumberFormat("en-US").format(packageData.price)}₮
        </p>
        <button className="button blue" onClick={() => onOrder(packageData)}>
          Захиалах <ArrowUpRight size={18} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

export default function PackageSection({
  onOrder,
}: {
  onOrder: (packageData: Package) => void;
}) {
  return (
    <div className="package-panel">
      <div className="package-heading">
        <div>
          <p className="eyebrow">БАГЦ БҮТЭЭГДЭХҮҮН</p>
          <h3>
            Танд зориулсан
            <br />
            <span className="muted">хосолсон багцууд</span>
          </h3>
        </div>
        <p>Magic Water-ийн хамгийн хэрэгцээтэй бүтээгдэхүүнүүдийг нэг багцад.</p>
      </div>
      <div className="package-grid">
        {packages.map((packageData, index) => (
          <PackageCard
            key={packageData.id}
            packageData={packageData}
            onOrder={onOrder}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
