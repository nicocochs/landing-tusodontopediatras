import { useEffect, useState } from "react";
import { motion } from "motion/react";

/* ─────────────────────────────────────────
   PÁGINA DE AGRADECIMIENTO — TUS ODONTOPEDIATRAS
   /gracias347896
   ───────────────────────────────────────── */

/* ── Animated Counter ── */
function AnimatedCounter({ end, suffix = "", duration = 1800 }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  return <span>{count.toLocaleString("es-CL")}{suffix}</span>;
}

/* ── Stars ── */
function Stars({ count = 5 }) {
  return (
    <div className="flex gap-1 justify-center">
      {Array(count).fill(0).map((_, j) => (
        <svg key={j} className="w-4 h-4" fill="#fcb900" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ── Check icon ── */
function CheckIcon({ size = 28, color = "#E5007A" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
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

const nextSteps = [
  {
    icon: "📩",
    title: "Revisa tu correo o WhatsApp",
    desc: "Recibirás la confirmación de tu cita con todos los detalles de horario y dirección.",
    accent: "#FFB3D9",
  },
  {
    icon: "🧒",
    title: "Prepara a tu hijo con calma",
    desc: "Cuéntale que irá a conocer a la doctora que trabaja con niños. Nada de agujas ni sustos. Solo conocer.",
    accent: "#B2E8E8",
  },
  {
    icon: "📋",
    title: "Llega 10 minutos antes",
    desc: "Para completar la ficha de tu hijo sin apuro y que pueda ambientarse tranquilo.",
    accent: "#E5F59D",
  },
  {
    icon: "🤝",
    title: "Nosotras hacemos el resto",
    desc: "Primero ganamos su confianza, después tratamos. Sin forzar. Sin retos. Sin trauma.",
    accent: "#FFB3D9",
  },
];

const sedes = [
  {
    name: "San Fernando",
    address: "Curalí 930, San Fernando",
    phone: "+56 9 5853 7784",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.5430632701405!2d-70.98834452452537!3d-34.59042675679591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96649177e784488f%3A0xba861fbb8dcf179!2sTus%20Odontopediatras%20San%20Fernando!5e0!3m2!1ses!2sbr!4v1774806605280!5m2!1ses!2sbr",
    mapsUrl: "https://maps.google.com/?q=Tus+Odontopediatras+San+Fernando",
  },
  {
    name: "San Vicente TT",
    address: "Salvador Correa 337, San Vicente",
    phone: "+56 9 7270 8423",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3290.5732712525933!2d-71.0874270245333!3d-34.43759294874343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9664837f81be273f%3A0x489fa60b009047dd!2sTus%20Odontopediatras%20San%20Vicente!5e0!3m2!1ses!2sbr!4v1774806582838!5m2!1ses!2sbr",
    mapsUrl: "https://maps.google.com/?q=Tus+Odontopediatras+San+Vicente",
  },
];

export default function GraciasPage() {
  const [activeSede, setActiveSede] = useState(0);

  useEffect(() => {
    if (typeof window.fbq === "function") {
      window.fbq("track", "Schedule");
    }
  }, []);

  return (
    <div style={{ color: "#334155", fontFamily: "'Outfit', system-ui, sans-serif" }}>

      {/* ── HERO ── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-20"
        style={{ background: "#E5007A" }}
      >
        {/* Decorative circles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-20" style={{ background: "#FFB3D9" }} />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full opacity-15" style={{ background: "#EAED00" }} />
        </div>

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          {/* Logo */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5, type: "spring", damping: 20 }}
          >
            <img src="/logo.webp" alt="Tus Odontopediatras" className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-lg" />
          </motion.div>

          {/* Big checkmark */}
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", damping: 15, stiffness: 280 }}
          >
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center shadow-xl border-4 border-white/30" style={{ backgroundColor: "rgba(255,255,255,0.2)" }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-3xl md:text-5xl font-extrabold text-white leading-tight mb-5 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            ¡Cita agendada con éxito!
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl font-light leading-relaxed mb-8"
            style={{ color: "rgba(255,255,255,0.85)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Hiciste algo muy importante hoy. Tu hijo tendrá su{" "}
            <span className="font-semibold text-white">Primera Visita Sin Miedo</span> con especialistas que de verdad entienden a los niños.
          </motion.p>

          {/* Trust indicators */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 pt-8 border-t"
            style={{ borderColor: "rgba(255,255,255,0.25)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl md:text-3xl font-extrabold text-white">
                <AnimatedCounter end={500} suffix="+" />
              </span>
              <span className="text-xs text-white/60">Niños atendidos</span>
            </div>
            <div className="w-px" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-1.5">
                <Stars />
                <span className="text-2xl md:text-3xl font-extrabold text-white">4.9</span>
              </div>
              <span className="text-xs text-white/60">en Google</span>
            </div>
            <div className="w-px" style={{ backgroundColor: "rgba(255,255,255,0.2)" }} />
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl md:text-3xl font-extrabold text-white">2</span>
              <span className="text-xs text-white/60">Sedes en O'Higgins</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOTO EQUIPO ── */}
      <section className="bg-white flex justify-center py-0">
        <motion.div
          className="w-full max-w-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src="/doctoras.jpg"
            alt="Nuestras odontopediatras celebrando tu decisión"
            className="w-full object-cover"
            style={{ display: "block" }}
          />
        </motion.div>
      </section>

      {/* ── PRÓXIMOS PASOS ── */}
      <section className="py-28 md:py-40 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-14"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
              style={{ backgroundColor: "#E5007A", color: "#ffffff" }}
            >
              ¿Y ahora qué?
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: "#1e293b" }}>
              Esto es lo que sigue
            </h2>
            <p className="mt-3 text-sm" style={{ color: "#64748b" }}>
              Para que lleguen tranquilos y preparados el día de la cita.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {nextSteps.map((step, i) => (
              <motion.div
                key={i}
                className="rounded-3xl p-8 border border-slate-100 flex gap-5"
                style={{ backgroundColor: "#ffffff" }}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ backgroundColor: step.accent }}
                >
                  {step.icon}
                </div>
                <div>
                  <h3 className="font-bold text-base mb-1.5" style={{ color: "#1e293b" }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUÉ ESPERAR ── */}
      <section className="py-28 md:py-40 px-6 md:px-12" style={{ backgroundColor: "#FFF0F7" }}>
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
              style={{ backgroundColor: "#00B4B4", color: "#ffffff" }}
            >
              El día de la cita
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: "#1e293b" }}>
              ¿Qué va a pasar exactamente?
            </h2>
            <p className="mt-3 text-sm" style={{ color: "#64748b" }}>
              Para que tu hijo llegue sin sorpresas.
            </p>
          </motion.div>

          <div className="space-y-5">
            {[
              { num: "01", title: "Conocemos a tu hijo", desc: "La doctora te entrevista a ti primero. Quiere saber sus miedos, su historia y cómo se siente.", color: "#FFB3D9" },
              { num: "02", title: "Se gana su confianza", desc: "Le mostramos los instrumentos sin usarlos, le explicamos todo con calma y solo avanzamos cuando él está listo.", color: "#EAED00" },
              { num: "03", title: "Evaluación completa", desc: "Diagnóstico dental integral para conocer su salud bucal al detalle.", color: "#00B4B4" },
              { num: "04", title: "Tu plan claro", desc: "Sales con un diagnóstico explicado en palabras simples y un plan por etapas con prioridades.", color: "#E5007A" },
            ].map((step, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-5 p-6 rounded-2xl border border-slate-100 bg-white"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{
                    backgroundColor: step.color,
                    color: step.color === "#E5007A" || step.color === "#00B4B4" ? "#ffffff" : "#1e293b",
                  }}
                >
                  {step.num}
                </div>
                <div className="pt-1">
                  <h3 className="font-bold text-base mb-1" style={{ color: "#1e293b" }}>{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-10 p-7 rounded-3xl text-center"
            style={{ background: "linear-gradient(135deg, #E5007A 0%, #C2006A 100%)" }}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-white/90 text-sm leading-relaxed mb-2">
              <span className="font-semibold text-white">Todo esto en una sola visita.</span> Con seguimiento posterior.
            </p>
            <p className="text-white/60 text-xs">Sin apuro. Sin forzar. Al ritmo de tu hijo.</p>
          </motion.div>
        </div>
      </section>

      {/* ── MAPA / DÓNDE ESTÁN ── */}
      <section className="py-28 md:py-40 px-6 md:px-12 bg-white">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
              style={{ backgroundColor: "#EAED00", color: "#3a4000" }}
            >
              Encuéntranos
            </span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ color: "#1e293b" }}>
              ¿En cuál sede reservaste?
            </h2>
            <p className="mt-2 text-sm" style={{ color: "#64748b" }}>2 sedes en la Región de O'Higgins</p>
          </motion.div>

          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-8">
            {sedes.map((s, i) => (
              <button
                key={i}
                onClick={() => setActiveSede(i)}
                className="px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300"
                style={{
                  backgroundColor: activeSede === i ? "#E5007A" : "#f1f5f9",
                  color: activeSede === i ? "#ffffff" : "#334155",
                }}
              >
                📍 {s.name}
              </button>
            ))}
          </div>

          <motion.div
            key={activeSede}
            className="grid md:grid-cols-2 gap-8 items-stretch"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200 min-h-[300px]">
              <iframe
                src={sedes[activeSede].mapSrc}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "300px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Mapa ${sedes[activeSede].name}`}
              />
            </div>

            <div className="flex flex-col justify-center p-7 rounded-2xl" style={{ backgroundColor: "#FFF0F7" }}>
              <h3 className="text-lg font-bold mb-6" style={{ color: "#1e293b" }}>
                Sede {sedes[activeSede].name}
              </h3>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="#E5007A" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
                  </svg>
                  <p className="text-sm" style={{ color: "#334155" }}>{sedes[activeSede].address}</p>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="#E5007A" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <p className="text-sm" style={{ color: "#334155" }}>{sedes[activeSede].phone}</p>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="#E5007A" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm" style={{ color: "#334155" }}>Lun–Vie: 9:30–13:00 / 14:30–18:30</p>
                </div>
              </div>

              <a
                href={sedes[activeSede].mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 font-semibold rounded-full px-8 py-4 text-sm shadow-md whitespace-nowrap transition-all hover:-translate-y-0.5"
                style={{ backgroundColor: "#E5007A", color: "#ffffff" }}
              >
                <span>Abrir en Google Maps</span>
                <ArrowRight />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TRANQUILIZADOR ── */}
      <section className="py-24 md:py-36 px-6 md:px-12" style={{ backgroundColor: "#00B4B4" }}>
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-4xl mb-8">💆‍♀️</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-5 tracking-tight leading-snug">
              Hiciste lo correcto.
            </h2>
            <p className="text-white/80 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-8">
              Muchas mamás llegan con culpa o miedo de que su hijo no coopere.
              Tranquila — nosotras hacemos esto todos los días. Tu trabajo ya terminó:
              <span className="font-semibold text-white"> agendar fue el paso más importante.</span>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-white/70">
              {["Sin forzar", "Sin retos", "Sin trauma"].map((tag, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckIcon size={18} color="#EAED00" />
                  <span>{tag}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-14 px-8 md:px-12 text-center" style={{ backgroundColor: "#1a1a2e" }}>
        <div className="max-w-4xl mx-auto">
          <img src="/logo.webp" alt="Tus Odontopediatras" className="w-12 h-12 object-contain mx-auto mb-4 opacity-60" />
          <p className="text-white text-base font-semibold mb-2">Tus Odontopediatras</p>
          <p className="text-white/40 text-sm mb-1">tusodontopediatras@gmail.com</p>
          <p className="text-white/40 text-sm mb-6">San Fernando: +56 9 5853 7784 · San Vicente: +56 9 7270 8423</p>
          <p className="text-xs mt-4 text-white/15">© 2026 Tus Odontopediatras. Todos los derechos reservados.</p>
        </div>
      </footer>

      <style>{`
        *, ::before, ::after { box-sizing: border-box; }
        html, body { width: 100%; margin: 0; padding: 0; }
        body { font-family: 'Outfit', system-ui, sans-serif; -webkit-font-smoothing: antialiased; }
        #root { width: 100%; max-width: 100vw; overflow-x: clip; }
        .mx-auto { margin-left: auto !important; margin-right: auto !important; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
