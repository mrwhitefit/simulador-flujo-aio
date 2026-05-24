import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import type { Step } from '../types';

interface Props {
  step: Step;
}

interface Metric {
  label: string;
  value: number | string;
  unit?: string;
  highlight?: boolean;
  hint?: string;
}

export function MetricsPanel({ step }: Props) {
  const inversion = step >= 2 ? (step >= 3 ? 35 : 5) : 0; // €/semana (5 al inicio, 35 a la semana)
  const personas = step >= 3 ? 4500 : 0;
  const leads = step >= 3 ? 28 : 0;
  const exclusivas = step >= 4 ? 1 : 0;
  const venta = step >= 6 ? 6000 : 0;

  const metrics: Metric[] = [
    {
      label: 'Inversión esta semana',
      value: inversion,
      unit: '€',
      hint: step >= 2 ? '5€/día rodando' : 'Sin anuncios activos',
    },
    {
      label: 'Personas que ven tu anuncio',
      value: personas.toLocaleString('es-ES'),
      hint: step >= 3 ? 'En tu zona' : '—',
    },
    {
      label: 'Clientes potenciales',
      value: leads,
      hint: step >= 3 ? 'Te han dejado sus datos' : '—',
    },
    {
      label: 'Exclusivas firmadas',
      value: exclusivas,
      hint: step >= 4 ? 'Inmueble en tu cartera' : '—',
    },
    {
      label: 'Cobrado',
      value: venta,
      unit: '€',
      highlight: step >= 6,
      hint:
        step >= 6
          ? 'Comisión total 12.000€ — repartida 50/50 con tu compañero RIC'
          : '—',
    },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-3 font-semibold text-center">
        Tus números
      </div>

      <div className="flex-1 flex flex-col gap-2.5">
        {metrics.map((m) => (
          <MetricCard key={m.label} metric={m} step={step} />
        ))}
      </div>
    </div>
  );
}

function MetricCard({ metric, step }: { metric: Metric; step: Step }) {
  const isNumber = typeof metric.value === 'number';
  const isVenta = metric.label === 'Cobrado' && metric.highlight;

  return (
    <motion.div
      layout
      className={`
        rounded-xl p-3 border transition-all duration-500
        ${
          metric.highlight
            ? 'bg-gradient-to-br from-aio-red/20 to-aio-red/5 border-aio-red/40'
            : 'bg-white/[0.03] border-white/5'
        }
      `}
    >
      <div className="text-[9px] uppercase tracking-wider text-white/40 font-semibold mb-1">
        {metric.label}
      </div>
      <div className="flex items-baseline gap-1">
        {isNumber ? (
          <AnimatedNumber
            value={metric.value as number}
            highlight={metric.highlight}
          />
        ) : (
          <span className="text-2xl font-bold text-white">{metric.value}</span>
        )}
        {metric.unit && (
          <span
            className={`text-base font-bold ${
              metric.highlight ? 'text-aio-red' : 'text-white/40'
            }`}
          >
            {metric.unit}
          </span>
        )}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${metric.label}-${step}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`text-[10px] mt-1 ${
            isVenta ? 'text-aio-red font-semibold' : 'text-white/40'
          }`}
        >
          {metric.hint}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

function AnimatedNumber({
  value,
  highlight,
}: {
  value: number;
  highlight?: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (value === 0) {
      setDisplay(0);
      return;
    }
    const duration = 800;
    const steps = 30;
    const stepValue = value / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      const newVal = Math.min(value, Math.round(stepValue * current));
      setDisplay(newVal);
      if (current >= steps) clearInterval(interval);
    }, duration / steps);
    return () => clearInterval(interval);
  }, [value]);

  return (
    <span
      className={`text-2xl font-black tabular-nums ${
        highlight ? 'text-aio-red' : 'text-white'
      }`}
    >
      {display.toLocaleString('es-ES')}
    </span>
  );
}
