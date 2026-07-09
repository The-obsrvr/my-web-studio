import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import portraitImg from "../assets/portrait.jpg";
import heroBg from "../assets/hero-bg.jpg";
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
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "research", label: "Research" },
  { id: "skills", label: "Skills" },
  { id: "news", label: "News" },
  { id: "contact", label: "Contact" },
];

/* -------------------- CONTENT (customize freely) -------------------- */

const PROFILE = {
  fullName: "Your Full Name",
  title: "PhD Candidate in Computer Science · Data Scientist",
  tagline:
    "Identifying stances of argumentative opinions in political discourse.",
  email: "you@example.com",
  linkedin: "https://www.linkedin.com/in/your-handle",
  github: "https://github.com/your-handle",
  scholar: "https://scholar.google.com/citations?user=your-id",
  orcid: "https://orcid.org/0000-0000-0000-0000",
};

const SHORT_BIO =
  "I am a data scientist and PhD candidate in Computer Science working at the intersection of natural language processing and computational social science. My research focuses on identifying the stances of argumentative opinions in political discourse — building models that make public debate more legible.";

const PHILOSOPHY = [
  "I believe good research and good engineering share the same discipline: state the question precisely, respect the evidence, and prefer transparent methods over clever ones.",
  "In practice, that means building models people can interrogate, documenting the assumptions, and treating language data as the human artefact it is.",
];

type Experience = {
  title: string;
  place: string;
  duration: string;
  logo?: string;
  supervisor?: string;
  link?: string;
  tasks: string[];
};

const EXPERIENCES: Experience[] = [
  {
    title: "PhD Researcher",
    place: "Your University — Department of Computer Science",
    duration: "2023 — Present",
    supervisor: "Prof. Supervisor Name",
    link: "#",
    tasks: [
      "Designing stance-detection models for political argumentation.",
      "Curating and annotating multilingual debate corpora.",
      "Publishing at NLP and computational social science venues.",
      "Supervising MSc thesis students on adjacent topics.",
    ],
  },
  {
    title: "Data Scientist",
    place: "Company Name — City",
    duration: "2021 — 2023",
    tasks: [
      "Built production NLP pipelines for text classification at scale.",
      "Owned experimentation framework and A/B evaluation.",
      "Partnered with product to translate research into features.",
    ],
  },
  {
    title: "Research Assistant",
    place: "Research Lab — City",
    duration: "2020 — 2021",
    tasks: [
      "Contributed to argument mining and discourse analysis projects.",
      "Co-authored two peer-reviewed workshop papers.",
    ],
  },
];

const OTHER_EXPERIENCE =
  "Additional freelance consulting on ML systems, teaching assistant roles in machine learning and statistics, and short industry placements in analytics and data engineering.";

type Project = {
  id: string;
  title: string;
  image: string;
  summary: string;
  duration: string;
  features: string[];
  scope: string;
  repo?: string;
};

const PROJECTS: Project[] = [
  {
    id: "stance-detector",
    title: "Political Stance Detector",
    image: project01,
    summary:
      "Transformer-based classifier that identifies the stance of argumentative statements toward contested political claims.",
    duration: "6 months · 2024",
    features: [
      "Multilingual fine-tuning on parliamentary debates",
      "Calibrated confidence scoring",
      "Explanation via attention rationales",
    ],
    scope: "Research prototype, released as an open-source Python package.",
    repo: "https://github.com/your-handle/stance-detector",
  },
  {
    id: "argument-graph",
    title: "Argument Graph Explorer",
    image: project02,
    summary:
      "Interactive tool that reconstructs argument graphs from long-form political texts and lets researchers explore them.",
    duration: "4 months · 2023",
    features: [
      "Claim / premise extraction pipeline",
      "Force-directed graph interface",
      "Export to JSON-LD for downstream analysis",
    ],
    scope: "Full-stack: Python backend, React frontend, dockerised deployment.",
    repo: "https://github.com/your-handle/argument-graph",
  },
  {
    id: "debate-corpus",
    title: "Debate Corpus Toolkit",
    image: project03,
    summary:
      "Reusable pipeline for scraping, aligning and annotating parliamentary debate transcripts across languages.",
    duration: "3 months · 2023",
    features: [
      "Scrapers for 5 national parliaments",
      "Speaker & party metadata linking",
      "Annotation schema for stance and argumentative role",
    ],
    scope: "Data engineering + annotation tooling. Used in two publications.",
    repo: "https://github.com/your-handle/debate-corpus",
  },
];

type Research = {
  title: string;
  authors: string;
  venue: string;
  year: string;
  summary: string;
  link?: string;
};

const RESEARCH: Research[] = [
  {
    title: "Stance Identification in Political Argumentation: A Contrastive Approach",
    authors: "Your Name, Co-author, Supervisor",
    venue: "ACL Workshop on Argument Mining",
    year: "2024",
    summary:
      "Introduces a contrastive fine-tuning objective for stance detection that improves cross-topic generalisation.",
    link: "#",
  },
  {
    title: "Cross-lingual Transfer for Argument Component Detection",
    authors: "Your Name, Co-author",
    venue: "EMNLP Findings",
    year: "2023",
    summary:
      "Evaluates multilingual encoders for argument mining across five European parliaments.",
    link: "#",
  },
  {
    title: "A Corpus of Annotated Parliamentary Debates",
    authors: "Your Name et al.",
    venue: "LREC",
    year: "2022",
    summary:
      "Presents a publicly released, richly annotated corpus of political debates with stance and rhetorical role labels.",
    link: "#",
  },
];

const EDUCATION: Array<{
  degree: string;
  place: string;
  year: string;
  courses?: string[];
  notes?: string;
}> = [
  {
    degree: "PhD, Computer Science (in progress)",
    place: "Your University",
    year: "2023 —",
    notes: "Thesis: Identifying stances of argumentative opinions in political discourse.",
  },
  {
    degree: "MSc, Data Science / AI",
    place: "Your University",
    year: "2021",
    courses: ["Machine Learning", "NLP", "Statistical Inference", "Deep Learning"],
  },
  {
    degree: "BSc, Computer Science",
    place: "Your University",
    year: "2019",
    courses: ["Algorithms", "Databases", "Linear Algebra", "Software Engineering"],
  },
];


const TECH_SKILLS = [
  "Python", "PyTorch", "Hugging Face", "scikit-learn", "R",
  "NLP / LLMs", "Argument mining", "SQL", "Docker", "Git",
  "TypeScript / React", "LaTeX",
];

const SOFT_SKILLS = [
  "Research communication", "Mentoring", "Cross-disciplinary collaboration",
  "Teaching", "Scientific writing", "Public speaking",
];

const VOLUNTEER = [
  "Reviewer, ACL / EMNLP workshops (2023 — )",
  "Co-organiser, local NLP reading group",
  "STEM outreach volunteer with high-school students",
];

const NEWS = [
  {
    date: "MAY 2026",
    title: "Invited talk on stance detection at [Venue].",
  },
  {
    date: "MAR 2026",
    title: "Paper accepted at the ACL Argument Mining workshop.",
  },
  {
    date: "JAN 2026",
    title: "Released v0.2 of the Debate Corpus Toolkit.",
  },
];

/* ----------------------------- COMPONENT ----------------------------- */

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
        <Experience />
        <Projects />
        <Research />
        <Skills />
        <News />
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
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-border bg-background/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
      aria-label="Primary"
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-6">
        <span className="font-mono text-xs tracking-widest uppercase shrink-0">
          {PROFILE.fullName.split(" ").map((w) => w[0]).join("")}.
        </span>
        <div className="flex gap-3 sm:gap-6 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-medium overflow-x-auto no-scrollbar">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => handleClick(e, s.id)}
              className={`whitespace-nowrap transition-colors ${
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
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Customizable background image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          width={1920}
          height={1280}
          className="w-full h-full object-cover opacity-40"
        />
        {/* Fade behind top navbar */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background via-background/80 to-transparent" />
        {/* Soft vignette for legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-6 py-32 grid md:grid-cols-[auto_1fr] gap-10 md:gap-14 items-center">
        <div className="animate-reveal [animation-delay:100ms]">
          <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden ring-1 ring-foreground/20 shadow-2xl">
            <img
              src={portraitImg}
              alt={`Portrait of ${PROFILE.fullName}`}
              width={512}
              height={512}
              className="w-full h-full object-cover grayscale"
            />
          </div>
        </div>

        <div className="space-y-6">
          <p className="font-mono text-xs text-accent uppercase tracking-widest animate-reveal [animation-delay:150ms]">
            {PROFILE.title}
          </p>
          <h1 className="text-5xl md:text-7xl font-display italic leading-[0.95] text-balance animate-reveal [animation-delay:250ms]">
            {PROFILE.fullName}
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground text-pretty animate-reveal [animation-delay:350ms]">
            {PROFILE.tagline}
          </p>
          <div className="pt-4 flex flex-wrap gap-4 animate-reveal [animation-delay:450ms]">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                history.replaceState(null, "", "#projects");
              }}
              className="inline-block px-6 py-3 border border-foreground hover:bg-foreground hover:text-background transition-all duration-300 text-xs uppercase tracking-widest"
            >
              View Projects
            </a>
            <a
              href="#research"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("research")?.scrollIntoView({ behavior: "smooth" });
                history.replaceState(null, "", "#research");
              }}
              className="inline-block px-6 py-3 border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-all duration-300 text-xs uppercase tracking-widest"
            >
              Research
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <Reveal>
      <SectionDivider index="01" label="About" />
      <section id="about" className="pt-16 pb-32 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-16 items-start">
          <div>
            <h2 className="text-4xl font-display italic mb-6">About</h2>
            <p className="font-mono text-[10px] uppercase tracking-widest text-accent">
              Short Bio
            </p>
          </div>
          <div className="space-y-10">
            <p className="text-lg leading-relaxed text-pretty">{SHORT_BIO}</p>
            <div>
              <h3 className="text-2xl font-display italic mb-4">My Philosophy</h3>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed text-pretty">
                {PHILOSOPHY.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}

function SectionDivider({ index, label }: { index: string; label: string }) {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="flex items-center gap-6 pt-10 border-t border-foreground/25">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
          {index}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          {label}
        </span>
        <span className="flex-1 h-px bg-border" />
      </div>
    </div>
  );
}

function SectionHeader({
  eyebrow, title, link, linkLabel,
}: { eyebrow?: string; title: string; link?: string; linkLabel?: string }) {
  return (
    <div className="flex flex-wrap justify-between items-end gap-4 mb-12">
      <div>
        {eyebrow && (
          <p className="font-mono text-[10px] uppercase tracking-widest text-accent mb-2">
            {eyebrow}
          </p>
        )}
        <h2 className="text-4xl font-display italic">{title}</h2>
      </div>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className="text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors"
        >
          {linkLabel} ↗
        </a>
      )}
    </div>
  );
}

function Experience() {
  return (
    <Reveal>
      <SectionDivider index="02" label="Experience" />
      <section id="experience" className="pt-16 pb-32 px-6 max-w-6xl mx-auto">
        <SectionHeader
          title="Experience"
          link={PROFILE.linkedin}
          linkLabel="LinkedIn"
        />
        <div className="divide-y divide-border">
          {EXPERIENCES.map((e) => (
            <article key={e.title + e.place} className="py-8 grid md:grid-cols-[200px_1fr] gap-6">
              <div className="space-y-1">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {e.duration}
                </p>
                {e.supervisor && (
                  <p className="text-xs text-muted-foreground">Supervisor: {e.supervisor}</p>
                )}
                {e.link && (
                  <a href={e.link} className="text-xs text-accent hover:underline" target="_blank" rel="noreferrer">
                    Link ↗
                  </a>
                )}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  {e.logo && (
                    <img src={e.logo} alt="" width={32} height={32} className="w-8 h-8 rounded-sm object-cover" />
                  )}
                  <h3 className="text-xl">{e.title}</h3>
                </div>
                <p className="text-muted-foreground mb-4">{e.place}</p>
                <ul className="space-y-1.5 text-sm text-muted-foreground list-disc pl-5">
                  {e.tasks.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-10 text-sm text-muted-foreground italic">
          Beyond the above: {OTHER_EXPERIENCE}
        </p>
      </section>
    </Reveal>
  );
}

function Projects() {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <Reveal>
      <section id="projects" className="py-32 px-6 max-w-6xl mx-auto border-t border-border">
        <SectionHeader
          title="Projects"
          link={PROFILE.github}
          linkLabel="GitHub"
        />
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
                      <p className="text-xs text-muted-foreground">{p.duration}</p>
                    </div>
                    <span className="text-accent font-mono text-[10px]">
                      {open ? "− Close" : "→ Details"}
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
                    <div className="pt-2 space-y-3 text-sm text-muted-foreground leading-relaxed">
                      <p>{p.summary}</p>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-accent mb-1">
                          Key features
                        </p>
                        <ul className="list-disc pl-5 space-y-0.5">
                          {p.features.map((f) => <li key={f}>{f}</li>)}
                        </ul>
                      </div>
                      <p>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-accent">Scope: </span>
                        {p.scope}
                      </p>
                      {p.repo && (
                        <a href={p.repo} target="_blank" rel="noreferrer" className="text-accent hover:underline text-xs uppercase tracking-widest">
                          Repository ↗
                        </a>
                      )}
                    </div>
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

function Research() {
  return (
    <Reveal>
      <section id="research" className="py-32 px-6 max-w-6xl mx-auto border-t border-border">
        <SectionHeader title="Research" />
        <div className="flex flex-wrap gap-6 mb-10 -mt-6">
          <a href={PROFILE.scholar} target="_blank" rel="noreferrer" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors">
            Google Scholar ↗
          </a>
          <a href={PROFILE.orcid} target="_blank" rel="noreferrer" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-accent transition-colors">
            ORCID ↗
          </a>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {RESEARCH.map((r) => (
            <article key={r.title} className="border border-border p-6 hover:border-accent/60 transition-colors">
              <p className="font-mono text-[10px] uppercase tracking-widest text-accent mb-2">
                {r.venue} · {r.year}
              </p>
              <h3 className="text-lg mb-2 leading-snug">{r.title}</h3>
              <p className="text-xs text-muted-foreground mb-3 italic">{r.authors}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.summary}</p>
              {r.link && (
                <a href={r.link} target="_blank" rel="noreferrer" className="mt-4 inline-block text-accent hover:underline text-xs uppercase tracking-widest">
                  Read ↗
                </a>
              )}
            </article>
          ))}
        </div>
      </section>
    </Reveal>
  );
}

function Skills() {
  return (
    <Reveal>
      <section id="skills" className="py-32 px-6 max-w-6xl mx-auto border-t border-border">
        <SectionHeader title="Skills & Qualifications" />
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          <SkillBlock title="Education">
            <ul className="space-y-5">
              {EDUCATION.map((e) => (
                <li key={e.degree} className="space-y-1">
                  <p className="text-base font-medium">{e.degree}</p>
                  <p className="text-xs text-muted-foreground">{e.place} · {e.year}</p>
                  {e.notes && (
                    <p className="text-sm text-muted-foreground italic pt-1">{e.notes}</p>
                  )}
                  {e.courses && e.courses.length > 0 && (
                    <p className="text-xs text-muted-foreground pt-1">
                      <span className="font-mono uppercase tracking-widest text-[10px] text-accent mr-2">Key courses</span>
                      {e.courses.join(" · ")}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </SkillBlock>
          <SkillBlock title="Technical Skills">
            <div className="flex flex-wrap gap-2">
              {TECH_SKILLS.map((s) => (
                <span key={s} className="px-3 py-1 border border-border text-xs">{s}</span>
              ))}
            </div>
          </SkillBlock>
          <SkillBlock title="Soft Skills">
            <div className="flex flex-wrap gap-2">
              {SOFT_SKILLS.map((s) => (
                <span key={s} className="px-3 py-1 border border-border text-xs">{s}</span>
              ))}
            </div>
          </SkillBlock>
          <SkillBlock title="Volunteer Work">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
              {VOLUNTEER.map((v) => <li key={v}>{v}</li>)}
            </ul>
          </SkillBlock>
        </div>
      </section>
    </Reveal>
  );
}

function SkillBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-display text-2xl italic mb-5 pb-2 border-b border-border">
        {title}
      </h3>
      {children}
    </div>
  );
}


function News() {
  return (
    <Reveal>
      <section id="news" className="py-32 px-6 max-w-6xl mx-auto border-t border-border">
        <SectionHeader title="News" eyebrow="Talks · Dissemination · Achievements" />
        <div className="divide-y divide-border">
          {NEWS.map((n) => (
            <div key={n.title} className="py-6 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
              <span className="font-mono text-[10px] text-muted-foreground md:w-24 uppercase tracking-widest">
                {n.date}
              </span>
              <p className="text-lg flex-1">{n.title}</p>
            </div>
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
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="space-y-8">
          <h2 className="text-5xl font-display italic">Get in touch.</h2>
          <p className="text-background/70 max-w-md">
            Open to research collaborations, guest lectures, reviewing invitations, and conversations about NLP for political discourse.
          </p>
          <div className="space-y-2">
            <p className="text-2xl">{PROFILE.fullName}</p>
            <a
              href={`mailto:${PROFILE.email}`}
              className="text-xl underline decoration-accent underline-offset-8 block break-all"
            >
              {PROFILE.email}
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-6 items-start">
          <div className="flex flex-wrap gap-6 font-mono text-xs uppercase tracking-widest">
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">LinkedIn</a>
            <a href={PROFILE.github} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">GitHub</a>
            <a href={PROFILE.scholar} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">Scholar</a>
            <a href={PROFILE.orcid} target="_blank" rel="noreferrer" className="hover:text-accent transition-colors">ORCID</a>
          </div>
          <p className="font-mono text-[10px] text-background/40 mt-8">
            © {new Date().getFullYear()} {PROFILE.fullName.toUpperCase()}. ALL RIGHTS RESERVED.
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
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);
  return active;
}
