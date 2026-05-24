import { motion } from 'framer-motion';
import { STEPS, type Step } from '../types';

interface Props {
  step: Step;
  onStep: (s: Step) => void;
}

export function ButtonBar({ step, onStep }: Props) {
  return (
    <footer className="h-[100px] border-t border-white/5 px-6 flex items-center">
      <div className="w-full grid grid-cols-7 gap-3">
        {STEPS.map((s) => {
          const active = step === s.id;
          const done = step > s.id;
          const next = step + 1 === s.id;

          return (
            <button
              key={s.id}
              onClick={() => onStep(s.id as Step)}
              className={`
                relative h-[68px] rounded-xl px-4 transition-all duration-300
                flex flex-col items-center justify-center gap-1
                border-2
                ${active ? 'bg-aio-red border-aio-red text-white' : ''}
                ${done && !active ? 'bg-white/5 border-white/10 text-white/40' : ''}
                ${!done && !active && next ? 'bg-white/[0.03] border-aio-red/40 text-white/80' : ''}
                ${!done && !active && !next ? 'bg-white/[0.02] border-white/10 text-white/40 hover:bg-white/5' : ''}
              `}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`
                    text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center
                    ${active ? 'bg-white text-aio-red' : ''}
                    ${done && !active ? 'bg-white/20 text-white/60' : ''}
                    ${!done && !active ? 'bg-white/10 text-white/60' : ''}
                  `}
                >
                  {s.id}
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider">
                  {s.short}
                </span>
              </div>
              {active && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-xl ring-2 ring-aio-red ring-offset-2 ring-offset-aio-black pointer-events-none"
                />
              )}
            </button>
          );
        })}
      </div>
    </footer>
  );
}
