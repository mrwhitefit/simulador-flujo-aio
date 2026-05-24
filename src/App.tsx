import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================================
// TYPES
// ============================================================================
type Step = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6;

const STEP_NAMES: Record<number, string> = {
  0: 'Inicio',
  1: 'Marca',
  2: 'Anuncios',
  3: 'Clientes',
  4: 'Exclusiva',
  5: 'RIC',
  6: 'Venta',
};

// ============================================================================
// MAIN APP
// ============================================================================
export default function App() {
  const [step, setStep] = useState<Step>(-1);
  const [scale, setScale] = useState(1);
  const stageRef = useRef<HTMLDivElement>(null);

  // Auto-scale stage to viewport (1920x1080 base)
  useEffect(() => {
    const compute = () => {
      const sx = window.innerWidth / 1920;
      const sy = window.innerHeight / 1080;
      setScale(Math.min(sx, sy));
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        setStep((s) => (Math.min(6, s + 1) as Step));
        e.preventDefault();
      }
      if (e.key === 'ArrowLeft') {
        setStep((s) => (Math.max(-1, s - 1) as Step));
      }
      if (e.key === 'r' || e.key === 'R') setStep(-1);
      if (e.key === 'Escape') setStep(-1);
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 0 && num <= 6) setStep(num as Step);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div
      ref={stageRef}
      className="app-stage"
      style={{ transform: `scale(${scale})` }}
    >
      <AnimatePresence mode="wait">
        {step === -1 ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <IntroScreen onStart={() => setStep(0)} />
          </motion.div>
        ) : (
          <motion.div
            key="sim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'absolute', inset: 0 }}
          >
            <SimulatorScreen step={step} onStep={setStep} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// INTRO SCREEN
// ============================================================================
function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <section className="simulator-screen" data-screen-label="00 Intro">
      <Header stepLabel="intro" />

      <main className="app-main app-main--intro">
        <div className="intro-stage">
          <motion.img
            className="intro-hero"
            src="/intro-hero.png"
            alt="El embudo y la RIC"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />

          <motion.div
            className="intro-label intro-label--paso1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <span className="intro-label__num">Paso 1</span>
            <span className="intro-label__head">El embudo</span>
            <span className="intro-label__sub">
              Cómo te llegan los clientes potenciales
            </span>
          </motion.div>

          <motion.div
            className="intro-label intro-label--paso2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <span className="intro-label__num">Paso 2</span>
            <span className="intro-label__head">La RIC</span>
            <span className="intro-label__sub">
              Con quién haces negocio cuando te llegan
            </span>
          </motion.div>

          <motion.div
            className="intro-foot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            El flujo completo
            <span className="intro-foot__dot" />
            6 pasos
            <span className="intro-foot__dot" />
            6 botones
          </motion.div>
        </div>
      </main>

      <footer className="button-bar button-bar--intro">
        <span className="button-bar--intro-hint">Pulsa para arrancar</span>
        <motion.button
          className="intro-start"
          onClick={onStart}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.4 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          Empezar simulación
          <span className="intro-start__arrow">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8 L13 8 M9 4 L13 8 L9 12" />
            </svg>
          </span>
        </motion.button>
      </footer>
    </section>
  );
}

// ============================================================================
// SIMULATOR SCREEN (estados 0-6)
// ============================================================================
function SimulatorScreen({ step, onStep }: { step: Step; onStep: (s: Step) => void }) {
  return (
    <section className="simulator-screen">
      <Header stepLabel={`${step}/6`} onReset={() => onStep(-1)} />

      <main className="app-main">
        <PhonePanel step={step} />
        <CenterPanel step={step} />
        <MetricsPanel step={step} />
      </main>

      <ButtonBar step={step} onStep={onStep} />

      <AnimatePresence>{step === 6 && <Confetti />}</AnimatePresence>
    </section>
  );
}

// ============================================================================
// HEADER
// ============================================================================
function Header({ stepLabel, onReset }: { stepLabel: string; onReset?: () => void }) {
  return (
    <header className="app-header">
      <div className="app-header__left">
        <span className="app-header__logo">AIO</span>
        <span className="app-header__divider" />
        <span className="app-header__title">
          <strong>El flujo</strong> · cómo se vende un inmueble online
        </span>
      </div>
      <div className="app-header__right">
        <button className="app-header__reset" onClick={onReset}>
          Reset
        </button>
        <span className="app-header__step">
          Paso <b>{stepLabel}</b>
          {stepLabel !== 'intro' && stepLabel.includes('/') === false && '/6'}
        </span>
      </div>
    </header>
  );
}

// ============================================================================
// BUTTON BAR
// ============================================================================
function ButtonBar({ step, onStep }: { step: Step; onStep: (s: Step) => void }) {
  return (
    <footer className="button-bar">
      {([0, 1, 2, 3, 4, 5, 6] as const).map((n) => {
        let cls = 'button-step';
        if (step === n) cls += ' button-step--active';
        else if (n < step) cls += ' button-step--done';
        else if (n === step + 1) cls += ' button-step--next';
        return (
          <button key={n} className={cls} onClick={() => onStep(n)}>
            <span className="button-step__num">{n}</span>
            <span className="button-step__name">{STEP_NAMES[n]}</span>
          </button>
        );
      })}
    </footer>
  );
}

// ============================================================================
// PHONE PANEL
// ============================================================================
function PhonePanel({ step }: { step: Step }) {
  const isLive = step >= 1;
  const label = step === 4 ? 'Llamada entrante' : 'Tu Instagram';
  const dotColor = step === 4 ? 'var(--green)' : undefined;

  return (
    <aside className="panel panel--phone">
      <span className={`panel__label ${isLive ? 'panel__label--live' : ''}`}>
        <span
          className="panel__label-dot"
          style={dotColor ? { background: dotColor, boxShadow: `0 0 6px ${dotColor}` } : undefined}
        />
        {label}
      </span>
      <div className="phone-frame">
        <div className="phone-frame__notch" />
        <PhoneStatusBar lightText={step === 4} />
        <div className="phone-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={`phone-content-${step}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ position: 'absolute', inset: 0 }}
            >
              <PhoneContent step={step} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </aside>
  );
}

function PhoneStatusBar({ lightText }: { lightText?: boolean }) {
  const style = lightText ? { color: '#fff' } : undefined;
  return (
    <div className="phone-frame__statusbar">
      <span style={style}>19:00</span>
      <span className="phone-frame__statusbar-icons" style={style}>
        <svg width="14" height="9" viewBox="0 0 14 9" fill="currentColor">
          <circle cx="2" cy="7" r="1" />
          <circle cx="5" cy="7" r="1" />
          <circle cx="8" cy="7" r="1" />
          <circle cx="11" cy="7" r="1" opacity=".4" />
        </svg>
        <svg width="11" height="9" viewBox="0 0 11 9" fill="currentColor">
          <path d="M5.5 1 A 7 7 0 0 1 10 3 L 9 4 A 5 5 0 0 0 5.5 3 A 5 5 0 0 0 2 4 L 1 3 A 7 7 0 0 1 5.5 1 Z M 5.5 5 A 3 3 0 0 1 7.5 6 L 5.5 8 L 3.5 6 A 3 3 0 0 1 5.5 5 Z" />
        </svg>
        <svg width="16" height="9" viewBox="0 0 16 9" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x=".5" y="1" width="12" height="7" rx="1.5" />
          <rect x="13.5" y="3" width="1" height="3" fill="currentColor" stroke="none" />
          <rect x="2" y="2.5" width="9" height="4" fill="currentColor" />
        </svg>
      </span>
    </div>
  );
}

function PhoneContent({ step }: { step: Step }) {
  if (step === 0) {
    return (
      <div className="phone-empty">
        Tu perfil sin marca.
        <br />
        Nadie te encuentra.
      </div>
    );
  }
  if (step === 4) {
    return <CallScreen />;
  }
  if (step === 5) {
    return <div className="rest-screen" />;
  }
  if (step === 6) {
    return (
      <div className="rest-screen">
        <div className="rest-screen__check">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M5 12 L 10 17 L 19 7" />
          </svg>
        </div>
      </div>
    );
  }
  // steps 1, 2, 3 — Instagram feed (con anuncio en 2-3, notificaciones en 3)
  return <InstagramFeed step={step} />;
}

// ============================================================================
// INSTAGRAM FEED
// ============================================================================
function InstagramFeed({ step }: { step: Step }) {
  const showAd = step >= 2;
  const showNotifs = step === 3;

  return (
    <div className="ig-screen">
      <div className="ig-topbar">
        <div className="ig-topbar__left">
          <span className="ig-topbar__back">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M9 3 L5 7 L9 11" />
            </svg>
          </span>
          <span className="ig-topbar__user">tu.zona.aio</span>
        </div>
        <div className="ig-topbar__icons">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M12 3 C 7.5 3, 4 6.5, 4 11 C 4 15.5, 7.5 19, 12 19 L 13 19 L 17 22 L 16 19 C 18 18, 20 15.5, 20 11 C 20 6.5, 16.5 3, 12 3 Z" />
          </svg>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <circle cx="5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
          </svg>
        </div>
      </div>

      <div className="ig-profile">
        <div className="ig-profile__avatar">
          <img src="/avatar-perfil.png" alt="@tu.zona.aio" />
        </div>
        <div className="ig-profile__stats">
          <div className="ig-profile__stat">
            <span className="ig-profile__stat-num">9</span>
            <span className="ig-profile__stat-label">Posts</span>
          </div>
          <div className="ig-profile__stat">
            <span className="ig-profile__stat-num">127</span>
            <span className="ig-profile__stat-label">Sigues</span>
          </div>
          <div className="ig-profile__stat">
            <span className="ig-profile__stat-num">83</span>
            <span className="ig-profile__stat-label">Te siguen</span>
          </div>
        </div>
      </div>

      <div className="ig-bio">
        <div className="ig-bio__name">Tu Zona · Agente AIO</div>
        <div className="ig-bio__desc">
          Vendo casas en tu zona — sin agencia, online.
          <br />
          + valoración gratis en 24h · Madrid
        </div>
        <span className="ig-bio__link">linktr.ee/tuzonaaio</span>
      </div>

      <div className="ig-actions">
        <button className="ig-actions__btn">Siguiendo</button>
        <button className="ig-actions__btn">Mensaje</button>
        <button className="ig-actions__btn ig-actions__btn--add">+</button>
      </div>

      <div className="ig-highlights">
        {['CASAS', 'ZONA', 'CLIENTES', 'VENTAS', 'LLAVES'].map((label, i) => (
          <div key={label} className="ig-highlight">
            <div className="ig-highlight__circle">
              <HighlightIcon idx={i} />
            </div>
            <span className="ig-highlight__label">{label}</span>
          </div>
        ))}
      </div>

      <div className="ig-tabs">
        <div className="ig-tabs__item ig-tabs__item--active">
          <svg viewBox="0 0 24 24" fill="currentColor">
            {[0, 1, 2].flatMap((r) =>
              [0, 1, 2].map((c) => (
                <rect
                  key={`${r}-${c}`}
                  x={3 + c * 6.5}
                  y={3 + r * 6.5}
                  width="5"
                  height="5"
                  rx="0.6"
                />
              ))
            )}
          </svg>
        </div>
        <div className="ig-tabs__item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <path d="M10 8 L16 12 L10 16 Z" fill="currentColor" />
          </svg>
        </div>
        <div className="ig-tabs__item">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="12" cy="10" r="3.2" />
            <path d="M5 19 C 5 16, 8 14, 12 14 C 16 14, 19 16, 19 19" />
            <rect x="3" y="3" width="18" height="18" rx="3" />
          </svg>
        </div>
      </div>

      <div className="ig-grid">
        {[
          { p: 1, tag: 'ZONA', kind: 'photo' },
          { p: 2, tag: 'INFO', kind: 'carousel' },
          { p: 3, tag: 'YO', kind: 'video' },
          { p: 4, tag: 'ZONA', kind: 'video' },
          { p: 5, tag: 'INFO', kind: 'photo' },
          { p: 6, tag: 'YO', kind: 'carousel' },
          { p: 7, tag: 'ZONA', kind: 'carousel' },
          { p: 8, tag: 'INFO', kind: 'video' },
          { p: 9, tag: 'YO', kind: 'photo' },
        ].map(({ p, tag, kind }, i) => (
          <motion.div
            key={p}
            className={`ig-post ig-post--p${p}`}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 * i, type: 'spring', stiffness: 200, damping: 20 }}
          >
            <div className="ig-post__bg" />
            <div className="ig-post__veil" />
            <span className="ig-post__tag">{tag}</span>
            {kind !== 'photo' && (
              <span className="ig-post__icon">
                {kind === 'carousel' ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="7" y="3" width="14" height="14" rx="1.5" />
                    <rect x="3" y="7" width="14" height="14" rx="1.5" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5 L8 19 L20 12 Z" />
                  </svg>
                )}
              </span>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showAd && (
          <motion.div
            key="ad"
            className="ad-overlay"
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 110, damping: 18 }}
          >
            <div className="ad-overlay__head">
              <div className="ad-overlay__avatar">
                <img src="/avatar-perfil.png" alt="" />
              </div>
              <span className="ad-overlay__user">tu.zona.aio</span>
              <span className="ad-overlay__badge">Anuncio</span>
            </div>
            <div className="ad-overlay__hero">
              <img src="/anuncio-inmueble.png" alt="" />
            </div>
            <div className="ad-overlay__copy">
              ¿Pensando en vender tu piso? Te hago la valoración gratis en 24h.
            </div>
            <button className="ad-overlay__cta">Solicitar valoración</button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showNotifs && (
          <motion.div
            key="notifs"
            className="notif-stack"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ delay: 0.5 }}
            style={{ position: 'absolute', top: 8, left: 8, right: 8, zIndex: 30 }}
          >
            <NotificationBanner
              name="María Sánchez"
              time="ahora"
              preview="Vi tu anuncio, ¿puedes valorarme la casa…"
            />
            <NotificationBanner
              name="Carlos Ruiz"
              time="2 min"
              preview="Necesito vender mi piso este mes…"
              peek
              delay={0.3}
            />
            <span className="notif-badge">3</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NotificationBanner({
  name,
  time,
  preview,
  peek,
  delay = 0,
}: {
  name: string;
  time: string;
  preview: string;
  peek?: boolean;
  delay?: number;
}) {
  return (
    <motion.div
      className={`notification-banner ${peek ? 'notification-banner--peek' : ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay + 0.2 }}
    >
      <div className="notification-banner__avatar">
        <svg viewBox="0 0 24 24" fill="#fff">
          <path d="M12 2 C 6.5 2, 2 6.5, 2 12 C 2 13.7, 2.5 15.3, 3.3 16.7 L 2 22 L 7.5 20.7 C 8.8 21.5, 10.4 22, 12 22 C 17.5 22, 22 17.5, 22 12 C 22 6.5, 17.5 2, 12 2 Z" />
        </svg>
      </div>
      <div className="notification-banner__body">
        <div className="notification-banner__row">
          <span className="notification-banner__name">{name}</span>
          <span className="notification-banner__time">{time}</span>
        </div>
        <div className="notification-banner__preview">{preview}</div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// CALL SCREEN (estado 4)
// ============================================================================
function CallScreen() {
  return (
    <div className="call-screen">
      <div className="call-screen__label">Llamada entrante</div>
      <motion.div
        className="call-screen__avatar"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
      >
        <img src="/avatar-maria.png" alt="María" />
      </motion.div>
      <div className="call-screen__name">María, propietaria</div>
      <div className="call-screen__sub">"Quiero firmar la exclusiva"</div>
      <div className="call-screen__actions">
        <button className="call-screen__btn call-screen__btn--decline">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6">
            <path d="M7 7 L 17 17 M 17 7 L 7 17" />
          </svg>
        </button>
        <button className="call-screen__btn call-screen__btn--accept">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 4.5 C 5 4, 5.4 3.5, 6 3.5 L 8.5 3.5 C 9 3.5, 9.4 3.8, 9.5 4.2 L 10.3 7.3 C 10.4 7.7, 10.2 8.1, 9.9 8.3 L 8 9.5 C 9.3 12.3, 11.7 14.7, 14.5 16 L 15.7 14.1 C 15.9 13.8, 16.3 13.6, 16.7 13.7 L 19.8 14.5 C 20.2 14.6, 20.5 15, 20.5 15.5 L 20.5 18 C 20.5 18.6, 20 19, 19.5 19 C 11.5 19, 5 12.5, 5 4.5 Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function HighlightIcon({ idx }: { idx: number }) {
  const icons = [
    <path key="i" d="M4 11 L12 4 L20 11 L20 20 L4 20 Z M9 20 L9 14 L15 14 L15 20" />,
    <path key="i" d="M12 2 C 8 2, 5 5, 5 9 C 5 14, 12 22, 12 22 C 12 22, 19 14, 19 9 C 19 5, 16 2, 12 2 Z" />,
    <g key="i">
      <circle cx="12" cy="8" r="3.6" />
      <path d="M5 20 C 5 16, 8 14, 12 14 C 16 14, 19 16, 19 20" />
    </g>,
    <path key="i" d="M3 16 L7 12 L11 14 L17 8 L20 11 M3 21 L21 21" />,
    <g key="i">
      <circle cx="12" cy="9" r="3" />
      <path d="M19 16 L17 14 L15 16 L19 20 M5 20 L12 14" />
    </g>,
  ];
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      {icons[idx]}
    </svg>
  );
}

// ============================================================================
// CENTER PANEL — Embudo (0-3) o Mapa (4-6)
// ============================================================================
function CenterPanel({ step }: { step: Step }) {
  const isFunnel = step <= 3;
  const isCityMap = step === 4;
  const isSpainMap = step >= 5;

  return (
    <section className={`panel panel--center ${isFunnel ? 'mode-funnel' : 'mode-map'}`}>
      <span className={`panel__label ${step >= 1 ? 'panel__label--live' : ''}`}>
        <span
          className="panel__label-dot"
          style={
            step === 6
              ? { background: 'var(--green)', boxShadow: '0 0 6px var(--green-glow)' }
              : undefined
          }
        />
        {isFunnel
          ? 'Tu embudo'
          : isCityMap
          ? 'Tu zona · Madrid'
          : step === 5
          ? 'RIC · Red Inmobiliaria Colaborativa'
          : 'RIC · Venta cerrada'}
      </span>

      <AnimatePresence mode="wait">
        {isFunnel && (
          <motion.div
            key="funnel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ flex: 1, display: 'flex', minHeight: 0 }}
          >
            <FunnelView step={step} />
          </motion.div>
        )}
        {isCityMap && (
          <motion.div
            key="city"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ flex: 1, display: 'flex', minHeight: 0 }}
          >
            <CityMap />
          </motion.div>
        )}
        {isSpainMap && (
          <motion.div
            key="spain"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ flex: 1, display: 'flex', minHeight: 0 }}
          >
            <SpainMap sold={step === 6} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ============================================================================
// FUNNEL VIEW
// ============================================================================
function FunnelView({ step }: { step: Step }) {
  const contentOn = step >= 1;
  const adsOn = step >= 2;

  const counterValue = step === 0 ? 0 : step === 1 ? 0 : step === 2 ? 6 : 28;
  const counterLit = step >= 2;
  const counterHint =
    step === 0
      ? '— Sin actividad'
      : step === 1
      ? '— Aún no escriben'
      : step === 2
      ? 'Primeros mensajes'
      : 'Personas que te han escrito';

  return (
    <div className="funnel">
      <div className="funnel-sources">
        <div className={`funnel-source ${contentOn ? 'funnel-source--on' : 'funnel-source--off'}`}>
          <span className="funnel-source__tag">Tu contenido</span>
          <div className="funnel-source__body">
            {contentOn && (
              <div className="mini-ig">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                  <div key={n} className={`mini-ig__cell mini-ig__cell--p${n}`} />
                ))}
              </div>
            )}
          </div>
          <span className="funnel-source__caption">
            {contentOn ? '9 posts publicados' : 'Sin actividad'}
          </span>
        </div>

        <div
          className={`funnel-source ${adsOn ? 'funnel-source--on' : 'funnel-source--off'}`}
          style={adsOn ? { position: 'relative' } : undefined}
        >
          <span className="funnel-source__tag">Tus anuncios</span>
          <div className="funnel-source__body">
            {adsOn && (
              <div className="mini-ad">
                <div className="mini-ad__head">
                  <div className="mini-ad__avatar">
                    <img src="/avatar-perfil.png" alt="" />
                  </div>
                  <span className="mini-ad__user">tu.zona.aio</span>
                  <span className="mini-ad__badge">Anuncio</span>
                </div>
                <div className="mini-ad__hero">
                  <img src="/anuncio-inmueble.png" alt="" />
                  <span className="mini-ad__cta">Valoración gratis</span>
                </div>
              </div>
            )}
          </div>
          <span className="funnel-source__caption">
            {adsOn ? (step === 2 ? 'Activo · Meta Ads' : 'Activo · Meta Ads') : 'Sin activar'}
          </span>
          {adsOn && <span className="mini-ad__spend">5€/día</span>}
        </div>
      </div>

      <div className="funnel-shape">
        <FunnelPeople step={step} />
      </div>

      <div className="funnel-output">
        <div className="funnel-counter">
          <div className="funnel-counter__label">Clientes potenciales</div>
          <AnimatedCounter
            value={counterValue}
            lit={counterLit}
            className={counterLit ? 'funnel-counter__num funnel-counter__num--lit' : 'funnel-counter__num funnel-counter__num--muted'}
          />
          <div className="funnel-counter__hint">{counterHint}</div>
        </div>
      </div>
    </div>
  );
}

function FunnelPeople({ step }: { step: Step }) {
  // Distinct positions for each step
  const positions: Record<number, Array<{ left: string; top: string; size?: number }>> = {
    1: [
      { left: '48%', top: '18%' },
      { left: '42%', top: '48%', size: 16 },
    ],
    2: [
      { left: '30%', top: '12%' },
      { left: '62%', top: '18%' },
      { left: '46%', top: '28%', size: 17 },
      { left: '36%', top: '42%', size: 16 },
      { left: '58%', top: '48%', size: 16 },
      { left: '48%', top: '62%', size: 15 },
      { left: '42%', top: '78%', size: 14 },
      { left: '54%', top: '84%', size: 14 },
    ],
    3: [
      { left: '22%', top: '6%' },
      { left: '42%', top: '10%' },
      { left: '62%', top: '8%' },
      { left: '78%', top: '12%', size: 16 },
      { left: '32%', top: '22%' },
      { left: '52%', top: '24%' },
      { left: '70%', top: '26%', size: 16 },
      { left: '28%', top: '38%', size: 17 },
      { left: '48%', top: '40%', size: 16 },
      { left: '64%', top: '42%', size: 16 },
      { left: '38%', top: '54%', size: 15 },
      { left: '54%', top: '56%', size: 15 },
      { left: '44%', top: '68%', size: 14 },
      { left: '56%', top: '70%', size: 14 },
      { left: '48%', top: '82%', size: 13 },
      { left: '52%', top: '90%', size: 12 },
    ],
  };
  const list = positions[step] || [];

  return (
    <div className="funnel-people">
      <AnimatePresence>
        {list.map((p, i) => (
          <motion.span
            key={`${step}-${i}`}
            className="funnel-person"
            style={{
              left: p.left,
              top: p.top,
              width: p.size ? `${p.size}px` : undefined,
              height: p.size ? `${p.size}px` : undefined,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              delay: 0.03 * i,
              type: 'spring',
              stiffness: 200,
              damping: 18,
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="7" r="3.5" />
              <path d="M4 22 C4 16, 8 13.5, 12 13.5 C16 13.5, 20 16, 20 22 Z" />
            </svg>
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}

function AnimatedCounter({ value, lit, className }: { value: number; lit: boolean; className: string }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (value === 0) {
      setDisplay(0);
      return;
    }
    const duration = 800;
    const steps = 40;
    const stepValue = value / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      const v = Math.min(value, Math.round(stepValue * current));
      setDisplay(v);
      if (current >= steps) clearInterval(interval);
    }, duration / steps);
    return () => clearInterval(interval);
  }, [value]);

  return <div className={className}>{display.toLocaleString('es-ES')}</div>;
}

// ============================================================================
// CITY MAP (estado 4)
// ============================================================================
function CityMap() {
  return (
    <div className="map-city">
      <div className="map-pin" style={{ top: '18%', right: '8%' }}>
        <span className="map-pin__cap map-pin__cap--green">
          <svg className="map-pin__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 11 L12 4 L21 11 L21 20 L14 20 L14 14 L10 14 L10 20 L3 20 Z" />
          </svg>
          Exclusiva
        </span>
        <span className="map-pin__tri map-pin__tri--green" />
        <span className="map-pin__sub">300.000€ · 4% honorarios</span>
      </div>
    </div>
  );
}

// ============================================================================
// SPAIN MAP (estados 5-6)
// ============================================================================
function SpainMap({ sold }: { sold: boolean }) {
  const lineColor = sold ? '#10b981' : '#fa5659';

  return (
    <div className="map-spain">
      <svg
        className="map-spain__svg"
        viewBox="0 0 1000 700"
        preserveAspectRatio="xMidYMid meet"
        style={{ pointerEvents: 'none' }}
      >
        <motion.line
          x1="412"
          y1="326"
          x2="763"
          y2="225"
          stroke={lineColor}
          strokeWidth="2"
          strokeDasharray="4 3"
          opacity=".95"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </svg>

      <div className="map-spain__overlay">
        {/* 7 agentes verdes RIC */}
        {[
          { top: '46.9%', left: '41.2%', city: 'Madrid' },
          { top: '53.4%', left: '78.3%', city: 'Valencia' },
          { top: '70.3%', left: '34.1%', city: 'Sevilla' },
          { top: '22.1%', left: '51.2%', city: 'Bilbao' },
          { top: '78.1%', left: '41.2%', city: 'Málaga' },
          { top: '37.8%', left: '61.2%', city: 'Zaragoza' },
          { top: '66.4%', left: '68.3%', city: 'Murcia' },
        ].map((agent) => (
          <span key={agent.city} className="ric-pin" style={{ top: agent.top, left: agent.left }}>
            <span className="ric-pin__city">{agent.city}</span>
          </span>
        ))}

        {/* Barcelona matched */}
        <span
          className="ric-pin"
          style={{
            top: '33.9%',
            left: '76.3%',
            ...(sold
              ? { background: 'var(--green)', boxShadow: '0 0 0 2px rgba(16,185,129,.15),0 0 14px var(--green-glow)' }
              : { background: 'var(--red)', boxShadow: '0 0 0 2px rgba(250,86,89,.15),0 0 14px var(--red-glow)' }),
          }}
        >
          <span
            className="ric-pin__city"
            style={{ color: sold ? 'var(--green)' : 'var(--red)', fontWeight: 800 }}
          >
            BARCELONA
          </span>
        </span>

        {/* Tu pin Madrid */}
        <div className="map-pin" style={{ top: '46.9%', left: '41.2%' }}>
          <span className={`map-pin__cap ${sold ? 'map-pin__cap--green' : 'map-pin__cap--red'}`}>
            <svg className="map-pin__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {sold ? (
                <path d="M5 12 L 10 17 L 19 7" />
              ) : (
                <path d="M3 11 L12 4 L21 11 L21 20 L14 20 L14 14 L10 14 L10 20 L3 20 Z" />
              )}
            </svg>
            {sold ? 'Vendida' : 'Tu exclusiva'}
          </span>
          <span className={`map-pin__tri ${sold ? 'map-pin__tri--green' : 'map-pin__tri--red'}`} />
          <span className="map-pin__sub" style={{ color: sold ? 'var(--green)' : 'var(--red)' }}>
            Madrid · 300.000€
          </span>
        </div>
      </div>

      <div className="map-legend">
        <span className="map-legend__item">
          <span className="map-legend__dot map-legend__dot--green" />
          Agentes RIC
        </span>
        <span className="map-legend__item">
          <span
            className={sold ? 'map-legend__dot' : 'map-legend__dot map-legend__dot--red'}
            style={sold ? { background: 'var(--green)', boxShadow: '0 0 6px var(--green-glow)' } : undefined}
          />
          {sold ? 'Tu venta' : 'Tu exclusiva'}
        </span>
        <span className="map-legend__item">
          <span
            className="map-legend__dash"
            style={
              sold
                ? {
                    background: 'linear-gradient(to right,var(--green) 50%,transparent 50%)',
                    backgroundSize: '6px 100%',
                  }
                : undefined
            }
          />
          {sold ? 'Match RIC' : 'Conexión'}
        </span>
      </div>
    </div>
  );
}

// ============================================================================
// METRICS PANEL
// ============================================================================
function MetricsPanel({ step }: { step: Step }) {
  const m = getMetrics(step);

  return (
    <aside className="panel panel--metrics">
      <span className={`panel__label ${step >= 1 ? 'panel__label--live' : ''}`}>
        <span
          className="panel__label-dot"
          style={
            step === 6
              ? { background: 'var(--red)', boxShadow: '0 0 8px var(--red-glow)' }
              : undefined
          }
        />
        Tus métricas
      </span>

      {m.map((card, i) => (
        <div key={i} className={`metric-card ${card.ghost ? 'metric-card--ghost' : ''}`}>
          <div className="metric-card__row">
            <span className="metric-card__label">{card.label}</span>
            <span className="metric-card__delta" style={card.deltaStyle}>
              {card.delta}
            </span>
          </div>
          <div className="metric-card__num" style={card.numStyle}>
            {card.value}
          </div>
          <div className="metric-card__hint">{card.hint}</div>
        </div>
      ))}
    </aside>
  );
}

interface MetricCard {
  label: string;
  delta: string;
  value: string;
  hint: string;
  ghost?: boolean;
  deltaStyle?: React.CSSProperties;
  numStyle?: React.CSSProperties;
}

function getMetrics(step: Step): MetricCard[] {
  const empty: MetricCard = {
    label: '',
    delta: '—',
    value: '0',
    hint: '',
    ghost: true,
  };

  if (step === 0) {
    return [
      { ...empty, label: 'Inversión semana', delta: '€', value: '0€', hint: 'Sin anuncios activos' },
      { ...empty, label: 'Personas que te ven', value: '0', hint: 'Tu anuncio sin alcance' },
      { ...empty, label: 'Clientes potenciales', value: '0', hint: 'Nadie te escribe todavía' },
      { ...empty, label: 'Exclusivas firmadas', value: '0', hint: 'Cartera vacía' },
      { ...empty, label: 'Cobrado', delta: '€', value: '0€', hint: 'Aún no has cerrado' },
    ];
  }
  if (step === 1) {
    return [
      { ...empty, label: 'Inversión semana', delta: '€', value: '0€', hint: 'Sin anuncios activos' },
      { ...empty, label: 'Personas que te ven', delta: 'orgánico', value: '0', hint: 'Tu contenido aún sin alcance' },
      { ...empty, label: 'Clientes potenciales', value: '0', hint: 'Nadie te escribe todavía' },
      { ...empty, label: 'Exclusivas firmadas', value: '0', hint: 'Cartera vacía' },
      { ...empty, label: 'Cobrado', delta: '€', value: '0€', hint: 'Aún no has cerrado' },
    ];
  }
  if (step === 2) {
    return [
      { label: 'Inversión semana', delta: '+5€/día', value: '5€', hint: 'Anuncio rodando', deltaStyle: { color: 'var(--red)' } },
      { label: 'Personas que te ven', delta: 'hoy', value: '640', hint: 'Alcance de tu anuncio' },
      { label: 'Clientes potenciales', delta: '+6', value: '6', hint: 'Han pedido valoración', deltaStyle: { color: 'var(--amber)' } },
      { ...empty, label: 'Exclusivas firmadas', value: '0', hint: 'Cartera vacía' },
      { ...empty, label: 'Cobrado', delta: '€', value: '0€', hint: 'Aún no has cerrado' },
    ];
  }
  if (step === 3) {
    return [
      { label: 'Inversión semana', delta: 'total', value: '35€', hint: '7 días de anuncio rodando' },
      { label: 'Personas que te ven', delta: 'semana', value: '4.500', hint: 'Alcance de tu anuncio' },
      { label: 'Clientes potenciales', delta: '+28', value: '28', hint: 'Han pedido valoración', deltaStyle: { color: 'var(--amber)' } },
      { ...empty, label: 'Exclusivas firmadas', value: '0', hint: 'Cartera vacía' },
      { ...empty, label: 'Cobrado', delta: '€', value: '0€', hint: 'Aún no has cerrado' },
    ];
  }
  if (step === 4) {
    return [
      { label: 'Inversión semana', delta: 'total', value: '35€', hint: '7 días de anuncio rodando' },
      { label: 'Personas que te ven', delta: 'semana', value: '4.500', hint: 'Alcance de tu anuncio' },
      { label: 'Clientes potenciales', delta: 'acumulado', value: '28', hint: 'Han pedido valoración' },
      { label: 'Exclusivas firmadas', delta: '+1', value: '1', hint: 'Inmueble en tu cartera', deltaStyle: { color: 'var(--green)' }, numStyle: { color: 'var(--green)' } },
      { ...empty, label: 'Cobrado', delta: '€', value: '0€', hint: 'Pendiente de venta' },
    ];
  }
  if (step === 5) {
    return [
      { label: 'Inversión semana', delta: 'total', value: '35€', hint: '7 días de anuncio rodando' },
      { label: 'Personas que te ven', delta: 'semana', value: '4.500', hint: 'Alcance de tu anuncio' },
      { label: 'Clientes potenciales', delta: 'acumulado', value: '28', hint: 'Han pedido valoración' },
      { label: 'Exclusivas firmadas', delta: 'activa', value: '1', hint: 'Compañero RIC activado', deltaStyle: { color: 'var(--green)' }, numStyle: { color: 'var(--green)' } },
      { ...empty, label: 'Cobrado', delta: '€', value: '0€', hint: 'En proceso de venta' },
    ];
  }
  // step 6
  return [
    { label: 'Inversión semana', delta: 'total', value: '35€', hint: '7 días de anuncio rodando' },
    { label: 'Personas que te ven', delta: 'semana', value: '4.500', hint: 'Alcance de tu anuncio' },
    { label: 'Clientes potenciales', delta: 'acumulado', value: '28', hint: 'Han pedido valoración' },
    { label: 'Exclusivas firmadas', delta: 'cerrada', value: '1', hint: '✓ Venta completada', deltaStyle: { color: 'var(--green)' }, numStyle: { color: 'var(--green)' } },
    {
      label: 'Cobrado',
      delta: '12.000€ ÷ 2',
      value: '6.000€',
      hint: 'Tu mitad · 50% para tu compañero RIC',
      deltaStyle: { color: 'var(--red)' },
      numStyle: { color: 'var(--red)' },
    },
  ];
}

// ============================================================================
// CONFETTI
// ============================================================================
function Confetti() {
  const COLORS = ['#fa5659', '#ffffff', '#fbbf24', '#10b981'];
  const pieces = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    color: COLORS[i % COLORS.length],
    delay: Math.random() * 0.5,
    duration: 2.5 + Math.random() * 1.5,
    rotation: Math.random() * 720,
    size: 6 + Math.random() * 10,
  }));

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 100,
        overflow: 'hidden',
      }}
    >
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -30, x: `${p.x}vw`, opacity: 1, rotate: 0 }}
          animate={{ y: '110vh', rotate: p.rotation, opacity: [1, 1, 0] }}
          transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: '2px',
          }}
        />
      ))}
    </div>
  );
}
