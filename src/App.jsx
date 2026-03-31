import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────
   LANDING PAGE — TUS ODONTOPEDIATRAS
   Primera Visita Sin Miedo
   ───────────────────────────────────────── */

const BOOKING_URL = "https://t.dentalsoft.cl/reserva-web/i/e262c202-0ea3-4100-89e9-26b5b2975e25";

/* ── Intersection Observer hook ── */
function useOnScreen(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return visible;
}

/* ── Animated section wrapper ── */
function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const visible = useOnScreen(ref, 0.1);
  const cappedDelay = Math.min(delay, 300);
  return (
    <div
      ref={ref}
      className={`reveal-wrapper w-full ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 0.45s cubic-bezier(0.16,1,0.3,1) ${cappedDelay}ms, transform 0.45s cubic-bezier(0.16,1,0.3,1) ${cappedDelay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── CTA Button ── */
function CTAButton({ children, href = BOOKING_URL, size = "md", className = "" }) {
  const sizes = {
    sm: "px-6 py-3.5 text-xs",
    md: "px-10 py-4.5 text-xs",
    lg: "px-12 py-5 text-sm",
  };
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`cta-btn relative overflow-hidden inline-flex items-center justify-center gap-2 font-semibold rounded-full text-white text-center shadow-md whitespace-nowrap ${sizes[size]} ${className}`}
      style={{ backgroundColor: "#046bd2" }}
    >
      <span className="cta-shine absolute inset-0 rounded-full" />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </a>
  );
}

/* ── Arrow icon ── */
function ArrowRight() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

/* ── Animated Counter ── */
function AnimatedCounter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const visible = useOnScreen(ref, 0.5);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, end, duration]);
  return <span ref={ref}>{count.toLocaleString("es-CL")}{suffix}</span>;
}

/* ── Stars ── */
function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array(count).fill(0).map((_, j) => (
        <svg key={j} className="w-4 h-4" fill="#fcb900" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────
   HERO
   ──────────────────────────────────────── */
function Hero() {
  const glowRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (glowRef.current) {
        const y = window.scrollY * 0.08;
        glowRef.current.style.transform = `translate(-50%, ${y}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(170deg, #0a1628 0%, #0d2847 35%, #046bd2 100%)" }}
    >
      {/* Parallax glow */}
      <div ref={glowRef} className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full will-change-transform" style={{ background: "radial-gradient(circle, rgba(4,107,210,0.25) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-3xl mx-auto px-8 md:px-12 py-32 text-center">
        {/* Badge — stagger 0 */}
        <div className="hero-stagger inline-flex items-center gap-2.5 rounded-full px-5 py-2 mb-10 border" style={{ backgroundColor: "rgba(252,185,0,0.1)", borderColor: "rgba(252,185,0,0.25)", "--stagger": 0 }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "#fcb900" }} />
          <span className="text-xs font-medium tracking-wide" style={{ color: "rgba(255,255,255,0.7)" }}>
            Especialistas en niños · San Fernando y San Vicente
          </span>
        </div>

        {/* H1 — stagger 1 */}
        <h1 className="hero-stagger text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight" style={{ "--stagger": 1 }}>
          Tu hijo no necesita{" "}
          <span className="italic font-light" style={{ color: "#fcb900" }}>"aguantar"</span>
          <br />al dentista
        </h1>

        {/* Subtitle — stagger 2 */}
        <p className="hero-stagger text-lg text-white/50 max-w-lg mx-auto mb-10 leading-relaxed font-light" style={{ "--stagger": 2 }}>
          Necesita una Primera Visita Sin Miedo. Primero ganamos su confianza, después tratamos.
        </p>

        {/* CTA — stagger 3 */}
        <div className="hero-stagger flex flex-col items-center gap-6" style={{ "--stagger": 3 }}>
          <CTAButton size="lg">
            <span>Agendar Primera Visita Sin Miedo</span>
            <ArrowRight />
          </CTAButton>
          <span className="text-white/25 text-xs font-light">Sin compromiso · Cancelación gratuita</span>
        </div>

        {/* Trust bar — stagger 4 */}
        <div className="hero-stagger flex flex-wrap items-center justify-center gap-6 md:gap-8 mt-16 pt-8 border-t" style={{ borderColor: "rgba(255,255,255,0.08)", "--stagger": 4 }}>
          <div className="flex items-center gap-2">
            <Stars />
            <span className="text-white/40 text-sm">4.9 en Google</span>
          </div>
          <span className="text-white/40 text-sm">+100 niños con necesidades especiales</span>
          <span className="text-white/40 text-sm">2 sedes en O'Higgins</span>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────
   QUIZ WIDGET
   ──────────────────────────────────────── */
const quizQuestions = [
  { q: "¿Tu hijo llora o se niega cuando toca ir al dentista?", icon: "😢" },
  { q: "¿Ha tenido una mala experiencia dental antes?", icon: "😰" },
  { q: "¿Tiene caries sin tratar o dolor de muelas?", icon: "🦷" },
  { q: "¿Le cuesta abrir la boca incluso para que tú le revises?", icon: "😬" },
  { q: "¿Sales de la consulta con más dudas que respuestas?", icon: "❓" },
];

function QuizWidget() {
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const yesCount = Object.values(answers).filter(Boolean).length;
  const allAnswered = Object.keys(answers).length === quizQuestions.length;

  const toggle = (i) => {
    if (showResult) return;
    setAnswers((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  useEffect(() => {
    if (allAnswered) {
      const t = setTimeout(() => setShowResult(true), 400);
      return () => clearTimeout(t);
    }
  }, [allAnswered]);

  const resultMsg =
    yesCount >= 3
      ? { title: "Tu hijo necesita una Primera Visita Sin Miedo", desc: "Nuestro sistema de adaptación progresiva está diseñado exactamente para esta situación." }
      : yesCount >= 1
      ? { title: "Tu hijo podría beneficiarse de una evaluación especializada", desc: "Un enfoque respetuoso y sin apuro puede marcar la diferencia." }
      : { title: "¡Bien! Un control preventivo mantiene esa sonrisa sana", desc: "Una evaluación con especialistas previene complicaciones a futuro." };

  return (
    <section className="py-24 md:py-36 px-8 md:px-12" style={{ backgroundColor: "#fef9ee" }}>
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5" style={{ backgroundColor: "#fef3c7", color: "#b45309" }}>
              Mini diagnóstico
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-3 tracking-tight" style={{ color: "#1e293b" }}>
              ¿Tu hijo necesita un odontopediatra?
            </h2>
            <p className="text-sm" style={{ color: "#64748b" }}>
              Responde estas preguntas y descúbrelo en segundos.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="space-y-4 stagger-grid">
            {quizQuestions.map((item, i) => (
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center gap-6 p-4 md:p-5 rounded-2xl border-2 text-left pressable stagger-item"
                style={{
                  "--i": i,
                  backgroundColor: answers[i] ? "#e8f1fd" : "#ffffff",
                  borderColor: answers[i] ? "#046bd2" : answers[i] === false ? "#e2e8f0" : "#e2e8f0",
                  opacity: answers[i] === false ? 0.5 : 1,
                }}
              >
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <span className="flex-1 text-sm font-medium" style={{ color: "#1e293b" }}>{item.q}</span>
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all text-xs font-bold"
                  style={{
                    backgroundColor: answers[i] ? "#046bd2" : answers[i] === false ? "#f1f5f9" : "#ffffff",
                    borderColor: answers[i] ? "#046bd2" : "#cbd5e1",
                    color: answers[i] ? "#ffffff" : "#94a3b8",
                  }}
                >
                  {answers[i] ? "✓" : answers[i] === false ? "✗" : ""}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        {!allAnswered && (
          <p className="text-center text-xs mt-4" style={{ color: "#94a3b8" }}>
            Clic para marcar Sí, y de nuevo para No
          </p>
        )}

        {showResult && (
          <div className="mt-8 p-8 rounded-3xl text-white quiz-result" style={{ background: "linear-gradient(135deg, #cf2e2e 0%, #e85d75 100%)" }}>
            <h3 className="text-xl font-bold mb-2">{resultMsg.title}</h3>
            <p className="text-white/80 text-sm mb-6 leading-relaxed">{resultMsg.desc}</p>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn inline-flex items-center justify-center gap-2 font-semibold rounded-full px-10 py-4.5 text-xs shadow-md whitespace-nowrap"
              style={{ backgroundColor: "#ffffff", color: "#cf2e2e" }}
            >
              <span>Agendar la Primera Visita Sin Miedo</span>
              <ArrowRight />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────
   STEPS
   ──────────────────────────────────────── */
const steps = [
  { num: "01", title: "Conocemos a tu hijo", desc: "La doctora te entrevista para saber todo sobre tu hijo: sus miedos, experiencias anteriores y cómo se siente. Sin apuro.", color: "#fce7f3" },
  { num: "02", title: "Ganamos su confianza", desc: "Le mostramos los instrumentos, le explicamos todo con calma, y solo avanzamos cuando está listo.", color: "#fef3c7" },
  { num: "03", title: "Evaluación completa", desc: "Diagnóstico dental integral para conocer su salud bucal y detectar cualquier problema a tiempo.", color: "#e8f1fd" },
  { num: "04", title: "Tu plan claro", desc: "Te explicamos el diagnóstico en palabras simples y te entregamos un plan por etapas.", color: "#e8f1fd" },
];

function StepsSection() {
  return (
    <section className="py-24 md:py-36 px-8 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
              style={{ backgroundColor: "#fce7f3", color: "#be185d" }}
            >
              Nuestro método
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: "#1e293b" }}>
              Así funciona la Primera Visita Sin Miedo
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid md:grid-cols-4 gap-8 stagger-grid">
            {steps.map((step, i) => (
              <div key={i} className="text-center stagger-item" style={{ "--i": i }}>
                <div
                  className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center text-sm font-bold step-num"
                  style={{ backgroundColor: step.color, color: "#1e293b" }}
                >
                  {step.num}
                </div>
                <h3 className="text-sm font-bold mb-2" style={{ color: "#1e293b" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed font-light" style={{ color: "#64748b" }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={450}>
          <div className="text-center mt-14">
            <p className="text-sm mb-6" style={{ color: "#94a3b8" }}>
              Todo esto en una sola visita. Con seguimiento posterior.
            </p>
            <CTAButton>
              <span>Agendar la Primera Visita Sin Miedo</span>
              <ArrowRight />
            </CTAButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────
   BENEFICIOS
   ──────────────────────────────────────── */
const benefits = [
  { title: "Especialistas en niños", desc: "Odontopediatras tituladas. Formación 100% enfocada en atención infantil.", icon: "👩‍⚕️", accent: "#fce7f3" },
  { title: "Adaptación progresiva", desc: "Primero vínculo, después confianza, y recién ahí tratamos.", icon: "🤝", accent: "#fef3c7" },
  { title: "Diagnóstico claro", desc: "Te vas con un plan por etapas, con prioridades, explicado sin jerga médica.", icon: "📋", accent: "#e8f1fd" },
  { title: "Necesidades especiales", desc: "Más de 100 niños con TEA, síndrome de Down y otras condiciones confían en nosotras.", icon: "💜", accent: "#fce7f3" },
  { title: "Pabellón con anestesia general", desc: "Para casos que lo requieran, pabellón propio y anestesistas certificados.", icon: "🏥", accent: "#e8f1fd" },
  { title: "Óxido nitroso", desc: "Gas seguro que relaja al paciente para procedimientos sin miedo ni dolor.", icon: "😊", accent: "#fef3c7" },
];

function BenefitsSection() {
  return (
    <section className="py-24 md:py-36 px-8 md:px-12" style={{ backgroundColor: "#F0F5FA" }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: "#1e293b" }}>
              ¿Por qué elegirnos?
            </h2>
            <p className="mt-3 text-sm" style={{ color: "#64748b" }}>
              No somos un dentista más. Somos el dentista que tu hijo necesita.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-grid">
            {benefits.map((b, i) => (
              <div key={i} className="benefit-card bg-white rounded-2xl p-7 border border-slate-100 group stagger-item" style={{ "--i": i }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4 icon-float" style={{ backgroundColor: b.accent }}>
                  {b.icon}
                </div>
                <h3 className="text-sm font-bold mb-2" style={{ color: "#1e293b" }}>{b.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────
   COUNTER
   ──────────────────────────────────────── */
function CounterSection() {
  const items = [
    { end: 100, suffix: "+", label: "Niños con necesidades especiales atendidos" },
    { end: 2, suffix: "", label: "Sedes en la Región de O'Higgins" },
  ];

  return (
    <section className="py-20 md:py-28 px-8 md:px-12" style={{ background: "linear-gradient(135deg, #046bd2 0%, #7c3aed 50%, #be185d 100%)" }}>
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
        {items.map((c, i) => (
          <div key={i}>
            <div className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight counter-num">
              <AnimatedCounter end={c.end} suffix={c.suffix} />
            </div>
            <p className="text-white/60 text-sm">{c.label}</p>
          </div>
        ))}
        <div>
          <div className="text-4xl md:text-5xl font-extrabold mb-2 flex items-center justify-center gap-2 tracking-tight">
            <svg className="w-8 h-8" fill="#fcb900" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            4.9
          </div>
          <p className="text-white/60 text-sm">Calificación en Google</p>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────
   EQUIPO
   ──────────────────────────────────────── */
const professionals = [
  {
    name: "Dra. Daniela Paredes",
    role: "Odontopediatra",
    quote: "Creo que ningún niño debería tener miedo al dentista. Por eso creamos un sistema donde primero ganamos su confianza.",
    badges: ["Especialista en Odontopediatría", "Directora Clínica"],
  },
  {
    name: "Profesional 2",
    role: "Odontopediatra",
    quote: "INSERTAR FRASE — Placeholder para segunda profesional del equipo.",
    badges: ["Especialista en Odontopediatría"],
  },
  {
    name: "Profesional 3",
    role: "Odontopediatra",
    quote: "INSERTAR FRASE — Placeholder para tercera profesional del equipo.",
    badges: ["Especialista en Odontopediatría"],
  },
  {
    name: "Profesional 4",
    role: "Odontopediatra",
    quote: "INSERTAR FRASE — Placeholder para cuarta profesional del equipo.",
    badges: ["Especialista en Odontopediatría"],
  },
];

function TeamCarousel() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const total = professionals.length;
  const slide = (fn) => {
    setIsTransitioning(true);
    fn();
    setTimeout(() => setIsTransitioning(false), 200);
  };
  const next = () => slide(() => setCurrent((p) => (p + 1) % total));
  const prev = () => slide(() => setCurrent((p) => (p - 1 + total) % total));

  const NavBtn = ({ onClick, children }) => (
    <button
      onClick={onClick}
      className="w-10 h-10 rounded-full bg-white shadow-md border border-slate-200 flex items-center justify-center nav-btn"
      style={{ color: "#334155" }}
    >
      {children}
    </button>
  );

  return (
    <section className="py-24 md:py-36 px-8 md:px-12 bg-white">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: "#1e293b" }}>
              Conoce a nuestro equipo
            </h2>
            <p className="mt-2 text-sm" style={{ color: "#64748b" }}>
              {total} profesionales dedicadas al cuidado dental infantil
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="relative px-6 md:px-12">
            <div className="overflow-hidden rounded-3xl">
              <div
                className={`flex carousel-track ${isTransitioning ? "carousel-blur" : ""}`}
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {professionals.map((doc, i) => (
                  <div key={i} className="w-full flex-shrink-0">
                    <div className="rounded-3xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8" style={{ backgroundColor: "#F0F5FA" }}>
                      {/* Photo placeholder */}
                      <div className="w-36 h-36 rounded-2xl flex-shrink-0 flex items-center justify-center text-xs text-center border-2 border-white shadow-sm overflow-hidden" style={{ backgroundColor: "#d0e3f8", color: "#64748b" }}>
                        <div className="p-3">
                          <svg className="w-12 h-12 mx-auto mb-2 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="text-[10px] font-medium">INSERTAR FOTO</span>
                        </div>
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl font-bold mb-1" style={{ color: "#1e293b" }}>{doc.name}</h3>
                        <p className="text-sm font-medium mb-4" style={{ color: "#046bd2" }}>{doc.role}</p>
                        <p className="text-sm leading-relaxed mb-5 italic" style={{ color: "#334155" }}>
                          "{doc.quote}"
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                          {doc.badges.map((badge, j) => (
                            <span key={j} className="text-xs font-medium px-3 py-1 rounded-full" style={{ backgroundColor: "#e8f1fd", color: "#046bd2" }}>
                              {badge}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nav arrows */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1">
              <NavBtn onClick={prev}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </NavBtn>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1">
              <NavBtn onClick={next}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </NavBtn>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {professionals.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="w-2 h-2 rounded-full carousel-dot"
                  style={{
                    backgroundColor: i === current ? "#046bd2" : "#d1d5db",
                    transform: i === current ? "scale(1.5)" : "scale(1)",
                  }}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────
   TESTIMONIOS
   ──────────────────────────────────────── */
const testimonials = [
  {
    text: "Mi hijo lloraba solo de ver la puerta del dentista. Acá lo recibieron con calma, le mostraron todo, y al final abrió la boca solo. No lo podía creer.",
    name: "María C.",
    detail: "Mamá de Tomás, 5 años",
  },
  {
    text: "Sentía culpa terrible por las caries. Acá nadie me juzgó. Me explicaron todo claro y me dieron un plan paso a paso. Fue un alivio enorme.",
    name: "Carolina P.",
    detail: "Mamá de Sofía, 7 años",
  },
  {
    text: "Mi hijo tiene TEA y ningún dentista podía atenderlo. Acá se tomaron el tiempo, se adaptaron a él, y por primera vez salimos los dos tranquilos.",
    name: "Andrea M.",
    detail: "Mamá de Matías, 9 años",
  },
];

function TestimonialsSection() {
  return (
    <section className="py-24 md:py-36 px-8 md:px-12" style={{ backgroundColor: "#fdf2f8" }}>
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5" style={{ backgroundColor: "#fce7f3", color: "#be185d" }}>
              Testimonios
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: "#1e293b" }}>
              Lo que dicen las mamás
            </h2>
            <p className="mt-2 text-xs" style={{ color: "#94a3b8" }}>
              Placeholder — Reemplazar con testimonios reales
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid md:grid-cols-3 gap-6 stagger-grid">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card bg-white rounded-2xl p-7 border flex flex-col h-full stagger-item" style={{ borderColor: "#fbcfe8", "--i": i }}>
                <Stars />
                <p className="text-sm leading-relaxed flex-1 my-5" style={{ color: "#334155" }}>
                  "{t.text}"
                </p>
                <div className="pt-4 border-t border-slate-100">
                  <p className="font-bold text-sm" style={{ color: "#1e293b" }}>{t.name}</p>
                  <p className="text-xs" style={{ color: "#94a3b8" }}>{t.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={350}>
          <div className="text-center mt-12">
            <CTAButton>
              <span>Únete a las mamás que ya confían en nosotras</span>
              <ArrowRight />
            </CTAButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────
   AGE SELECTOR
   ──────────────────────────────────────── */
const ageGroups = [
  { range: "0–2 años", label: "Bebé", emoji: "👶", accent: "#fce7f3", text: "¿Le salió su primer diente? Es momento del primer control. Evaluamos hábitos, detectamos problemas tempranos y te enseñamos cómo cuidar su boquita desde casa." },
  { range: "3–5 años", label: "Preescolar", emoji: "🧒", accent: "#e8f1fd", text: "Es la edad donde se forman los hábitos. Si tiene miedo o ya tuvo una mala experiencia, nuestra Primera Visita Sin Miedo es ideal." },
  { range: "6–9 años", label: "Escolar", emoji: "👦", accent: "#fef3c7", text: "Cambio de dientes, posibles caries, hábitos que corregir. Evaluamos todo y te damos un plan claro." },
  { range: "10–17 años", label: "Adolescente", emoji: "🧑", accent: "#e8f1fd", text: "Autoestima, muelas del juicio, cuidado integral. Atendemos hasta los 18 años con un enfoque respetuoso." },
];

function AgeSelector() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="py-24 md:py-36 px-8 md:px-12 bg-white">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3" style={{ color: "#1e293b" }}>
              ¿Qué edad tiene tu hijo?
            </h2>
            <p className="text-sm" style={{ color: "#64748b" }}>
              Selecciona su rango de edad y descubre cómo podemos ayudarte.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {ageGroups.map((ag, i) => (
              <button
                key={i}
                onClick={() => setSelected(selected === i ? null : i)}
                className="p-5 rounded-2xl border-2 pressable"
                style={{
                  backgroundColor: selected === i ? ag.accent : "#ffffff",
                  borderColor: selected === i ? "#046bd2" : "#e2e8f0",
                }}
              >
                <span className="text-3xl block mb-2">{ag.emoji}</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider block" style={{ color: "#046bd2" }}>{ag.range}</span>
                <span className="text-xs font-medium block mt-1" style={{ color: "#1e293b" }}>{ag.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {selected !== null && (
          <div
            className="rounded-2xl border-2 p-7 text-left"
            style={{ borderColor: ageGroups[selected].accent === "#fce7f3" ? "#ec4899" : ageGroups[selected].accent === "#fef3c7" ? "#f59e0b" : "#046bd2", backgroundColor: ageGroups[selected].accent }}
          >
            <div className="flex items-start gap-6">
              <span className="text-3xl flex-shrink-0 mt-1">{ageGroups[selected].emoji}</span>
              <div>
                <h3 className="font-bold text-base mb-2" style={{ color: "#1e293b" }}>
                  {ageGroups[selected].label} ({ageGroups[selected].range})
                </h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: "#334155" }}>
                  {ageGroups[selected].text}
                </p>
                <CTAButton size="sm">
                  <span>Agendar evaluación</span>
                  <ArrowRight />
                </CTAButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────
   FAQ
   ──────────────────────────────────────── */
const faqs = [
  { q: "¿Qué pasa si mi hijo llora o no coopera?", a: "Es exactamente para eso que existimos. Usamos adaptación progresiva: primero ganamos su confianza, le mostramos todo con calma, y solo avanzamos cuando está listo." },
  { q: "¿A partir de qué edad puedo llevar a mi hijo?", a: "Desde que sale su primer diente. Atendemos bebés, niños y adolescentes hasta los 18 años." },
  { q: "¿Atienden niños con necesidades especiales?", a: "Sí. Hemos atendido a más de 100 niños con TEA, síndrome de Down y otras condiciones. Contamos con pabellón dental y anestesia general." },
  { q: "¿Qué es el óxido nitroso?", a: "También conocido como gas de la risa. Es un gas seguro que se inhala para relajar al paciente durante el procedimiento." },
  { q: "¿Puedo cancelar o reprogramar?", a: "Sí. Cancelación gratuita. Puedes reprogramar sin costo a través del mismo sistema de agendamiento." },
  { q: "¿En cuánto tiempo podemos empezar?", a: "En la primera visita ya te entregamos el diagnóstico y el plan. Si decides avanzar, podemos planificar de inmediato." },
  { q: "¿Dónde están ubicadas?", a: "Tenemos dos sedes: San Fernando (Curalí 930) y San Vicente TT (Salvador Correa 337). Ambas en la Región de O'Higgins." },
  { q: "¿Qué incluye la primera visita?", a: "Entrevista personalizada, adaptación y vínculo con tu hijo, diagnóstico dental integral, plan de tratamiento explicado en simple, y seguimiento posterior." },
];

function FAQSection() {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-24 md:py-36 px-8 md:px-12" style={{ backgroundColor: "#fffbeb" }}>
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5" style={{ backgroundColor: "#fef3c7", color: "#b45309" }}>
              FAQ
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: "#1e293b" }}>
              Preguntas frecuentes
            </h2>
          </div>
        </Reveal>

        <Reveal>
          <div className="space-y-3 stagger-grid">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-100 overflow-hidden stagger-item" style={{ "--i": i }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left faq-trigger"
                >
                  <span className="font-medium text-sm pr-4" style={{ color: "#1e293b" }}>{faq.q}</span>
                  <svg
                    className="w-4 h-4 flex-shrink-0 faq-chevron"
                    style={{ color: "#046bd2", transform: open === i ? "rotate(180deg)" : "rotate(0)" }}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className={`faq-body ${open === i ? "faq-open" : "faq-closed"}`} style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}>
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: "#64748b" }}>{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────
   FINAL CTA
   ──────────────────────────────────────── */
function FinalCTA() {
  return (
    <section
      className="py-24 md:py-36 px-8 md:px-12 text-center text-white"
      style={{ background: "linear-gradient(170deg, #0a1628 0%, #045cb4 100%)" }}
    >
      <Reveal>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-5 leading-tight tracking-tight">
            Tu hijo merece un dentista que lo entienda
          </h2>
          <p className="text-base text-white/60 mb-4">
            Agenda hoy su Primera Visita Sin Miedo y deja de postergar su salud dental.
          </p>
          <p className="text-sm font-semibold mb-10 flex items-center gap-2 justify-center rounded-2xl px-5 py-3 max-w-lg mx-auto" style={{ backgroundColor: "rgba(252,185,0,0.15)", color: "#fcb900" }}>
            <span className="w-2 h-2 rounded-full animate-pulse flex-shrink-0" style={{ backgroundColor: "#fcb900" }} />
            <span>Cupos limitados por semana — Agendamos pocas evaluaciones para dedicar el tiempo que cada niño necesita</span>
          </p>
          <CTAButton size="lg">
            <span>Agendar la Primera Visita Sin Miedo</span>
            <ArrowRight />
          </CTAButton>
        </div>
      </Reveal>
    </section>
  );
}

/* ────────────────────────────────────────
   MAPA
   ──────────────────────────────────────── */
function MapSection() {
  const [activeSede, setActiveSede] = useState(0);

  const sedes = [
    {
      name: "San Fernando",
      address: "Curalí 930, San Fernando, O'Higgins",
      phone: "+56 9 5853 7784",
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.5430632701405!2d-70.98834452452537!3d-34.59042675679591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96649177e784488f%3A0xba861fbb8dcf179!2sTus%20Odontopediatras%20San%20Fernando!5e0!3m2!1ses!2sbr!4v1774806605280!5m2!1ses!2sbr",
    },
    {
      name: "San Vicente TT",
      address: "Salvador Correa 337, San Vicente de Tagua Tagua, O'Higgins",
      phone: "+56 9 7270 8423",
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3290.5732712525933!2d-71.0874270245333!3d-34.43759294874343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9664837f81be273f%3A0x489fa60b009047dd!2sTus%20Odontopediatras%20San%20Vicente!5e0!3m2!1ses!2sbr!4v1774806582838!5m2!1ses!2sbr",
    },
  ];

  return (
    <section className="py-24 md:py-36 px-8 md:px-12 bg-white">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: "#1e293b" }}>
              Encuéntranos
            </h2>
            <p className="mt-2 text-sm" style={{ color: "#64748b" }}>2 sedes en la Región de O'Higgins</p>
          </div>
        </Reveal>

        <Reveal>
          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-8">
            {sedes.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveSede(i)}
                className="px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300"
                style={{
                  backgroundColor: activeSede === i ? "#046bd2" : "#f1f5f9",
                  color: activeSede === i ? "#ffffff" : "#334155",
                }}
              >
                📍 {s.name}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200 min-h-[320px] bg-slate-100">
              <iframe
                src={sedes[activeSede].mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "320px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Mapa ${sedes[activeSede].name}`}
              />
            </div>

            <div className="flex flex-col justify-center p-7 rounded-2xl" style={{ backgroundColor: "#F0F5FA" }}>
              <h3 className="text-lg font-bold mb-6" style={{ color: "#1e293b" }}>
                Sede {sedes[activeSede].name}
              </h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="#046bd2" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" /></svg>
                  <p className="text-sm" style={{ color: "#334155" }}>{sedes[activeSede].address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="#046bd2" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                  <p className="text-sm" style={{ color: "#334155" }}>{sedes[activeSede].phone}</p>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="#046bd2" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <p className="text-sm" style={{ color: "#334155" }}>Lunes a Viernes: 9:00 – 13:00 / 15:00 – 19:00</p>
                </div>
              </div>
              <CTAButton size="sm">
                <span>Agendar en esta sede</span>
                <ArrowRight />
              </CTAButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────
   FOOTER
   ──────────────────────────────────────── */
function Footer() {
  return (
    <footer className="py-14 px-8 md:px-12 text-center" style={{ backgroundColor: "#0a1628" }}>
      <div className="max-w-4xl mx-auto">
        <p className="text-white text-base font-semibold mb-2">Tus Odontopediatras</p>
        <p className="text-white/40 text-sm mb-1">tusodontopediatras@gmail.com</p>
        <p className="text-white/40 text-sm mb-6">San Fernando: +56 9 5853 7784 · San Vicente: +56 9 7270 8423</p>
        <div className="flex justify-center gap-6 text-xs text-white/25">
          <a href="#" className="hover:text-white/50 transition">Política de privacidad</a>
          <span>·</span>
          <a href="#" className="hover:text-white/50 transition">Términos y condiciones</a>
        </div>
        <p className="text-xs mt-6 text-white/15">© 2026 Tus Odontopediatras. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

/* ────────────────────────────────────────
   STICKY BOTTOM BAR
   ──────────────────────────────────────── */
function StickyBottomBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 600);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-xl px-6 py-4">
        <div className="max-w-lg mx-auto">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn flex items-center justify-center gap-2 w-full text-center font-semibold text-white rounded-full py-3.5 px-6 text-sm shadow-md whitespace-nowrap"
            style={{ backgroundColor: "#046bd2" }}
          >
            <span>Agendar Primera Visita Sin Miedo</span>
            <ArrowRight />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────
   MAIN APP
   ──────────────────────────────────────── */
export default function LandingOdontopediatria() {
  return (
    <div style={{ color: "#334155" }}>
      <Hero />
      <QuizWidget />
      <StepsSection />
      <BenefitsSection />
      <CounterSection />
      <TeamCarousel />
      <TestimonialsSection />
      <AgeSelector />
      <FAQSection />
      <FinalCTA />
      <MapSection />
      <Footer />
      <StickyBottomBar />

      <style>{`
        /* ═══════════════════════════════════════
           DESIGN SYSTEM — Emil Kowalski philosophy
           Every detail compounds into something
           that feels right.
           ═══════════════════════════════════════ */

        :root {
          --ease-out: cubic-bezier(0.23, 1, 0.32, 1);
          --ease-in-out: cubic-bezier(0.77, 0, 0.175, 1);
          --ease-drawer: cubic-bezier(0.32, 0.72, 0, 1);
        }

        /* ── Hero stagger entrance ── */
        .hero-stagger {
          opacity: 0;
          transform: translateY(12px);
          animation: heroIn 0.6s var(--ease-out) forwards;
          animation-delay: calc(var(--stagger, 0) * 80ms + 200ms);
        }
        @keyframes heroIn {
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── CTA Buttons: shine overlay + active feedback ── */
        .cta-btn {
          transition: transform 200ms var(--ease-out), box-shadow 200ms ease;
        }
        .cta-btn:active {
          transform: scale(0.97);
        }
        .cta-shine {
          background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%);
          opacity: 0;
          transition: opacity 300ms ease;
        }
        @media (hover: hover) and (pointer: fine) {
          .cta-btn:hover {
            box-shadow: 0 10px 25px -5px rgba(4,107,210,0.3);
            transform: translateY(-2px);
          }
          .cta-btn:hover .cta-shine {
            opacity: 1;
          }
          .cta-btn:hover:active {
            transform: scale(0.97);
          }
        }

        /* ── Generic pressable elements ── */
        .pressable {
          transition: transform 160ms var(--ease-out), background-color 200ms ease, border-color 200ms ease, opacity 200ms ease;
        }
        .pressable:active {
          transform: scale(0.98);
        }
        @media (hover: hover) and (pointer: fine) {
          .pressable:hover {
            box-shadow: 0 4px 12px rgba(0,0,0,0.06);
          }
        }

        /* ── CSS Stagger System ── */
        .stagger-grid .stagger-item {
          opacity: 0;
          transform: translateY(10px);
          animation: staggerIn 0.4s var(--ease-out) forwards;
          animation-delay: calc(var(--i, 0) * 60ms);
          animation-play-state: paused;
        }
        .reveal-wrapper[style*="opacity: 1"] .stagger-grid .stagger-item {
          animation-play-state: running;
        }
        @keyframes staggerIn {
          to { opacity: 1; transform: translateY(0); }
        }

        /* ── Benefit cards: lift + subtle 3D tilt ── */
        .benefit-card {
          transition: transform 250ms var(--ease-out), box-shadow 250ms ease;
          will-change: transform;
        }
        @media (hover: hover) and (pointer: fine) {
          .benefit-card:hover {
            transform: translateY(-6px) rotateX(2deg);
            box-shadow: 0 16px 32px -8px rgba(0,0,0,0.1);
          }
          .benefit-card:hover .icon-float {
            transform: translateY(-2px) scale(1.05);
          }
        }
        .icon-float {
          transition: transform 250ms var(--ease-out);
        }

        /* ── Testimonial cards ── */
        .testimonial-card {
          transition: transform 200ms var(--ease-out), box-shadow 200ms ease;
        }
        @media (hover: hover) and (pointer: fine) {
          .testimonial-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 24px -8px rgba(0,0,0,0.08);
          }
        }

        /* ── Carousel: blur crossfade ── */
        .carousel-track {
          transition: transform 300ms var(--ease-out), filter 150ms ease;
        }
        .carousel-blur {
          filter: blur(3px);
        }
        .carousel-dot {
          transition: transform 200ms var(--ease-out), background-color 200ms ease;
        }
        .nav-btn {
          transition: transform 160ms var(--ease-out), box-shadow 200ms ease;
        }
        .nav-btn:active {
          transform: scale(0.88);
        }
        @media (hover: hover) and (pointer: fine) {
          .nav-btn:hover {
            box-shadow: 0 6px 16px rgba(0,0,0,0.1);
            transform: scale(1.05);
          }
          .nav-btn:hover:active {
            transform: scale(0.88);
          }
        }

        /* ── FAQ: asymmetric open/close timing ── */
        .faq-trigger {
          transition: background-color 150ms ease;
        }
        .faq-trigger:active {
          background-color: rgba(241,245,249,0.5);
        }
        @media (hover: hover) and (pointer: fine) {
          .faq-trigger:hover {
            background-color: rgba(241,245,249,0.4);
          }
        }
        .faq-chevron {
          transition: transform 250ms var(--ease-out);
        }
        .faq-body {
          display: grid;
        }
        /* Slow open (300ms) — user is deciding */
        .faq-open {
          transition: grid-template-rows 300ms var(--ease-out);
        }
        /* Fast close (150ms) — system is responding */
        .faq-closed {
          transition: grid-template-rows 150ms var(--ease-out);
        }

        /* ── Step numbers: subtle scale on parent Reveal ── */
        .step-num {
          transition: transform 300ms var(--ease-out);
        }
        .reveal-wrapper[style*="opacity: 1"] .step-num {
          animation: stepPop 0.35s var(--ease-out) both;
          animation-delay: calc(var(--i, 0) * 60ms + 100ms);
        }
        @keyframes stepPop {
          0% { transform: scale(0.85); opacity: 0.5; }
          60% { transform: scale(1.08); }
          100% { transform: scale(1); opacity: 1; }
        }

        /* ── Quiz result: enters from scale(0.96), not 0 ── */
        .quiz-result {
          animation: quizReveal 0.4s var(--ease-out) both;
        }
        @keyframes quizReveal {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* ── Scroll-based section reveals via clip-path ── */
        .reveal-wrapper {
          will-change: opacity, transform;
        }

        /* ── Counter numbers: scale entrance ── */
        .counter-num {
          animation: counterPop 0.5s var(--ease-out) both;
        }
        @keyframes counterPop {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        /* ═══ ACCESSIBILITY: Reduced motion ═══ */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          .reveal-wrapper {
            opacity: 1 !important;
            transform: none !important;
          }
          .hero-stagger {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
          }
          .stagger-grid .stagger-item {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
          }
          .carousel-blur {
            filter: none !important;
          }
          .quiz-result {
            animation: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </div>
  );
}
