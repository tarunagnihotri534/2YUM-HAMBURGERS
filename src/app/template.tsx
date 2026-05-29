"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

let isFirstLoad = true;

export default function Template({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (isFirstLoad) {
      isFirstLoad = false;
      if (pathname === "/") {
        // Let the home page Preloader handle the initial load
        gsap.set(overlayRef.current, { display: 'none' });
        return;
      }
    }

    if (overlayRef.current) {
      gsap.set(overlayRef.current, { display: 'flex', yPercent: 0 });
      gsap.to(overlayRef.current, {
        yPercent: -100,
        duration: 0.8,
        delay: 0.3,
        ease: "power3.inOut",
        onComplete: () => {
          gsap.set(overlayRef.current, { display: 'none' });
        }
      });
    }
  }, [pathname]);

  return (
    <>
      <div 
        ref={overlayRef} 
        className="fixed inset-0 z-[999998] bg-[var(--yellow)] flex items-center justify-center pointer-events-none"
        style={{ display: (isFirstLoad && pathname === "/") ? 'none' : 'flex' }}
      >
        <h1 
          className="text-[var(--red)] font-mouse-memoirs text-[12vw] max-md:text-[18vw] uppercase leading-none m-0 text-center"
          style={{ WebkitTextStroke: "1px var(--red)" }}
        >
          CRAVE WITH TARUN...
        </h1>
      </div>
      {children}
    </>
  );
}
