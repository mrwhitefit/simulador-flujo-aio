import { motion, AnimatePresence } from 'framer-motion';
import type { Step } from '../types';

interface Props {
  step: Step;
}

// 9 posts mock para el feed: temas alternados (zona / propietario / profesional)
const POSTS = [
  { color: '#2a2a2a', tag: 'ZONA', icon: '🏘️' },
  { color: '#3a3a3a', tag: 'INFO', icon: '📊' },
  { color: '#2a2a2a', tag: 'YO', icon: '👤' },
  { color: '#3a3a3a', tag: 'ZONA', icon: '🏠' },
  { color: '#2a2a2a', tag: 'INFO', icon: '💰' },
  { color: '#3a3a3a', tag: 'YO', icon: '🎯' },
  { color: '#2a2a2a', tag: 'ZONA', icon: '📍' },
  { color: '#3a3a3a', tag: 'INFO', icon: '📈' },
  { color: '#2a2a2a', tag: 'YO', icon: '✨' },
];

export function PhonePanel({ step }: Props) {
  const brandActive = step >= 1;
  const adsActive = step >= 2 && step < 4;
  const callActive = step === 4;

  return (
    <div className="h-full flex flex-col items-center justify-start pt-2">
      <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3 font-semibold">
        Tu móvil
      </div>

      {/* Phone frame */}
      <div className="relative w-[300px] h-[600px] bg-[#0a0a0a] rounded-[44px] border-[6px] border-[#1f1f1f] shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#0a0a0a] rounded-full z-30" />

        {/* Status bar */}
        <div className="absolute top-0 left-0 right-0 h-8 flex items-center justify-between px-6 text-[10px] text-white/70 z-20">
          <span className="font-bold">19:00</span>
          <span>● ● ●</span>
        </div>

        {/* Screen content */}
        <div className="absolute inset-0 top-8 bg-[#1a1a1a]">
          {/* Empty state */}
          {!brandActive && (
            <div className="h-full flex items-center justify-center">
              <div className="text-white/20 text-xs text-center px-6">
                Tu perfil sin marca.
                <br />
                Nadie te encuentra.
              </div>
            </div>
          )}

          {/* Instagram-style feed */}
          {brandActive && (
            <div className="h-full flex flex-col">
              {/* Profile header */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="px-4 pt-3 pb-3 flex items-center gap-3 border-b border-white/5"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-aio-red to-orange-400 p-[2px]">
                  <div className="w-full h-full rounded-full bg-aio-black flex items-center justify-center text-white font-bold text-sm">
                    AIO
                  </div>
                </div>
                <div>
                  <div className="text-white text-sm font-bold">tu.zona.aio</div>
                  <div className="text-white/50 text-[10px]">
                    Inmuebles · 9 publicaciones
                  </div>
                </div>
              </motion.div>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex justify-around py-2 border-b border-white/5"
              >
                {['Posts', 'Sigues', 'Te siguen'].map((label, i) => (
                  <div key={label} className="text-center">
                    <div className="text-white text-xs font-bold">
                      {i === 0 ? '9' : i === 1 ? '127' : '83'}
                    </div>
                    <div className="text-white/40 text-[9px]">{label}</div>
                  </div>
                ))}
              </motion.div>

              {/* Feed grid */}
              <div className="flex-1 grid grid-cols-3 gap-[2px] p-[2px]">
                {POSTS.map((post, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.4 + i * 0.06,
                      type: 'spring',
                      stiffness: 200,
                      damping: 20,
                    }}
                    className="aspect-square relative flex items-center justify-center text-2xl overflow-hidden"
                    style={{ backgroundColor: post.color }}
                  >
                    <span>{post.icon}</span>
                    <div className="absolute bottom-1 left-1 text-[7px] font-bold tracking-wider text-white/70 bg-black/50 px-1 rounded">
                      {post.tag}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Ad overlay */}
              <AnimatePresence>
                {adsActive && (
                  <motion.div
                    key="ad"
                    initial={{ y: 400, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 400, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 120, damping: 18 }}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-aio-black via-aio-black to-aio-black/95 border-t border-aio-red/40 p-4 z-20"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded-full bg-aio-red flex items-center justify-center text-[10px] font-bold">
                        AIO
                      </div>
                      <div className="text-white text-xs font-bold">tu.zona.aio</div>
                      <span className="text-[9px] bg-white/10 text-white/60 px-2 py-[2px] rounded font-semibold">
                        ANUNCIO
                      </span>
                    </div>
                    <div className="text-white text-xs leading-snug mb-2">
                      ¿Pensando en vender tu piso? Te hago la valoración gratis en 24h.
                    </div>
                    <button className="w-full bg-aio-red text-white text-[11px] font-bold py-2 rounded-md uppercase tracking-wider">
                      Solicitar valoración
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Call overlay (step 4) */}
              <AnimatePresence>
                {callActive && (
                  <motion.div
                    key="call"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 bg-gradient-to-b from-emerald-900 via-emerald-800 to-aio-black z-30 flex flex-col items-center justify-center p-6"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mb-4 text-4xl"
                    >
                      📞
                    </motion.div>
                    <div className="text-white text-xs uppercase tracking-wider mb-1 opacity-70">
                      Llamada entrante
                    </div>
                    <div className="text-white text-lg font-bold mb-1">
                      María, propietaria
                    </div>
                    <div className="text-emerald-300 text-xs">
                      "Quiero firmar la exclusiva"
                    </div>
                    <div className="mt-6 flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center text-xl">
                        ✕
                      </div>
                      <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center text-xl shadow-lg shadow-emerald-500/50">
                        ✓
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Status label */}
      <div className="mt-3 text-center min-h-[20px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-white/50"
          >
            {step === 0 && '— sin actividad —'}
            {step === 1 && '✓ Marca activada · 9 posts publicados'}
            {step === 2 && '✓ Anuncios rodando con 5€/día'}
            {step === 3 && '✓ Tu anuncio está siendo visto'}
            {step === 4 && '✓ Llamada de propietaria interesada'}
            {step === 5 && '✓ Inmueble subido a la RIC'}
            {step === 6 && '✓ Venta cerrada'}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
