"use client";

import { useState } from "react";
import Link from "next/link";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 w-full z-[999] flex items-center justify-between px-[6vw] py-[3vw] max-md:px-[5vw] max-md:py-[4vw]">
      <Link
        href="/"
        className="font-modak text-[12vw] md:text-[4.5vw] pt-[1vw] leading-none text-[var(--red)] hover:scale-105 transition-transform duration-300"
        style={{ WebkitTextStroke: "4px white", paintOrder: "stroke fill", textShadow: "0 4px 15px rgba(0,0,0,0.15)" }}
      >
        2YUM
      </Link>

      <div className="flex items-center gap-[1vw] max-md:gap-[3vw]">
        <Link
          href="/menu"
          className="font-mouse-memoirs hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center text-[1.3vw] max-md:text-[4vw] uppercase tracking-wide text-white bg-[var(--red)] border border-[var(--red)] shadow-[0_4px_15px_rgba(229,27,33,0.3)] hover:shadow-[0_6px_20px_rgba(229,27,33,0.45)] hover:bg-[#c9141a] px-[2.2vw] py-[0.7vw] max-md:px-[5.5vw] max-md:py-[2vw] rounded-full select-none"
          data-cursor-hide="true"
        >
          BURGERS
        </Link>

        <div className="relative">
          <button
            data-cursor-hide="true"
            className={`hover:scale-105 active:scale-95 flex items-center gap-[.8vw] max-md:gap-[2.5vw] px-[2vw] py-[0.7vw] max-md:px-[5vw] max-md:py-[2vw] rounded-full cursor-pointer transition-all duration-300 font-mouse-memoirs text-[1.3vw] max-md:text-[4vw] uppercase tracking-wide select-none ${isMenuOpen
              ? 'bg-[var(--red)] border border-[var(--red)] text-white shadow-[0_4px_15px_rgba(229,27,33,0.3)]'
              : 'bg-white/90 hover:bg-white backdrop-blur-md border border-black/10 hover:border-black/25 text-[var(--dark)] shadow-[0_4px_14px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)]'
              }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            aria-controls="main-menu"
          >
            {isMenuOpen ? "CLOSE ✕" : (
              <>
                MENU
                <span className="flex flex-col gap-[.3vw] max-md:gap-[.6vw]">
                  <span className="block w-[1.3vw] max-md:w-[3.8vw] h-[.15vw] max-md:h-[.38vw] bg-current rounded-full" />
                  <span className="block w-[1.3vw] max-md:w-[3.8vw] h-[.15vw] max-md:h-[.38vw] bg-current rounded-full" />
                  <span className="block w-[1.3vw] max-md:w-[3.8vw] h-[.15vw] max-md:h-[.38vw] bg-current rounded-full" />
                </span>
              </>
            )}
          </button>

          {/* Dropdown Menu Panel */}
          <div className={`nav-menu-panel ${isMenuOpen ? 'open' : ''}`}>
            <div className="nav-menu-links">
              <Link href="/" className="nav-menu-link" onClick={() => setIsMenuOpen(false)}>HOME</Link>
              <Link href="/menu" className="nav-menu-link" onClick={() => setIsMenuOpen(false)}>OUR BURGERS</Link>
              <Link href="/spices" className="nav-menu-link" onClick={() => setIsMenuOpen(false)}>OUR SPICES</Link>
            </div>
            <div className="nav-menu-footer">
              EST. 1997 — NAVARRA, ESPAÑA
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
