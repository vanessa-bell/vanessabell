import { useEffect, useRef } from "react";

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;
}

const COLORS = ["#C2714F", "#D4896A", "#4A5A3C", "#8FA678", "#E7DDD3"];

export function useSparkles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.style.cssText =
      "position:fixed;inset:0;pointer-events:none;z-index:9999";
    canvas.setAttribute("aria-hidden", "true");
    document.body.appendChild(canvas);
    canvasRef.current = canvas;

    const ctx = canvas.getContext("2d")!;
    const sparks: Spark[] = [];
    let mouse = { x: 0, y: 0 };
    let animId = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      for (let i = 0; i < 2; i++) {
        sparks.push({
          x: mouse.x,
          y: mouse.y,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 0.5,
          life: 1,
          size: Math.random() * 3 + 1,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        });
      }
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.02;
        s.life -= 0.02;
        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = s.life;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * s.life, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const checkMotion = () => {
      if (mql.matches) {
        cancelAnimationFrame(animId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        window.removeEventListener("mousemove", onMove);
      }
    };
    checkMotion();
    mql.addEventListener("change", checkMotion);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      mql.removeEventListener("change", checkMotion);
      canvas.remove();
    };
  }, []);
}
