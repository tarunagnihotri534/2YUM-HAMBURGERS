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

export default function SpicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".spices-title", {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.1,
      });
      gsap.from(".spices-bg", {
        scale: 1.1,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
      });

      // Floating wave animation (matching the single red wave of the reference site)
      gsap.to(".wave-red", {
        y: "1.5vw",
        skewY: "1deg",
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Floating stickers ambient animation
      gsap.utils.toArray<HTMLElement>(".floating-sticker").forEach((sticker, i) => {
        gsap.to(sticker, {
          y: i % 2 === 0 ? "2.5vw" : "-2.5vw",
          x: i % 2 === 0 ? "-1.8vw" : "1.8vw",
          rotation: i % 2 === 0 ? 8 : -8,
          duration: 4.5 + (i * 0.4),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      // Airplane Flight Animation on Scroll (curving path option)
      gsap.to(".flight-airplane-wrapper-spices", {
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 60%",
          end: "bottom 20%",
          scrub: 1.5,
        },
        motionPath: {
          path: "#flight-path-spices",
          align: "#flight-path-spices",
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
        },
        ease: "none",
      });

      // Airplane bobbing
      gsap.to(".flight-airplane-spices", {
        y: -15,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "sine.inOut",
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="spices-page-wrapper">
      <SmoothScroll />
      <AnimatedCursor />
      <Navbar />

      <main className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center pt-20">
        {/* Background Image */}
        <div className="absolute inset-0 spices-bg">
          <Image
            src="/images/spices.webp"
            alt="Crav Spices"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 w-full">
          {/* WHAT'S INSIDE - Yellow Modak */}
          <div className="spices-title font-modak text-[4vw] max-md:text-[8vw] leading-none uppercase tracking-wide text-[var(--yellow)] -webkit-text-stroke-[2px] -webkit-text-stroke-white drop-shadow-md transform -rotate-2 mb-2">
            What's Inside
          </div>

          {/* Headline - Massive Red with White Stroke */}
          <h1 className="spices-title flex flex-col uppercase leading-[0.85] text-[13vw] max-md:text-[20vw] text-[var(--red)] drop-shadow-2xl" style={{ fontFamily: "'CustomNavbarFont1', sans-serif" }}>
            <span style={{ WebkitTextStroke: "6px white", paintOrder: "stroke fill" }}>Simple Things</span>
            <span style={{ WebkitTextStroke: "6px white", paintOrder: "stroke fill" }}>Done Right</span>
          </h1>

          {/* Subtext */}
          <p className="spices-title text-white text-[2vw] max-md:text-[5vw] uppercase max-w-4xl mt-8 tracking-wider drop-shadow-lg" style={{ fontFamily: "'CustomNavbarFont1', sans-serif" }}>
            We don't have a long list of ingredients. We have a short one — and we're<br/>
            obsessive about every single item on it.
          </p>
        </div>

        {/* Bottom Red Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[12vw] max-md:h-[20vw]">
            <path 
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C52.71,76.4,103.42,54.7,157,41.25,212.59,27.32,269.44,30.41,321.39,56.44Z" 
              fill="var(--red)" 
            />
          </svg>
        </div>
      </main>

      {/* ── Farm To Bite Section ── */}
      <section id="farmToBite" className="h-fit overflow-x-hidden -mt-[5vw] max-md:mt-0 z-[200] self max-md:space-y-[6vw] w-full relative bg-[var(--red)]">
        
        {/* FROM FARM TO BITE */}
        <h2 className="uppercase max-md:text-center max-md:w-full max-md:text-[14vw] w-full pl-[2vw] leading-[.85] text-[var(--cream)] relative z-20 text-[18vw]" style={{ fontFamily: "'CustomNavbarFont1', sans-serif" }}>
          <span className="block">From Farm</span>
          <span className="block">To Bite</span>
        </h2>

        {/* Floating Sticker Bottom Left (Fries character) */}
        <div className="w-[15vw] max-md:w-[25vw] max-md:top-[65vw] max-md:left-0 h-auto absolute top-[35vw] left-[5vw] z-50 drop-shadow-2xl hover:scale-105 transition-transform duration-300">
          <Image src="/images/fries.webp" alt="Fries Mascot" width={400} height={400} className="w-full h-auto object-contain" />
        </div>

        {/* Floating Sticker Top Right */}
        <div className="w-[15vw] max-md:w-[25vw] h-auto absolute top-[15vw] max-md:right-0 max-md:top-[95vw] right-[5vw] z-50 drop-shadow-2xl hover:scale-105 transition-transform duration-300">
          <Image src="/images/stcik.webp" alt="Crav Mascot" width={300} height={300} className="w-full h-auto object-contain" />
        </div>

        {/* Flex container for Image and Right Text */}
        <div className="flex max-md:w-full max-md:flex-col max-md:items-center max-md:justify-center items-end gap-[2vw] max-md:gap-[6vw] justify-end pr-[5vw] pb-[5vw]">
          
          {/* Center Image */}
          <div className="h-[70vh] -mt-[8vw] max-md:-mt-[3vw] max-md:h-auto max-md:w-full max-md:rounded-[5vw] w-[30vw] rounded-[1vw] overflow-hidden relative z-20 shadow-2xl bg-black">
            <Image 
              src="/images/farmtobite.webp" 
              alt="Farm to Bite" 
              fill
              className="object-cover h-full w-full"
            />
          </div>

          {/* Right Text & Button Container */}
          <div className="space-y-[2vw] max-md:flex max-md:flex-col max-md:items-center max-md:justify-center max-md:gap-[6vw] pb-[2vw] relative z-30">
            <p className="text40 w-[25vw] max-md:text-center uppercase max-md:w-full ml-[1vw] text-white font-mouse-memoirs leading-[1.1]">
              We didn't just pick ingredients off a list. We thought about where they come from, why they matter, and what they bring to the burger.
            </p>
            <a data-cursor-hide="true" type="link-btn" className="relative w-fit mx-auto border-none bg-transparent p-0 block cursor-pointer outline-none select-none" data-anm-btn="btn" data-wf--btn-blob--variant="secondary" href="/menu">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="-10 -10 602 475" preserveAspectRatio="none" data-anm-btn="svg" className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                <path stroke="#ffffff" strokeWidth="10" fill="#F91914" d="M310.777 0.20434C424.154 2.91791 540.733 50.9739 574.176 159.34C606.479 264.014 533.962 365.999 442.064 425.623C364.995 475.626 270.863 455.893 193.524 406.309C93.8313 342.395 -27.3608 259.503 5.48889 145.729C40.0621 25.9857 186.179 -2.77783 310.777 0.20434Z" />
              </svg>
              <span data-anm-btn="text" className="relative z-10 text-white font-bold text40 uppercase inline-block px-[4vw] py-[1.5vw] max-md:px-[10vw] max-md:py-[4vw]" aria-hidden="false">
                Order Now
              </span>
            </a>
          </div>

        </div>
      </section>

      {/* ── Story Of Every Bite Section ── */}
      <section id="storyOfEveryBite" ref={storyRef} className="max-md:hidden h-[195vw] -mt-[5vw] w-full relative bg-[var(--mustard)] overflow-hidden">
        
        {/* Single floating red wave at the top, perfectly matching the reference site */}
        <div className="z-[99] w-full absolute left-0 right-0 overflow-x-clip max-md:left-0 max-md:right-0 top-0 h-[25vw] pointer-events-none">
          {/* Solid red background blending block to ensure seamless transition */}
          <div className="absolute top-0 left-0 w-full h-[8vw] bg-[var(--red)] z-[90]" />

          {/* Red Wave */}
          <div className="absolute top-0 left-0 w-full h-[25vw] wave-red z-[95]">
            <svg viewBox="0 0 1440 320" className="w-full h-full" preserveAspectRatio="none">
              <path fill="var(--red)" d="M0,160 C360,96 720,224 1080,128 C1440,32 1440,160 1440,160 L1440,0 L0,0 Z" />
            </svg>
          </div>
        </div>

        {/* Floating Ambient Stickers */}
        <div className="floating-sticker pointer-events-none absolute w-[10vw] will-change-transform z-50" style={{ top: "35vw", left: "45vw" }}>
          <Image src="/images/cheese.webp" alt="Cheese Sticker" width={200} height={200} className="w-full h-auto object-contain" />
        </div>
        <div className="floating-sticker pointer-events-none absolute w-[8vw] will-change-transform z-50" style={{ top: "95vw", left: "55vw" }}>
          <Image src="/images/tomato.webp" alt="Tomato Sticker" width={200} height={200} className="w-full h-auto object-contain" />
        </div>

        {/* Flight Path SVG */}
        <div className="flight-path-container">
          <svg className="flight-svg" viewBox="0 0 1000 1800" preserveAspectRatio="none">
            <path
              id="flight-path-spices"
              d="M 850, 450 C 500, 600 200, 600 150, 750 C 100, 950 500, 950 850, 1050 C 950, 1150 500, 1250 150, 1350 C 100, 1450 500, 1500 850, 1600"
              fill="none"
              stroke="#e6a835"
              strokeWidth="6"
              strokeDasharray="20 20"
              strokeLinecap="round"
            />
          </svg>
          <div className="flight-airplane-wrapper flight-airplane-wrapper-spices">
            <div className="flight-airplane flight-airplane-spices">
              <Image src="/images/uda.png" alt="Aeroplane" width={300} height={300} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
          </div>
        </div>

        {/* Left Side Header Text */}
        <div className="absolute left-[5vw] top-[20vw] z-10 space-y-[2vw]">
          <h2 className="uppercase leading-[.85] text-white text-[9vw] tracking-tighter" style={{ fontFamily: "'CustomNavbarFont1', sans-serif" }}>
            A Story In<br />Every Bite.
          </h2>
          <p className="uppercase leading-[1.2] text-black text-[1.5vw] font-mouse-memoirs max-w-sm mt-4 tracking-wider">
            From fresh farms to your hands every layer matters.
          </p>
        </div>

        {/* 5 Layer Cards distributed along the curve */}
        {/* Layer 1: Freshly Greens (Lettuce) */}
        <div className="absolute right-[15vw] space-y-[1.5vw] z-[20] top-[45vw] items-end flex flex-col">
          <p className="rotate-7 text-right uppercase text-stroke-small text40 font-modak leading-[.9] text-[#60A905] country-label" style={{ WebkitTextStroke: "1.5px white", fontFamily: "var(--font-modak), serif" }}>
            Freshly Greens
          </p>
          <div className="w-[25vw] rounded-[1vw] overflow-hidden h-[17vw] shadow-2xl border-[3px] border-white relative bg-black">
            <Image src="/images/lettuceimg.webp" alt="Lettuce Layer" fill className="h-full w-full object-cover" />
          </div>
          <p className="text40 w-[25vw] text-black uppercase font-mouse-memoirs leading-[1.1] text-right">
            Grilled to perfection juicy, smoky, unforgettable.
          </p>
        </div>

        {/* Layer 2: Juicy Tomatoes */}
        <div className="absolute left-[15vw] space-y-[1.5vw] z-[20] top-[75vw] items-start flex flex-col">
          <p className="-rotate-7 text-left uppercase text-stroke-small text40 font-modak leading-[.9] text-[#E31A1A] country-label" style={{ WebkitTextStroke: "1.5px white", fontFamily: "var(--font-modak), serif" }}>
            Juicy Tomatoes
          </p>
          <div className="w-[25vw] rounded-[1vw] overflow-hidden h-[17vw] shadow-2xl border-[3px] border-white relative bg-black">
            <Image src="/images/tomatoimg.webp" alt="Tomato Layer" fill className="h-full w-full object-cover" />
          </div>
          <p className="text40 w-[25vw] text-black uppercase font-mouse-memoirs leading-[1.1] text-left">
            Sun-ripened tomatoes that bring natural sweetness and balance.
          </p>
        </div>

        {/* Layer 3: Creamy Cheese */}
        <div className="absolute right-[15vw] space-y-[1.5vw] z-[20] top-[105vw] items-end flex flex-col">
          <p className="rotate-6 text-right uppercase text-stroke-small text40 font-modak leading-[.9] text-[#F5A623] country-label" style={{ WebkitTextStroke: "1.5px white", fontFamily: "var(--font-modak), serif" }}>
            Creamy Cheese
          </p>
          <div className="w-[25vw] rounded-[1vw] overflow-hidden h-[17vw] shadow-2xl border-[3px] border-white relative bg-black">
            <Image src="/images/cheeseimg.webp" alt="Cheese Layer" fill className="h-full w-full object-cover" />
          </div>
          <p className="text40 w-[25vw] text-black uppercase font-mouse-memoirs leading-[1.1] text-right">
            Rich, creamy cheese that melts into every bite.
          </p>
        </div>

        {/* Layer 4: Perfect Patty */}
        <div className="absolute left-[15vw] space-y-[1.5vw] z-[20] top-[135vw] items-start flex flex-col">
          <p className="-rotate-6 text-left uppercase text-stroke-small text40 font-modak leading-[.9] text-[#C2783B] country-label" style={{ WebkitTextStroke: "1.5px white", fontFamily: "var(--font-modak), serif" }}>
            Perfect Patty
          </p>
          <div className="w-[25vw] rounded-[1vw] overflow-hidden h-[17vw] shadow-2xl border-[3px] border-white relative bg-black">
            <Image src="/images/tikki.webp" alt="Patty Layer" fill className="h-full w-full object-cover" />
          </div>
          <p className="text40 w-[25vw] text-black uppercase font-mouse-memoirs leading-[1.1] text-left">
            Grilled to perfection juicy, smoky, unforgettable.
          </p>
        </div>

        {/* Layer 5: Artisan Bun */}
        <div className="absolute right-[8vw] space-y-[1.5vw] z-200 top-[160vw] items-start flex flex-col">
          <p className="rotate-6 text-right uppercase text-stroke-small text40 font-modak leading-[.9] text-[#C29F52] country-label" style={{ WebkitTextStroke: "1.5px white", fontFamily: "var(--font-modak), serif" }}>
            Artisan Bun
          </p>
          <div className="w-[25vw] rounded-[1vw] overflow-hidden h-[17vw] shadow-2xl border-[3px] border-white relative bg-black">
            <Image src="/images/bun.webp" alt="Bun Layer" fill className="h-full w-full object-cover" />
          </div>
          <p className="text40 w-[25vw] text-black uppercase font-mouse-memoirs leading-[1.1] text-left">
            Soft, toasted buns crafted to hold everything together.
          </p>
        </div>

      </section>

      <CtaSection />
      <Footer />
    </div>
  );
}

// ── CTA Section ──
function CtaSection() {
  return (
    <section className="cta-section" id="cta-desktop">
      {/* Wave at the top of the CTA section transitioning from the mustard section */}
      <svg className="cta-wave" viewBox="0 0 1440 200" preserveAspectRatio="none">
        <path fill="var(--mustard)" d="M0,0 C 400,150 1000,200 1440,50 L1440,0 L0,0 Z" />
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
