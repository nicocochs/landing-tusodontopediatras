import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────
   LANDING PAGE — TUS ODONTOPEDIATRAS
   Primera Visita Sin Miedo
   ───────────────────────────────────────── */

const BOOKING_URL = "https://t.dentalsoft.cl/reserva-web/i/e262c202-0ea3-4100-89e9-26b5b2975e25";

/* ── Palette from tusodontopediatras.cl ── */
const C = {
  blue: "#046bd2",
  blueDark: "#0350a0",
  blueLight: "#e8f1fd",
  blueMuted: "#d0e3f8",
  navy: "#0f172a",
  white: "#ffffff",
  bg: "#f8fafc",
  text: "#334155",
  textLight: "#64748b",
  border: "#e2e8f0",
  amber: "#f59e0b",
};

/* ── Intersection Observer hook ── */
function useOnScreen(ref, threshold = 0.2) {
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
  const visible = useOnScreen(ref, 0.15);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── CTA Button ── */
const CTAButton = ({ children, href = BOOKING_URL, variant = "primary", className = "" }) => {
  const base = "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 text-center whitespace-nowrap";
  const styles = {
    primary: `${base} text-white px-7 py-3.5 text-[15px] shadow-md hover:shadow-lg hover:-translate-y-0.5`,
    hero: `${base} text-white px-8 py-4 text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5`,
    outline: `${base} bg-white border-2 px-6 py-3 text-sm hover:shadow-md`,
  };
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles[variant]} ${className}`}
      style={
        variant === "outline"
          ? { color: C.blue, borderColor: C.blue }
          : { backgroundColor: C.blue }
      }
    >
      {children}
    </a>
  );
};

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

/* ── Star rating ── */
function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array(count).fill(0).map((_, j) => (
        <svg key={j} className="w-4 h-4" fill={C.amber} viewBox="0 0 20 20">
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
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: `linear-gradient(165deg, ${C.navy} 0%, #1a2744 40%, ${C.blue} 100%)` }}>
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full opacity-[0.04]" style={{ background: `radial-gradient(circle, ${C.white} 0%, transparent 70%)` }} />
        <div className="absolute bottom-[-100px] left-[-50px] w-[400px] h-[400px] rounded-full opacity-[0.06]" style={{ background: `radial-gradient(circle, ${C.blue} 0%, transparent 70%)` }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-28 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm rounded-full px-5 py-2 mb-10 border border-white/[0.12]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-white/80 tracking-wide">
            Especialistas en niños · San Fernando y San Vicente
          </span>
        </div>

        {/* H1 */}
        <h1 className="text-[2.5rem] md:text-[3.5rem] lg:text-[4rem] font-800 text-white leading-[1.1] mb-7 tracking-tight">
          Tu hijo no necesita
          <br />
          <span className="italic font-300 text-white/60">"aguantar"</span> al dentista
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/60 max-w-xl mx-auto mb-10 leading-relaxed font-300">
          Necesita una Primera Visita Sin Miedo. Somos especialistas en niños — primero ganamos su confianza, después tratamos.
        </p>

        {/* CTA */}
        <div className="flex flex-col items-center gap-5">
          <CTAButton variant="hero">
            Agendar Primera Visita Sin Miedo
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </CTAButton>
          <p className="text-white/30 text-sm font-300">Sin compromiso · Cancelación gratuita</p>
        </div>

        {/* Trust bar */}
        <div className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-10 border-t border-white/[0.08]">
          <div className="flex items-center gap-2">
            <Stars />
            <span className="text-white/50 text-sm font-400">4.9 en Google</span>
          </div>
          <div className="text-white/50 text-sm font-400">+100 niños con necesidades especiales</div>
          <div className="text-white/50 text-sm font-400">2 sedes en O'Higgins</div>
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
      ? { title: "Tu hijo podría beneficiarse de una evaluación especializada", desc: "Un enfoque respetuoso y sin apuro puede marcar la diferencia en su relación con el dentista." }
      : { title: "¡Bien! Un control preventivo mantiene esa sonrisa sana", desc: "Una evaluación con especialistas previene complicaciones a futuro." };

  return (
    <section className="py-20 md:py-28 px-6" style={{ backgroundColor: C.bg }}>
      <div className="max-w-2xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-700 mb-3 tracking-tight" style={{ color: C.navy }}>
              ¿Tu hijo necesita un odontopediatra?
            </h2>
            <p className="text-sm" style={{ color: C.textLight }}>
              Responde estas preguntas y descúbrelo en segundos.
            </p>
          </div>
        </Reveal>

        <div className="space-y-3">
          {quizQuestions.map((item, i) => (
            <Reveal key={i} delay={i * 80}>
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center gap-4 p-4 md:p-5 rounded-xl border transition-all duration-300 text-left group"
                style={{
                  backgroundColor: answers[i] ? C.blueLight : C.white,
                  borderColor: answers[i] ? C.blue : answers[i] === false ? C.border : C.border,
                  opacity: answers[i] === false ? 0.5 : 1,
                }}
              >
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <span className="flex-1 text-sm font-500" style={{ color: C.navy }}>{item.q}</span>
                <span
                  className="flex-shrink-0 w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all text-xs font-600"
                  style={{
                    backgroundColor: answers[i] ? C.blue : answers[i] === false ? "#f1f5f9" : C.white,
                    borderColor: answers[i] ? C.blue : "#cbd5e1",
                    color: answers[i] ? C.white : "#94a3b8",
                  }}
                >
                  {answers[i] ? "✓" : answers[i] === false ? "✗" : ""}
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        {!allAnswered && (
          <p className="text-center text-xs mt-4" style={{ color: C.textLight }}>
            Clic para marcar Sí, y de nuevo para No
          </p>
        )}

        {showResult && (
          <div className="mt-8 p-8 rounded-2xl text-white" style={{ backgroundColor: C.blue, animation: "fadeUp 0.5s ease" }}>
            <h3 className="text-xl font-700 mb-2">{resultMsg.title}</h3>
            <p className="text-white/80 text-sm mb-6 font-300 leading-relaxed">{resultMsg.desc}</p>
            <CTAButton className="!bg-white !shadow-none hover:!bg-white/90" style={{ color: C.blue }}>
              Agendar la Primera Visita Sin Miedo →
            </CTAButton>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
      `}</style>
    </section>
  );
}

/* ────────────────────────────────────────
   STEPS — PRIMERA VISITA SIN MIEDO
   ──────────────────────────────────────── */
const steps = [
  { num: "01", title: "Conocemos a tu hijo", desc: "La doctora te entrevista para saber todo sobre tu hijo: sus miedos, experiencias anteriores y cómo se siente. Sin apuro." },
  { num: "02", title: "Ganamos su confianza", desc: "Le mostramos los instrumentos, le explicamos todo con calma, y solo avanzamos cuando está listo." },
  { num: "03", title: "Evaluación completa", desc: "Diagnóstico dental integral para conocer su salud bucal y detectar cualquier problema a tiempo." },
  { num: "04", title: "Tu plan claro", desc: "Te explicamos el diagnóstico en palabras simples y te entregamos un plan de tratamiento por etapas." },
];

function StepsSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center mb-16">
            <span
              className="inline-block text-[11px] font-600 uppercase tracking-[0.15em] px-4 py-1.5 rounded-full mb-5"
              style={{ backgroundColor: C.blueLight, color: C.blue }}
            >
              Nuestro método
            </span>
            <h2 className="text-2xl md:text-3xl font-700 tracking-tight" style={{ color: C.navy }}>
              Así funciona la Primera Visita Sin Miedo
            </h2>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="relative text-center md:text-left">
                {/* Step number */}
                <div
                  className="w-12 h-12 rounded-xl mx-auto md:mx-0 mb-5 flex items-center justify-center text-sm font-700"
                  style={{ backgroundColor: C.blueLight, color: C.blue }}
                >
                  {step.num}
                </div>
                <h3 className="text-base font-600 mb-2" style={{ color: C.navy }}>{step.title}</h3>
                <p className="text-sm leading-relaxed font-300" style={{ color: C.textLight }}>{step.desc}</p>

                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(100%+4px)] w-[calc(100%-56px)] h-px" style={{ backgroundColor: C.border }} />
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={500}>
          <div className="text-center mt-14">
            <p className="text-sm mb-6 font-400" style={{ color: C.textLight }}>
              Todo esto en una sola visita. Con seguimiento posterior.
            </p>
            <CTAButton>
              Agendar la Primera Visita Sin Miedo
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
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
  { title: "Especialistas en niños", desc: "Odontopediatras tituladas. Formación 100% enfocada en atención infantil.", icon: "👩‍⚕️" },
  { title: "Adaptación progresiva", desc: "Primero vínculo, después confianza, y recién ahí tratamos. El niño coopera porque quiere.", icon: "🤝" },
  { title: "Diagnóstico claro", desc: "Te vas con un plan por etapas, con prioridades, explicado sin jerga médica.", icon: "📋" },
  { title: "Necesidades especiales", desc: "Más de 100 niños con TEA, síndrome de Down y otras condiciones confían en nosotras.", icon: "💙" },
  { title: "Pabellón con anestesia general", desc: "Para casos que lo requieran, pabellón propio y anestesistas certificados.", icon: "🏥" },
  { title: "Óxido nitroso", desc: "Gas seguro que relaja al paciente para procedimientos sin miedo ni dolor.", icon: "😊" },
];

function BenefitsSection() {
  return (
    <section className="py-20 md:py-28 px-6" style={{ backgroundColor: C.bg }}>
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-700 tracking-tight" style={{ color: C.navy }}>
              ¿Por qué elegirnos?
            </h2>
            <p className="mt-3 text-sm font-300" style={{ color: C.textLight }}>
              No somos un dentista más. Somos el dentista que tu hijo necesita.
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((b, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="bg-white rounded-xl p-6 border transition-all duration-300 hover:shadow-md group" style={{ borderColor: C.border }}>
                <span className="text-2xl mb-4 block">{b.icon}</span>
                <h3 className="text-sm font-600 mb-2" style={{ color: C.navy }}>{b.title}</h3>
                <p className="text-sm leading-relaxed font-300" style={{ color: C.textLight }}>{b.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────
   COUNTER
   ──────────────────────────────────────── */
function CounterSection() {
  const counters = [
    { end: 100, suffix: "+", label: "Niños con necesidades especiales atendidos" },
    { end: 2, suffix: "", label: "Sedes en la Región de O'Higgins" },
  ];

  return (
    <section className="py-16 md:py-20 px-6" style={{ backgroundColor: C.blue }}>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
        {counters.map((c, i) => (
          <div key={i}>
            <div className="text-4xl md:text-5xl font-800 mb-1.5 tracking-tight">
              <AnimatedCounter end={c.end} suffix={c.suffix} />
            </div>
            <p className="text-white/60 text-sm font-300">{c.label}</p>
          </div>
        ))}
        <div>
          <div className="text-4xl md:text-5xl font-800 mb-1.5 flex items-center justify-center gap-2 tracking-tight">
            <svg className="w-8 h-8 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            4.9
          </div>
          <p className="text-white/60 text-sm font-300">Calificación en Google</p>
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
  const total = professionals.length;
  const next = () => setCurrent((prev) => (prev + 1) % total);
  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);

  return (
    <section className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-700 tracking-tight" style={{ color: C.navy }}>
              Conoce a nuestro equipo
            </h2>
            <p className="mt-2 text-sm font-300" style={{ color: C.textLight }}>
              {total} profesionales dedicadas al cuidado dental infantil
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {professionals.map((doc, i) => (
                  <div key={i} className="w-full flex-shrink-0">
                    <div className="rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-8" style={{ backgroundColor: C.bg }}>
                      {/* Photo placeholder */}
                      <div className="w-40 h-40 rounded-2xl flex-shrink-0 flex items-center justify-center text-xs text-center overflow-hidden border-2 border-white shadow-sm" style={{ backgroundColor: C.blueMuted, color: C.textLight }}>
                        <div className="p-4">
                          <svg className="w-14 h-14 mx-auto mb-2 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="text-[10px] font-500">INSERTAR FOTO</span>
                        </div>
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-xl font-700 mb-1" style={{ color: C.navy }}>{doc.name}</h3>
                        <p className="text-sm font-500 mb-4" style={{ color: C.blue }}>{doc.role}</p>
                        <p className="text-sm leading-relaxed mb-5 italic font-300" style={{ color: C.text }}>
                          "{doc.quote}"
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                          {doc.badges.map((badge, j) => (
                            <span
                              key={j}
                              className="text-[11px] font-500 px-3 py-1 rounded-full"
                              style={{ backgroundColor: C.blueLight, color: C.blue }}
                            >
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

            {/* Navigation */}
            <button onClick={prev} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-5 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg transition z-10 border" style={{ borderColor: C.border, color: C.text }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button onClick={next} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-5 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:shadow-lg transition z-10 border" style={{ borderColor: C.border, color: C.text }}>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {professionals.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="w-2 h-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: i === current ? C.blue : "#d1d5db",
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
    <section className="py-20 md:py-28 px-6" style={{ backgroundColor: C.bg }}>
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-700 tracking-tight" style={{ color: C.navy }}>
              Lo que dicen las mamás
            </h2>
            <p className="mt-2 text-xs font-400" style={{ color: C.textLight }}>
              Placeholder — Reemplazar con testimonios reales
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="bg-white rounded-xl p-6 border flex flex-col h-full" style={{ borderColor: C.border }}>
                <Stars />
                <p className="text-sm leading-relaxed flex-1 my-5 font-300" style={{ color: C.text }}>
                  "{t.text}"
                </p>
                <div className="pt-4 border-t" style={{ borderColor: C.border }}>
                  <p className="font-600 text-sm" style={{ color: C.navy }}>{t.name}</p>
                  <p className="text-xs font-300" style={{ color: C.textLight }}>{t.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={400}>
          <div className="text-center mt-12">
            <CTAButton>
              Únete a las mamás que ya confían en nosotras
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
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
  { range: "0–2 años", label: "Bebé", emoji: "👶", text: "¿Le salió su primer diente? Es momento del primer control. Evaluamos hábitos, detectamos problemas tempranos y te enseñamos cómo cuidar su boquita desde casa." },
  { range: "3–5 años", label: "Preescolar", emoji: "🧒", text: "Es la edad donde se forman los hábitos. Si tiene miedo o ya tuvo una mala experiencia, nuestra Primera Visita Sin Miedo es ideal." },
  { range: "6–9 años", label: "Escolar", emoji: "👦", text: "Cambio de dientes, posibles caries, hábitos que corregir. Evaluamos todo y te damos un plan claro." },
  { range: "10–17 años", label: "Adolescente", emoji: "🧑", text: "Autoestima, muelas del juicio, cuidado integral. Atendemos hasta los 18 años con un enfoque respetuoso." },
];

function AgeSelector() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <Reveal>
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-700 tracking-tight mb-3" style={{ color: C.navy }}>
              ¿Qué edad tiene tu hijo?
            </h2>
            <p className="text-sm font-300" style={{ color: C.textLight }}>
              Selecciona su rango de edad y descubre cómo podemos ayudarte.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {ageGroups.map((ag, i) => (
              <button
                key={i}
                onClick={() => setSelected(selected === i ? null : i)}
                className="p-5 rounded-xl border-2 transition-all duration-300 hover:shadow-sm"
                style={{
                  backgroundColor: selected === i ? C.blueLight : C.white,
                  borderColor: selected === i ? C.blue : C.border,
                }}
              >
                <span className="text-3xl block mb-2">{ag.emoji}</span>
                <span className="text-[11px] font-600 uppercase tracking-wider block" style={{ color: C.blue }}>{ag.range}</span>
                <span className="text-xs font-500 block mt-1" style={{ color: C.navy }}>{ag.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {selected !== null && (
          <div className="rounded-xl border-2 p-7 text-left" style={{ borderColor: C.blue, backgroundColor: C.blueLight, animation: "fadeUp 0.4s ease" }}>
            <div className="flex items-start gap-4">
              <span className="text-3xl flex-shrink-0">{ageGroups[selected].emoji}</span>
              <div>
                <h3 className="font-600 text-base mb-2" style={{ color: C.navy }}>
                  {ageGroups[selected].label} ({ageGroups[selected].range})
                </h3>
                <p className="text-sm leading-relaxed mb-5 font-300" style={{ color: C.text }}>
                  {ageGroups[selected].text}
                </p>
                <CTAButton>
                  Agendar evaluación para mi hijo/a →
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
  { q: "¿Atienden niños con necesidades especiales?", a: "Sí. Hemos atendido a más de 100 niños con TEA, síndrome de Down y otras condiciones. Contamos con pabellón dental y anestesia general para los casos que lo requieran." },
  { q: "¿Qué es el óxido nitroso?", a: "También conocido como gas de la risa. Es un gas seguro que se inhala para relajar al paciente durante el procedimiento." },
  { q: "¿Puedo cancelar o reprogramar?", a: "Sí. Cancelación gratuita. Puedes reprogramar sin costo a través del mismo sistema de agendamiento." },
  { q: "¿En cuánto tiempo podemos empezar el tratamiento?", a: "En la primera visita ya te entregamos el diagnóstico y el plan. Si decides avanzar, podemos empezar a planificar de inmediato." },
  { q: "¿Dónde están ubicadas?", a: "Tenemos dos sedes: San Fernando (Curalí 930) y San Vicente TT (Salvador Correa 337). Ambas en la Región de O'Higgins." },
  { q: "¿Qué incluye la primera visita?", a: "Entrevista personalizada, adaptación y vínculo con tu hijo, diagnóstico dental integral, plan de tratamiento explicado en simple, y seguimiento posterior." },
];

function FAQSection() {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-20 md:py-28 px-6" style={{ backgroundColor: C.bg }}>
      <div className="max-w-2xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-700 tracking-tight" style={{ color: C.navy }}>
              Preguntas frecuentes
            </h2>
          </div>
        </Reveal>

        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 50}>
              <div className="bg-white rounded-xl border overflow-hidden" style={{ borderColor: C.border }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left transition hover:bg-slate-50"
                >
                  <span className="font-500 text-sm pr-4" style={{ color: C.navy }}>{faq.q}</span>
                  <svg
                    className="w-4 h-4 flex-shrink-0 transition-transform duration-300"
                    style={{ color: C.blue, transform: open === i ? "rotate(180deg)" : "rotate(0)" }}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: open === i ? "200px" : "0" }}
                >
                  <p className="px-5 pb-5 text-sm leading-relaxed font-300" style={{ color: C.textLight }}>{faq.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────
   FINAL CTA
   ──────────────────────────────────────── */
function FinalCTA() {
  return (
    <section className="py-20 md:py-28 px-6 text-center text-white" style={{ background: `linear-gradient(165deg, ${C.navy} 0%, ${C.blueDark} 100%)` }}>
      <div className="max-w-2xl mx-auto">
        <Reveal>
          <h2 className="text-2xl md:text-4xl font-800 mb-5 leading-tight tracking-tight">
            Tu hijo merece un dentista
            <br />que lo entienda
          </h2>
          <p className="text-base text-white/60 mb-4 font-300">
            Agenda hoy su Primera Visita Sin Miedo y deja de postergar su salud dental.
          </p>
          <p className="text-sm font-500 mb-10" style={{ color: C.amber }}>
            Cupos limitados por semana — Agendamos pocas evaluaciones nuevas para dedicar el tiempo que cada niño necesita
          </p>
          <CTAButton variant="hero">
            Agendar la Primera Visita Sin Miedo
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </CTAButton>
        </Reveal>
      </div>
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
    <section className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-700 tracking-tight" style={{ color: C.navy }}>
              Encuéntranos
            </h2>
            <p className="mt-2 text-sm font-300" style={{ color: C.textLight }}>2 sedes en la Región de O'Higgins</p>
          </div>
        </Reveal>

        <Reveal>
          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-8">
            {sedes.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveSede(i)}
                className="px-5 py-2.5 rounded-lg font-500 text-sm transition-all duration-300"
                style={{
                  backgroundColor: activeSede === i ? C.blue : "#f1f5f9",
                  color: activeSede === i ? C.white : C.text,
                }}
              >
                {s.name}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-stretch">
            <div className="rounded-xl overflow-hidden shadow-sm border min-h-[320px]" style={{ borderColor: C.border, backgroundColor: "#f1f5f9" }}>
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

            <div className="flex flex-col justify-center p-7 rounded-xl" style={{ backgroundColor: C.bg }}>
              <h3 className="text-lg font-700 mb-6" style={{ color: C.navy }}>
                Sede {sedes[activeSede].name}
              </h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke={C.blue} strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" /></svg>
                  <p className="text-sm font-400" style={{ color: C.text }}>{sedes[activeSede].address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke={C.blue} strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                  <p className="text-sm font-400" style={{ color: C.text }}>{sedes[activeSede].phone}</p>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke={C.blue} strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <p className="text-sm font-400" style={{ color: C.text }}>Lunes a Viernes: 9:00 – 13:00 / 15:00 – 19:00</p>
                </div>
              </div>

              <CTAButton>
                Agendar en esta sede →
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
    <footer className="py-10 px-6 text-center" style={{ backgroundColor: C.navy }}>
      <div className="max-w-4xl mx-auto">
        <p className="text-white text-base font-600 mb-2 tracking-tight">Tus Odontopediatras</p>
        <p className="text-white/40 text-sm font-300 mb-1">tusodontopediatras@gmail.com</p>
        <p className="text-white/40 text-sm font-300 mb-6">San Fernando: +56 9 5853 7784 · San Vicente: +56 9 7270 8423</p>
        <div className="flex justify-center gap-4 text-xs font-300 text-white/30">
          <a href="#" className="hover:text-white/60 transition">Política de privacidad</a>
          <span>·</span>
          <a href="#" className="hover:text-white/60 transition">Términos y condiciones</a>
        </div>
        <p className="text-xs mt-6 text-white/20 font-300">© 2026 Tus Odontopediatras. Todos los derechos reservados.</p>
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
      <div className="bg-white/95 backdrop-blur-md border-t shadow-xl px-4 py-3" style={{ borderColor: C.border }}>
        <div className="max-w-lg mx-auto">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full text-center font-600 text-white rounded-xl py-3 text-sm transition-all shadow-md hover:shadow-lg"
            style={{ backgroundColor: C.blue }}
          >
            Agendar Primera Visita Sin Miedo
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
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
    <div style={{ color: C.text }}>
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
    </div>
  );
}
