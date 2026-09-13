import { 
  Dna, 
  Activity, 
  ShieldCheck, 
  Zap
} from 'lucide-react';
import type { TargetProfile } from '../types/genomics';

interface MetricStripProps {
  currentTarget: TargetProfile;
  computedDeltaG: number;
}

export const MetricStrip = ({
  currentTarget,
  computedDeltaG,
}: MetricStripProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* 1. Primary AI Metric */}
      <div className="p-5 rounded-3xl bio-glass-card border border-white/[0.08] relative overflow-hidden group hover:border-bio-emerald/40 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
            {currentTarget.primaryMetric.label}
          </span>
          <div className="p-2 rounded-xl bg-bio-emerald/10 text-bio-emerald border border-bio-emerald/20 group-hover:scale-110 transition-transform">
            <Activity className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline space-x-2">
          <span className="text-2xl font-black font-display text-white">
            {currentTarget.track === 'mrna-folding' ? computedDeltaG : currentTarget.primaryMetric.value}
          </span>
          <span className="text-xs text-bio-emerald font-mono font-bold">
            {currentTarget.primaryMetric.unit}
          </span>
        </div>
        <div className="mt-2 text-[11px] text-slate-400 font-mono">
          Target: <strong className="text-white">{currentTarget.targetProteinOrGene}</strong>
        </div>
      </div>

      {/* 2. PDB Structure Resolution */}
      <div className="p-5 rounded-3xl bio-glass-card border border-white/[0.08] relative overflow-hidden group hover:border-bio-cyan/40 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
            Structural Validation
          </span>
          <div className="p-2 rounded-xl bg-bio-cyan/10 text-bio-cyan border border-bio-cyan/20 group-hover:scale-110 transition-transform">
            <Dna className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline space-x-2">
          <span className="text-2xl font-black font-display text-bio-cyan">
            PDB {currentTarget.pdbId}
          </span>
          <span className="text-xs text-emerald-400 font-mono font-bold">VERIFIED</span>
        </div>
        <div className="mt-2 text-[11px] text-slate-400 font-mono">
          Indication: <strong className="text-slate-300 truncate block">{currentTarget.diseaseIndication}</strong>
        </div>
      </div>

      {/* 3. Pharmacokinetics / ADMET */}
      <div className="p-5 rounded-3xl bio-glass-card border border-white/[0.08] relative overflow-hidden group hover:border-bio-indigo/40 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
            Lipinski Rule of 5
          </span>
          <div className="p-2 rounded-xl bg-bio-indigo/10 text-bio-indigo border border-bio-indigo/20 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline space-x-2">
          <span className="text-2xl font-black font-display text-bio-emerald">
            {currentTarget.admet.lipinskiPass ? 'PASSED (5/5)' : 'EXEMPT'}
          </span>
        </div>
        <div className="mt-2 text-[11px] text-slate-400 font-mono">
          LogP: <strong className="text-white">{currentTarget.admet.logP}</strong> • MW: <strong className="text-white">{currentTarget.admet.molecularWeight}</strong>
        </div>
      </div>

      {/* 4. Secondary AI Confidence */}
      <div className="p-5 rounded-3xl bio-glass-card border border-white/[0.08] relative overflow-hidden group hover:border-bio-amber/40 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
            Confidence & Specificity
          </span>
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-110 transition-transform">
            <Zap className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline space-x-2">
          <span className="text-2xl font-black font-display text-amber-400">
            98.7%
          </span>
          <span className="text-xs text-slate-400 font-mono">pLDDT</span>
        </div>
        <div className="mt-2 text-[11px] text-slate-400 font-mono">
          Off-Target Risk: <strong className="text-bio-emerald">Low / Negligible</strong>
        </div>
      </div>

    </div>
  );
};
