"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const PREP_STEPS = [
  "TOAST THE BUN",
  "FRESH LETTUCE",
  "MELT THE CHEESE",
  "GRILL THE PATTY",
  "STACK IT UP",
];

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          // Slide the preloader up and fade out
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 0.5,
            ease: "power3.inOut",
            onComplete: () => {
              setVisible(false);
              onComplete();
            },
          });
        },
      });
      
      tl.timeScale(1.5); // Increase overall animation speed

      // Initially hide all burger layers, step labels, and text
      gsap.set(
        [
          ".pre-bun-top",
          ".pre-lettuce",
          ".pre-cheese",
          ".pre-patty",
          ".pre-bun-bottom",
        ],
        { y: -120, opacity: 0, scale: 0.7 }
      );
      gsap.set(".pre-step", { opacity: 0, scale: 0.5, y: 10 });
      gsap.set(".pre-text", { opacity: 0, y: 30 });

      // Helper: show a step label, then fade it out quickly
      const showStep = (stepClass: string, position: string) => {
        tl.to(
          stepClass,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.25,
            ease: "back.out(2)",
          },
          position
        ).to(
          stepClass,
          {
            opacity: 0,
            scale: 0.8,
            duration: 0.2,
            ease: "power2.in",
          },
          "+=0.3"
        );
      };

      // ── Step 1: Toast the bun ──
      tl.to(".pre-bun-top", {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: "back.out(1.5)",
      });
      showStep(".pre-step-1", "-=0.3");

      // ── Step 2: Fresh lettuce ──
      tl.to(
        ".pre-lettuce",
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: "back.out(1.5)",
        },
        "-=0.05"
      );
      showStep(".pre-step-2", "-=0.25");

      // ── Step 3: Melt the cheese ──
      tl.to(
        ".pre-cheese",
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: "back.out(1.5)",
        },
        "-=0.05"
      );
      showStep(".pre-step-3", "-=0.25");

      // ── Step 4: Grill the patty ──
      tl.to(
        ".pre-patty",
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: "back.out(1.5)",
        },
        "-=0.05"
      );
      showStep(".pre-step-4", "-=0.25");

      // ── Step 5: Stack it up (bottom bun) ──
      tl.to(
        ".pre-bun-bottom",
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: "back.out(1.5)",
        },
        "-=0.05"
      );
      showStep(".pre-step-5", "-=0.25");

      // Small bounce on the whole burger
      tl.to(".pre-burger-group", {
        y: -12,
        duration: 0.25,
        ease: "power2.out",
      }).to(".pre-burger-group", {
        y: 0,
        duration: 0.35,
        ease: "bounce.out",
      });

      // Show "READY TO CRAV!" text
      tl.to(
        ".pre-text",
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.15"
      );

      // Hold for a moment
      tl.to({}, { duration: 0.6 });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "var(--red)" }}
    >
      {/* Preparation Step Labels — positioned around the burger */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {PREP_STEPS.map((step, i) => (
          <span
            key={i}
            className={`pre-step pre-step-${i + 1} absolute text-white uppercase tracking-[0.25em] select-none`}
            style={{
              fontFamily: "'CustomNavbarFont1', sans-serif",
              fontSize: "clamp(14px, 2vw, 28px)",
              fontWeight: 700,
              // Alternate left/right positioning
              ...(i % 2 === 0
                ? { right: "clamp(30px, 8vw, 120px)" }
                : { left: "clamp(30px, 8vw, 120px)" }),
              // Vertically stagger positions
              top: `${38 + i * 5}%`,
              textShadow: "0 2px 12px rgba(0,0,0,0.3)",
            }}
          >
            {step}
          </span>
        ))}
      </div>

      {/* Burger SVG Illustration */}
      <div
        className="pre-burger-group"
        style={{ width: "clamp(120px, 18vw, 220px)" }}
      >
        <svg
          viewBox="0 0 200 220"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "auto", overflow: "visible" }}
        >
          {/* ── Top Bun ── */}
          <g className="pre-bun-top">
            <path
              d="M30,95 Q30,30 100,25 Q170,30 170,95 Z"
              fill="#E8942E"
              stroke="#8B4513"
              strokeWidth="3"
            />
            <path
              d="M50,75 Q50,45 100,40 Q150,45 150,75 Z"
              fill="#F0A83C"
              opacity="0.6"
            />
            <ellipse cx="85" cy="52" rx="5" ry="8" fill="#FFEAA7" transform="rotate(-15 85 52)" />
            <ellipse cx="105" cy="48" rx="5" ry="8" fill="#FFEAA7" transform="rotate(10 105 48)" />
            <ellipse cx="120" cy="58" rx="4" ry="7" fill="#FFEAA7" transform="rotate(20 120 58)" />
            <ellipse cx="75" cy="65" rx="4" ry="7" fill="#FFEAA7" transform="rotate(-5 75 65)" />
            <ellipse cx="100" cy="65" rx="4" ry="7" fill="#FFEAA7" transform="rotate(5 100 65)" />
          </g>

          {/* ── Lettuce ── */}
          <g className="pre-lettuce">
            <path
              d="M22,105 Q40,90 60,105 Q80,90 100,105 Q120,90 140,105 Q160,90 178,105 L175,115 Q155,102 140,115 Q120,102 100,115 Q80,102 60,115 Q40,102 25,115 Z"
              fill="#4CAF50"
              stroke="#2E7D32"
              strokeWidth="2"
            />
          </g>

          {/* ── Cheese ── */}
          <g className="pre-cheese">
            <path
              d="M25,118 L175,118 L180,135 Q165,142 155,135 L25,135 L20,142 Z"
              fill="#FFC107"
              stroke="#F9A825"
              strokeWidth="2"
            />
          </g>

          {/* ── Patty ── */}
          <g className="pre-patty">
            <rect
              x="28"
              y="140"
              width="144"
              height="30"
              rx="14"
              ry="14"
              fill="#5D3319"
              stroke="#3E1F0D"
              strokeWidth="2.5"
            />
            <rect
              x="35"
              y="148"
              width="130"
              height="14"
              rx="7"
              ry="7"
              fill="#6D3F22"
              opacity="0.5"
            />
          </g>

          {/* ── Bottom Bun ── */}
          <g className="pre-bun-bottom">
            <path
              d="M30,175 L170,175 Q175,200 100,200 Q25,200 30,175 Z"
              fill="#E8942E"
              stroke="#8B4513"
              strokeWidth="3"
            />
            <path
              d="M40,180 L160,180 Q163,193 100,193 Q37,193 40,180 Z"
              fill="#D07E22"
              opacity="0.4"
            />
          </g>
        </svg>
      </div>

      {/* READY TO CRAV! Text */}
      <p
        className="pre-text mt-[4vw] text-white uppercase tracking-[0.3em] select-none"
        style={{
          fontFamily: "'CustomNavbarFont1', sans-serif",
          fontSize: "clamp(16px, 2.5vw, 36px)",
          fontWeight: 700,
          letterSpacing: "0.2em",
        }}
      >
        Ready to Crav!
      </p>
    </div>
  );
}
