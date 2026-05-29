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
          className="font-mouse-memoirs hover:scale-105 transition-all duration-300 flex items-center justify-center text-[1.3vw] max-md:text-[4vw] uppercase tracking-wide text-[var(--cream)] bg-[var(--red)] px-[2.4vw] py-[0.8vw] max-md:px-[6vw] max-md:py-[2.2vw] rounded-full hover:bg-black select-none"
          data-cursor-hide="true"
        >
          BURGERS
        </Link>

        <div className="relative">
          <button
            data-cursor-hide="true"
            className={`hover:scale-105 flex items-center gap-[.8vw] max-md:gap-[2.5vw] px-[2vw] py-[0.8vw] max-md:px-[5vw] max-md:py-[2.2vw] rounded-full cursor-pointer transition-all duration-400 font-mouse-memoirs text-[1.3vw] max-md:text-[4vw] uppercase tracking-wide ${isMenuOpen
              ? 'bg-[var(--red)] border-[.15vw] max-md:border-[.4vw] border-[var(--red)] text-white'
              : 'bg-transparent border-[.15vw] max-md:border-[.4vw] border-black/20 text-[var(--dark)] hover:border-black'
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
                  <span className="block w-[1.4vw] max-md:w-[4vw] h-[.15vw] max-md:h-[.4vw] bg-current rounded-full" />
                  <span className="block w-[1.4vw] max-md:w-[4vw] h-[.15vw] max-md:h-[.4vw] bg-current rounded-full" />
                  <span className="block w-[1.4vw] max-md:w-[4vw] h-[.15vw] max-md:h-[.4vw] bg-current rounded-full" />
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
