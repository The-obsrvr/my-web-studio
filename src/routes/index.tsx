import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import portraitImg from "../assets/portrait.jpg";
import project01 from "../assets/project-01.jpg";
import project02 from "../assets/project-02.jpg";
import project03 from "../assets/project-03.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { property: "og:image", content: "/og-image.jpg" },
      { name: "twitter:image", content: "/og-image.jpg" },
    ],
  }),
});

type Section = { id: string; label: string };

const SECTIONS: Section[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Works" },
  { id: "writing", label: "Notes" },
  { id: "contact", label: "Contact" },
];

type Project = {
  id: string;
  title: string;
  tag: string;
  year: string;
  image: string;
  detail: string;
};

const PROJECTS: Project[] = [
  {
    id: "aether-glass",
    title: "Aether Glass",
    tag: "Brand Identity / 3D",
    year: "2024",
    image: project01,
    detail:
      "A structural identity system for an architectural glass studio. Built around a modular grid derived from mullion spacing.",
  },
  {
    id: "chronos-labs",
    title: "Chronos Labs",
    tag: "Product Design",
    year: "2023",
    image: project02,
    detail:
      "Interface and interaction language for a precision engineering platform. Focused on tactile controls and legible telemetry.",
  },
  {
    id: "lumen-os",
    title: "Lumen OS",
    tag: "UI Interface",
    year: "2023",
    image: project03,
    detail:
      "An operating system shell exploring atmospheric interactivity — ambient color, soft depth, and typographic anchoring.",
  },
];

const NOTES = [
  { date: "NOV 2023", title: "The Typographic Grid as an Anchor", read: "04 MIN READ" },
  { date: "SEP 2023", title: "Atmospheric Interactivity", read: "08 MIN READ" },
  { date: "JUN 2023", title: "Why Minimalism is a Lie", read: "12 MIN READ" },
];

function Index() {
  const activeId = useScrollSpy(SECTIONS.map((s) => s.id));
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-accent selection:text-background">
      <Header activeId={activeId} scrolled={scrolled} />

      <main>
        <Hero />
        <About />
        <Projects />
        <Writing />
      </main>

      <Contact />
    </div>
  );
}

function Header({ activeId, scrolled }: { activeId: string; scrolled: boolean }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-border bg-background/80 backdrop-blur-md" : "border-transparent"
      }`}
      aria-label="Primary"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-mono text-xs tracking-widest uppercase">V.34</span>
        <div className="flex gap-4 sm:gap-8 text-[11px] uppercase tracking-[0.2em] font-medium">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => handleClick(e, s.id)}
              className={`transition-colors ${
                activeId === s.id ? "text-accent" : "text-foreground hover:text-accent"
              }`}
              aria-current={activeId === s.id ? "true" : undefined}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 max-w-6xl mx-auto"
    >
      <div className="space-y-6">
        <p className="font-mono text-xs text-accent uppercase tracking-widest animate-reveal [animation-delay:100ms]">
          Independent Designer &amp; Director
        </p>
        <h1 className="text-6xl md:text-8xl font-display italic leading-[0.9] text-balance animate-reveal [animation-delay:200ms]">
          Elias Thorne
        </h1>
        <p className="max-w-md text-lg text-muted-foreground text-pretty animate-reveal [animation-delay:300ms]">
          Crafting digital artifacts and structural identities for the next generation of
          creative tools.
        </p>
        <div className="pt-8 animate-reveal [animation-delay:400ms]">
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
              history.replaceState(null, "", "#projects");
            }}
            className="inline-block px-8 py-3 border border-foreground hover:bg-foreground hover:text-background transition-all duration-300 text-sm uppercase tracking-widest"
          >
            View Selected Works
          </a>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <Reveal>
      <section id="about" className="py-32 px-6 max-w-6xl mx-auto border-t border-border">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="relative">
            <img
              src={portraitImg}
              alt="Portrait of Elias Thorne in the studio"
              width={1080}
              height={1440}
              loading="lazy"
              className="w-full aspect-[3/4] object-cover grayscale outline outline-1 -outline-offset-1 outline-foreground/5"
            />
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl font-display italic">The Philosophy</h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed text-pretty">
              <p>
                I believe in the friction of the physical world brought to digital
                interfaces. My work balances at the intersection of Swiss typography and
                cinematic atmosphere.
              </p>
              <p>
                Previously at Kinetic and OMNI, now focusing on bespoke interactions for
                creators and engineers who care about the tactile nature of software.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

function Projects() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <Reveal>
      <section id="projects" className="py-32 px-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-4xl font-display italic">Selected Works</h2>
          <span className="font-mono text-[10px] uppercase tracking-widest opacity-40">
            [ 2021 — 2024 ]
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((p) => {
            const open = openId === p.id;
            return (
              <div key={p.id} className="group relative space-y-4">
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : p.id)}
                  aria-expanded={open}
                  aria-controls={`${p.id}-detail`}
                  className="block w-full text-left cursor-pointer"
                >
                  <div className="aspect-square overflow-hidden ring-1 ring-foreground/5">
                    <img
                      src={p.image}
                      alt={p.title}
                      width={1024}
                      height={1024}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex justify-between items-start mt-4">
                    <div>
                      <h3 className="text-sm uppercase tracking-widest">{p.title}</h3>
                      <p className="text-xs text-muted-foreground">{p.tag}</p>
                    </div>
                    <span
                      className={`text-accent font-mono text-[10px] transition-opacity ${
                        open ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      {open ? "− Close" : "→ View Case"}
                    </span>
                  </div>
                </button>
                <div
                  id={`${p.id}-detail`}
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out ${
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-sm text-muted-foreground leading-relaxed pt-2">
                      {p.detail}
                    </p>
                    <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-accent">
                      {p.year}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </Reveal>
  );
}

function Writing() {
  return (
    <Reveal>
      <section id="writing" className="py-32 px-6 max-w-6xl mx-auto border-t border-border">
        <h2 className="text-4xl font-display italic mb-16">Field Notes</h2>
        <div className="divide-y divide-border">
          {NOTES.map((n) => (
            <a
              key={n.title}
              href="#"
              className="group flex flex-col md:flex-row md:items-center justify-between py-8 md:hover:px-4 transition-all duration-300"
            >
              <span className="font-mono text-[10px] text-muted-foreground mb-2 md:mb-0 md:w-24">
                {n.date}
              </span>
              <h3 className="text-xl md:text-2xl flex-1 md:px-8 group-hover:text-accent transition-colors">
                {n.title}
              </h3>
              <span className="text-xs uppercase tracking-widest opacity-40 md:w-32 md:text-right">
                {n.read}
              </span>
            </a>
          ))}
        </div>
      </section>
    </Reveal>
  );
}

function Contact() {
  return (
    <footer
      id="contact"
      className="py-32 px-6 border-t border-border bg-foreground text-background"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
        <div className="space-y-8">
          <h2 className="text-5xl font-display italic">Let's speak.</h2>
          <p className="text-background/60">
            Available for strategic collaborations starting Q3 2024.
          </p>
          <a
            href="mailto:hello@eliasthorne.com"
            className="text-2xl underline decoration-accent underline-offset-8 block break-all"
          >
            hello@eliasthorne.com
          </a>
        </div>
        <div className="flex flex-col gap-4 justify-end items-start md:items-end">
          <div className="flex gap-8 font-mono text-xs uppercase tracking-widest">
            <a href="#" className="hover:text-accent transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Read.cv
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Instagram
            </a>
          </div>
          <p className="font-mono text-[10px] text-background/40 mt-12">
            © 2024 ELIAS THORNE STUDIO. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------ utilities ------------------------------ */

function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 800ms cubic-bezier(0.32,0.72,0,1), transform 800ms cubic-bezier(0.32,0.72,0,1)",
      }}
    >
      {children}
    </div>
  );
}

function useScrollSpy(ids: string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (elements.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the largest intersection ratio currently visible.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      {
        rootMargin: "-40% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);

  return active;
}
