"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { Navbar } from "@/components/Navbar";
import { AnimatedCursor } from "@/components/AnimatedCursor";
import { SmoothScroll } from "@/components/SmoothScroll";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const BURGERS_DATA = [
  {
    id: 1,
    name: "Classic Burger",
    price: "₹250",
    image: "/images/1b(1).webp",
  },
  {
    id: 2,
    name: "Spicy Jalapeño Burger",
    price: "₹300",
    image: "/images/2b(1).webp",
  },
  {
    id: 3,
    name: "Bacon Cheese Burger",
    price: "₹380",
    image: "/images/3b.webp",
  },
  {
    id: 4,
    name: "Veggie Delight Burger",
    price: "₹280",
    image: "/images/4b.webp",
  },
  {
    id: 5,
    name: "BBQ Ranch Burger",
    price: "₹450",
    image: "/images/5b.webp",
  },
  {
    id: 6,
    name: "Mushroom Swiss Burger",
    price: "₹520",
    image: "/images/6b.webp",
  },
];

export default function MenuPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations for hero text and sticker
      gsap.from(".menu-title-part", {
        y: 120,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.15,
      });

      // Entrance animation on the outer wrapper
      gsap.from(".menu-smile-sticker-wrap", {
        scale: 0,
        rotation: -45,
        opacity: 0,
        duration: 1.4,
        ease: "back.out(1.8)",
        delay: 0.4,
      });

      // Ambient floating animation on the inner container to prevent GSAP property conflicts
      gsap.to(".menu-smile-sticker-inner", {
        y: -15,
        rotation: 12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Ambient hover card animations
      gsap.utils.toArray<HTMLElement>(".menu-card-item").forEach((card) => {
        const imgWrap = card.querySelector(".menu-card-img-wrap");
        card.addEventListener("mouseenter", () => {
          gsap.to(imgWrap, { scale: 1.05, rotate: 2, duration: 0.4, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(imgWrap, { scale: 1, rotate: 0, duration: 0.4, ease: "power2.out" });
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="menu-page-wrapper">
      <SmoothScroll />
      <AnimatedCursor />
      <Navbar />

      {/* ── Hero Section ── */}
      <main ref={heroRef} className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 bg-black">
          <Image
            src="/images/smoky-burger.webp"
            alt="Crav Smoky Burger"
            fill
            className="object-cover opacity-85"
            priority
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 w-full">
          <div className="relative w-fit">
            {/* Floating Smile Sticker placed exactly on top of the left side of the burger bun */}
            <div className="menu-smile-sticker-wrap absolute w-[11vw] max-md:w-[20vw] h-auto top-[-6.5vw] left-[-3vw] max-md:left-[-1.5vw] z-20 drop-shadow-2xl pointer-events-none">
              <div className="menu-smile-sticker-inner w-full h-full">
                <Image 
                  src="/images/smile.webp" 
                  alt="Smile Sticker" 
                  width={200} 
                  height={200} 
                  className="w-full h-auto object-contain" 
                />
              </div>
            </div>

            {/* Headline - Massive Yellow with White Stroke */}
            <h1 className="flex flex-col uppercase leading-[0.85] text-[12vw] max-md:text-[16vw] text-[var(--yellow)] drop-shadow-2xl select-none" style={{ fontFamily: "'CustomNavbarFont1', sans-serif" }}>
              <span className="menu-title-part" style={{ WebkitTextStroke: "6px white", paintOrder: "stroke fill" }}>Eat Like You</span>
              <span className="menu-title-part" style={{ WebkitTextStroke: "6px white", paintOrder: "stroke fill" }}>Mean It</span>
            </h1>
          </div>
        </div>

        {/* Bottom Cream Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[12vw] max-md:h-[20vw]">
            <path 
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C52.71,76.4,103.42,54.7,157,41.25,212.59,27.32,269.44,30.41,321.39,56.44Z" 
              fill="var(--cream)" 
            />
          </svg>
        </div>
      </main>

      {/* ── Finest Burgers Grid Section ── */}
      <section ref={itemsRef} className="min-h-screen w-full relative bg-[var(--cream)] px-[5vw] py-[8vw] z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="flex items-end justify-between w-full max-w-[85vw] mx-auto mb-[10vw] border-b-[3px] border-black/5 pb-[2vw]">
          <div className="flex flex-col items-start gap-y-[0.5vw]">
            {/* The Best Badge */}
            <span className="bg-[var(--yellow)] text-white font-modak text-[2vw] max-md:text-[4.5vw] px-[2vw] py-[0.5vw] rounded-full uppercase tracking-wider drop-shadow-sm select-none -rotate-2 -webkit-text-stroke-[1px] -webkit-text-stroke-white mb-[1.5vw]">
              THE BEST
            </span>
            {/* Massive Red Title */}
            <h2 className="uppercase leading-[0.75] max-md:leading-[0.85] text-[12vw] max-md:text-[9vw] text-[var(--red)] font-mouse-memoirs select-none font-bold pb-[3vw]">
              <span className="block">OUR FINEST</span>
              <span className="block">BURGER PICKS</span>
            </h2>
          </div>
          <span className="font-mouse-memoirs text-black/75 text-[2vw] max-md:text-[4.5vw] uppercase leading-none tracking-wider select-none pb-[1vw]">
            6 ITEMS
          </span>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-3 max-md:grid-cols-1 gap-[3.5vw] w-full max-w-[85vw] mx-auto pb-[6vw] mt-[6vw]">
          
          {BURGERS_DATA.map((burger) => (
            <div 
              key={burger.id} 
              className="menu-card-item relative bg-white rounded-[2.5vw] p-[2.5vw] pb-[2vw] flex flex-col justify-between shadow-md border-[3px] border-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Plus Button Top Right */}
              <button className="absolute top-[2vw] right-[2vw] z-30 w-[3.5vw] max-md:w-[9vw] h-[3.5vw] max-md:h-[9vw] bg-[var(--yellow)] hover:scale-105 active:scale-95 text-white rounded-full flex items-center justify-center font-bold text-[2vw] max-md:text-[5vw] transition-transform duration-200">
                +
              </button>

              {/* Checkered pattern background strip */}
              <div className="absolute left-0 right-0 top-[42%] -translate-y-1/2 h-[3.5vw] max-md:h-[8vw] z-0 flex flex-col justify-between overflow-hidden opacity-95">
                <div className="w-full h-1/2 bg-[repeating-linear-gradient(90deg,var(--red)_0px,var(--red)_16px,#fff_16px,#fff_32px)]" />
                <div className="w-full h-1/2 bg-[repeating-linear-gradient(90deg,#fff_0px,#fff_16px,var(--red)_16px,var(--red)_32px)]" />
              </div>

              {/* Burger Image Container */}
              <div className="menu-card-img-wrap w-[18vw] max-md:w-[50vw] h-[16vw] max-md:h-[40vw] relative mx-auto z-10 mb-[1.5vw] transform transition-transform duration-300">
                <Image 
                  src={burger.image} 
                  alt={burger.name} 
                  fill 
                  className="object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.15)]" 
                />
              </div>

              {/* Footer: Name on left, Price on right */}
              <div className="flex items-baseline justify-between w-full mt-auto z-10 pt-[0.5vw]">
                <h3 className="font-modak text-[1.8vw] max-md:text-[5vw] text-[var(--red)] leading-[1.1] select-none" style={{ fontStyle: "italic" }}>
                  {burger.name}
                </h3>
                <span className="font-nunito font-extrabold text-[1.6vw] max-md:text-[4.5vw] text-black/80 leading-none select-none whitespace-nowrap px-[1vw] py-[0.5vw] bg-black/5 rounded-lg">
                  {burger.price}
                </span>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* Floating Cart Button */}
      <div className="fixed bottom-[2rem] right-[2rem] z-[999] w-[4.5vw] max-md:w-[13vw] h-[4.5vw] max-md:h-[13vw] bg-[var(--red)] border-[3px] border-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-[2vw] max-md:w-[6vw] h-[2vw] max-md:h-[6vw] text-white">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
        </svg>
      </div>

      <CtaSection />
      <Footer />
    </div>
  );
}

// ── CTA Section ──
function CtaSection() {
  return (
    <section className="cta-section" id="cta-desktop">
      {/* Wave at the top of the CTA section transitioning from the cream section */}
      <svg className="cta-wave" viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path fill="var(--yellow)" d="M0,0 C 400,150 1000,200 1440,50 L1440,0 L0,0 Z" />
      </svg>

      <div className="cta-content-wrapper">
        <div className="cta-text-area">
          <div className="cta-sticker">FEEL IT</div>
          <h2 className="cta-headline">
            FEEL THE<br />CHANGE
          </h2>
          <p className="cta-desc">
            Smashed for the bold, built for the hungry. Dive into a<br />
            legendary craft experience where every crispy edge and<br />
            juicy layer rules.
          </p>
          <a data-cursor-hide="true" type="link-btn" className="relative w-fit border-none bg-transparent p-0 block cursor-pointer outline-none select-none mt-[1vw]" data-anm-btn="btn" data-wf--btn-blob--variant="secondary" href="/menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="-10 -10 602 475" preserveAspectRatio="none" data-anm-btn="svg" className="absolute inset-0 w-full h-full z-0 pointer-events-none">
              <path stroke="#ffffff" strokeWidth="10" fill="#F91914" d="M310.777 0.20434C424.154 2.91791 540.733 50.9739 574.176 159.34C606.479 264.014 533.962 365.999 442.064 425.623C364.995 475.626 270.863 455.893 193.524 406.309C93.8313 342.395 -27.3608 259.503 5.48889 145.729C40.0621 25.9857 186.179 -2.77783 310.777 0.20434Z" />
            </svg>
            <span data-anm-btn="text" className="relative z-10 text-white font-bold text40 uppercase inline-block px-[4vw] py-[1.5vw] max-md:px-[10vw] max-md:py-[4vw]" aria-hidden="false">
              Order Now
            </span>
          </a>
        </div>
        
        <div className="cta-image-wrapper">
          <Image src="/images/cta.webp" alt="Feel the change" fill className="object-cover" />
        </div>
      </div>
    </section>
  );
}

// ── Footer ──
function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} className="site-footer">
      <div className="footer-top">
        <nav className="footer-nav">
          <a href="/">HOME</a>
          <a href="/menu">BURGERS</a>
          <a href="/spices">SPICES</a>
          <a href="/contact">CONTACT</a>
        </nav>
        <div className="footer-copyright">
          © 2026 — ALL RIGHTS RESERVED
        </div>
      </div>
      
      <div className="footer-line"></div>
      
      <div className="footer-mid">
        <p>SMASHED PATTIES • TOASTED BUNS • EST. 1997</p>
      </div>

      <div className="footer-giant-crav">
        <h1 className="footer-crav-text">2YUM</h1>
        
        <div className="footer-floating footer-cheese">
          <div className={`pop-inner ${isVisible ? 'pop-up-1' : 'pop-hidden'}`}>
            <Image src="/images/cheese.webp" alt="Cheese" width={200} height={200} className="w-full h-auto object-contain" />
          </div>
        </div>
        <div className="footer-floating footer-tomato">
          <div className={`pop-inner ${isVisible ? 'pop-up-2' : 'pop-hidden'}`}>
            <Image src="/images/tomato.webp" alt="Tomato" width={200} height={200} className="w-full h-auto object-contain" />
          </div>
        </div>
        <div className="footer-floating footer-meat">
          <div className={`pop-inner ${isVisible ? 'pop-up-3' : 'pop-hidden'}`}>
            <Image src="/images/meat.webp" alt="Meat" width={300} height={300} className="w-full h-auto object-contain" />
          </div>
        </div>
      </div>
    </footer>
  );
}
