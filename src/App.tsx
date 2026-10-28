import { useState, useEffect, useRef } from "react"
import profileImg from "./assets/profile.jpg"
import certLevel3Pdf from "./assets/cert-level3.pdf"
import certLevel4Pdf from "./assets/cert-level4.pdf"
import certLevel5Pdf from "./assets/cert-level5.pdf"
import certGreenwichPdf from "./assets/cert-greenwich.pdf"
import certLevel3Img from "./assets/cert-level3-1.jpg"
import certLevel4Img from "./assets/cert-level4-1.jpg"
import certLevel5Img from "./assets/cert-level5-1.jpg"
import certGreenwichImg from "./assets/cert-greenwich-1.jpg"
import udemy1Pdf from "./assets/udemy-1.pdf"
import udemy2Pdf from "./assets/udemy-2.pdf"
import udemy3Pdf from "./assets/udemy-3.pdf"
import udemy1Img from "./assets/udemy-1-1.jpg"
import udemy2Img from "./assets/udemy-2-1.jpg"
import udemy3Img from "./assets/udemy-3-1.jpg"

const UDEMY_CERTS = [
  {
    title: 'Ethical Hacking: Password Cracking with Python',
    date: 'June 16, 2022',
    instructor: 'Peter A',
    img: udemy1Img,
    pdf: udemy1Pdf,
  },
  {
    title: 'Machine Learning A-Z™ Masterclass',
    date: 'July 20, 2021',
    instructor: 'Utsav Soi · Gargi Singh · Tejasvi Soi',
    img: udemy2Img,
    pdf: udemy2Pdf,
  },
  {
    title: 'Create AI Voice Assistant (JARVIS) With Python',
    date: 'June 22, 2021',
    instructor: 'Himanshu Gour',
    img: udemy3Img,
    pdf: udemy3Pdf,
  },
]

const NAV_LINKS = ["about", "projects", "education", "contact"]

const PROJECTS = [
  {
    id: "01",
    name: "Home Appliance System",
    tech: ["C#", "MySQL", ".NET"],
    desc: "Desktop application for managing home appliances with user authentication, device control, and data visualization.",
    tag: "Desktop",
    link: "https://github.com/BusyBuzzy/HomeApplianceSystem",
  },
  {
    id: "02",
    name: "E-Commerce Shop",
    tech: ["PHP", "phpMyAdmin", "Firebase", "Kotlin"],
    desc: "Full-stack e-commerce platform with real-time inventory management, user authentication, and admin dashboard.",
    tag: "Full Stack",
    link: "https://github.com/BusyBuzzy/Uni_project",
  },
  {
    id: "03",
    name: "M-Hiking",
    tech: ["Kotlin", "Android-Studio"],
    desc: "Mobile app for hikers with maps, trail tracking, and social sharing features.",
    tag: "Mobile",
    link: "https://github.com/BusyBuzzy/M-hike-android-studio",
  },
  {
    id: "04",
    name: "Cyber_Corner online store Website",
    tech: ["PHP", "MySQL", "phpMyAdmin"],
    desc: "Desktop project management application with role-based access control, reporting, and database integration.",
    tag: "Web",
    link: "https://github.com/BusyBuzzy/Cyber_corner_Website",
  },
  {
    id: "05",
    name: "Portfolio Website",
    tech: ["Figma", "Typescript", "React", "Vite"],
    desc: "Personal portfolio website to showcase projects and skills.",
    tag: "Web",
    link: "https://github.com/BusyBuzzy/Wayne_portfolio",
  },
  {
    id: "06",
    name: "University Forum Website",
    tech: ["PHP", "Javascript", "phpMyAdmin", "MySQL"],
    desc: "Web forum for university students to discuss topics, share resources, and collaborate on projects.",
    tag: "Web",
    link: "https://github.com/BusyBuzzy/University_Forum_Website",
  },
]

const EDUCATION = [
  {
    year: "2026",
    degree: "BSc Computing Science — First Class Honours",
    institution: "University of Greenwich, KMD College",
    location: "London, UK",
    note: "Top graduate distinction",
    icon: "🎓",
    certImg: certGreenwichImg,
    certPdf: certGreenwichPdf,
    certLabel: "Degree Certificate",
  },
  {
    year: "2024",
    degree: "NCC Education Level 5",
    institution: "KBTC SCHOOL OF IT",
    location: "Yangon, Myanmar",
    note: "Advanced Diploma",
    icon: "📘",
    certImg: certLevel5Img,
    certPdf: certLevel5Pdf,
    certLabel: "Level 5 Certificate",
  },
  {
    year: "2023",
    degree: "NCC Education Level 4",
    institution: "KBTC SCHOOL OF IT",
    location: "Yangon, Myanmar",
    note: "Higher National Diploma",
    icon: "📗",
    certImg: certLevel4Img,
    certPdf: certLevel4Pdf,
    certLabel: "Level 4 Certificate",
  },
  {
    year: "2022",
    degree: "NCC Education Level 3",
    institution: "KBTC SCHOOL OF IT",
    location: "Yangon, Myanmar",
    note: "Foundation Diploma",
    icon: "📕",
    certImg: certLevel3Img,
    certPdf: certLevel3Pdf,
    certLabel: "Level 3 Certificate",
  },
]

const SKILLS = [
  "C#",
  "PHP",
  "phpMyAdmin",
  "MySQL",
  "Java",
  "Kotlin",
  "Flutter",
  "Android Studio",
  "Figma",
  "AI Tools",
]

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

function useScrollSpy() {
  const [active, setActive] = useState("")
  useEffect(() => {
    const handler = () => {
      const sections = NAV_LINKS.map((id) => document.getElementById(id))
      for (const section of [...sections].reverse()) {
        if (section && window.scrollY >= section.offsetTop - 120) {
          setActive(section.id)
          return
        }
      }
      setActive("")
    }
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])
  return active
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const activeSection = useScrollSpy()
  const [heroVisible, setHeroVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [certModal, setCertModal] = useState<{
    img: string
    pdf: string
    label: string
  } | null>(null)

  useEffect(() => {
    const t = setTimeout(() => setHeroVisible(true), 120)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const copyEmail = () => {
    navigator.clipboard.writeText("waiyanhtun@gmail.com")
    setCopiedEmail(true)
    setTimeout(() => setCopiedEmail(false), 2000)
  }

  return (
    <div
      style={{
        background: "#080810",
        color: "#eeeaf4",
        fontFamily: "'Inter', sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* ─── NAV ─── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: scrollY > 40 ? "rgba(8,8,16,0.92)" : "transparent",
          backdropFilter: scrollY > 40 ? "blur(16px)" : "none",
          borderBottom:
            scrollY > 40
              ? "1px solid rgba(255,255,255,0.06)"
              : "1px solid transparent",
          transition: "all 0.4s ease",
        }}
      >
        <nav
          style={{
            maxWidth: 1140,
            margin: "0 auto",
            padding: "0 28px",
            height: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 800,
              fontSize: 15,
              letterSpacing: "-0.02em",
            }}
          >
            <span style={{ color: "#a78bfa" }}>W</span>
            <span style={{ color: "#eeeaf4" }}>YH</span>
            <span style={{ color: "rgba(255,255,255,0.25)" }}>.dev</span>
          </span>

          <div
            style={{ display: "flex", gap: 36, alignItems: "center" }}
            className="nav-desktop"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link}`}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color:
                    activeSection === link
                      ? "#a78bfa"
                      : "rgba(238,234,244,0.45)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                  position: "relative",
                }}
              >
                {activeSection === link && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: -4,
                      left: 0,
                      right: 0,
                      height: 1,
                      background: "#a78bfa",
                    }}
                  />
                )}
                {link}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
              color: "#fff",
              padding: "8px 20px",
              borderRadius: 4,
              textDecoration: "none",
              boxShadow: "0 0 20px rgba(167,139,250,0.3)",
              transition: "box-shadow 0.3s",
            }}
            className="nav-desktop"
          >
            Hire Me
          </a>

          <button
            onClick={() => setMenuOpen((v) => !v)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#eeeaf4",
              padding: 6,
            }}
            className="nav-mobile"
            aria-label="Menu"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {menuOpen ? (
                <>
                  <line
                    x1="4"
                    y1="4"
                    x2="18"
                    y2="18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="18"
                    y1="4"
                    x2="4"
                    y2="18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </>
              ) : (
                <>
                  <line
                    x1="3"
                    y1="7"
                    x2="19"
                    y2="7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <line
                    x1="3"
                    y1="15"
                    x2="19"
                    y2="15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </>
              )}
            </svg>
          </button>
        </nav>

        {menuOpen && (
          <div
            style={{
              background: "#0d0d1a",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              padding: "8px 28px 20px",
            }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link}`}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 0",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 13,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  color:
                    activeSection === link
                      ? "#a78bfa"
                      : "rgba(238,234,244,0.5)",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {link}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ─── HERO ─── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "110px 28px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow orbs */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            right: "8%",
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            left: "0%",
            width: 320,
            height: 320,
            background:
              "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            maxWidth: 1140,
            margin: "0 auto",
            width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: "clamp(40px, 6vw, 100px)",
            alignItems: "center",
            position: "relative",
            zIndex: 1,
          }}
          className="hero-grid"
        >
          {/* Left — text */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(167,139,250,0.08)",
                border: "1px solid rgba(167,139,250,0.2)",
                borderRadius: 100,
                padding: "6px 16px",
                marginBottom: 36,
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(16px)",
                transition: "all 0.7s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#22c55e",
                  flexShrink: 0,
                  animation: "glow-pulse 2s infinite",
                }}
              />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  color: "#a78bfa",
                }}
              >
                Open to opportunities · Bangkok, Thailand
              </span>
            </div>

            <div
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(24px)",
                transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s",
              }}
            >
              <h1
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "clamp(40px, 7.5vw, 88px)",
                  fontWeight: 800,
                  lineHeight: 0.95,
                  letterSpacing: "-0.04em",
                  marginBottom: 0,
                }}
              >
                <span style={{ display: "block", color: "#eeeaf4" }}>
                  Wai Yan
                </span>
                <span
                  style={{
                    display: "block",
                    background:
                      "linear-gradient(135deg, #a78bfa 0%, #7c3aed 50%, #c084fc 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Htun
                </span>
              </h1>
            </div>

            <div
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginTop: 22,
                  marginBottom: 28,
                  flexWrap: "wrap",
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "clamp(13px, 2vw, 18px)",
                    color: "#a78bfa",
                    fontWeight: 600,
                    letterSpacing: "-0.01em",
                  }}
                >
                  Software Developer
                </span>
                <span
                  style={{
                    width: 1,
                    height: 18,
                    background: "rgba(255,255,255,0.15)",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    color: "rgba(238,234,244,0.35)",
                    letterSpacing: "0.03em",
                  }}
                >
                  BSc Computing Science · First Class Honours · 2026
                </span>
              </div>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.85,
                  color: "rgba(238,234,244,0.52)",
                  maxWidth: 480,
                  marginBottom: 44,
                }}
              >
                Fresh graduate software developer passionate about building
                clean, scalable applications — from Android apps to web
                platforms and AI-powered tools.
              </p>

              <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                <a
                  href="#projects"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                    color: "#fff",
                    padding: "13px 28px",
                    textDecoration: "none",
                    borderRadius: 4,
                    boxShadow: "0 4px 24px rgba(124,58,237,0.4)",
                  }}
                >
                  View Work
                </a>
                <a
                  href="#contact"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    border: "1px solid rgba(167,139,250,0.25)",
                    color: "rgba(238,234,244,0.7)",
                    padding: "13px 28px",
                    textDecoration: "none",
                    borderRadius: 4,
                  }}
                >
                  Contact Me
                </a>
              </div>
            </div>
          </div>

          {/* Right — profile photo */}
          <div
            style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible
                ? "translateY(0) scale(1)"
                : "translateY(20px) scale(0.96)",
              transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.3s",
              flexShrink: 0,
            }}
            className="hero-photo-wrap"
          >
            {/* Outer glow ring */}
            <div
              style={{
                position: "relative",
                width: "clamp(220px, 28vw, 360px)",
                height: "clamp(280px, 36vw, 460px)",
              }}
            >
              {/* Animated border ring */}
              <div
                style={{
                  position: "absolute",
                  inset: -3,
                  borderRadius: 20,
                  background:
                    "linear-gradient(135deg, #7c3aed, #a78bfa, #7c3aed)",
                  backgroundSize: "200% 200%",
                  animation: "spin-gradient 4s linear infinite",
                  zIndex: 0,
                }}
              />
              {/* Inner clip */}
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: "100%",
                  height: "100%",
                  borderRadius: 18,
                  overflow: "hidden",
                  background: "#1a1020",
                }}
              >
                <img
                  src={profileImg}
                  alt="Wai Yan Htun — Software Developer"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top",
                    display: "block",
                    filter: "contrast(1.04) brightness(1.02)",
                  }}
                />
                {/* Subtle bottom gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "35%",
                    background:
                      "linear-gradient(to top, rgba(8,8,16,0.6) 0%, transparent 100%)",
                  }}
                />
              </div>
              {/* Glow behind photo */}
              <div
                style={{
                  position: "absolute",
                  inset: -20,
                  zIndex: -1,
                  borderRadius: 30,
                  background:
                    "radial-gradient(ellipse at center, rgba(124,58,237,0.35) 0%, transparent 70%)",
                  filter: "blur(20px)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section
        id="about"
        style={{
          padding: "100px 28px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <FadeIn>
            <SectionLabel index="01" label="About" />
          </FadeIn>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 64,
              marginTop: 56,
            }}
          >
            <FadeIn delay={0.1}>
              <h2
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "clamp(26px, 3.5vw, 38px)",
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: "-0.03em",
                  marginBottom: 24,
                }}
              >
                Building software
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg,#a78bfa,#7c3aed)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  that makes an impact.
                </span>
              </h2>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.85,
                  color: "rgba(238,234,244,0.55)",
                  marginBottom: 16,
                }}
              >
                I am a Software Developer and a recent Computing Science 
                graduate from the University of Greenwich, having achieved 
                First-Class Honors. My academic journey began in Myanmar 
                through NCC Education, where I progressed from Level 3 to Level 5 
                before completing my degree at the University of Greenwich. 
                This educational foundation has equipped me with a strong understanding
                 of computing principles and a passion for developing innovative 
                 software solutions.
              </p>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.85,
                  color: "rgba(238,234,244,0.55)",
                }}
              >
                Now I'm in Bangkok, I build mobile apps, web platforms, and
                AI-integrated tools — always looking for my next challenge.
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#a78bfa",
                  marginBottom: 24,
                }}
              >
                Skills & Tools
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {SKILLS.map((skill, i) => (
                  <SkillBadge key={skill} skill={skill} delay={i * 0.05} />
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── PROJECTS ─── */}
      <section
        id="projects"
        style={{
          padding: "100px 28px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <FadeIn>
            <SectionLabel index="02" label="Projects" />
            <p
              style={{
                fontSize: 15,
                color: "rgba(238,234,244,0.4)",
                marginTop: 12,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
              }}
            >
              A selection of projects built during studies and personal time.
            </p>
          </FadeIn>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: 20,
              marginTop: 52,
            }}
          >
            {PROJECTS.map((project, i) => (
              <FadeIn key={project.id} delay={i * 0.08}>
                <ProjectCard project={project} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── EDUCATION ─── */}
      <section
        id="education"
        style={{
          padding: "100px 28px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <FadeIn>
            <SectionLabel index="03" label="Education" />
          </FadeIn>
          <div style={{ marginTop: 56 }}>
            {EDUCATION.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <EducationRow
                  item={item}
                  isLast={i === EDUCATION.length - 1}
                  onViewCert={() =>
                    setCertModal({
                      img: item.certImg,
                      pdf: item.certPdf,
                      label: item.certLabel,
                    })
                  }
                />
              </FadeIn>
            ))}

          {/* ─── UDEMY CERTS ─── */}
          <FadeIn delay={0.1}>
            <div style={{ marginTop: 48, paddingTop: 40, borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(167,139,250,0.4)', letterSpacing: '0.1em' }}>—</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#a78bfa', fontWeight: 600 }}>
                  Online Certifications
                </span>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  padding: '2px 8px', borderRadius: 100,
                  border: '1px solid rgba(167,139,250,0.2)', color: 'rgba(167,139,250,0.6)',
                }}>Udemy</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
                {UDEMY_CERTS.map((cert, i) => (
                  <FadeIn key={i} delay={i * 0.08}>
                    <UdemyCertCard cert={cert} onView={() => setCertModal({ img: cert.img, pdf: cert.pdf, label: cert.title })} />
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section
        id="contact"
        style={{
          padding: "100px 28px 120px",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            textAlign: "center",
            position: "relative",
          }}
        >
          <FadeIn>
            <SectionLabel index="04" label="Contact" centered />
            <h2
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "clamp(30px, 5vw, 58px)",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
                marginTop: 48,
                marginBottom: 18,
              }}
            >
              Let's build something
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg,#a78bfa,#7c3aed)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                great together.
              </span>
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "rgba(238,234,244,0.45)",
                marginBottom: 52,
                lineHeight: 1.8,
              }}
            >
              Actively seeking full-time software developer roles.
              <br />
              Based in Bangkok — open to remote and relocation.
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 12,
                flexWrap: "wrap",
                marginBottom: 64,
              }}
            >
              <button
                onClick={copyEmail}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  background: copiedEmail
                    ? "#22c55e"
                    : "linear-gradient(135deg, #7c3aed, #a78bfa)",
                  color: "#fff",
                  border: "none",
                  padding: "13px 28px",
                  borderRadius: 4,
                  cursor: "pointer",
                  boxShadow: copiedEmail
                    ? "0 4px 20px rgba(34,197,94,0.4)"
                    : "0 4px 24px rgba(124,58,237,0.4)",
                  transition: "all 0.3s",
                }}
              >
                {copiedEmail ? "✓ Email Copied!" : "Copy Email Address"}
              </button>
              <a
                href="https://www.linkedin.com/in/wai-yan-htun-512556235/"
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  border: "1px solid rgba(167,139,250,0.25)",
                  color: "rgba(238,234,244,0.6)",
                  padding: "13px 28px",
                  textDecoration: "none",
                  borderRadius: 4,
                  transition: "border-color 0.2s",
                }}
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/BusyBuzzy"
                target="_blank"
                rel="noreferrer"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  border: "1px solid rgba(167,139,250,0.25)",
                  color: "rgba(238,234,244,0.6)",
                  padding: "13px 28px",
                  textDecoration: "none",
                  borderRadius: 4,
                  transition: "border-color 0.2s",
                }}
              >
                GitHub
              </a>
            </div>

            <div
              style={{
                borderTop: "1px solid rgba(255,255,255,0.06)",
                paddingTop: 28,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: "rgba(238,234,244,0.2)",
                }}
              >
                Wai Yan Htun · Software Developer
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: "rgba(238,234,244,0.15)",
                }}
              >
                Bangkok, Thailand
              </span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── CERTIFICATE MODAL ─── */}
      {certModal && (
        <div
          onClick={() => setCertModal(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            background: "rgba(0,0,0,0.92)",
            backdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "24px 16px",
            overflowY: "auto",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 640,
              background: "#111118",
              border: "1px solid rgba(167,139,250,0.25)",
              borderRadius: 10,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              flexShrink: 0,
              boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "13px 18px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                background: "#0d0d16",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: "#a78bfa",
                  letterSpacing: "0.08em",
                }}
              >
                {certModal.label}
              </span>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <a
                  href={certModal.pdf}
                  download
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    border: "1px solid rgba(167,139,250,0.35)",
                    borderRadius: 4,
                    color: "#a78bfa",
                    padding: "5px 12px",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  ↓ Download PDF
                </a>
                <button
                  onClick={() => setCertModal(null)}
                  style={{
                    background: "rgba(255,255,255,0.07)",
                    border: "none",
                    borderRadius: 4,
                    color: "#eeeaf4",
                    cursor: "pointer",
                    width: 28,
                    height: 28,
                    fontSize: 18,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            </div>

            {/* A4 image — white background to match paper */}
            <div style={{ background: "#e8e8e8", padding: 16 }}>
              <div
                style={{
                  background: "#ffffff",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                  lineHeight: 0,
                }}
              >
                <img
                  src={certModal.img}
                  alt={certModal.label}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes glow-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #22c55e; }
          50% { opacity: 0.5; box-shadow: 0 0 2px #22c55e; }
        }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .nav-desktop { display: flex; }
        .nav-mobile { display: none; }
        .hero-grid { grid-template-columns: 1fr auto; }
        @media (max-width: 780px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: block !important; }
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-photo-wrap { display: flex; justify-content: center; order: -1; }
          .hero-photo-wrap > div { width: 180px !important; height: 230px !important; }
        }
        a:hover { opacity: 0.85; }
        button:hover { opacity: 0.9; }
      `}</style>
    </div>
  )
}

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  const { ref, visible } = useInView()
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  )
}

function SectionLabel({
  index,
  label,
  centered,
}: {
  index: string
  label: string
  centered?: boolean
}) {
  return (
    <div
      style={{
        textAlign: centered ? "center" : "left",
        display: "flex",
        alignItems: "center",
        gap: 12,
        justifyContent: centered ? "center" : "flex-start",
      }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: "rgba(167,139,250,0.4)",
          letterSpacing: "0.1em",
        }}
      >
        {index}
      </span>
      <span
        style={{ width: 32, height: 1, background: "rgba(167,139,250,0.3)" }}
      />
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#a78bfa",
          fontWeight: 600,
        }}
      >
        {label}
      </span>
    </div>
  )
}

function SkillBadge({ skill, delay }: { skill: string; delay: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        letterSpacing: "0.06em",
        padding: "6px 12px",
        border: hovered
          ? "1px solid rgba(167,139,250,0.6)"
          : "1px solid rgba(255,255,255,0.07)",
        color: hovered ? "#a78bfa" : "rgba(238,234,244,0.55)",
        background: hovered
          ? "rgba(167,139,250,0.08)"
          : "rgba(255,255,255,0.03)",
        borderRadius: 4,
        cursor: "default",
        transition: "all 0.2s ease",
        userSelect: "none",
      }}
    >
      {skill}
    </span>
  )
}

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? "rgba(167,139,250,0.06)"
          : "rgba(255,255,255,0.025)",
        border: hovered
          ? "1px solid rgba(167,139,250,0.3)"
          : "1px solid rgba(255,255,255,0.06)",
        borderRadius: 8,
        padding: "28px 24px",
        cursor: "pointer",
        transition: "all 0.3s ease",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        boxShadow: hovered ? "0 8px 40px rgba(124,58,237,0.15)" : "none",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        height: "100%",
        textDecoration: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: "rgba(238,234,244,0.2)",
            letterSpacing: "0.08em",
          }}
        >
          {project.id}
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "3px 9px",
            border: "1px solid rgba(167,139,250,0.25)",
            borderRadius: 100,
            color: "#a78bfa",
          }}
        >
          {project.tag}
        </span>
      </div>
      <h3
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          color: hovered ? "#a78bfa" : "#eeeaf4",
          transition: "color 0.2s",
        }}
      >
        {project.name}
      </h3>
      <p
        style={{
          fontSize: 13,
          lineHeight: 1.7,
          color: "rgba(238,234,244,0.45)",
          flexGrow: 1,
        }}
      >
        {project.desc}
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
        {project.tech.map((t) => (
          <span
            key={t}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: "0.04em",
              color: "rgba(238,234,244,0.4)",
              background: "rgba(255,255,255,0.04)",
              padding: "3px 8px",
              borderRadius: 3,
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {t}
          </span>
        ))}
      </div>
      {/* Arrow indicator */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginTop: 4,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: hovered ? "#a78bfa" : "rgba(238,234,244,0.2)",
          transition: "color 0.2s",
        }}
      >
        View Project
        <span
          style={{
            transform: hovered ? "translateX(4px)" : "translateX(0)",
            transition: "transform 0.2s",
            display: "inline-block",
          }}
        >
          →
        </span>
      </div>
    </a>
  )
}

function EducationRow({
  item,
  isLast,
  onViewCert,
}: {
  item: typeof EDUCATION[0]
  isLast: boolean
  onViewCert: () => void
}) {
  const [hovered, setHovered] = useState(false)
  const [btnHovered, setBtnHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "grid",
        gridTemplateColumns: "90px 1fr",
        gap: 28,
        padding: "28px 20px",
        marginBottom: 4,
        borderBottom: isLast ? "none" : "1px solid rgba(255,255,255,0.05)",
        borderRadius: 6,
        background: hovered ? "rgba(167,139,250,0.04)" : "transparent",
        transition: "background 0.25s",
        alignItems: "start",
      }}
    >
      <div>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            color: "#a78bfa",
            fontWeight: 700,
          }}
        >
          {item.year}
        </span>
      </div>
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 6,
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: 18 }}>{item.icon}</span>
          <h3
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: "-0.01em",
              color: "#eeeaf4",
            }}
          >
            {item.degree}
          </h3>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#a78bfa",
              border: "1px solid rgba(167,139,250,0.35)",
              borderRadius: 100,
              padding: "2px 8px",
            }}
          >
            {item.note}
          </span>
        </div>
        <p
          style={{
            fontSize: 13,
            color: "rgba(238,234,244,0.4)",
            marginLeft: 28,
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: "0.02em",
            marginBottom: 14,
          }}
        >
          {item.institution} · {item.location}
        </p>
        <button
          onClick={onViewCert}
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            marginLeft: 28,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            background: btnHovered ? "rgba(167,139,250,0.12)" : "transparent",
            border: "1px solid rgba(167,139,250,0.3)",
            color: "#a78bfa",
            padding: "6px 14px",
            borderRadius: 4,
            cursor: "pointer",
            transition: "background 0.2s",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span>📄</span> View Certificate
        </button>
      </div>
    </div>
  )
}

function UdemyCertCard({ cert, onView }: { cert: typeof UDEMY_CERTS[0]; onView: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(167,139,250,0.05)' : 'rgba(255,255,255,0.02)',
        border: hovered ? '1px solid rgba(167,139,250,0.25)' : '1px solid rgba(255,255,255,0.06)',
        borderRadius: 8,
        padding: '18px 20px',
        transition: 'all 0.25s ease',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}
    >
      {/* Udemy badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{
          background: '#a435f0',
          borderRadius: 3, padding: '2px 8px',
          fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
          fontWeight: 700, color: '#fff', letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>
          Udemy
        </div>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(238,234,244,0.3)', letterSpacing: '0.04em' }}>
          {cert.date}
        </span>
      </div>

      <h4 style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 13, fontWeight: 600,
        letterSpacing: '-0.01em', lineHeight: 1.4,
        color: hovered ? '#a78bfa' : '#eeeaf4',
        transition: 'color 0.2s',
        margin: 0,
      }}>
        {cert.title}
      </h4>

      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(238,234,244,0.35)', letterSpacing: '0.02em', margin: 0 }}>
        {cert.instructor}
      </p>

      <button
        onClick={onView}
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10, fontWeight: 600,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          background: 'transparent',
          border: '1px solid rgba(167,139,250,0.3)',
          color: '#a78bfa', padding: '5px 12px',
          borderRadius: 4, cursor: 'pointer',
          alignSelf: 'flex-start',
          display: 'inline-flex', alignItems: 'center', gap: 5,
          transition: 'background 0.2s',
          marginTop: 2,
        }}
      >
        📄 View Certificate
      </button>
    </div>
  )
}
