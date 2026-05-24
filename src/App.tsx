import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhonePanel } from './components/PhonePanel';
import { MapPanel } from './components/MapPanel';
import { MetricsPanel } from './components/MetricsPanel';
import { ButtonBar } from './components/ButtonBar';
import { Confetti } from './components/Confetti';
import type { Step } from './types';

export default function App() {
  const [step, setStep] = useState<Step>(0);

  const reset = () => setStep(0);
  const next = () => setStep((s) => Math.min(6, (s + 1) as Step) as Step);
  const goTo = (s: Step) => setStep(s);

  // Atajos de teclado: flechas y números
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') next();
      if (e.key === 'ArrowLeft') setStep((s) => Math.max(0, s - 1) as Step);
      if (e.key === 'r' || e.key === 'R') reset();
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 0 && num <= 6) goTo(num as Step);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="h-screen w-screen bg-aio-black text-white flex flex-col overflow-hidden">
      {/* Header */}
      <header className="h-[60px] flex items-center justify-between px-8 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="text-aio-red font-black text-xl tracking-tight">AIO</div>
          <div className="w-px h-5 bg-white/15" />
          <div className="text-sm text-white/70 font-medium">
            El flujo · cómo se vende un inmueble online
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-white/40">
          <button
            onClick={reset}
            className="text-white/50 hover:text-aio-red transition-colors uppercase tracking-wider"
          >
            Reset
          </button>
          <span className="text-white/30">Paso {step}/6</span>
        </div>
      </header>

      {/* Main grid */}
      <main className="flex-1 grid grid-cols-[380px_1fr_360px] gap-6 p-6 min-h-0">
        <PhonePanel step={step} />
        <MapPanel step={step} />
        <MetricsPanel step={step} />
      </main>

      {/* Button bar */}
      <ButtonBar step={step} onStep={goTo} />

      {/* Confetti on final step */}
      <AnimatePresence>{step === 6 && <Confetti />}</AnimatePresence>
    </div>
  );
}
