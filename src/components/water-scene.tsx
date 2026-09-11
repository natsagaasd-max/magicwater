"use client";
import { useEffect, useRef } from "react";
export default function WaterScene({ paused }: { paused: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const ctx = el.getContext("2d");
    if (!ctx) return;
    let w = 0,
      h = 0,
      frame = 0;
    let pointer = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const resize = () => {
      const r = el.getBoundingClientRect();
      w = r.width;
      h = r.height;
      const d = Math.min(devicePixelRatio, 1.5);
      el.width = w * d;
      el.height = h * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
    };
    const obs = new ResizeObserver(resize);
    obs.observe(el);
    const move = (e: PointerEvent) => {
      pointer = (e.clientX / window.innerWidth - 0.5) * 0.5;
    };
    window.addEventListener("pointermove", move, { passive: true });
    function draw(ms: number) {
      if (!ctx) return;
      const t = paused || reduced.matches ? 0 : ms * 0.00023;
      ctx.clearRect(0, 0, w, h);
      const columns = w < 700 ? 80 : 145;
      const rows = 38;
      for (let row = rows; row >= 0; row--) {
        const z = row / rows;
        for (let col = 0; col <= columns; col++) {
          const u = col / columns;
          const x = u * w * 1.3 - w * 0.15;
          const wave =
            Math.sin(u * 9 + z * 4 + t * 2 + pointer) * 0.068 +
            Math.sin(u * 15 - z * 5 - t) * 0.027;
          const y = h * (0.66 + z * z * 0.44 + wave * (0.7 + z));
          const a =
            (0.12 + z * 0.45) * (0.65 + 0.35 * Math.sin(u * 8 + z * 5 + t));
          ctx.fillStyle = `rgba(73,220,240,${a})`;
          ctx.beginPath();
          ctx.arc(x, y, 0.65 + z * 1.05, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (!paused && !reduced.matches && !document.hidden)
        frame = requestAnimationFrame(draw);
    }
    const restart = () => {
      cancelAnimationFrame(frame);
      draw(performance.now());
    };
    reduced.addEventListener("change", restart);
    document.addEventListener("visibilitychange", restart);
    resize();
    draw(0);
    return () => {
      cancelAnimationFrame(frame);
      obs.disconnect();
      window.removeEventListener("pointermove", move);
      reduced.removeEventListener("change", restart);
      document.removeEventListener("visibilitychange", restart);
    };
  }, [paused]);
  return <canvas ref={canvas} className="water-canvas" aria-hidden="true" />;
}
