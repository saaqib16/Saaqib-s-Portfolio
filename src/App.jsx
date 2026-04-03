import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
} from "framer-motion";
import { useEffect, useState } from "react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const heroRoles = [
  "software engineer",
  "frontend developer",
  "AI-focused builder",
];

const spotlightCards = [
  {
    title: "Product-driven UI",
    description:
      "I like interfaces that feel clear, calm, and memorable instead of generic.",
  },
  {
    title: "AI-backed experimentation",
    description:
      "My projects combine web engineering with predictive models and research thinking.",
  },
  {
    title: "Mentorship mindset",
    description:
      "Teaching web and Python has made me sharper at breaking ideas into reliable systems.",
  },
];

const statCards = [
  { value: "3", label: "Featured builds" },
  { value: "2", label: "Teaching roles" },
  { value: "8.5", label: "Current GPA" },
];

const skillGroups = [
  {
    title: "Frontend",
    items: ["React", "JavaScript", "Tailwind CSS", "Responsive UI"],
  },
  {
    title: "Programming",
    items: ["Python", "Java", "C", "Problem solving"],
  },
  {
    title: "AI and data",
    items: ["TensorFlow", "Scikit-learn", "Pandas", "LSTM models"],
  },
  {
    title: "Workflow",
    items: ["Git", "GitHub", "Agile", "SDLC"],
  },
  {
    title: "Delivery",
    items: ["System thinking", "Research", "Performance", "Testing mindset"],
  },
  {
    title: "People skills",
    items: ["Mentoring", "Communication", "Interviews", "Leadership"],
  },
];

const projects = [
  {
    title: "MindWellCare",
    summary:
      "A mental healthcare platform designed around scalable workflows and stronger patient adherence.",
    points: [
      "Built for structured patient engagement and follow-up.",
      "Focused on secure flows and research-backed product thinking.",
      "Balanced technical execution with usability for real users.",
    ],
    stack: ["Python", "HTML", "CSS", "JavaScript"],
  },
  {
    title: "MedAdh",
    summary:
      "An AI-based medical adherence prediction system using sequence modeling to improve health outcomes.",
    points: [
      "Used an LSTM model for adherence prediction.",
      "Improved resource efficiency alongside model accuracy.",
      "Showcased how machine learning can support healthcare decisions.",
    ],
    stack: ["Python", "LSTM", "Machine Learning"],
  },
  {
    title: "CommuneVerse",
    summary:
      "An AI-powered networking assistant focused on better professional conversations and interaction design.",
    points: [
      "Used Node.js to power interactive social workflows.",
      "Explored conversational logic for professional networking.",
      "Combined interface design with AI-assisted interaction.",
    ],
    stack: ["Python", "Node.js", "HTML", "CSS", "JavaScript"],
  },
];

const experienceItems = [
  {
    title: "Web Development Tutor",
    place: "Go Girl Organisation",
    time: "Apr 2025 - Present",
    description:
      "Conduct frontend training sessions, mentor students, evaluate performance, and support onboarding in a structured technical learning environment.",
  },
  {
    title: "Front-End Developer Trainee",
    place: "Eagle Tech IT Solutions",
    time: "May 2024 - Jun 2024",
    description:
      "Built responsive web pages using HTML, CSS, and JavaScript while gaining hands-on exposure to Git, GitHub, SDLC, and delivery practices.",
  },
  {
    title: "Python Instructor",
    place: "Cybeorg Education Technology",
    time: "Sep 2024 - Present",
    description:
      "Delivered Python training, assessments, mock interviews, and guided students through problem solving and communication fundamentals.",
  },
];

const contactLinks = [
  {
    label: "GitHub",
    value: "github.com/devsaaqib",
    href: "https://github.com/devsaaqib",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/saaqib-veltech",
    href: "https://www.linkedin.com/in/saaqib-veltech/",
  },
  {
    label: "Resume",
    value: "Download PDF",
    href: "/Saaqib_Resume.pdf",
  },
];

const contactEmail = "dev.saaqib17@gmail.com";

const revealProps = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }

    const savedTheme = window.localStorage.getItem("portfolio-theme");

    if (savedTheme) {
      return savedTheme === "dark";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    subject: "Let us build something impactful",
    message: "",
  });

  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.18,
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    window.localStorage.setItem("portfolio-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setRoleIndex((currentIndex) => (currentIndex + 1) % heroRoles.length);
    }, 2800);

    return () => window.clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (!copied) {
      return undefined;
    }

    const timerId = window.setTimeout(() => setCopied(false), 1800);

    return () => window.clearTimeout(timerId);
  }, [copied]);

  const handleFormChange = ({ target }) => {
    const { name, value } = target;
    setContactForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const buildMailtoLink = () => {
    const subject = contactForm.subject.trim() || "Portfolio enquiry";
    const greeting = contactForm.name.trim()
      ? `Hi Saaqib,\n\nMy name is ${contactForm.name.trim()}.`
      : "Hi Saaqib,";
    const message = contactForm.message.trim()
      ? `${greeting}\n\n${contactForm.message.trim()}\n\nBest regards,`
      : `${greeting}\n\nI would love to connect about a project, internship, or collaboration.\n\nBest regards,`;

    return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
  };

  const handleMailDraft = (event) => {
    event.preventDefault();
    window.location.href = buildMailtoLink();
  };

  const handleCopyEmail = async () => {
    if (!navigator.clipboard) {
      return;
    }

    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const closeMenu = () => setMenuOpen(false);
  const mailtoLink = buildMailtoLink();

  return (
    <div className="relative min-h-screen overflow-hidden text-slate-900 transition-colors duration-500 dark:text-slate-100">
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[70] h-1 origin-left bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500"
        style={{ scaleX: progressScaleX }}
      />

      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.2),_transparent_26%),radial-gradient(circle_at_85%_12%,_rgba(255,255,255,0.9),_transparent_18%),linear-gradient(135deg,_#f5fbff_0%,_#edf4ff_38%,_#f8fbff_100%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(14,165,233,0.18),_transparent_24%),radial-gradient(circle_at_85%_12%,_rgba(99,102,241,0.16),_transparent_18%),linear-gradient(135deg,_#020617_0%,_#0f172a_42%,_#111827_100%)]" />
        <motion.div
          animate={{ x: [0, 42, 0], y: [0, -28, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-16 top-24 h-80 w-80 rounded-full bg-cyan-300/30 blur-3xl dark:bg-cyan-500/18"
        />
        <motion.div
          animate={{ x: [0, -34, 0], y: [0, 30, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-0 top-20 h-72 w-72 rounded-full bg-sky-300/25 blur-3xl dark:bg-indigo-500/18"
        />
        <motion.div
          animate={{ x: [0, 26, 0], y: [0, 36, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-white/60 blur-3xl dark:bg-white/5"
        />
        <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.75)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.75)_1px,transparent_1px)] [background-size:120px_120px] [mask-image:radial-gradient(circle_at_center,_black_20%,_transparent_70%)] dark:opacity-10" />
      </div>

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8"
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full border px-4 py-3 transition-all duration-300 sm:px-6 ${
            scrolled
              ? "glass-panel shadow-2xl shadow-slate-900/10 dark:shadow-black/30"
              : "border-white/60 bg-white/55 backdrop-blur-md dark:border-white/10 dark:bg-slate-900/35"
          }`}
        >
          <a
            href="#hero"
            className="font-display text-lg font-bold tracking-tight text-slate-950 dark:text-white"
          >
            Saaqib A
          </a>

          <div className="hidden items-center gap-6 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-slate-600 transition hover:text-sky-600 dark:text-slate-300 dark:hover:text-sky-300"
              >
                {item.label}
              </a>
            ))}

            <button
              type="button"
              onClick={() => setDarkMode((current) => !current)}
              className="secondary-button px-4 py-2 text-sm"
            >
              {darkMode ? "Light view" : "Dark view"}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            className="secondary-button px-4 py-2 text-sm md:hidden"
            aria-label="Toggle navigation menu"
          >
            Menu
          </button>
        </div>

        {menuOpen && (
          <div className="mx-auto mt-3 max-w-7xl rounded-[1.75rem] border border-white/60 bg-white/80 p-5 shadow-2xl shadow-slate-900/10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/80 dark:shadow-black/30 md:hidden">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="text-sm font-medium text-slate-700 transition hover:text-sky-600 dark:text-slate-200 dark:hover:text-sky-300"
                >
                  {item.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setDarkMode((current) => !current);
                  closeMenu();
                }}
                className="secondary-button justify-center px-4 py-2 text-sm"
              >
                {darkMode ? "Light view" : "Dark view"}
              </button>
            </div>
          </div>
        )}
      </motion.nav>

      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <motion.section
          id="hero"
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass-panel gloss-card relative overflow-hidden rounded-[2rem] px-6 py-10 sm:px-10 lg:px-12"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-80 dark:via-white/30" />

          <div className="grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr]">
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full border border-sky-200/70 bg-white/80 px-4 py-2 text-sm font-semibold text-sky-700 shadow-sm shadow-sky-500/10 dark:border-sky-300/15 dark:bg-slate-900/60 dark:text-sky-200">
                Open to internships, collaborations, and frontend opportunities
              </div>

              <div className="space-y-5">
                <p className="section-label">Portfolio</p>
                <h1 className="max-w-3xl font-display text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
                  Building polished web experiences with a glossy visual edge.
                </h1>

                <div className="flex flex-wrap items-center gap-3 text-lg text-slate-600 dark:text-slate-300">
                  <span>I am Saaqib A, an</span>
                  <span className="inline-flex min-h-[3.25rem] items-center rounded-full border border-white/75 bg-white/80 px-5 py-3 font-semibold shadow-lg shadow-sky-500/10 dark:border-white/10 dark:bg-slate-900/65">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={heroRoles[roleIndex]}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35 }}
                        className="text-gradient"
                      >
                        {heroRoles[roleIndex]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </div>

                <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
                  I enjoy blending solid engineering fundamentals with clean
                  presentation. This refreshed portfolio highlights my projects,
                  mentoring experience, and an easier way to reach me by email.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href="/Saaqib_Resume.pdf"
                  download
                  className="primary-button justify-center px-6 py-3 text-base"
                >
                  Download resume
                </a>
                <a
                  href="#contact"
                  className="secondary-button justify-center px-6 py-3 text-base"
                >
                  Contact by email
                </a>
                <a
                  href="https://www.linkedin.com/in/saaqib-veltech/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="secondary-button justify-center px-6 py-3 text-base"
                >
                  LinkedIn
                </a>
              </div>

              <div className="flex flex-wrap gap-3">
                {["React interfaces", "AI-driven projects", "Mentoring", "System thinking"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/70 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-200"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="relative">
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-6 top-8 hidden h-24 w-24 rounded-full border border-white/50 bg-white/35 blur-sm dark:border-white/10 dark:bg-white/10 lg:block"
              />

              <div className="glass-panel gloss-card relative overflow-hidden rounded-[2rem] p-5 sm:p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(125,211,252,0.28),_transparent_30%)] dark:bg-[radial-gradient(circle_at_top_right,_rgba(56,189,248,0.18),_transparent_30%)]" />

                <div className="relative space-y-6">
                  <div className="overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/65 p-4 shadow-xl shadow-slate-950/5 dark:border-white/10 dark:bg-slate-950/45">
                    <img
                      src="/profile.jpg"
                      alt="Portrait of Saaqib A"
                      className="h-[320px] w-full rounded-[1.3rem] object-cover object-center"
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {statCards.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-[1.5rem] border border-white/70 bg-white/75 p-4 text-center shadow-sm dark:border-white/10 dark:bg-slate-950/45"
                      >
                        <p className="font-display text-2xl font-bold text-slate-950 dark:text-white">
                          {stat.value}
                        </p>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    {spotlightCards.map((card) => (
                      <div
                        key={card.title}
                        className="rounded-[1.5rem] border border-white/70 bg-white/75 px-4 py-4 shadow-sm dark:border-white/10 dark:bg-slate-950/45"
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-2 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500" />
                          <div>
                            <h2 className="font-display text-lg font-semibold text-slate-950 dark:text-white">
                              {card.title}
                            </h2>
                            <p className="mt-1 text-sm leading-7 text-slate-600 dark:text-slate-300">
                              {card.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="about"
          {...revealProps}
          className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="glass-panel gloss-card rounded-[2rem] p-8 sm:p-10">
            <p className="section-label">About me</p>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
              I like creating websites that feel intentional, useful, and easy
              to remember.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
              I am an aspiring software engineer with hands-on experience across
              web development, AI projects, and teaching roles. My work is
              shaped by SDLC thinking, distributed systems fundamentals, and a
              strong preference for interfaces that look polished without losing
              clarity.
            </p>

            <div className="soft-divider my-8" />

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "Build responsive interfaces with strong structure.",
                "Apply research and experimentation to AI-based projects.",
                "Explain technical ideas clearly through mentoring.",
                "Balance product polish with engineering discipline.",
              ].map((point) => (
                <div
                  key={point}
                  className="rounded-[1.5rem] border border-white/70 bg-white/75 p-5 text-sm leading-7 text-slate-700 shadow-sm dark:border-white/10 dark:bg-slate-950/45 dark:text-slate-200"
                >
                  {point}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="glass-panel gloss-card rounded-[2rem] p-8">
              <p className="section-label">Focus</p>
              <h3 className="mt-4 font-display text-2xl font-semibold text-slate-950 dark:text-white">
                Where I create the most impact
              </h3>
              <div className="mt-6 space-y-4">
                {[
                  {
                    title: "Frontend execution",
                    description:
                      "Responsive layouts, interaction detail, and clearer user journeys.",
                  },
                  {
                    title: "AI product thinking",
                    description:
                      "Exploring how predictive models and practical interfaces can work together.",
                  },
                  {
                    title: "Technical mentorship",
                    description:
                      "Helping learners move from concepts to confident implementation.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[1.4rem] border border-white/70 bg-white/75 p-5 shadow-sm dark:border-white/10 dark:bg-slate-950/45"
                  >
                    <p className="font-display text-lg font-semibold text-slate-950 dark:text-white">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel gloss-card rounded-[2rem] p-8">
              <p className="section-label">Education</p>
              <h3 className="mt-4 font-display text-2xl font-semibold text-slate-950 dark:text-white">
                B.Tech in Computer Science
              </h3>
              <p className="mt-2 text-sm font-medium uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
                Vel Tech University
              </p>
              <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">
                2022 - Present with a GPA of 8.5, focusing on infrastructure
                thinking, systems design, and practical application development.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="skills"
          {...revealProps}
          className="glass-panel gloss-card rounded-[2rem] p-8 sm:p-10"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-label">Skills</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                A stack built around web, AI, and delivery fundamentals
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              I am strongest when I can combine implementation speed, clean UI
              thinking, and a clear understanding of how software is delivered.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {skillGroups.map((group) => (
              <motion.article
                key={group.title}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="rounded-[1.6rem] border border-white/70 bg-white/75 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/45"
              >
                <h3 className="font-display text-xl font-semibold text-slate-950 dark:text-white">
                  {group.title}
                </h3>
                <div className="mt-5 flex flex-wrap gap-3">
                  {group.items.map((item) => (
                    <span key={item} className="skill-chip">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="projects"
          {...revealProps}
          className="glass-panel gloss-card rounded-[2rem] p-8 sm:p-10"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="section-label">Projects</p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
                Work that blends product thinking with technical exploration
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              Each project reflects a different strength, from healthcare and
              prediction systems to interaction-driven AI experiences.
            </p>
          </div>

          <div className="mt-8 grid gap-5 xl:grid-cols-3">
            {projects.map((project, index) => (
              <motion.article
                key={project.title}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.2 }}
                className="rounded-[1.8rem] border border-white/70 bg-white/80 p-6 shadow-sm dark:border-white/10 dark:bg-slate-950/45"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full border border-sky-200/80 bg-sky-100/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700 dark:border-sky-300/15 dark:bg-sky-400/10 dark:text-sky-200">
                    Project 0{index + 1}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Featured
                  </span>
                </div>

                <h3 className="mt-5 font-display text-2xl font-semibold text-slate-950 dark:text-white">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
                  {project.summary}
                </p>

                <div className="mt-5 space-y-3">
                  {project.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-3 rounded-[1.2rem] border border-white/70 bg-white/75 px-4 py-3 dark:border-white/10 dark:bg-slate-900/55"
                    >
                      <span className="mt-2 h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-500" />
                      <p className="text-sm leading-7 text-slate-700 dark:text-slate-200">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="skill-chip">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="experience"
          {...revealProps}
          className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]"
        >
          <div className="glass-panel gloss-card rounded-[2rem] p-8 sm:p-10">
            <p className="section-label">Experience</p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
              Teaching, training, and building in parallel
            </h2>

            <div className="mt-8 space-y-8 border-l border-slate-300/70 pl-6 dark:border-white/10">
              {experienceItems.map((item) => (
                <div key={item.title} className="relative">
                  <span className="absolute -left-[31px] top-2 h-3.5 w-3.5 rounded-full border-4 border-white bg-gradient-to-r from-cyan-400 to-indigo-500 dark:border-slate-950" />
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700 dark:text-sky-300">
                    {item.time}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-slate-950 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                    {item.place}
                  </p>
                  <p className="mt-3 text-sm leading-8 text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="glass-panel gloss-card rounded-[2rem] p-8">
              <p className="section-label">What teams get</p>
              <div className="mt-6 space-y-4">
                {[
                  "A developer who cares about both the experience and the implementation.",
                  "Someone comfortable moving between product polish, code structure, and communication.",
                  "An adaptable teammate who can learn quickly and contribute across web and AI workflows.",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-[1.4rem] border border-white/70 bg-white/75 p-5 text-sm leading-7 text-slate-700 shadow-sm dark:border-white/10 dark:bg-slate-950/45 dark:text-slate-200"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel gloss-card rounded-[2rem] p-8">
              <p className="section-label">Contact ready</p>
              <h3 className="mt-4 font-display text-2xl font-semibold text-slate-950 dark:text-white">
                Reach me directly by email
              </h3>
              <a
                href={`mailto:${contactEmail}`}
                className="mt-5 inline-flex break-all text-lg font-semibold text-sky-700 transition hover:text-sky-500 dark:text-sky-300 dark:hover:text-sky-200"
              >
                {contactEmail}
              </a>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                The contact section below includes a mail draft form that opens
                your default email app with a prefilled subject and message.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="contact"
          {...revealProps}
          className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]"
        >
          <div className="glass-panel gloss-card rounded-[2rem] p-8 sm:p-10">
            <p className="section-label">Contact</p>
            <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
              Let us turn an idea into something people actually enjoy using.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-slate-600 dark:text-slate-300">
              If you want to discuss an internship, a collaboration, or a
              product idea, the quickest path is email. The buttons below are
              connected to your real address so visitors can contact you
              directly.
            </p>

            <a
              href={`mailto:${contactEmail}`}
              className="primary-button mt-8 justify-center px-6 py-3 text-base sm:w-fit"
            >
              Send a direct email
            </a>

            <div className="mt-8 grid gap-4">
              <div className="rounded-[1.6rem] border border-white/70 bg-white/75 p-5 shadow-sm dark:border-white/10 dark:bg-slate-950/45">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700 dark:text-sky-300">
                  Email
                </p>
                <a
                  href={`mailto:${contactEmail}`}
                  className="mt-3 inline-flex break-all text-lg font-semibold text-slate-900 transition hover:text-sky-600 dark:text-white dark:hover:text-sky-300"
                >
                  {contactEmail}
                </a>
              </div>

              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="rounded-[1.6rem] border border-white/70 bg-white/75 p-5 shadow-sm transition hover:-translate-y-1 dark:border-white/10 dark:bg-slate-950/45"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700 dark:text-sky-300">
                    {link.label}
                  </p>
                  <p className="mt-3 text-base font-semibold text-slate-900 dark:text-white">
                    {link.value}
                  </p>
                </a>
              ))}
            </div>
          </div>

          <div className="glass-panel gloss-card rounded-[2rem] p-8 sm:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="section-label">Mail draft</p>
                <h3 className="mt-4 font-display text-2xl font-semibold text-slate-950 dark:text-white">
                  Open a prefilled email from your portfolio
                </h3>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="secondary-button px-5 py-3 text-sm"
              >
                {copied ? "Email copied" : "Copy email"}
              </button>
            </div>

            <form onSubmit={handleMailDraft} className="mt-8 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Name
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleFormChange}
                    placeholder="Your name"
                    className="contact-input"
                  />
                </label>

                <label className="space-y-2">
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Subject
                  </span>
                  <input
                    type="text"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleFormChange}
                    placeholder="Why are you reaching out?"
                    className="contact-input"
                  />
                </label>
              </div>

              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Message
                </span>
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleFormChange}
                  placeholder="Tell me a little about the opportunity, project, or collaboration."
                  rows="6"
                  className="contact-input min-h-[160px] resize-y"
                />
              </label>

              <div className="rounded-[1.5rem] border border-white/70 bg-white/75 p-4 text-sm leading-7 text-slate-600 shadow-sm dark:border-white/10 dark:bg-slate-950/45 dark:text-slate-300">
                The button below opens the visitor&apos;s default mail app with a
                ready-to-send draft addressed to you.
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="primary-button justify-center px-6 py-3 text-base"
                >
                  Open mail draft
                </button>
                <a
                  href={mailtoLink}
                  className="secondary-button justify-center px-6 py-3 text-base"
                >
                  Preview draft link
                </a>
              </div>
            </form>
          </div>
        </motion.section>

        <footer className="glass-panel rounded-[2rem] px-6 py-6 text-center text-sm text-slate-600 dark:text-slate-300">
          Designed to feel glossy, dynamic, and easy to reach.
        </footer>
      </main>
    </div>
  );
}

export default App;
