"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const INGREDIENTS = [
  { src: "/images/lettuce.png", alt: "Lettuce" },
  { src: "/images/tomato.png",  alt: "Tomato"  },
  { src: "/images/cheese.png",  alt: "Cheese"  },
  { src: "/images/meat.png",    alt: "Patty"   },
];

const ING_SIZE  = 34;
const DOT_SIZE  = 8;
const GLOW_SIZE = 300;

// Spring-follow parameters per ingredient (closer = tighter follow)
const SPRING_STIFFNESS = [0.12, 0.09, 0.065, 0.045];

export function AnimatedCursor() {
  const dotRef    = useRef<HTMLDivElement>(null);
  const glowRef   = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ingRefs   = useRef<(HTMLDivElement | null)[]>([]);

  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const dot    = dotRef.current;
    const glow   = glowRef.current;
    const canvas = canvasRef.current;
    if (!dot || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Size canvas to full viewport
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    document.documentElement.style.cursor = "none";

    // ── GSAP quick-setters for main dot & glow ──
    const dotX  = gsap.quickTo(dot, "x", { duration: 0.06, ease: "none" });
    const dotY  = gsap.quickTo(dot, "y", { duration: 0.06, ease: "none" });
    const glowX = glow ? gsap.quickTo(glow, "x", { duration: 0.9, ease: "power2.out" }) : null;
    const glowY = glow ? gsap.quickTo(glow, "y", { duration: 0.9, ease: "power2.out" }) : null;

    // ── Spring-follow state for each ingredient ──
    // Each ingredient chases the one before it (chain: cursor → 0 → 1 → 2 → 3)
    const ingPositions = INGREDIENTS.map(() => ({ x: 0, y: 0, vx: 0, vy: 0 }));

    // ── Init invisible ──
    gsap.set([dot, glow], { opacity: 0 });
    gsap.set(ingRefs.current.filter(Boolean), { scale: 0, opacity: 0 });

    let hasMoved  = false;
    let animFrame: number;
    let mouseX = 0;
    let mouseY = 0;

    const tick = () => {
      // Update spring positions — each ingredient follows its predecessor
      ingPositions.forEach((pos, i) => {
        const target = i === 0
          ? { x: mouseX, y: mouseY }
          : ingPositions[i - 1];

        const stiffness = SPRING_STIFFNESS[i];
        const damping   = 0.75;

        // Spring force
        const dx = target.x - pos.x;
        const dy = target.y - pos.y;
        pos.vx += dx * stiffness;
        pos.vy += dy * stiffness;
        pos.vx *= damping;
        pos.vy *= damping;
        pos.x  += pos.vx;
        pos.y  += pos.vy;

        // Move DOM element
        const el = ingRefs.current[i];
        if (el) {
          el.style.transform = `translate(${pos.x - ING_SIZE / 2}px, ${pos.y - ING_SIZE / 2}px)`;
        }
      });

      // ── Draw white thread on canvas ──
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Build the chain of points: cursor → ingredient 0 → 1 → 2 → 3
      const points = [
        { x: mouseX, y: mouseY },
        ...ingPositions,
      ];

      if (hasMoved && points.length >= 2) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);

        // Draw smooth Catmull-Rom–style curves through each point
        for (let i = 0; i < points.length - 1; i++) {
          const p0 = points[Math.max(i - 1, 0)];
          const p1 = points[i];
          const p2 = points[i + 1];
          const p3 = points[Math.min(i + 2, points.length - 1)];

          // Control points for cubic bezier
          const cp1x = p1.x + (p2.x - p0.x) / 6;
          const cp1y = p1.y + (p2.y - p0.y) / 6;
          const cp2x = p2.x - (p3.x - p1.x) / 6;
          const cp2y = p2.y - (p3.y - p1.y) / 6;

          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
        }

        ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
        ctx.lineWidth   = 2;
        ctx.lineCap     = "round";
        ctx.lineJoin    = "round";
        ctx.stroke();
      }

      animFrame = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Unhide on first move & start render loop
      if (!hasMoved) {
        hasMoved = true;
        // Initialise all positions to cursor so they don't fly in from (0,0)
        ingPositions.forEach((pos) => {
          pos.x = mouseX;
          pos.y = mouseY;
        });
        gsap.to([dot, glow], { opacity: 1, duration: 0.3 });
        gsap.to(ingRefs.current.filter(Boolean), {
          scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: "back.out(2)",
        });
        animFrame = requestAnimationFrame(tick);
      }

      dotX(mouseX - DOT_SIZE  / 2);
      dotY(mouseY - DOT_SIZE  / 2);
      glowX?.(mouseX - GLOW_SIZE / 2);
      glowY?.(mouseY - GLOW_SIZE / 2);
    };

    // ── Hover ──
    const onEnter = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("a, button, [data-cursor-hide]");
      if (!el) return;
      setIsHovering(true);
      if (el.hasAttribute("data-cursor-hide")) {
        gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 });
      } else {
        gsap.to(dot, { scale: 1.5, duration: 0.2 });
      }
    };

    const onLeave = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest("a, button, [data-cursor-hide]")) return;
      setIsHovering(false);
      gsap.to(dot, { scale: 1, opacity: 1, duration: 0.2 });
    };

    // ── Click ──
    const onDown = () => {
      if (isHovering) return;
      setIsClicking(true);
      gsap.to(dot, { scale: 0.5, duration: 0.12 });
    };

    const onUp = () => {
      if (isHovering) return;
      setIsClicking(false);
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onEnter);
    window.addEventListener("mouseout",  onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);

    return () => {
      document.documentElement.style.cursor = "";
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize",    resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onEnter);
      window.removeEventListener("mouseout",  onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Thread canvas — draws white line connecting cursor to ingredients */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[9984] pointer-events-none hidden md:block"
      />

      {/* Ambient glow */}
      <div ref={glowRef} className="cursor-glow pointer-events-none hidden md:block" />

      {/* Ingredient trail */}
      {INGREDIENTS.map((ing, i) => (
        <div
          key={ing.alt}
          ref={(el) => { ingRefs.current[i] = el; }}
          className="ing-trail-circle pointer-events-none hidden md:flex"
          style={{ zIndex: 9985 + i }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ing.src} alt={ing.alt} className="ing-trail-img" />
        </div>
      ))}

      {/* Inner dot */}
      <div
        ref={dotRef}
        className="cursor-dot pointer-events-none hidden md:block"
        data-clicking={isClicking}
      />
    </>
  );
}
