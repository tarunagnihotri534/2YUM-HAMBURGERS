"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { AnimatedCursor } from "@/components/AnimatedCursor";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";
import { Preloader } from "@/components/Preloader";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// ── Image paths (clean names) ──────────────────────
const IMG = {
  burgerHero:   "/images/burgerHero.png",      // removebg – HERO overlay
  cheesyBurger: "/images/cheesyBurger.png",   // black bg, pacman eyes
  burgerHands:  "/images/burgerHands.png",     // cartoon hands burger
  burgerH:      "/images/burgerH.png",         // woman holding burger
  burgerham:    "/images/burgerham.png",
  burgerwithhands: "/images/4kcheeseburger.png",
  cheesyBurgerImg: "/images/cheesyBurger.webp",
  about1:       "/images/about1.png",          // diner photo
  about2:       "/images/about2.png",          // burger on board
  about3:       "/images/about-3.webp",        // 3rd about image
  lettuce:      "/images/lettuce.png",
  tomato:       "/images/tomato.png",
  cheese:       "/images/cheese.png",
  meat:         "/images/meat.png",
};


// ── Hero ──────────────────────────────────────────
function Hero() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations
      gsap.from(".hero-row-top", {
        yPercent: 110, opacity: 0, duration: 1.1, ease: "power4.out", delay: 0.05,
      });
      gsap.from(".hero-crav-text", {
        yPercent: 80, opacity: 0, duration: 1.2, ease: "power4.out", delay: 0.32,
      });
      gsap.from(".hero-burger-img-wrap", {
        y: 100, opacity: 0, duration: 1.5, ease: "power4.out", delay: 0.1,
      });
      gsap.from([".badge-smashed", ".badge-bold"], {
        scale: 0, opacity: 0, stagger: 0.18, duration: 1, ease: "back.out(2.5)", delay: 0.75,
      });
      gsap.from(".hero-caption", {
        y: 30, opacity: 0, stagger: 0.15, duration: 0.9, ease: "power3.out", delay: 0.9,
      });

      // Float burger continuously
      gsap.to(".hero-burger-img-wrap", {
        y: -22, repeat: -1, yoyo: true, duration: 2.8, ease: "power1.inOut",
      });

      // Parallax on scroll
      gsap.to(".hero-text-layer", {
        yPercent: -18,
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 1.2 },
      });
      gsap.to(".hero-burger-img-wrap", {
        yPercent: -8,
        scrollTrigger: { trigger: ref.current, start: "top top", end: "bottom top", scrub: 0.7 },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="hero">

      {/* ── Text background layer (THE BURGER + CRAV) ── */}
      <div className="hero-text-layer">
        <h1 className="hero-text-row" style={{ overflow: "hidden" }}>
          <span className="hero-row-top">THE BURGER</span>
        </h1>
        <p className="hero-crav-row" style={{ overflow: "hidden" }}>
          <span className="hero-crav-text">2YUM</span>
        </p>
      </div>

      {/* ── Burger image – centred, overlaps both rows ── */}
      <div className="hero-burger-img-wrap">
        <Image
          src="/images/hamburgerrr.png"
          alt="2YUM Signature Smash Burger"
          width={1000}
          height={1000}
          priority
          style={{ width: "100%", height: "auto", objectFit: "contain" }}
        />
      </div>

      {/* ── Sticker badges ── */}
      <div className="badge-smashed">SMASHED<br />FRESH</div>
      <div className="badge-bold">BOLD<br />FLAVOR</div>

      {/* ── Bottom captions ── */}
      <div className="hero-captions">
        <p className="hero-caption">
          Smashed hot on the flat top, our prime patties lock in ultimate juiciness under a caramelized crust.
        </p>
        <p className="hero-caption hero-caption-right">
          Topped with melted cheddar and our signature chili honey glaze crafted to satisfy your cravings since 1997.
        </p>
      </div>
    </section>
  );
}

// ── Marquee ───────────────────────────────────────
function Marquee() {
  const items = ["SMASHED", "FRESH", "CREAMY", "BOLD", "2YUM", "SMASHED", "FRESH", "CREAMY", "BOLD", "2YUM"];
  return (
    <section className="marquee-wrap">
      <div className="marquee-track">
        {[0, 1].map((i) => (
          <p key={i} className="marquee-text">
            {items.map((w, j) => (
              <span key={j}>
                {w} <span className="marquee-dot">•</span>{" "}
              </span>
            ))}
          </p>
        ))}
      </div>
    </section>
  );
}

// ── About Section (Page 2) ────────────────────────
function AboutSection() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-content > *", {
        y: 40, opacity: 0, stagger: 0.1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
      gsap.from(".about-img-wrap", {
        y: 60, opacity: 0, stagger: 0.15, duration: 1, ease: "back.out(1.5)",
        scrollTrigger: { trigger: ".about-images", start: "top 80%" },
      });
      gsap.from(".about-blob-btn", {
        scale: 0, opacity: 0, duration: 1, ease: "elastic.out(1, 0.5)",
        scrollTrigger: { trigger: ".about-blob-btn", start: "top 85%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="about" className="about-section">
      <div className="about-content">
        <p className="about-eyebrow">TOP CLASSIC</p>
        <h2 className="about-headline">
          JUICY CHEESY<br />FULLY LOADED
        </h2>
        <p className="about-desc">
          2YUM is back and bolder than ever. Honoring our rich roots, we bring you the ultimate smashed experience fully loaded, hot, and crafted fresh.
        </p>
      </div>

      <div className="about-btn-wrap">
        <a href="/menu" className="about-blob-btn" data-cursor-hide="true">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="-10 -10 602 475" preserveAspectRatio="none" className="about-blob-svg">
            <path stroke="#ffffff" strokeWidth="10" fill="#F91914" d="M310.777 0.20434C424.154 2.91791 540.733 50.9739 574.176 159.34C606.479 264.014 533.962 365.999 442.064 425.623C364.995 475.626 270.863 455.893 193.524 406.309C93.8313 342.395 -27.3608 259.503 5.48889 145.729C40.0621 25.9857 186.179 -2.77783 310.777 0.20434Z" />
          </svg>
          <span className="about-blob-text">Order Now</span>
        </a>
      </div>

      <div className="about-images-container">
        <div className="about-sticker">
          <Image src={IMG.burgerHands} alt="Burger Sticker" width={300} height={300} style={{ width: "100%", height: "auto" }} />
        </div>
        <div className="about-images">
          <div className="about-img-wrap img-left">
            <Image src={IMG.about1} alt="Chef" width={1000} height={1000} />
          </div>
          <div className="about-img-wrap img-center">
            <Image src={IMG.about2} alt="Cheese" width={1000} height={1000} />
          </div>
          <div className="about-img-wrap img-right">
            <Image src={IMG.about3} alt="Atmosphere" width={1000} height={1000} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Experience Section ────────────────────────────
function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".exp-headline", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
      gsap.from(".exp-main-burger-wrap", {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 60%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="experience-section">
      <div className="experience-wave">
        <div className="wave-loop">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path fill="var(--red)" d="M0,60 C320,120 420,0 740,60 C1060,120 1120,0 1440,60 L1440,120 L0,120 Z" />
          </svg>
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path fill="var(--red)" d="M0,60 C320,120 420,0 740,60 C1060,120 1120,0 1440,60 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </div>
      <div className="experience-content">
        <div className="exp-text-wrap">
          <p className="exp-eyebrow">EXPERIENCE</p>
          <h2 className="exp-headline">
            FOOD THAT<br />FEELS GOOD
          </h2>
        </div>
        
        <div className="exp-main-burger-wrap">
          <Image src={IMG.burgerwithhands} alt="Burger With Hands" width={1000} height={1000} style={{ width: "100%", height: "auto" }} />
          
          <div className="exp-info-left">
            450 KCAL<br />
            HIGH PROTEIN<br />
            FRESH INGREDIENTS
          </div>
          
          <div className="exp-info-right">
            100% ORGANIC<br />
            ZERO GUILT<br />
            TRUE TASTE
          </div>

          <div className="exp-bold-sticker">
            BOLD<br />FLAVOUR
          </div>
        </div>
      </div>
      <div className="experience-wave-bottom">
        <div className="wave-loop">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path fill="var(--red)" d="M0,60 C320,120 420,0 740,60 C1060,120 1120,0 1440,60 L1440,120 L0,120 Z" />
          </svg>
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path fill="var(--red)" d="M0,60 C320,120 420,0 740,60 C1060,120 1120,0 1440,60 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </div>
    </section>
  );
}

// ── Cheesy Burger Photo Section ─────────────────────
function CheesyBurgerSection() {
  return (
    <section className="cheesy-photo-section">
      <Image src={IMG.cheesyBurgerImg} alt="Cheesy Burger" fill style={{ objectFit: "cover" }} />
    </section>
  );
}

// ── Ingredients Section ───────────────────────────
function IngredientsSection() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ing-headline", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%" },
      });
      // Floating animations
      gsap.to(".ing-float-1", { y: -30, rotation: 10, repeat: -1, yoyo: true, duration: 4, ease: "sine.inOut" });
      gsap.to(".ing-float-2", { y: 40, rotation: -15, repeat: -1, yoyo: true, duration: 5, ease: "sine.inOut" });
      gsap.to(".ing-float-3", { y: -25, rotation: 5, repeat: -1, yoyo: true, duration: 4.5, ease: "sine.inOut" });
      gsap.to(".ing-float-4", { y: 35, rotation: -5, repeat: -1, yoyo: true, duration: 5.5, ease: "sine.inOut" });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="ingredients-section-new">
      <div className="ing-wave-top">
        <div className="wave-loop">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path fill="var(--cream)" d="M0,60 C320,120 420,0 740,60 C1060,120 1120,0 1440,60 L1440,120 L0,120 Z" />
          </svg>
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path fill="var(--cream)" d="M0,60 C320,120 420,0 740,60 C1060,120 1120,0 1440,60 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </div>

      <div className="ing-content-new">
        <div className="ing-text-wrap-new">
          <p className="ing-eyebrow-new">PURE QUALITY</p>
          <h2 className="ing-headline">
            EVERY LAYER<br />
            PACKED WITH<br />
            SIGNATURE<br />
            FLAVOR
          </h2>
        </div>
        
        {/* Floating ingredients */}
        <div className="ing-float ing-float-1" style={{ top: "12%", left: "12%" }}>
          <Image src="/images/lettuce.webp" alt="Lettuce" width={300} height={300} style={{ width: "20vw", height: "auto" }} />
        </div>
        <div className="ing-float ing-float-2" style={{ top: "35%", right: "12%" }}>
          <Image src="/images/tomato.webp" alt="Tomato" width={300} height={300} style={{ width: "16vw", height: "auto" }} />
        </div>
        <div className="ing-float ing-float-3" style={{ top: "60%", left: "15%" }}>
          <Image src="/images/cheese.webp" alt="Cheese" width={300} height={300} style={{ width: "22vw", height: "auto" }} />
        </div>
        <div className="ing-float ing-float-4" style={{ bottom: "10%", right: "20%" }}>
          <Image src="/images/meat.webp" alt="Meat" width={300} height={300} style={{ width: "22vw", height: "auto" }} />
        </div>
      </div>

      <div className="ing-wave-bottom">
        <div className="wave-loop">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path fill="var(--cream)" d="M0,60 C320,120 420,0 740,60 C1060,120 1120,0 1440,60 L1440,120 L0,120 Z" />
          </svg>
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path fill="var(--cream)" d="M0,60 C320,120 420,0 740,60 C1060,120 1120,0 1440,60 L1440,120 L0,120 Z" />
          </svg>
        </div>
      </div>
    </section>
  );
}

// ── Map Section ───────────────────────────────────
function MapSection() {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".map-content > *", {
        y: 60,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: { trigger: ref.current, start: "top 78%" },
      });

      // Airplane Flight Animation
      gsap.to(".flight-airplane-wrapper", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 60%",
          end: "bottom 20%",
          scrub: 1.5,
        },
        motionPath: {
          path: "#flight-path",
          align: "#flight-path",
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
        },
        ease: "none",
      });

      // Playful floating bobbing motion for the plane itself
      gsap.to(".flight-airplane", {
        y: -15,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "sine.inOut"
      });

    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="map-section" id="map-desktop">
      <div className="map-content">
        <div className="map-sticker-takeaway">TAKE AWAY</div>
        <h2 className="map-headline">
          QUALITY THAT<br />
          TRAVELS WITH YOU
        </h2>
        <p className="map-desc">
          Freshly packed smash burgers, ready to go wherever you<br/>
          crave. From our flat-top to any corner of the globe, we<br/>
          ensure every layer stays hot and juicy.
        </p>
      </div>

      {/* Flight Path SVG */}
      <div className="flight-path-container">
        <svg className="flight-svg" viewBox="0 0 1000 1630" preserveAspectRatio="none">
          <path
            id="flight-path"
            d="M 900, 300 C 600, 400 200, 500 100, 700 C 0, 900 500, 950 900, 1050 C 1100, 1150 600, 1400 200, 1500"
            fill="none"
            stroke="#e6a835"
            strokeWidth="6"
            strokeDasharray="20 20"
            strokeLinecap="round"
          />
        </svg>
        <div className="flight-airplane-wrapper">
          <div className="flight-airplane">
            <Image src="/images/uda.png" alt="Aeroplane" width={300} height={300} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
        </div>
      </div>

      {/* Floating Photos */}
      <div className="map-photo-wrap map-photo-2">
        <p className="map-photo-label map-label-mumbai">MUMBAI</p>
        <div className="map-photo-img-wrap">
          <Image src="/images/burger2.webp" alt="Mumbai" width={400} height={400} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>

      <div className="map-photo-wrap map-photo-1">
        <p className="map-photo-label">LUCKNOW</p>
        <div className="map-photo-img-wrap">
          <Image src="/images/berlin.webp" alt="Lucknow" width={400} height={400} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>

      <div className="map-photo-wrap map-photo-3">
        <p className="map-photo-label map-label-delhi">DELHI</p>
        <div className="map-photo-img-wrap">
          <Image src="/images/delhi.jpg" alt="Delhi" width={400} height={400} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>

      <div className="map-photo-wrap map-photo-4">
        <p className="map-photo-label map-label-kolkata">KOLKATA</p>
        <div className="map-photo-img-wrap">
          <Image src="/images/kolkata.jpg" alt="Kolkata" width={400} height={400} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>
    </section>
  );
}

// ── CTA Section ───────────────────────────────────
function CtaSection() {
  return (
    <section className="cta-section" id="cta-desktop">
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
          <button className="cta-btn">ORDER NOW</button>
        </div>

        <div className="cta-sticker-graphic">
          <Image src="/images/sticker.png" alt="Sticker Graphic" width={500} height={500} style={{ width: "100%", height: "auto", objectFit: "contain" }} />
        </div>
        
        <div className="cta-image-wrapper">
          <Image src="/images/cta.webp" alt="Feel the change" fill style={{ objectFit: 'cover' }} />
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────
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
      { threshold: 0.3 } // Triggers when 30% of footer is visible
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
          <a href="#">HOME</a>
          <a href="#">BURGERS</a>
          <a href="#">SPICES</a>
          <a href="#">CONTACT</a>
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
            <Image src="/images/cheese.png" alt="Cheese" width={200} height={200} style={{ width: "100%", height: "auto", objectFit: "contain" }} />
          </div>
        </div>
        <div className="footer-floating footer-tomato">
          <div className={`pop-inner ${isVisible ? 'pop-up-2' : 'pop-hidden'}`}>
            <Image src="/images/tomato.png" alt="Tomato" width={200} height={200} style={{ width: "100%", height: "auto", objectFit: "contain" }} />
          </div>
        </div>
        <div className="footer-floating footer-meat">
          <div className={`pop-inner ${isVisible ? 'pop-up-3' : 'pop-hidden'}`}>
            <Image src="/images/meat.png" alt="Meat" width={300} height={300} style={{ width: "100%", height: "auto", objectFit: "contain" }} />
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Root Page ─────────────────────────────────────
export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  useEffect(() => {
    // Lock scroll during preloader
    if (!preloaderDone) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [preloaderDone]);

  return (
    <main>
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}
      <SmoothScroll />
      <AnimatedCursor />
      <div className="grain-overlay" />
      <Navbar />
      <Hero />
      <Marquee />
      <AboutSection />
      <ExperienceSection />
      <CheesyBurgerSection />
      <IngredientsSection />
      <MapSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
