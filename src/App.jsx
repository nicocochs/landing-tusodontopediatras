import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────
   LANDING PAGE — ODONTOPEDIATRÍA
   Tus Odontopediatras · San Fernando & San Vicente TT
   ───────────────────────────────────────── */

const BOOKING_URL = "https://t.dentalsoft.cl/reserva-web/i/e262c202-0ea3-4100-89e9-26b5b2975e25";

/* ── Palette (solo colores de marca) ── */
const C = {
  rose: "#E81A7C",
  roseHover: "#c91568",
  teal: "#07BBBC",
  tealDark: "#069394",
  tealLight: "#e6f9f9",
  yellow: "#E4E532",
  white: "#FFFFFF",
  cream: "#FAF9F5",
  dark: "#141414",
  text: "#334155",
  textLight: "#64748b",
};

/* ── Shared CTA button ── */
const CTAButton = ({ children, href = BOOKING_URL, secondary = false, className = "" }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-center ${
      secondary
        ? "bg-white border-2 px-6 py-3 text-sm"
        : "text-white px-8 py-4 text-lg"
    } ${className}`}
    style={
      secondary
        ? { color: C.teal, borderColor: C.teal }
        : { backgroundColor: C.rose }
    }
  >
    {children}
  </a>
);

/* ── Intersection Observer hook ── */
function useOnScreen(ref, threshold = 0.3) {
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

/* ────────────────────────────────────────
   SECTION 1 — HERO
   ──────────────────────────────────────── */
function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: `linear-gradient(160deg, ${C.teal} 0%, ${C.tealDark} 50%, ${C.dark} 100%)` }}
    >
      {/* decorative shapes */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10" style={{ backgroundColor: C.rose }} />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-10" style={{ backgroundColor: C.yellow }} />
      <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full opacity-5" style={{ backgroundColor: C.white }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center">
        {/* Logo placeholder */}
        <div className="mb-6">
          <span className="text-white text-2xl font-bold tracking-wide">Tus Odontopediatras</span>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 mb-8 border border-white/20">
          <span className="text-xs font-medium text-white/90 uppercase tracking-wider">
            Especialistas en Niños · San Fernando y San Vicente
          </span>
        </div>

        {/* H1 */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
          Tu Hijo No Necesita{" "}
          <span className="italic" style={{ color: C.yellow }}>"Aguantar"</span>{" "}
          al Dentista.<br />
          <span style={{ color: C.rose }}>Necesita una Primera Visita Sin Miedo.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          Somos especialistas en niños. Primero ganamos su confianza, después tratamos.
          Sin forzar. Sin retos. Sin trauma.
        </p>

        {/* CTA */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <CTAButton>Agendar la Primera Visita Sin Miedo →</CTAButton>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-white/60 text-sm mt-6">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            4.9 en Google
          </span>
          <span className="text-white/30">·</span>
          <span>+100 niños con necesidades especiales</span>
          <span className="text-white/30">·</span>
          <span>2 sedes en O'Higgins</span>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────
   SECTION 2 — QUIZ WIDGET
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
      ? { title: "Tu hijo necesita una Primera Visita Sin Miedo", desc: "Nuestro sistema de adaptación progresiva está diseñado exactamente para esta situación. Primero ganamos su confianza, después tratamos." }
      : yesCount >= 1
      ? { title: "Tu hijo podría beneficiarse de una evaluación especializada", desc: "Un enfoque respetuoso y sin apuro puede marcar la diferencia en su relación con el dentista." }
      : { title: "¡Bien! Un control preventivo mantiene esa sonrisa sana", desc: "Aun sin problemas, una evaluación con especialistas previene complicaciones a futuro." };

  return (
    <section className="py-20 px-6" style={{ backgroundColor: C.cream }}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: C.dark }}>
          ¿Tu hijo necesita un odontopediatra?
        </h2>
        <p className="text-base mb-10" style={{ color: C.textLight }}>
          Responde estas preguntas y descúbrelo en segundos.
        </p>

        <div className="space-y-4 mb-8">
          {quizQuestions.map((item, i) => (
            <button
              key={i}
              onClick={() => toggle(i)}
              className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-300 text-left ${
                answers[i]
                  ? "border-pink-500 bg-pink-50 shadow-md"
                  : answers[i] === false
                  ? "border-gray-200 bg-white opacity-60"
                  : "border-gray-200 bg-white hover:border-teal-400 hover:shadow-md"
              }`}
            >
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <span className="flex-1 font-medium" style={{ color: C.dark }}>{item.q}</span>
              <span className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                answers[i] ? "bg-pink-500 border-pink-500 text-white"
                  : answers[i] === false ? "bg-gray-100 border-gray-300 text-gray-400"
                  : "border-gray-300"
              }`}>
                {answers[i] ? "✓" : answers[i] === false ? "✗" : ""}
              </span>
            </button>
          ))}
        </div>

        {!allAnswered && (
          <p className="text-sm text-gray-400">Haz clic en cada pregunta para marcar Sí, y de nuevo para NO</p>
        )}

        {showResult && (
          <div className="mt-8 p-8 rounded-3xl text-white anim-fade" style={{ backgroundColor: C.teal }}>
            <h3 className="text-2xl font-bold mb-3">{resultMsg.title}</h3>
            <p className="text-white/90 mb-6">{resultMsg.desc}</p>
            <CTAButton className="!bg-white hover:!bg-gray-100" style={{ color: C.teal }}>
              Agendar la Primera Visita Sin Miedo →
            </CTAButton>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
        .anim-fade { animation: fadeIn .5s ease-out; }
      `}</style>
    </section>
  );
}

/* ────────────────────────────────────────
   SECTION 3 — PRIMERA VISITA SIN MIEDO (Steps)
   ──────────────────────────────────────── */
const steps = [
  { num: "01", title: "Conocemos a tu hijo", desc: "La doctora te entrevista para saber todo sobre tu hijo: sus miedos, experiencias anteriores, monitos favoritos y cómo se siente. Sin apuro.", icon: "👋" },
  { num: "02", title: "Ganamos su confianza", desc: "Creamos una relación de cariño. Le mostramos los instrumentos, le explicamos todo con calma, y solo avanzamos cuando está listo.", icon: "⭐" },
  { num: "03", title: "Evaluación completa", desc: "Realizamos un diagnóstico dental integral para conocer su salud bucal y detectar cualquier problema a tiempo.", icon: "🔍" },
  { num: "04", title: "Tu plan claro", desc: "Te explicamos el diagnóstico en palabras simples y te entregamos un plan de tratamiento por etapas. Sin retos. Sin juicio.", icon: "📋" },
];

function StepsSection() {
  const ref = useRef(null);
  const visible = useOnScreen(ref, 0.2);

  return (
    <section ref={ref} className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span
            className="inline-block text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
            style={{ backgroundColor: C.tealLight, color: C.teal }}
          >
            Nuestro método
          </span>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: C.dark }}>
            Así funciona la Primera Visita Sin Miedo
          </h2>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div
              key={i}
              className="relative text-center transition-all duration-700"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(30px)",
                transitionDelay: `${i * 150}ms`,
              }}
            >
              <div
                className="w-20 h-20 rounded-2xl mx-auto mb-5 flex items-center justify-center text-3xl shadow-lg"
                style={{ backgroundColor: i % 2 === 0 ? C.tealLight : "#fce7f3" }}
              >
                {step.icon}
              </div>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.teal }}>
                Paso {step.num}
              </span>
              <h3 className="text-lg font-bold mt-2 mb-3" style={{ color: C.dark }}>{step.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: C.textLight }}>{step.desc}</p>

              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 -right-4 w-8 text-gray-300">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14m-7-7 7 7-7 7" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm mb-6" style={{ color: C.textLight }}>
            Todo esto en una sola visita. Con seguimiento posterior.
          </p>
          <CTAButton>Agendar la Primera Visita Sin Miedo →</CTAButton>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────
   SECTION 4 — BENEFICIOS
   ──────────────────────────────────────── */
const benefits = [
  { title: "Especialistas en niños, no dentistas generales", desc: "Somos odontopediatras tituladas. Nuestra formación es 100% enfocada en atención infantil.", icon: "👩‍⚕️" },
  { title: "Adaptación progresiva, no fuerza", desc: "Primero vínculo, después confianza, y recién ahí tratamos. El niño coopera porque quiere.", icon: "🤝" },
  { title: "Diagnóstico explicado en simple", desc: "Te vas con un plan claro, por etapas, con prioridades. Sin jerga médica.", icon: "📝" },
  { title: "Necesidades especiales", desc: "Más de 100 niños con TEA, síndrome de Down y otras condiciones ya confían en nosotras.", icon: "💙" },
  { title: "Pabellón dental con anestesia general", desc: "Para casos que lo requieran, contamos con pabellón propio y anestesistas certificados.", icon: "🏥" },
  { title: "Óxido nitroso (gas de la risa)", desc: "Un gas seguro que relaja al paciente para procedimientos sin miedo ni dolor.", icon: "😊" },
];

function BenefitsSection() {
  const ref = useRef(null);
  const visible = useOnScreen(ref, 0.15);

  return (
    <section ref={ref} className="py-20 px-6" style={{ backgroundColor: C.cream }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: C.dark }}>
            ¿Por qué elegirnos?
          </h2>
          <p className="mt-3" style={{ color: C.textLight }}>
            No somos un dentista más. Somos el dentista que tu hijo necesita.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-lg transition-all duration-500 border border-gray-100"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${i * 100}ms`,
              }}
            >
              <span className="text-3xl mb-4 block">{b.icon}</span>
              <h3 className="text-base font-bold mb-2" style={{ color: C.dark }}>{b.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: C.textLight }}>{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────
   SECTION 5 — ANIMATED COUNTER
   ──────────────────────────────────────── */
function CounterSection() {
  const counters = [
    { end: 100, suffix: "+", label: "Niños con necesidades especiales atendidos" },
    { end: 2, suffix: "", label: "Sedes en la Región de O'Higgins" },
  ];

  return (
    <section className="py-16 px-6" style={{ backgroundColor: C.teal }}>
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center text-white">
        {counters.map((c, i) => (
          <div key={i}>
            <div className="text-5xl md:text-6xl font-extrabold mb-2">
              <AnimatedCounter end={c.end} suffix={c.suffix} />
            </div>
            <p className="text-white/80 text-sm">{c.label}</p>
          </div>
        ))}
        <div>
          <div className="text-5xl md:text-6xl font-extrabold mb-2 flex items-center justify-center gap-2">
            <svg className="w-10 h-10 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            4.9
          </div>
          <p className="text-white/80 text-sm">Calificación en Google</p>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────
   SECTION 6 — EQUIPO / CARRUSEL DE PROFESIONALES
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
    badges: ["Especialista en Odontopediatría", "Placeholder"],
  },
  {
    name: "Profesional 3",
    role: "Odontopediatra",
    quote: "INSERTAR FRASE — Placeholder para tercera profesional del equipo.",
    badges: ["Especialista en Odontopediatría", "Placeholder"],
  },
  {
    name: "Profesional 4",
    role: "Odontopediatra",
    quote: "INSERTAR FRASE — Placeholder para cuarta profesional del equipo.",
    badges: ["Especialista en Odontopediatría", "Placeholder"],
  },
];

function TeamCarousel() {
  const [current, setCurrent] = useState(0);
  const total = professionals.length;

  const next = () => setCurrent((prev) => (prev + 1) % total);
  const prev = () => setCurrent((prev) => (prev - 1 + total) % total);

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: C.dark }}>
            Conoce a nuestro equipo
          </h2>
          <p className="mt-2" style={{ color: C.textLight }}>
            {total} profesionales dedicadas al cuidado dental infantil
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {professionals.map((doc, i) => (
                <div key={i} className="w-full flex-shrink-0 px-4">
                  <div
                    className="rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8"
                    style={{ background: `linear-gradient(135deg, ${C.tealLight} 0%, #fce7f3 100%)` }}
                  >
                    {/* Photo placeholder */}
                    <div className="w-48 h-48 rounded-2xl bg-gray-200 flex-shrink-0 flex items-center justify-center text-gray-400 text-xs text-center border-4 border-white shadow-lg overflow-hidden">
                      <div className="p-4">
                        <svg className="w-16 h-16 mx-auto mb-2 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span>INSERTAR FOTO</span>
                      </div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl font-bold mb-1" style={{ color: C.dark }}>{doc.name}</h3>
                      <p className="font-medium mb-4" style={{ color: C.teal }}>{doc.role}</p>
                      <p className="text-base leading-relaxed mb-5 italic" style={{ color: C.text }}>
                        "{doc.quote}"
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {doc.badges.map((badge, j) => (
                          <span
                            key={j}
                            className="text-xs font-medium px-3 py-1.5 rounded-full"
                            style={{ backgroundColor: C.tealLight, color: C.teal }}
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

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-6 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition z-10"
            style={{ color: C.teal }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-6 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:shadow-xl transition z-10"
            style={{ color: C.teal }}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {professionals.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="w-3 h-3 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: i === current ? C.teal : "#d1d5db",
                  transform: i === current ? "scale(1.3)" : "scale(1)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────
   SECTION 7 — TESTIMONIOS
   ──────────────────────────────────────── */
const testimonials = [
  {
    text: "Mi hijo lloraba solo de ver la puerta del dentista. En Tus Odontopediatras lo recibieron con calma, le mostraron todo, y al final abrió la boca solo. No lo podía creer.",
    name: "María C.",
    detail: "Mamá de Tomás, 5 años",
    stars: 5,
  },
  {
    text: "Sentía culpa terrible por las caries. Acá nadie me juzgó. Me explicaron todo claro y me dieron un plan paso a paso. Fue un alivio enorme.",
    name: "Carolina P.",
    detail: "Mamá de Sofía, 7 años",
    stars: 5,
  },
  {
    text: "Mi hijo tiene TEA y ningún dentista podía atenderlo. Acá se tomaron el tiempo, se adaptaron a él, y por primera vez salimos los dos tranquilos.",
    name: "Andrea M.",
    detail: "Mamá de Matías, 9 años",
    stars: 5,
  },
];

function TestimonialsSection() {
  return (
    <section className="py-20 px-6" style={{ backgroundColor: C.cream }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: C.dark }}>
            Lo que dicen las mamás
          </h2>
          <p className="mt-2 text-sm" style={{ color: C.textLight }}>
            Placeholder — Reemplazar con testimonios reales
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 flex flex-col">
              <div className="flex gap-0.5 mb-4">
                {Array(t.stars).fill(0).map((_, j) => (
                  <svg key={j} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm leading-relaxed flex-1 mb-5" style={{ color: C.text }}>
                "{t.text}"
              </p>
              <div>
                <p className="font-bold text-sm" style={{ color: C.dark }}>{t.name}</p>
                <p className="text-xs" style={{ color: C.textLight }}>{t.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <CTAButton>Únete a las mamás que ya confían en nosotras →</CTAButton>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────
   SECTION 8 — AGE SELECTOR WIDGET
   ──────────────────────────────────────── */
const ageGroups = [
  { range: "0-2 años", label: "Bebé", emoji: "👶", color: "#fce7f3", text: "¿Le salió su primer diente? Es momento del primer control. Evaluamos hábitos, detectamos problemas tempranos y te enseñamos cómo cuidar su boquita desde casa." },
  { range: "3-5 años", label: "Preescolar", emoji: "🧒", color: C.tealLight, text: "Es la edad donde se forman los hábitos. Si tiene miedo o ya tuvo una mala experiencia, nuestra Primera Visita Sin Miedo es ideal para reconectar con el dentista." },
  { range: "6-9 años", label: "Escolar", emoji: "👦", color: "#fef9c3", text: "Cambio de dientes, posibles caries, hábitos que corregir. Evaluamos todo y te damos un plan claro para que no se acumulen los problemas." },
  { range: "10-17 años", label: "Adolescente", emoji: "🧑", color: "#fce7f3", text: "Autoestima, muelas del juicio, cuidado integral. Atendemos hasta los 18 años con un enfoque respetuoso y sin infantilizar." },
];

function AgeSelector() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: C.dark }}>
          ¿Qué edad tiene tu hijo?
        </h2>
        <p className="mb-10" style={{ color: C.textLight }}>
          Selecciona su rango de edad y descubre cómo podemos ayudarte.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {ageGroups.map((ag, i) => (
            <button
              key={i}
              onClick={() => setSelected(selected === i ? null : i)}
              className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
                selected === i ? "shadow-lg scale-105" : "border-gray-200 hover:border-teal-300"
              }`}
              style={{
                backgroundColor: selected === i ? ag.color : "white",
                borderColor: selected === i ? C.teal : undefined,
              }}
            >
              <span className="text-4xl block mb-2">{ag.emoji}</span>
              <span className="text-xs font-bold uppercase tracking-wider block" style={{ color: C.teal }}>{ag.range}</span>
              <span className="text-sm font-medium block mt-1" style={{ color: C.dark }}>{ag.label}</span>
            </button>
          ))}
        </div>

        {selected !== null && (
          <div className="anim-fade bg-white rounded-2xl border-2 p-8 shadow-lg text-left max-w-2xl mx-auto" style={{ borderColor: C.teal }}>
            <div className="flex items-start gap-4">
              <span className="text-4xl flex-shrink-0">{ageGroups[selected].emoji}</span>
              <div>
                <h3 className="font-bold text-lg mb-2" style={{ color: C.dark }}>
                  {ageGroups[selected].label} ({ageGroups[selected].range})
                </h3>
                <p className="text-sm leading-relaxed mb-5" style={{ color: C.text }}>
                  {ageGroups[selected].text}
                </p>
                <CTAButton>Agendar evaluación para mi hijo/a →</CTAButton>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .anim-fade { animation: fadeIn .4s ease-out; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }
      `}</style>
    </section>
  );
}

/* ────────────────────────────────────────
   SECTION 9 — FAQ ACCORDION
   ──────────────────────────────────────── */
const faqs = [
  { q: "¿Qué pasa si mi hijo llora o no coopera?", a: "Es exactamente para eso que existimos. Usamos adaptación progresiva: primero ganamos su confianza, le mostramos todo con calma, y solo avanzamos cuando está listo. Sin forzar. Sin retos." },
  { q: "¿A partir de qué edad puedo llevar a mi hijo?", a: "Desde que sale su primer diente. Atendemos bebés, niños y adolescentes hasta los 18 años." },
  { q: "¿Atienden niños con necesidades especiales?", a: "Sí. Hemos atendido a más de 100 niños con TEA, síndrome de Down y otras condiciones. Contamos con pabellón dental y anestesia general para los casos que lo requieran." },
  { q: "¿Qué es el óxido nitroso?", a: "También conocido como gas de la risa. Es un gas seguro que se inhala para relajar al paciente durante el procedimiento. Permite una atención más cómoda sin los riesgos de la anestesia general." },
  { q: "¿Puedo cancelar o reprogramar?", a: "Sí. Cancelación gratuita. Puedes reprogramar sin costo a través del mismo sistema de agendamiento." },
  { q: "¿En cuánto tiempo podemos empezar el tratamiento?", a: "En la primera visita ya te entregamos el diagnóstico y el plan. Si decides avanzar, podemos empezar a planificar de inmediato." },
  { q: "¿Dónde están ubicadas?", a: "Tenemos dos sedes: San Fernando (Curalí 930) y San Vicente TT (Salvador Correa 337). Ambas en la Región de O'Higgins." },
  { q: "¿Qué incluye la primera visita?", a: "Entrevista personalizada contigo, adaptación y vínculo con tu hijo, diagnóstico dental integral completo, plan de tratamiento explicado en simple, y seguimiento posterior." },
];

function FAQSection() {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-20 px-6" style={{ backgroundColor: C.cream }}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: C.dark }}>
            Preguntas frecuentes
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition"
              >
                <span className="font-semibold text-sm pr-4" style={{ color: C.dark }}>{faq.q}</span>
                <svg
                  className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                  style={{ color: C.teal }}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: open === i ? "300px" : "0" }}
              >
                <p className="px-5 pb-5 text-sm leading-relaxed" style={{ color: C.textLight }}>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────
   SECTION 10 — CTA FINAL + URGENCIA
   ──────────────────────────────────────── */
function FinalCTA() {
  return (
    <section
      className="py-20 px-6 text-center text-white"
      style={{ background: `linear-gradient(160deg, ${C.dark} 0%, ${C.tealDark} 100%)` }}
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-5">
          Tu Hijo Merece un Dentista que lo Entienda
        </h2>
        <p className="text-lg text-white/80 mb-4">
          Agenda hoy su Primera Visita Sin Miedo y deja de postergar su salud dental.
        </p>
        <p className="text-sm font-medium mb-8" style={{ color: C.yellow }}>
          Cupos limitados por semana — Agendamos pocas evaluaciones nuevas para dedicar el tiempo que cada niño necesita
        </p>
        <CTAButton className="!text-xl !px-10 !py-5">
          Agendar la Primera Visita Sin Miedo →
        </CTAButton>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────
   SECTION 11 — MAPA INTERACTIVO (Widget 4)
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
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: C.dark }}>
            Encuéntranos
          </h2>
          <p className="mt-2" style={{ color: C.textLight }}>2 sedes en la Región de O'Higgins</p>
        </div>

        {/* Sede tabs */}
        <div className="flex justify-center gap-4 mb-8">
          {sedes.map((s, i) => (
            <button
              key={i}
              onClick={() => setActiveSede(i)}
              className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                activeSede === i ? "text-white shadow-lg" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              style={activeSede === i ? { backgroundColor: C.teal } : {}}
            >
              📍 {s.name}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200 min-h-[350px] bg-gray-100">
            <iframe
              src={sedes[activeSede].mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "350px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Mapa ${sedes[activeSede].name}`}
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center p-8 rounded-2xl" style={{ backgroundColor: C.cream }}>
            <h3 className="text-2xl font-bold mb-6" style={{ color: C.dark }}>
              📍 Sede {sedes[activeSede].name}
            </h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <span style={{ color: C.teal }} className="mt-0.5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </span>
                <p className="text-sm" style={{ color: C.text }}>{sedes[activeSede].address}</p>
              </div>
              <div className="flex items-center gap-3">
                <span style={{ color: C.teal }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </span>
                <p className="text-sm" style={{ color: C.text }}>{sedes[activeSede].phone}</p>
              </div>
              <div className="flex items-center gap-3">
                <span style={{ color: C.teal }}>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </span>
                <p className="text-sm" style={{ color: C.text }}>Lunes a Viernes: 9:00 - 13:00 / 15:00 - 19:00</p>
              </div>
            </div>

            <CTAButton>Agendar en esta sede →</CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────
   SECTION 12 — FOOTER
   ──────────────────────────────────────── */
function Footer() {
  return (
    <footer className="py-10 px-6 text-center" style={{ backgroundColor: C.dark, color: "rgba(255,255,255,.5)" }}>
      <div className="max-w-4xl mx-auto">
        <p className="text-white text-lg font-bold mb-2">Tus Odontopediatras</p>
        <p className="text-sm mb-1">tusodontopediatras@gmail.com</p>
        <p className="text-sm mb-4">San Fernando: +56 9 5853 7784 · San Vicente: +56 9 7270 8423</p>
        <div className="flex justify-center gap-4 text-xs">
          <a href="#" className="hover:text-white transition">Política de privacidad</a>
          <span>|</span>
          <a href="#" className="hover:text-white transition">Términos y condiciones</a>
        </div>
        <p className="text-xs mt-6 opacity-50">© 2026 Tus Odontopediatras. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

/* ────────────────────────────────────────
   STICKY BOTTOM BAR (Widget 5 — Mobile)
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
      <div className="bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl px-4 py-3">
        <div className="max-w-lg mx-auto">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center font-bold text-white rounded-full py-3.5 text-sm transition-all shadow-lg hover:shadow-xl"
            style={{ backgroundColor: C.rose }}
          >
            Agendar Primera Visita Sin Miedo →
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
    <div className="font-sans antialiased" style={{ color: C.text }}>
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
