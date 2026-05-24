import { motion, AnimatePresence } from 'framer-motion';
import type { Step } from '../types';

interface Props {
  step: Step;
}

// Posiciones agentes RIC (en mapa España simplificado, coords 0-100)
const RIC_AGENTS = [
  { id: 'mad', x: 50, y: 48, city: 'Madrid' },
  { id: 'bcn', x: 78, y: 35, city: 'Barcelona' },
  { id: 'val', x: 68, y: 56, city: 'Valencia' },
  { id: 'sev', x: 32, y: 78, city: 'Sevilla' },
  { id: 'bil', x: 50, y: 18, city: 'Bilbao' },
  { id: 'mal', x: 38, y: 88, city: 'Málaga' },
  { id: 'zar', x: 60, y: 32, city: 'Zaragoza' },
  { id: 'mur', x: 62, y: 70, city: 'Murcia' },
];

// Tu inmueble está en Alicante (zona costera)
const YOUR_LOCATION = { x: 65, y: 62, city: 'Alicante' };
// Compañero RIC matched: Murcia (cerca)
const MATCHED_AGENT = 'mur';

export function MapPanel({ step }: Props) {
  const isCityView = step < 5;
  const showLeads = step >= 3 && step < 5;
  const showExclusiva = step >= 4;
  const showRIC = step >= 5;
  const showMatch = step >= 5;
  const isSold = step === 6;

  return (
    <div className="h-full flex flex-col items-center">
      <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3 font-semibold">
        {isCityView ? 'Tu zona' : 'La red AIO en España'}
      </div>

      <div className="relative flex-1 w-full bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] rounded-2xl border border-white/5 overflow-hidden">
        <AnimatePresence mode="wait">
          {isCityView ? (
            <motion.div
              key="city"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <CityView
                step={step}
                showLeads={showLeads}
                showExclusiva={showExclusiva}
              />
            </motion.div>
          ) : (
            <motion.div
              key="spain"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              <SpainView
                showRIC={showRIC}
                showMatch={showMatch}
                isSold={isSold}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function CityView({
  step,
  showLeads,
  showExclusiva,
}: {
  step: Step;
  showLeads: boolean;
  showExclusiva: boolean;
}) {
  // 28 leads dispersos por la ciudad
  const leads = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    x: 15 + Math.random() * 70,
    y: 15 + Math.random() * 70,
    delay: Math.random() * 1.5,
  }));

  return (
    <div className="absolute inset-0 p-8">
      {/* City grid background */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="grid"
            width="10"
            height="10"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 10 0 L 0 0 0 10"
              fill="none"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="0.3"
            />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />
        {/* Streets */}
        <path d="M 0 30 L 100 30" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
        <path d="M 0 65 L 100 65" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
        <path d="M 30 0 L 30 100" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
        <path d="M 70 0 L 70 100" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
      </svg>

      {/* City label */}
      <div className="absolute top-4 left-4 text-[10px] text-white/40 uppercase tracking-wider font-bold">
        Alicante
      </div>

      {/* You marker (always visible) */}
      <motion.div
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="relative">
          <div className="w-3 h-3 rounded-full bg-aio-red shadow-lg shadow-aio-red/60" />
          <div className="absolute inset-0 w-3 h-3 rounded-full bg-aio-red animate-ping opacity-50" />
          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[10px] text-aio-red font-bold whitespace-nowrap">
            TÚ
          </div>
        </div>
      </motion.div>

      {/* Leads */}
      <AnimatePresence>
        {showLeads &&
          leads.map((lead) => (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{
                delay: lead.delay,
                type: 'spring',
                stiffness: 200,
                damping: 15,
              }}
              className="absolute"
              style={{
                left: `${lead.x}%`,
                top: `${lead.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="w-2 h-2 rounded-full bg-amber-400/80 shadow-md shadow-amber-400/50" />
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Exclusiva pin */}
      <AnimatePresence>
        {showExclusiva && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.5 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="absolute"
            style={{ left: '55%', top: '42%', transform: 'translate(-50%, -100%)' }}
          >
            <div className="relative flex flex-col items-center">
              <div className="bg-emerald-500 text-white text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-lg shadow-emerald-500/40">
                EXCLUSIVA
              </div>
              <div className="w-3 h-3 bg-emerald-500 rotate-45 -mt-1 shadow-md" />
              <div className="text-2xl mt-1">🏠</div>
              <div className="text-[10px] text-white/60 mt-1 whitespace-nowrap">
                300.000€ · 4% honorarios
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function SpainView({
  showRIC,
  showMatch,
  isSold,
}: {
  showRIC: boolean;
  showMatch: boolean;
  isSold: boolean;
}) {
  const matched = RIC_AGENTS.find((a) => a.id === MATCHED_AGENT)!;

  return (
    <div className="absolute inset-0 p-6">
      <div className="absolute top-4 left-4 text-[10px] text-white/40 uppercase tracking-wider font-bold">
        España · RIC activa
      </div>

      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Simplified Spain outline */}
        <path
          d="M 18 25 Q 12 30 12 45 Q 14 60 20 75 Q 28 85 40 90 Q 55 92 70 88 Q 82 82 85 70 Q 88 55 85 40 Q 80 28 70 22 Q 60 18 50 18 Q 38 18 28 20 Q 22 22 18 25 Z"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="0.4"
        />
        {/* Baleares */}
        <circle cx="90" cy="55" r="1.5" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.3" />
        <circle cx="93" cy="58" r="1" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.3" />

        {/* Match line: TU inmueble (Alicante) ↔ Murcia */}
        <AnimatePresence>
          {showMatch && (
            <motion.line
              x1={YOUR_LOCATION.x}
              y1={YOUR_LOCATION.y}
              x2={matched.x}
              y2={matched.y}
              stroke="#fa5659"
              strokeWidth="0.5"
              strokeDasharray="2,1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          )}
        </AnimatePresence>
      </svg>

      {/* RIC agents */}
      {showRIC &&
        RIC_AGENTS.map((agent, i) => {
          const isMatched = agent.id === MATCHED_AGENT && showMatch;
          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: i * 0.08,
                type: 'spring',
                stiffness: 200,
                damping: 15,
              }}
              className="absolute"
              style={{
                left: `${agent.x}%`,
                top: `${agent.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div className="relative flex flex-col items-center">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    isMatched
                      ? 'bg-aio-red shadow-lg shadow-aio-red/60'
                      : 'bg-emerald-400 shadow-md shadow-emerald-400/40'
                  }`}
                />
                {isMatched && (
                  <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-aio-red animate-ping opacity-60" />
                )}
                {isMatched && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap"
                  >
                    <div className="bg-aio-red text-white text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                      {agent.city}
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}

      {/* Your property pin (Alicante) — always visible in Spain view */}
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        className="absolute"
        style={{
          left: `${YOUR_LOCATION.x}%`,
          top: `${YOUR_LOCATION.y}%`,
          transform: 'translate(-50%, -100%)',
        }}
      >
        <div className="relative flex flex-col items-center">
          <div
            className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider whitespace-nowrap ${
              isSold
                ? 'bg-emerald-500 text-white'
                : 'bg-aio-red text-white'
            }`}
          >
            {isSold ? 'VENDIDA' : 'TU EXCLUSIVA'}
          </div>
          <div className="text-lg leading-none">🏠</div>
          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[8px] text-white/50 whitespace-nowrap">
            {YOUR_LOCATION.city}
          </div>
        </div>
      </motion.div>

      {/* Legend */}
      <div className="absolute bottom-3 left-3 flex gap-3 text-[9px] text-white/40">
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Agentes RIC</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-aio-red" />
          <span>Conexión</span>
        </div>
      </div>
    </div>
  );
}
